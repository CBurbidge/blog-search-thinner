const fs = require('fs');
const showdown = require('showdown');
const cheerio = require('cheerio')
const htmlToText = require('html-to-text');

var converter = new showdown.Converter();
converter.setFlavor('github');

var markdownToHtml = function (markdown) {
    return converter.makeHtml(markdown);
};

var cleanHtmlOfPreTags = function (html) {
    var $ = cheerio.load(html);
    var minusPreTags = $("*").remove('pre');
    var cleanHtml = $.html();
    return cleanHtml;
}

var removeHtml = function (html) {
    return htmlToText.fromString(html);
}

var removeCodeFromMarkdown = function (markdown) {
    return removeHighlightCodeFromString(removeHtml(cleanHtmlOfPreTags(markdownToHtml(markdown))))
}

var removeCodeFromHtml = function (html) {
    return removeHighlightCodeFromString(removeHtml(cleanHtmlOfPreTags(html)))
}

var removeDuplicates = function (text) {
    
    // todo

    return text;
}

var removeStopWords = function (text) {
    
    // todo

    return text;
}

var cleanText = function (text) {
    return removeDuplicates(removeStopWords(text));
}

var removeHighlightCodeFromString = function (json) {
    var regexPattern = /\{%\s*(highlight|HIGHLIGHT)\s*[A-Za-z\-+#]*\s*%\}[^]*?\{%\s*endhighlight\s*%\}/gm;
    var current = json;

    var matches = true;
    while (matches) {
        if (current.match(regexPattern)) {
            current = current.replace(regexPattern, "");
        } else {
            matches = false;
        }
    }

    return current;
}

var removeHighlightCode = function (jsonObj) {
    // convert to and from json to check all works well
    var asString = JSON.stringify(jsonObj);
    var minusCode = removeHighlightCodeFromString(asString);
    var backToObject = JSON.parse(minusCode);
    return backToObject;
}

var fromMarkdownFile = function (filePath, encoding) {
    var enc = encoding || "utf-8"
    console.log("read file - " + filePath);
    var content = fs.readFileSync(filePath, enc);
    var result = fromMarkdown(content);
    return {
        filePath: filePath,
        text: result
    }
}

var fromHtmlFile = function (filePath, encoding) {
    var enc = encoding || "utf-8"
    console.log("read file - " + filePath);
    var content = fs.readFileSync(filePath, enc);
    var result = fromHtml(content);
    return {
        filePath: filePath,
        text: result
    }
}

var fromMarkdown = function (markdown) {
    return cleanText(removeCodeFromMarkdown(markdown));
}

var fromHtml = function (html) {
    return cleanText(removeCodeFromHtml(html));
}

module.exports = {
    fromMarkdownFile: fromMarkdownFile,
    fromHtmlFile: fromHtmlFile,
    fromMarkdown: fromMarkdown,
    fromHtml: fromHtml,
    cleanText: cleanText
}
