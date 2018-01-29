const USAGE = "Usage: node test.js CONFIG.JSON";

var seo = require('./index.js');
var fs = require('fs');

var srcStream = null;
var dstStream = null;

if (process.argv.length < 3) {
    console.error(USAGE);
    process.exit(1);
}

var config = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
var crules = config.rules;

// Check input/output stream
if (!config.input) {
    console.error("No input in " + process.argv[2] + ", please check again.");
    process.exit(1);
}

if (config.input.fs) {
    srcStream = fs.readFileSync(config.input.fs, 'utf8');
}

if (!config.output) {
    console.error("No output in " + process.argv[2] + ", please check again.");
    process.exit(1);
}

if (config.output.console) {
    dstStream = process.stderr;
} else if (config.output.fs) {
    dstStream = fs.createWriteStream(config.output.fs);
}

seo.check(crules, srcStream, dstStream);