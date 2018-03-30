const fs = require('fs');
const path = require('path');

function splitByWords(text) {
    var wordsArray = text.split(/\s+/);
    return wordsArray;
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
    var fileMeta = textArray.map(x => {
        return Object.assign({}, x, {text: ""})
    });
    var asJsonArray = textArray.map(x => JSON.stringify(x))
    var allWordsMap = getAllWords(asJsonArray);
    var allWords = Object.keys(allWordsMap);
    asJsonArray.forEach((text, i) => {

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

    var remove = function (post) {
        var removed = splitByWords(post.text)
            .filter(function (item) {
                return (wordsOverLimitToRemove.includes(item)) === false;
            }).join(' ')
        return Object.assign({}, post, { text: removed })
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

module.exports = getFrequentWordStripper