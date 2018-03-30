# blog-search-thinner

This is designed to reduce posts of markdown or html into a data structure which can be sent to the client and indexed with lunr or similar.

To use call the function with an optional config object:

~~~ javascript
const thinnerFunc = require('blog-search-thinner')
var configDefault = {
    parseFrontmatter: true,
    removeHighlightCode: true,
    removePreTags: true,
    removeStopWords: true,
    removeDuplicates: true,
    toLowercase: true
};
var thinner = thinnerFunc(configDefault);
var thinned = thinner.fromMarkdownFile("./some-file.md");
~~~

the default config will try to

- (optionally) `parseFrontmatter` section (using grey-matter)
- (optionally) `removeHighlightCode` filter out {% highlight something %} var code = 0; {% endhighlight %} sections
- (if markdown) transform markdown into html
- (optionally) `removePreTags` and their descendents to remove rendered code
- (optionally) `toLowercase`, `removeDuplicates` and `removeStopWords`
- use `html-to-text` to remove the html tags

for html it is the same apart from the markdown -> html conversion

most of the functions are exposed and can be used however it is wanted. to use a function is it import to create an object with the parts to be applied as a `text` property.

~~~ javascript
const thinnerFunc = require('blog-search-thinner')
var thinner = thinnerFunc();
var toFilter = "hello <pre>world</pre>"
var post = {text: toFilter}
var thinned = thinner.remove.highlightCode(post);
~~~





# blog-search-thinner-client

This is just a function to reassemble the output of blog-search-thinner back into an indexable form
