console.log("hi there")

$(function () {

    var timedFuncCall = function (func) {
        var before = performance.now()
        var result = func()
        var after = performance.now()
        var diff = after - before
        return {
            millis: diff,
            result
        }
    }

    var indexJson = function (docs) {
        var idx = lunr(function () {
            this.ref('path')
            this.field('text')

            docs.forEach(function (doc) {
                this.add(doc)
            }, this)
        })

        return idx;
    }

    var runForPosts = function (fileName, numPosts) {
        var preDownload = performance.now();

        $.getJSON(fileName, function (data) {
            var postDownload = performance.now();

            var thinned = data;
            var thinned = indexJson(thinned);
            var postIndexed = performance.now();
            
            thinned.search("today")
            thinned.search("is")
            thinned.search("gonna be the day")
            thinned.search("That they're gonna")
            thinned.search("throw  ")
            thinned.search("it back to you")
            thinned.search("By now")
            thinned.search("you should've somehow")
            thinned.search("Realized what")
            thinned.search("you")
            
            var postTenSearchs = performance.now()

            var timeToDownloaded = Math.ceil(postDownload - preDownload)
            var timeOfDownloading = Math.ceil(postDownload - preDownload)

            var timeToIndexed = Math.ceil(postIndexed - preDownload)
            var timeOfIndexing = Math.ceil(postIndexed - postDownload)

            var timeToTenSearches = Math.ceil(postTenSearchs - preDownload)
            var timeOfTenSearches = Math.ceil(postTenSearchs - postIndexed)
            
            // console.log("Downloading - " + timeOfDownloading + ", total - " + timeToDownloaded);
            // console.log("Indexing - " + timeOfIndexing + ", total - " + timeToIndexed);
            // console.log("Performed 10 searches - " + timeOfTenSearches + ", total - " + timeToTenSearches);
            var resultsString = numPosts + "," + timeOfDownloading + "," + timeToDownloaded + "," + timeOfIndexing + "," + timeToIndexed + "," + timeOfTenSearches + "," + timeToTenSearches
            $('#results').append("<p> " + resultsString + " </p>");

            //console.log(JSON.stringify(res, null, 2));

            res = thinned.search("syntax")
            //console.log(JSON.stringify(res));

            res = thinned.search("syntax today")
            //console.log(JSON.stringify(res, null, 2));

        });
    }

    runForPosts("json/thinned.json", 21);

});
