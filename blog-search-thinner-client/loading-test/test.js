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

    var formatString = x => {
        return x.numPosts + "," +
            x.timeOfDownloading + "," +
            x.timeToDownloaded + "," +
            x.timeOfIndexing + "," +
            x.timeToIndexed + "," +
            x.timeOfTenSearches + "," +
            x.timeToTenSearches
    }

    var runForPosts = function (fileName, numPosts) {
        var preDownload = performance.now();
        var returned = false

        var timeToDownloaded, timeOfDownloading, timeToIndexed, timeOfIndexing, timeToTenSearches, timeOfTenSearches = undefined;
        
        $.ajaxSetup({
            async: false
        });

        console.log("fetching data - " + fileName)
        $.getJSON(fileName, function (data) {
            console.log("fetched data")
            returned = true
            var postDownload = performance.now();

            var thinned = data;
            var thinned = indexJson(thinned);
            var postIndexed = performance.now();

            thinned.search("today"); thinned.search("is"); thinned.search("gonna be the day");
            thinned.search("That they're gonna"); thinned.search("throw  "); thinned.search("it back to you");
            thinned.search("By now"); thinned.search("you should've somehow"); thinned.search("Realized what"); thinned.search("you");

            var postTenSearchs = performance.now()

            timeToDownloaded = Math.ceil(postDownload - preDownload)
            timeOfDownloading = Math.ceil(postDownload - preDownload)

            timeToIndexed = Math.ceil(postIndexed - preDownload)
            timeOfIndexing = Math.ceil(postIndexed - postDownload)

            timeToTenSearches = Math.ceil(postTenSearchs - preDownload)
            timeOfTenSearches = Math.ceil(postTenSearchs - postIndexed)

        }, function(error){
            console.log(error)
        });
        
        return {
            numPosts,
            timeToDownloaded, timeOfDownloading,
            timeToIndexed, timeOfIndexing,
            timeToTenSearches, timeOfTenSearches
        }
    }

    var runForPostNum = function(postNum){
        return runForPosts("json/Posts_" + postNum + ".json", postNum);
    }
    
    function range1(i) { return i ? range1(i - 1).concat(i) : [] }
    var limit = 10
    var max = 400
    var range = range1(max + 2);
    var postNums = range.filter(x => x % limit === 0 && x !== 0 && x <= max)
    
    postNums.forEach(x => {
        var results = runForPostNum(x);
        var resultsString = formatString(results);
        $('#results').append("<p> " + resultsString + " </p>");
    })

    
});
