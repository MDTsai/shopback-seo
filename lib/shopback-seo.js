const DomParser = require('dom-parser');
const fs = require('fs');


// Rules to exam a DOM
var rules = {
    checkImg: function (dom, dstStream) {
        "use strict";
        var count = 0;

        dom.getElementsByTagName("img").forEach(function (val) {
            if (val.getAttribute("alt") == null || val.getAttribute("alt") === "") {
                count ++;

            }
        });

        if (count > 0) {
            dstStream.write ("There are " + count + " <img> tags without alt attribute\n");
        }
    },

    checkAnchor: function (dom, dstStream) {
        "use strict";
        var count = 0;

        dom.getElementsByTagName("a").forEach(function (val) {
            if (val.getAttribute("rel") == null || val.getAttribute("rel") === "") {
                count ++;
            }
        });

        if (count > 0) {
            dstStream.write ("There are " + count + " <a> tags without rel attribute\n");
        }
    },

    checkHead: function (dom, dstStream, rule) {
        "use strict";
        var head = dom.getElementsByTagName("head")[0];

        if (dom.getElementsByTagName("title").length == 0) {
            dstStream.write ("This HTML without <title> tag");
        }

        dom.getElementsByTagName("meta").forEach(function (val) {
            for (var metaname in rule) {
                if (val.getAttribute("name") === metaname) {
                    rule[metaname]++;
                }
            }
        });

        for (var metaname in rule) {
            if (rule[metaname] === 0) {
                dstStream.write ("This HTML without <meta name='" + metaname + "'> tag\n");
            }
        }
    },

    checkStrong: function (dom, dstStream, rule) {
        "use strict";
        if (dom.getElementsByTagName("strong").length > rule.maxCount) {
            dstStream.write ("This HTML have more than 15 <h1> tag\n");
        }
    },

    checkH1: function (dom, dstStream) {
        "use strict";
        if (dom.getElementsByTagName("H1").length > 1) {
            dstStream.write ("This HTML have more than one <h1> tag\n");
        }
    }
};


function check(crules, srcStream, dstStream) {
    // Read from source file, parse DOM and pass to specific rule
    var parser = new DomParser();
    var dom = parser.parseFromString(srcStream);

    for (var rule in crules) {
        rules[rule](dom, dstStream, crules[rule]);
    }
}

exports.check = check;