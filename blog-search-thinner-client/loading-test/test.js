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

    $.getJSON('json/thinned.json', function (data) {
        var thinned = data;
        var thinnedCall = timedFuncCall(() => indexJson(thinned));
        var thinnedIndex = thinnedCall.result
        console.log("took " + thinnedCall.millis + " milliseconds");
        var res = thinnedIndex.search("today")
        //console.log(JSON.stringify(res, null, 2));

        res = thinnedIndex.search("syntax")
        //console.log(JSON.stringify(res, null, 2));

        res = thinnedIndex.search("syntax today")
        //console.log(JSON.stringify(res, null, 2));

    });
});
