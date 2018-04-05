const fs = require('fs');
const glob = require('glob');
const path = require('path');
const thinnerFunc = require('../lib/index');
const lunr = require('lunr');
var defaultFolder = path.dirname(__filename) + "/posts"
var folder = process.argv.length > 2 ? process.argv.slice(2)[0] : defaultFolder;
console.log("folder - " + folder);

let isBadFilePath = function (filePath) {
    return filePath.indexOf("/node_modules/") !== -1
        || filePath.indexOf("/scripts/") !== -1
        || filePath.indexOf("/scss/") !== -1
        || filePath.indexOf("/README.md") !== -1
};
var repoDir = (path.resolve(path.dirname(__filename) + "/../../")) + "\\";
var baseDir = repoDir + "results/"
var allDir = baseDir + "all/"

var clientTestDir = repoDir + "blog-search-thinner-client/loading-test/json/"

console.log("baseDir - " + baseDir);

var writeToFile = function (dir, name, data) {
    var toWrite = JSON.stringify(data);
    fs.writeFileSync(dir + name + ".json", toWrite);
}

var configDefault = {
    parseFrontmatter: true,
    removeHighlightCode: true,
    removePreTags: true,
    removeStopWords: true,
    removeDuplicates: true,
    toLowercase: true
};

var thinnerRemovesNothing = thinnerFunc(Object.assign({}, configDefault, {
    parseFrontmatter: false,
    removeHighlightCode: false,
    removePreTags: false,
    removeStopWords: false,
    removeDuplicates: false,
    toLowercase: false
}));

var thinnerRemovesCode = thinnerFunc(Object.assign({}, configDefault, {
    parseFrontmatter: false,
    removeHighlightCode: true,
    removePreTags: true,
    removeStopWords: false,
    removeDuplicates: false,
    toLowercase: false
}));

var thinnerRemovesCodeAndStopWords = thinnerFunc(Object.assign({}, configDefault, {
    parseFrontmatter: false,
    removeHighlightCode: true,
    removePreTags: true,
    removeStopWords: true,
    removeDuplicates: false,
    toLowercase: true
}));

var thinnerRemovesCodeAndStopWordsAndDuplicates = thinnerFunc(Object.assign({}, configDefault, {
    parseFrontmatter: false,
    removeHighlightCode: true,
    removePreTags: true,
    removeStopWords: true,
    removeDuplicates: true,
    toLowercase: true
}));

var writeFiles = function (files) {
    var goodPaths = files.filter(x => isBadFilePath(x) === false);

    var removedNothing = goodPaths.map(x => thinnerRemovesNothing.fromFile(x));
    var removedCode = goodPaths.map(x => thinnerRemovesCode.fromFile(x));
    var removedCodeAndStop = goodPaths.map(x => thinnerRemovesCodeAndStopWords.fromFile(x));
    var removedDupsAndCodeAndStop = goodPaths.map(x => thinnerRemovesCodeAndStopWordsAndDuplicates.fromFile(x));
    var numFiles = files.length
    writeToFile(allDir, numFiles + "_RemovedNothing", removedNothing);
    writeToFile(allDir, numFiles + "_RemovedCode", removedCode);
    writeToFile(allDir, numFiles + "_RemovedCodeAndStop", removedCodeAndStop);
    writeToFile(allDir, numFiles + "_RemovedWaste", removedDupsAndCodeAndStop);

    var thinner = thinnerFunc()
    var stripper = thinner.getPercentageStripper(removedDupsAndCodeAndStop, 0.8);
    //stripper.writeToFile(allDir + numFiles + "_WordCount.json")
    var stripped = removedDupsAndCodeAndStop.map(x => stripper.remove(x));
    writeToFile(allDir, numFiles + "_RemovedWasteAndPercentage", stripped);
    writeToFile(clientTestDir, "Posts_" + numFiles, stripped);

    var getIndex = function (docs) {
        return lunr(function () {
            this.ref('path')
            this.field('text')

            docs.forEach(function (doc) {
                this.add(doc)
            }, this)
        })
    }


    //writeToFile(allDir, numFiles + "_RemovedNothingIndex", getIndex(removedNothing));
    writeToFile(allDir, numFiles + "_IndexRemovedWasteAndPercentage", getIndex(stripped));


    var wordCountToFile = function (fileName, text) {
        function splitByWords(text) {
            var wordsArray = text.split(/\s+/);
            return wordsArray;
        }
        function createWordMap(wordsArray) {
            // create map for word counts
            var wordsMap = Object.create(null);
            wordsArray.forEach(function (key) {
                if (key in wordsMap) {
                    wordsMap[key]++;
                } else {
                    wordsMap[key] = 1;
                }
            });
            return wordsMap;
        }
        function sortByCount(wordsMap) {
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
        var wordsArray = splitByWords(text);
        var wordsMap = createWordMap(wordsArray);
        var finalWordsArray = sortByCount(wordsMap);
        writeToFile(fileName, finalWordsArray);
    }

    // wordCountToFile(numFiles + "_removedDupsAndCodeAndStopCount", JSON.stringify(removedDupsAndCodeAndStop));
    // wordCountToFile(numFiles + "_removedDupsAndCodeAndStopCountStripped", JSON.stringify(stripped));

}

function range1(i) { return i ? range1(i - 1).concat(i) : [] }

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


glob(folder + "/**/*.md", (err, mdFiles) => {
    glob(folder + "/**/*.html", (err, htmlFiles) => {
        var inOrderFiles = mdFiles.concat(htmlFiles)
        var files = shuffle(inOrderFiles)
        console.log("total files found: " + files.length)
        var range = range1(files.length);
        var limit = 10
        var max = 400
        var intervals = range.filter(x => x % limit === 0 && x !== 0 && x <= max)
        intervals.forEach(x => {
            console.log("run for - " + x)
            var subsetOfFiles = files.slice(0, x)
            writeFiles(subsetOfFiles)
        });
    });
});

