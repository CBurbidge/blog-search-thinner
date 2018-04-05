const fs = require('fs');
const path = require('path');
const glob = require('glob');

glob("./all/*.json", (err, files) => {

    var getOrderedValues = function (fileType, infoValues) {
        var ofType = infoValues.filter(x => x.fileType === fileType)
        return ofType.sort((a, b) => parseInt(a.count) - parseInt(b.count))
    }

    var info = files.map(f => {
        const stats = fs.statSync(f)
        const fileSizeInBytes = stats.size
        const name = path.basename(f)
        const nameMinusExt = name.substring(0, name.length - (path.extname(f).length))
        const split = nameMinusExt.split('_')
        const number = parseInt(split[0])
        const fileType = split[1]

        return {
            path: f,
            size: fileSizeInBytes,
            count: number,
            fileType
        }
    })

    var mapToCoordinates = z => {
        return {
            x: z.count,
            y: z.size
        }
    }
    var removedNothing = getOrderedValues("RemovedNothing", info);
    var removedCode = getOrderedValues("RemovedCode", info);
    var removedCodeAndStop = getOrderedValues("RemovedCodeAndStop", info);
    var removedWaste = getOrderedValues("RemovedWaste", info);

    var range = n => {
        return Array.apply(null, Array(n)).map(function (_, i) { return i; })
    };

    var values = range(removedNothing.length).map(i => {
        return removedNothing[i].count + "," + removedNothing[i].size + "," + removedCode[i].size + "," + removedCodeAndStop[i].size + "," + removedWaste[i].size
    })
    var headers = ["PostCount,RemovedNothing,RemovedCode,RemovedCodeAndStop,RemovedWaste"]
    var all = (headers.concat(values))
    var csv = all.join("\n")
    fs.writeFileSync("./PostSizes.csv", csv)
 
});