const fs = require('fs');
const showdown = require('showdown');
const cheerio = require('cheerio')
const htmlToText = require('html-to-text');
const matter = require('gray-matter');
const path = require('path');
const getPercentageStripper = require('./percentageStripper');

var converter = new showdown.Converter();
//converter.setFlavor('github');

var unified = require('unified');
var markdown = require('remark-parse');
var html = require('remark-html');
var remarkHtml = unified()
    .use(markdown)
    .use(html);

var transformFrontmatterToPostData = function (post) {
    var postFrontMatter = matter(post.text);
    post.frontmatter = postFrontMatter.data;
    post.text = postFrontMatter.content;
    return post;
}
var transformMarkdownToHtml = function (post) {
    //var text = converter.makeHtml(post.text)

    var retVal = null;
    var returned = false;
    remarkHtml.process(post.text, function (err, file) {
        if (err) throw err;
        retVal = file;
        returned = true;
    });
    while (returned === false) { }
    var text = retVal.contents;

    return Object.assign({}, post, { text });
};
var removePreTagsFromHtml = function (post) {
    var $ = cheerio.load(post.text);
    var minusPreTags = $("*").remove('pre');
    var text = $.html();
    return Object.assign({}, post, { text });
}
var transformHtmlToText = function (post) {
    var text = htmlToText.fromString(post.text)
    return Object.assign({}, post, { text });
}
// http://web.archive.org/web/20080501010608/http://www.dcs.gla.ac.uk/idom/ir_resources/linguistic_utils/stop_words
let stopWords = ["a", "about", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "amoungst", "amount", "an", "and", "another", "any", "anyhow", "anyone", "anything", "anyway", "anywhere", "are", "around", "as", "at", "back", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom", "but", "by", "call", "can", "cannot", "cant", "co", "computer", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven", "else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "i", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own", "part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thick", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves"]
function splitByWords(text) {
    var wordsArray = text.split(/\s+/);
    return wordsArray;
}
var filterOutDuplicates = function (element, index, array) {
    var elementIsFirstTimeSeen = index === array.indexOf(element)
    return elementIsFirstTimeSeen;
}
var filterOutStopWords = function (element, index, array) {
    return stopWords.includes(element) === false;
}
var filterApply = function (post, filtersArg) {
    var filters = filtersArg || [filterOutStopWords, filterOutDuplicates];
    var filtered = splitByWords(post.text)
        .filter(function (element, index, array) {
            for (let func of filters) {
                if (func(element, index, array) === false) {
                    return false;
                }
            }
            return true;
        }).join(' ');
    return Object.assign(post, { text: filtered })
}
var removeNonAlpha = function (post) {
    var regex = /[^a-zA-Z0-9\-']/g
    var justAlpha = post.text.replace(regex, " ")
    return Object.assign(post, { text: justAlpha })
}
var transformToLowercase = function (post) {
    return Object.assign(post, { text: post.text.toLowerCase() })
}
var removeHighlightCode = function (post) {
    var regexPattern = /\{%\s*(highlight|HIGHLIGHT)\s*[A-Za-z\-+#]*\s*%\}[^]*?\{%\s*endhighlight\s*%\}/gm;
    var current = post.text;

    var matches = true;
    while (matches) {
        if (current.match(regexPattern)) {
            current = current.replace(regexPattern, "");
        } else {
            matches = false;
        }
    }
    return Object.assign(post, { text: current })

}

var applyFuncs = function (testFuncs, logValues) {
    return data => {
        var returnVal = data;
        if (logValues) {
            console.log(returnVal.text)
        }
        testFuncs.forEach(funk => {
            returnVal = funk(returnVal);
            if (logValues) {
                console.log(returnVal.text)
            }
        })
        return returnVal;
    }
}

var configDefault = {
    parseFrontmatter: true,
    removeHighlightCode: true,
    removePreTags: true,
    removeStopWords: true,
    removeDuplicates: true,
    toLowercase: true
};

module.exports = configArg => {
    var config = Object.assign({}, configDefault, configArg)
    var addToFuncsToRun = function (name, func, arr) {
        if (name in config) {
            var configVal = config[name];
            if (configVal) {
                arr.push(func);
            }
        } else {
            arr.push(func);
        }
    }

    var preHtmlFuncs = []
    addToFuncsToRun("parseFrontmatter", transformFrontmatterToPostData, preHtmlFuncs);
    addToFuncsToRun("removeHighlightCode", removeHighlightCode, preHtmlFuncs);

    var postHtmlFuncs = []
    addToFuncsToRun("toLowercase", transformToLowercase, postHtmlFuncs);
    addToFuncsToRun("removePreTags", removePreTagsFromHtml, postHtmlFuncs);


    var filterFuncs = []
    addToFuncsToRun("removeStopWords", filterOutStopWords, filterFuncs);
    addToFuncsToRun("removeDuplicates", filterOutDuplicates, filterFuncs);
    if (filterFuncs.length > 0) {
        var filterFunc = x => filterApply(x, filterFuncs)
        postHtmlFuncs.push(filterFunc);
    }
    postHtmlFuncs.push(transformHtmlToText);

    var appliedPreHtmlFuncs = applyFuncs(preHtmlFuncs);
    var appliedPostHtmlFuncs = applyFuncs(postHtmlFuncs);

    var fromMarkdownFile = function (filePath, encoding) {
        var enc = encoding || "utf-8"
        console.log("read file - " + filePath);
        var content = fs.readFileSync(filePath, enc);
        var result = fromMarkdown({ text: content });
        return result;
    }

    var fromHtmlFile = function (filePath, encoding) {
        var enc = encoding || "utf-8"
        console.log("read file - " + filePath);
        var content = fs.readFileSync(filePath, enc);
        var result = fromHtml({ text: content });
        return result;
    }

    var fromMarkdown = function (post) {
        var preHtml = appliedPreHtmlFuncs(post);
        var asHtml = transformMarkdownToHtml(preHtml);
        var postHtml = appliedPostHtmlFuncs(asHtml);
        return postHtml;
    }

    var fromHtml = function (post) {
        var preHtml = appliedPreHtmlFuncs(post);
        var postHtml = appliedPostHtmlFuncs(preHtml);
        return postHtml;
    }


    return {
        fromMarkdownFile: fromMarkdownFile,
        fromHtmlFile: fromHtmlFile,
        fromMarkdown: fromMarkdown,
        fromHtml: fromHtml,

        getPercentageStripper: getPercentageStripper,

        transform: {
            htmlToText: transformHtmlToText,
            markdownToHtml: transformMarkdownToHtml,
            frontmatterToPostData: transformFrontmatterToPostData,
            toLowercase: transformToLowercase
        },
        remove: {
            highlightCode: removeHighlightCode,
            preTagsFromHtml: removePreTagsFromHtml
        },
        filter: {
            outDuplicates: filterOutDuplicates,
            outStopWords: filterOutStopWords,
            applyToSplitText: filterApply
        }
    }
}