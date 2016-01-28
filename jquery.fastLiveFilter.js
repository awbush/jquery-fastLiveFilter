/**
 * fastLiveFilter jQuery plugin 1.0.3
 * 
 * Copyright (c) 2011, Anthony Bush
 * License: <http://www.opensource.org/licenses/bsd-license.php>
 * Project Website: http://anthonybush.com/projects/jquery_fast_live_filter/
 **/

jQuery.fn.fastLiveFilter = function(list, options) {
	// Options: input, list, timeout, callback
	options = options || {};
	list = jQuery(list);
	var input = this;
	var lastFilter = '';
	var timeout = options.timeout || 0;
	var callback = options.callback || function() {};
	var hideOnInit = options.hideOnInit || false;
	var hideIfEmpty = options.hideIfEmpty || false;
	var keyTimeout;
	
	// NOTE: because we cache lis & len here, users would need to re-init the plugin
	// if they modify the list in the DOM later.  This doesn't give us that much speed
	// boost, so perhaps it's not worth putting it here.
	var lis = list.children();
	var len = lis.length;
	var oldDisplay = len > 0 ? lis[0].style.display : "block";
	if (hideOnInit) {
		lis.each(function() {
			this.style.display = "none";
		});
	}
	if (hideOnInit || (hideIfEmpty && !$.trim(this.value).length)) {
		callback(0); // return the correct value of 0 if the search field is empty upon init or hideOnInit is true
	} else {
		callback(len); // do a one-time callback on initialization to make sure everything's in sync
	}
	
	input.change(function() {
		// var startTime = new Date().getTime();
		var numShown = 0;
		var filter = input.val().toLowerCase();
		var li, innerText;
		if (hideIfEmpty && !$.trim(this.value).length) {
			lis.each(function() {
				this.style.display = "none";
			});
		} else {
			for (var i = 0; i < len; i++) {
				li = lis[i];
				innerText = !options.selector ? 
					(li.textContent || li.innerText || "") : 
					$(li).find(options.selector).text();
				
				if (innerText.toLowerCase().indexOf(filter) >= 0) {
					if (li.style.display == "none") {
						li.style.display = oldDisplay;
					}
					numShown++;
				} else {
					if (li.style.display != "none") {
						li.style.display = "none";
					}
				}
			}
		}
		callback(numShown);
		// var endTime = new Date().getTime();
		// console.log('Search for ' + filter + ' took: ' + (endTime - startTime) + ' (' + numShown + ' results)');
		return false;
	}).keydown(function() {
		clearTimeout(keyTimeout);
		keyTimeout = setTimeout(function() {
			if (input.val() === lastFilter) return;
			lastFilter = input.val();
			input.change();
		}, timeout);
	});
	return this; // maintain jQuery chainability
}
