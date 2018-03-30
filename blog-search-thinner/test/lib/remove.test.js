import test from 'ava'
const libFunc = require('../../lib/index')

var lib = libFunc()

test('removes highlight javascript code from markdown', (t) => {
  var result = lib.remove.highlightCode({ text: markdownWithCode });

  var doesntContainHighlight = result.text.indexOf("highlight") === -1;

  t.truthy(doesntContainHighlight);
});

test('removes pre tags from html', (t) => {
  var htmlWithPreTags = `
  <div>
    <p>hello</p>
    <p>world</p>
    <pre>some code is here</pre>
  </div>
`
  var result = lib.remove.preTagsFromHtml({ text: markdownWithCode });

  var doesntContainHighlight = result.text.indexOf("some code") === -1;

  t.truthy(doesntContainHighlight);
});


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
