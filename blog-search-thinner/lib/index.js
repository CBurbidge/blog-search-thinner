const fs = require('fs');
const showdown = require('showdown');
const cheerio = require('cheerio')
const htmlToText = require('html-to-text');
const matter = require('gray-matter');

var converter = new showdown.Converter();
//converter.setFlavor('github');

var unified = require('unified');
var markdown = require('remark-parse');
var html = require('remark-html');
var remarkHtml = unified()
    .use(markdown)
    .use(html)

var markdownToHtml = function (post) {
    //var text = converter.makeHtml(post.text)

    var retVal = null;
    var returned = false;
    remarkHtml.process(post.text, function (err, file) {
        if (err) throw err;
        retVal = file;
        returned = true;
    });
    while (returned === false){}
    var text = retVal.contents;

    return Object.assign({}, post, { text });
};

var cleanHtmlOfPreTags = function (post) {
    var $ = cheerio.load(post.text);
    var minusPreTags = $("*").remove('pre');
    var text = $.html();
    return Object.assign({}, post, { text });
}

var removeHtml = function (post) {
    var text = htmlToText.fromString(post.text)
    return Object.assign({}, post, { text });
}

// todo make all post
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

var filterOutDuplicates = function (element, index, array) {
    var elementIsFirstTimeSeen = index === array.indexOf(element)
    return elementIsFirstTimeSeen;
}
var filterOutStopWords = function (element, index, array) {
    return stopWords.includes(element) === false;
}
var filterApply = function (text, filtersArg) {
    var filters = filtersArg || [filterOutStopWords, filterOutDuplicates];
    return splitByWords(text)
        .filter(function (element, index, array) {
            for (let func of filters) {
                if (func(element, index, array) === false) {
                    return false;
                }
            }
            return true;
        }).join(' ');
}
var filterWords = function (post) {
    var filteredText = filterApply(post.text, [filterOutStopWords, filterOutDuplicates])
    return Object.assign(post, { text: filteredText })
}

var removeNonAlpha = function (post) {
    var regex = /[^a-zA-Z0-9\-']/g
    var justAlpha = post.text.replace(regex, " ")
    return Object.assign(post, { text: justAlpha.toLowerCase() })
}

var cleanText = function (post) {
    return filterWords(removeNonAlpha(post));
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
    var postFrontMatter = matter(post.text);
    var cleanContent = cleanText(removeCodeFromMarkdown(post.text))
    return {
        frontmatter: postFrontMatter.data,
        text: cleanContent
    };
}

var fromHtml = function (post) {
    var postFrontMatter = matter(post.text);
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
                    wordsMap[word] = [];
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
                w: key,
                c: wordsMap[key]
            };
        });
        finalWordsArray.sort(function (a, b) {
            return b.c.length - a.c.length;
        });
        return finalWordsArray;
    }

    if (removePercentage >= 1 || removePercentage < 0) {
        console.log("invalid percentage, defaulting to 80%");
        removePercentage = 0.8;
    }

    var limit = Math.ceil((1 - removePercentage) * textArray.length);
    console.log("removing words which appear in more than " + limit + " of the posts");

    var allWordsMap = getAllWords(textArray);
    var allWords = Object.keys(allWordsMap);
    var fileMeta = []
    textArray.forEach((text, i) => {

        // todo fix
        fileMeta.push({ fileName: "filepath" + i })

        var split = splitByWords(text);
        allWords.forEach(word => {
            if (split.includes(word)) {
                allWordsMap[word].push(i);
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

    var writeToFile = function (filePath) {
        var strippedWords = Object.create(null);
        Object.keys(allWordsMap).forEach(word => {
            if (allWordsMap[word].length <= limit) {
                strippedWords[word] = allWordsMap[word];
            }
        });

        var data = {
            files: fileMeta,
            words: strippedWords
        }
        var toWrite = JSON.stringify(data);
        fs.writeFile(filePath, toWrite, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved! - " + filePath);
        });
    }

    return {
        remove: remove,
        writeToFile, writeToFile
    }
}

var frontmatterToPostData = function (post) {
    var postFrontMatter = matter(post.text);
    post.frontmatter = postFrontMatter.data;
    post.text = postFrontMatter.content;
    return post;
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




    transform: {
        htmlToText: removeHtml,
        markdownToHtml: markdownToHtml,
        frontmatterToPostData: frontmatterToPostData
    },
    remove: {
        highlightCode: removeHighlightCodeFromString,
        preTagsFromHtml: cleanHtmlOfPreTags
    },
    filter: {
        outDuplicates: filterOutDuplicates,
        outStopWords: filterOutStopWords,
        applyToSplitText: filterApply,
        text: filterWords
    }
}
