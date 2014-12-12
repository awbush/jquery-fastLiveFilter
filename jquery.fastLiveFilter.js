/**
 * fastLiveFilter jQuery plugin 1.0.3
 * 
 * Copyright (c) 2011, Anthony Bush
 * License: <http://www.opensource.org/licenses/bsd-license.php>
 * Project Website: http://anthonybush.com/projects/jquery_fast_live_filter/
 **/
;(function( $, window, document, undefined ) {

	'use strict';

	var pluginName = 'fastLiveFilter';

	$.fn[ pluginName ] = function(list, params) {

		var defaults = {
			selector: '',
			timeout: 0,
			callback: function() {}
		};

		var options = $.extend( {}, defaults, params );

		list = $(list);

		var input = this,
			lastFilter = '',
			keyTimeout,
			lis = list.children(),
			len = lis.length,
			oldDisplay = len > 0 ? lis[0].style.display : "block";

		options.callback(len);

		input.change(function() {
			var filter = input.val().toLowerCase();
			var li, innerText;
			var numShown = 0;
			for (var i = 0; i < len; i++) {
				li = lis[i];
				innerText = !options.selector ?
					(li.textContent || li.innerText || "") :
					$(li).find(options.selector).text();

				innerText = $.trim( innerText );

				if (innerText.toLowerCase().indexOf(filter) >= 0) {
					if (li.style.display === "none") {
						li.style.display = oldDisplay;
					}
					numShown++;
				} else {
					if (li.style.display !== "none") {
						li.style.display = "none";
					}
				}
			}
			options.callback(numShown);

			return false;
		}).keydown(function() {
			clearTimeout(keyTimeout);
			keyTimeout = setTimeout(function() {
				if( input.val() === lastFilter ) {
					return;
				}
				lastFilter = input.val();
				input.change();
			}, options.timeout );
		});
		return this; // maintain jQuery chainability
	};
})( jQuery, window, document );
