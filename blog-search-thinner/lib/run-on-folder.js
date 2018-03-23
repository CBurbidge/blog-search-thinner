const fs = require('fs');
const glob = require('glob');
const thinner = require('./index');

var folder = process.argv.slice(2)[0];
console.log("folder - " + folder);

let isBadFilePath = function (filePath) {
    return filePath.indexOf("/node_modules/") !== -1
        || filePath.indexOf("/scripts/") !== -1
        || filePath.indexOf("/scss/") !== -1
        || filePath.indexOf("/README.md") !== -1
};

var writeToFile = function (fileName, data) {
    var toWrite = JSON.stringify(data);
    fs.writeFile("C:\\Dev\\CBurbidge\\" + fileName + ".json", toWrite, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved! - " + fileName);
    });
}

glob(folder + "/**/*.md", (err, files) => {
    var goodPaths = files.filter(x => isBadFilePath(x) === false);

    var fileContents = goodPaths.map(x => fs.readFileSync(x, "utf-8"));

    var removedNothing = fileContents.map(x => thinner.removeNothingMarkdown(x));
    var removedCode = fileContents.map(x => thinner.removeCodeMarkdown(x));
    var removedCodeAndStop = fileContents.map(x => thinner.removeCodeAndStopWordsMarkdown(x));
    var removedDupsAndCodeAndStop = fileContents.map(x => thinner.removeDupsAndCodeAndStopWordsMarkdown(x));

    writeToFile("removedNothing", removedNothing);
    writeToFile("removedCode", removedCode);
    writeToFile("removedCodeAndStop", removedCodeAndStop);
    writeToFile("removedDupsAndCodeAndStop", removedDupsAndCodeAndStop);

    var stripper = thinner.getFrequentWordStripper(removedDupsAndCodeAndStop, 0.8);
    var stripped = removedDupsAndCodeAndStop.map(x => stripper.remove(x));
    writeToFile("removedDupsAndCodeAndStopStripped", stripped);


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

    wordCountToFile("removedDupsAndCodeAndStopCount", JSON.stringify(removedDupsAndCodeAndStop));
    wordCountToFile("removedDupsAndCodeAndStopCountStripped", JSON.stringify(stripped));
    
});

