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

glob(folder + "/**/*.md", (err, files) => {
    var goodPaths = files.filter(x => isBadFilePath(x) === false);

    var results = goodPaths.map(x => thinner.fromMarkdownFile(x));

    var toWrite = JSON.stringify(results);

    console.log(toWrite);

    // fs.writeFile("C:\\Dev\\CBurbidge\\test.json", toWrite, function (err) {
    //     if (err) {
    //         return console.log(err);
    //     }

    //     console.log("The file was saved!");
    // });

});

