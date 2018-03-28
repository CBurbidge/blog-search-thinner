# blog-search-thinner

This is designed to reduce posts of markdown or html into a data structure which can be sent to the client and indexed with lunr or similar.

for markdown the basic setup will try to

- parse the frontmatter section (using grey-matter)
- filter out {% highlight something %} var code = 0; {% endhighlight %} sections
- use showdown to transform markdown into html
- remove `pre` tags and their descendents to remove rendered code
- use `html-to-text` to remove the html tags
- make lowercase and remove duplicates and stop words

for html it is the same apart from the markdown -> html conversion

most of the functions which do this are exposed and can be used however it is wanted. to use a function is it import to create an object with the parts to be applied as a `text` property.

to create the final data structure it is required to call the create function with an array of the objects which are output from the functions

for most users it will be easist to call the createFromFiles method passing in a list of file paths and a location to write to.


~~~javascript
var thinner = require('blog-search-thinner');
var files = ["./path1.md", "./path2.html"];
thinner.createFromFiles(files, "./thinned.json")
~~~




# blog-search-thinner-client

This is just a function to reassemble the output of blog-search-thinner back into an indexable form
