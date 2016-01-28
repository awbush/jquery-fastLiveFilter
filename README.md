What
----

This is a live filter plugin for jQuery that is built for speed and ease of use.  It was made because existing tools were inadequate (too slow, wrong feature set).  Check out the [demo](http://anthonybush.com/projects/jquery_fast_live_filter/demo/) and [comparison](http://anthonybush.com/projects/jquery_fast_live_filter/comparison/) pages.

Usage
-----

Include jQuery, the plugin, then initialize the plugin:
```html
<script src="jquery-1.6.4.min.js"></script>
<script src="jquery.fastLiveFilter.js"></script>
<script>
	$(function() {
		$('#search_input').fastLiveFilter('#search_list');
	});
</script>
```

The above would work with this HTML:
```html
<input id="search_input" placeholder="Type to filter">
<ul id="search_list">
	<li>One</li>
	<li>Two</li>
	<li>Three</li>
</ul>
```

Options
-------

Options are given as the second argument. Synopsis:
```javascript
$(INPUT_SELECTOR).fastLiveFilter(LIST_SELECTOR, options);
```

Available options:

Option | Type | Default | Description
------ | ---- | ------- | -----------
timeout | integer | 0 | How many milliseconds to wait after keydown before filtering the list
hideOnInit | boolean | false | Hides all the list items after initialization
hideIfEmpty | boolean | false | Hides all list items if the search field is empty
callback | function | none | A callback method which will be given the number of items left in the list
selector | jQuery selector | text of `li` | By default, the plugin will match the filter against the text of the `li`. If specifed, the selector will be applied to the `li` and the resulting text will be used instead. **WARNING:** Use of complex selectors may reduce performance significantly, especially in large lists!

Example:
```javascript
$('#search_input').fastLiveFilter('#search_list', {
	timeout: 200,
	hideOnInit: true,
	hideIfEmpty: true,
	callback: function(total) { $('#num_results').html(total); }
});
```
Problems? Want to contribute?
-----------------------------

[Report issues](https://github.com/awbush/jquery-fastLiveFilter/issues) on github.  Use [pull requests](http://help.github.com/send-pull-requests/) to contribute code.  Versioning will be done as defined by [Semantic Versioning](http://semver.org/).
