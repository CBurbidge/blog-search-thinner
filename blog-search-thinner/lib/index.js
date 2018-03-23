const fs = require('fs');
const showdown = require('showdown');
const cheerio = require('cheerio')
const htmlToText = require('html-to-text');
const matter = require('gray-matter');

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
    return removeHtml(cleanHtmlOfPreTags(markdownToHtml(removeHighlightCodeFromString(markdown))))
}

var removeCodeFromHtml = function (html) {
    return removeHtml(cleanHtmlOfPreTags(removeHighlightCodeFromString(html)))
}

// http://web.archive.org/web/20080501010608/http://www.dcs.gla.ac.uk/idom/ir_resources/linguistic_utils/stop_words
let stopWords = ["a", "about", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "amoungst", "amount", "an", "and", "another", "any", "anyhow", "anyone", "anything", "anyway", "anywhere", "are", "around", "as", "at", "back", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom", "but", "by", "call", "can", "cannot", "cant", "co", "computer", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven", "else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "i", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own", "part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thick", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves"]

function splitByWords(text) {
    var wordsArray = text.split(/\s+/);
    return wordsArray;
}

var removeStopWords = function (text) {
    return splitByWords(text)
        .filter(function (item) {
            //return (stopWords.indexOf(item)) !== -1;
            return stopWords.includes(item) === false;
        }).join(' ')
}

var removeDuplicates = function (text) {
    return splitByWords(text)
        .filter(function (item, i, allItems) {
            return i == allItems.indexOf(item);
        }).join(' ');
}

var removeNonAlpha = function (text) {
    var regex = /[^a-zA-Z0-9\-']/g
    var justAlpha = text.replace(regex, " ")
    return justAlpha.toLowerCase()
}

var cleanText = function (text) {
    return removeDuplicates(removeStopWords(removeNonAlpha(text)));
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
    var postFrontMatter = matter(markdown);
    var cleanContent = cleanText(removeCodeFromMarkdown(markdown))
    return {
        frontmatter: postFrontMatter.data,
        text: cleanContent
    };
}

var fromHtml = function (html) {
    var postFrontMatter = matter(html);
    var cleanContent = cleanText(removeCodeFromHtml(postFrontMatter.content))
    return {
        frontmatter: postFrontMatter.data,
        text: cleanContent
    };
}

var getFrequentWordStripper = function (textArray, removePercentage) {
    function getAllWords(stringArray) {
        var wordsMap = Object.create(null);
        stringArray.forEach(function (text) {
            splitByWords(text).forEach(word => {
                if (word in wordsMap === false) {
                    wordsMap[word] = 0;
                }
            })
        });
        return wordsMap;
    }

    function projectAndSort(wordsMap) {
        // sort by count in descending order
        var finalWordsArray = [];
        finalWordsArray = Object.keys(wordsMap).map(function (key) {
            return {
                name: key,
                total: wordsMap[key]
            };
        });
        finalWordsArray.sort(function (a, b) {
            return b.total - a.total;
        });
        return finalWordsArray;
    }

    if (removePercentage >= 1 || removePercentage < 0) {
        console.log("invalid percentage, defaulting to 80%");
        removePercentage = 0.8;
    }

    var limit = Math.floor((1 - removePercentage) * textArray.length);
    console.log("removing words which appear in more than " + limit + " of the posts");

    var allWordsMap = getAllWords(textArray);
    var allWords = Object.keys(allWordsMap);

    textArray.forEach(text => {
        var split = splitByWords(text);
        allWords.forEach(word => {
            if (split.includes(word)) {
                allWordsMap[word]++;
            }
        })
    })

    var sortedTotals = projectAndSort(allWordsMap)
    var wordsOverLimitToRemove = sortedTotals
        .filter(x => x.total > limit)
        .map(x => x.name);

    console.log("allWords")
    console.log(allWords)
    console.log("words to remove")
    console.log(wordsOverLimitToRemove)

    var remove = function (text) {
        return splitByWords(text)
            .filter(function (item) {
                return (wordsOverLimitToRemove.includes(item)) === false;
            }).join(' ')
    }

    return {
        remove: remove
    }
}

// todo parse frontmatter for markdown and return

module.exports = {
    fromMarkdownFile: fromMarkdownFile,
    fromHtmlFile: fromHtmlFile,
    fromMarkdown: fromMarkdown,
    fromHtml: fromHtml,
    cleanText: cleanText,

    getFrequentWordStripper: getFrequentWordStripper,

    removeNothingMarkdown: md => removeHtml(markdownToHtml(md)),
    removeCodeMarkdown: md => removeHtml(cleanHtmlOfPreTags(markdownToHtml(removeHighlightCodeFromString(md)))),
    removeCodeAndStopWordsMarkdown: md => removeStopWords(removeHtml(cleanHtmlOfPreTags(markdownToHtml(removeHighlightCodeFromString(md))))),
    removeDupsAndCodeAndStopWordsMarkdown: md => cleanText(removeHtml(cleanHtmlOfPreTags(markdownToHtml(removeHighlightCodeFromString(md))))),

}
