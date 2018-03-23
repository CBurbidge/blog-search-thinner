var markdownWithCode = `
a
through it below and explain what's going on.

{% highlight javascript %}
sl.series.bollinger = function () {

    var xScale = d3.time.scale(),
        yScale = d3.scale.linear();

    // NOTE: The various get / set accessors would go here
    // but I've removed them in the interest of readability

    return bollinger;
};
{% endhighlight %}

That's a decent amount of code, so let's start at the top by looking at the properties.

{% highlight javascript %}
bollinger.yValue = function (value) {
    if (!arguments.length) {
        return yValue;
    }
};
{% endhighlight %}

Adding the component to the chart

First we create and configure our component:

{% highlight javascript %}
var bollinger = sl.series.bollinger()
    .xScale(xScale)
    .yScale(yScale)
{% endhighlight %}

 the component`

var markdownWithoutCode = `
a
through it below and explain what's going on.



That's a decent amount of code, so let's start at the top by looking at the properties.



Adding the component to the chart

First we create and configure our component:



the component`


module.exports = {
    markdownWithCode: markdownWithCode,
    markdownWithoutCode: markdownWithoutCode
}
