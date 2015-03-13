'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
$provide.value("$locale", {
  "DATETIME_FORMATS": {
    "AMPMS": [
      "\u0caa\u0cc2\u0cb0\u0ccd\u0cb5\u0cbe\u0cb9\u0ccd\u0ca8",
      "\u0c85\u0caa\u0cb0\u0cbe\u0cb9\u0ccd\u0ca8"
    ],
    "DAY": [
      "\u0cad\u0cbe\u0ca8\u0cc1\u0cb5\u0cbe\u0cb0",
      "\u0cb8\u0ccb\u0cae\u0cb5\u0cbe\u0cb0",
      "\u0cae\u0c82\u0c97\u0cb3\u0cb5\u0cbe\u0cb0",
      "\u0cac\u0cc1\u0ca7\u0cb5\u0cbe\u0cb0",
      "\u0c97\u0cc1\u0cb0\u0cc1\u0cb5\u0cbe\u0cb0",
      "\u0cb6\u0cc1\u0c95\u0ccd\u0cb0\u0cb5\u0cbe\u0cb0",
      "\u0cb6\u0ca8\u0cbf\u0cb5\u0cbe\u0cb0"
    ],
    "MONTH": [
      "\u0c9c\u0ca8\u0cb5\u0cb0\u0cbf",
      "\u0cab\u0cc6\u0cac\u0ccd\u0cb0\u0cb5\u0cb0\u0cbf",
      "\u0cae\u0cbe\u0cb0\u0ccd\u0c9a\u0ccd",
      "\u0c8f\u0caa\u0ccd\u0cb0\u0cbf\u0cb2\u0ccd",
      "\u0cae\u0cc7",
      "\u0c9c\u0cc2\u0ca8\u0ccd",
      "\u0c9c\u0cc1\u0cb2\u0cc8",
      "\u0c86\u0c97\u0cb8\u0ccd\u0c9f\u0ccd",
      "\u0cb8\u0cc6\u0caa\u0ccd\u0c9f\u0cc6\u0c82\u0cac\u0cb0\u0ccd",
      "\u0c85\u0c95\u0ccd\u0c9f\u0ccb\u0cac\u0cb0\u0ccd",
      "\u0ca8\u0cb5\u0cc6\u0c82\u0cac\u0cb0\u0ccd",
      "\u0ca1\u0cbf\u0cb8\u0cc6\u0c82\u0cac\u0cb0\u0ccd"
    ],
    "SHORTDAY": [
      "\u0cad\u0cbe\u0ca8\u0cc1",
      "\u0cb8\u0ccb\u0cae",
      "\u0cae\u0c82\u0c97\u0cb3",
      "\u0cac\u0cc1\u0ca7",
      "\u0c97\u0cc1\u0cb0\u0cc1",
      "\u0cb6\u0cc1\u0c95\u0ccd\u0cb0",
      "\u0cb6\u0ca8\u0cbf"
    ],
    "SHORTMONTH": [
      "\u0c9c\u0ca8",
      "\u0cab\u0cc6\u0cac\u0ccd\u0cb0",
      "\u0cae\u0cbe\u0cb0\u0ccd\u0c9a\u0ccd",
      "\u0c8f\u0caa\u0ccd\u0cb0\u0cbf",
      "\u0cae\u0cc7",
      "\u0c9c\u0cc2\u0ca8\u0ccd",
      "\u0c9c\u0cc1\u0cb2\u0cc8",
      "\u0c86\u0c97",
      "\u0cb8\u0cc6\u0caa\u0ccd\u0c9f\u0cc6\u0c82",
      "\u0c85\u0c95\u0ccd\u0c9f\u0ccb",
      "\u0ca8\u0cb5\u0cc6\u0c82",
      "\u0ca1\u0cbf\u0cb8\u0cc6\u0c82"
    ],
    "fullDate": "EEEE, MMMM d, y",
    "longDate": "MMMM d, y",
    "medium": "MMM d, y hh:mm:ss a",
    "mediumDate": "MMM d, y",
    "mediumTime": "hh:mm:ss a",
    "short": "M/d/yy hh:mm a",
    "shortDate": "M/d/yy",
    "shortTime": "hh:mm a"
  },
  "NUMBER_FORMATS": {
    "CURRENCY_SYM": "\u20b9",
    "DECIMAL_SEP": ".",
    "GROUP_SEP": ",",
    "PATTERNS": [
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 3,
        "minFrac": 0,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "",
        "posPre": "",
        "posSuf": ""
      },
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 2,
        "minFrac": 2,
        "minInt": 1,
        "negPre": "\u00a4-",
        "negSuf": "",
        "posPre": "\u00a4",
        "posSuf": ""
      }
    ]
  },
  "id": "kn",
  "pluralCat": function(n, opt_precision) {  var i = n | 0;  if (i == 0 || n == 1) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;}
});
}]);

/************************
jquery-timepicker v1.4.13
http://jonthornton.github.com/jquery-timepicker/

requires jQuery 1.7+
************************/


(function (factory) {
    if (typeof exports === "object" && exports &&
        typeof module === "object" && module && module.exports === exports) {
        // Browserify. Attach to jQuery module.
        factory(require("jquery"));
    } else if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	var _baseDate = _generateBaseDate();
	var _ONE_DAY = 86400;
	var _lang = {
		am: 'am',
		pm: 'pm',
		AM: 'AM',
		PM: 'PM',
		decimal: '.',
		mins: 'mins',
		hr: 'hr',
		hrs: 'hrs'
	};

	var methods =
	{
		init: function(options)
		{
			return this.each(function()
			{
				var self = $(this);

				// pick up settings from data attributes
				var attributeOptions = [];
				for (var key in $.fn.timepicker.defaults) {
					if (self.data(key))  {
						attributeOptions[key] = self.data(key);
					}
				}

				var settings = $.extend({}, $.fn.timepicker.defaults, attributeOptions, options);

				if (settings.lang) {
					_lang = $.extend(_lang, settings.lang);
				}

				settings = _parseSettings(settings);
				self.data('timepicker-settings', settings);
				self.addClass('ui-timepicker-input');

				if (settings.useSelect) {
					_render(self);
				} else {
					self.prop('autocomplete', 'off');
					self.on('click.timepicker focus.timepicker', methods.show);
					self.on('change.timepicker', _formatValue);
					self.on('keydown.timepicker', _keydownhandler);
					self.on('keyup.timepicker', _keyuphandler);

					_formatValue.call(self.get(0));
				}
			});
		},

		show: function(e)
		{
			var self = $(this);
			var settings = self.data('timepicker-settings');

			if (e) {
				if (!settings.showOnFocus) {
					return true;
				}

				e.preventDefault();
			}

			if (settings.useSelect) {
				self.data('timepicker-list').focus();
				return;
			}

			if (_hideKeyboard(self)) {
				// block the keyboard on mobile devices
				self.blur();
			}

			var list = self.data('timepicker-list');

			// check if input is readonly
			if (self.prop('readonly')) {
				return;
			}

			// check if list needs to be rendered
			if (!list || list.length === 0 || typeof settings.durationTime === 'function') {
				_render(self);
				list = self.data('timepicker-list');
			}

			if (_isVisible(list)) {
				return;
			}

			// make sure other pickers are hidden
			methods.hide();

			// position the dropdown relative to the input
			list.show();
			var listOffset = {};

			if (settings.orientation == 'rtl') {
				// right-align the dropdown
				listOffset.left = self.offset().left + self.outerWidth() - list.outerWidth() + parseInt(list.css('marginLeft').replace('px', ''), 10);
			} else {
				// left-align the dropdown
				listOffset.left = self.offset().left + parseInt(list.css('marginLeft').replace('px', ''), 10);
			}

			if ((self.offset().top + self.outerHeight(true) + list.outerHeight()) > $(window).height() + $(window).scrollTop()) {
				// position the dropdown on top
				listOffset.top = self.offset().top - list.outerHeight() + parseInt(list.css('marginTop').replace('px', ''), 10);
				list.addClass('ui-timepicker-positioned-top');
			} else {
				// put it under the input
				listOffset.top = self.offset().top + self.outerHeight() + parseInt(list.css('marginTop').replace('px', ''), 10);
				list.removeClass('ui-timepicker-positioned-top');
			}

			list.offset(listOffset);

			// position scrolling
			var selected = list.find('.ui-timepicker-selected');

			if (!selected.length) {
				if (_getTimeValue(self)) {
					selected = _findRow(self, list, _time2int(_getTimeValue(self)));
				} else if (settings.scrollDefault) {
					selected = _findRow(self, list, settings.scrollDefault);
				}
			}

			if (selected && selected.length) {
				var topOffset = list.scrollTop() + selected.position().top - selected.outerHeight();
				list.scrollTop(topOffset);
			} else {
				list.scrollTop(0);
			}

			// attach close handlers
			$(document).on('touchstart.ui-timepicker mousedown.ui-timepicker', _closeHandler);
			if (settings.closeOnWindowScroll) {
				$(document).on('scroll.ui-timepicker', _closeHandler);
			}

			self.trigger('showTimepicker');

			return this;
		},

		hide: function(e)
		{
			var self = $(this);
			var settings = self.data('timepicker-settings');

			if (settings && settings.useSelect) {
				self.blur();
			}

			$('.ui-timepicker-wrapper').each(function() {
				var list = $(this);
				if (!_isVisible(list)) {
					return;
				}

				var self = list.data('timepicker-input');
				var settings = self.data('timepicker-settings');

				if (settings && settings.selectOnBlur) {
					_selectValue(self);
				}

				list.hide();
				self.trigger('hideTimepicker');
			});

			return this;
		},

		option: function(key, value)
		{
			return this.each(function(){
				var self = $(this);
				var settings = self.data('timepicker-settings');
				var list = self.data('timepicker-list');

				if (typeof key == 'object') {
					settings = $.extend(settings, key);

				} else if (typeof key == 'string' && typeof value != 'undefined') {
					settings[key] = value;

				} else if (typeof key == 'string') {
					return settings[key];
				}

				settings = _parseSettings(settings);

				self.data('timepicker-settings', settings);

				if (list) {
					list.remove();
					self.data('timepicker-list', false);
				}

				if (settings.useSelect) {
					_render(self);
				}
			});
		},

		getSecondsFromMidnight: function()
		{
			return _time2int(_getTimeValue(this));
		},

		getTime: function(relative_date)
		{
			var self = this;

			var time_string = _getTimeValue(self);
			if (!time_string) {
				return null;
			}

			if (!relative_date) {
				relative_date = new Date();
			}
			var offset = _time2int(time_string);

			// construct a Date with today's date, and offset's time
			var time = new Date(relative_date);
			time.setHours(offset / 3600);
			time.setMinutes(offset % 3600 / 60);
			time.setSeconds(offset % 60);
			time.setMilliseconds(0);

			return time;
		},

		setTime: function(value)
		{
			var self = this;
			var settings = self.data('timepicker-settings');

			if (settings.forceRoundTime) {
				var prettyTime = _roundAndFormatTime(value, settings)
			} else {
				var prettyTime = _int2time(_time2int(value), settings.timeFormat);
			}

			_setTimeValue(self, prettyTime);
			if (self.data('timepicker-list')) {
				_setSelected(self, self.data('timepicker-list'));
			}

			return this;
		},

		remove: function()
		{
			var self = this;

			// check if this element is a timepicker
			if (!self.hasClass('ui-timepicker-input')) {
				return;
			}

			var settings = self.data('timepicker-settings');
			self.removeAttr('autocomplete', 'off');
			self.removeClass('ui-timepicker-input');
			self.removeData('timepicker-settings');
			self.off('.timepicker');

			// timepicker-list won't be present unless the user has interacted with this timepicker
			if (self.data('timepicker-list')) {
				self.data('timepicker-list').remove();
			}

			if (settings.useSelect) {
				self.show();
			}

			self.removeData('timepicker-list');

			return this;
		}
	};

	// private methods

	function _isVisible(elem)
	{
		var el = elem[0];
		return el.offsetWidth > 0 && el.offsetHeight > 0;
	}

	function _parseSettings(settings)
	{
		if (settings.minTime) {
			settings.minTime = _time2int(settings.minTime);
		}

		if (settings.maxTime) {
			settings.maxTime = _time2int(settings.maxTime);
		}

		if (settings.durationTime && typeof settings.durationTime !== 'function') {
			settings.durationTime = _time2int(settings.durationTime);
		}

		if (settings.scrollDefault == 'now') {
			settings.scrollDefault = _time2int(new Date());
		} else if (settings.scrollDefault) {
			settings.scrollDefault = _time2int(settings.scrollDefault);
		} else if (settings.minTime) {
			settings.scrollDefault = settings.minTime;
		}

		if (settings.scrollDefault) {
			settings.scrollDefault = _roundTime(settings.scrollDefault, settings);
		}

		if ($.type(settings.timeFormat) === "string" && settings.timeFormat.match(/[gh]/)) {
			settings._twelveHourTime = true;
		}

		if (settings.disableTimeRanges.length > 0) {
			// convert string times to integers
			for (var i in settings.disableTimeRanges) {
				settings.disableTimeRanges[i] = [
					_time2int(settings.disableTimeRanges[i][0]),
					_time2int(settings.disableTimeRanges[i][1])
				];
			}

			// sort by starting time
			settings.disableTimeRanges = settings.disableTimeRanges.sort(function(a, b){
				return a[0] - b[0];
			});

			// merge any overlapping ranges
			for (var i = settings.disableTimeRanges.length-1; i > 0; i--) {
				if (settings.disableTimeRanges[i][0] <= settings.disableTimeRanges[i-1][1]) {
					settings.disableTimeRanges[i-1] = [
						Math.min(settings.disableTimeRanges[i][0], settings.disableTimeRanges[i-1][0]),
						Math.max(settings.disableTimeRanges[i][1], settings.disableTimeRanges[i-1][1])
					];
					settings.disableTimeRanges.splice(i, 1);
				}
			}
		}

		return settings;
	}

	function _render(self)
	{
		var settings = self.data('timepicker-settings');
		var list = self.data('timepicker-list');

		if (list && list.length) {
			list.remove();
			self.data('timepicker-list', false);
		}

		if (settings.useSelect) {
			list = $('<select />', { 'class': 'ui-timepicker-select' });
			var wrapped_list = list;
		} else {
			list = $('<ul />', { 'class': 'ui-timepicker-list' });

			var wrapped_list = $('<div />', { 'class': 'ui-timepicker-wrapper', 'tabindex': -1 });
			wrapped_list.css({'display':'none', 'position': 'absolute' }).append(list);
		}

		if (settings.noneOption) {
			if (settings.noneOption === true) {
				settings.noneOption = (settings.useSelect) ? 'Time...' : 'None';
			}

			if ($.isArray(settings.noneOption)) {
				for (var i in settings.noneOption) {
					if (parseInt(i, 10) == i){
						var noneElement = _generateNoneElement(settings.noneOption[i], settings.useSelect);
						list.append(noneElement);
					}
				}
			} else {
				var noneElement = _generateNoneElement(settings.noneOption, settings.useSelect);
				list.append(noneElement);
			}
		}

		if (settings.className) {
			wrapped_list.addClass(settings.className);
		}

		if ((settings.minTime !== null || settings.durationTime !== null) && settings.showDuration) {
			wrapped_list.addClass('ui-timepicker-with-duration');
			wrapped_list.addClass('ui-timepicker-step-'+settings.step);
		}

		var durStart = settings.minTime;
		if (typeof settings.durationTime === 'function') {
			durStart = _time2int(settings.durationTime());
		} else if (settings.durationTime !== null) {
			durStart = settings.durationTime;
		}
		var start = (settings.minTime !== null) ? settings.minTime : 0;
		var end = (settings.maxTime !== null) ? settings.maxTime : (start + _ONE_DAY - 1);

		if (end <= start) {
			// make sure the end time is greater than start time, otherwise there will be no list to show
			end += _ONE_DAY;
		}

		if (end === _ONE_DAY-1 && $.type(settings.timeFormat) === "string" && settings.timeFormat.indexOf('H') !== -1) {
			// show a 24:00 option when using military time
			end = _ONE_DAY;
		}

		var dr = settings.disableTimeRanges;
		var drCur = 0;
		var drLen = dr.length;

		for (var i=start; i <= end; i += settings.step*60) {
			var timeInt = i;
			var timeString = _int2time(timeInt, settings.timeFormat);

			if (settings.useSelect) {
				var row = $('<option />', { 'value': timeString });
				row.text(timeString);
			} else {
				var row = $('<li />');
				row.data('time', (timeInt <= 86400 ? timeInt : timeInt % 86400));
				row.text(timeString);
			}

			if ((settings.minTime !== null || settings.durationTime !== null) && settings.showDuration) {
				var durationString = _int2duration(i - durStart, settings.step);
				if (settings.useSelect) {
					row.text(row.text()+' ('+durationString+')');
				} else {
					var duration = $('<span />', { 'class': 'ui-timepicker-duration' });
					duration.text(' ('+durationString+')');
					row.append(duration);
				}
			}

			if (drCur < drLen) {
				if (timeInt >= dr[drCur][1]) {
					drCur += 1;
				}

				if (dr[drCur] && timeInt >= dr[drCur][0] && timeInt < dr[drCur][1]) {
					if (settings.useSelect) {
						row.prop('disabled', true);
					} else {
						row.addClass('ui-timepicker-disabled');
					}
				}
			}

			list.append(row);
		}

		wrapped_list.data('timepicker-input', self);
		self.data('timepicker-list', wrapped_list);

		if (settings.useSelect) {
			if (self.val()) {
				list.val(_roundAndFormatTime(self.val(), settings));
			}

			list.on('focus', function(){
				$(this).data('timepicker-input').trigger('showTimepicker');
			});
			list.on('blur', function(){
				$(this).data('timepicker-input').trigger('hideTimepicker');
			});
			list.on('change', function(){
				_setTimeValue(self, $(this).val(), 'select');
			});

			_setTimeValue(self, list.val());
			self.hide().after(list);
		} else {
			var appendTo = settings.appendTo;
			if (typeof appendTo === 'string') {
				appendTo = $(appendTo);
			} else if (typeof appendTo === 'function') {
				appendTo = appendTo(self);
			}
			appendTo.append(wrapped_list);
			_setSelected(self, list);

			list.on('mousedown', 'li', function(e) {

				// hack: temporarily disable the focus handler
				// to deal with the fact that IE fires 'focus'
				// events asynchronously
				self.off('focus.timepicker');
				self.on('focus.timepicker-ie-hack', function(){
					self.off('focus.timepicker-ie-hack');
					self.on('focus.timepicker', methods.show);
				});

				if (!_hideKeyboard(self)) {
					self[0].focus();
				}

				// make sure only the clicked row is selected
				list.find('li').removeClass('ui-timepicker-selected');
				$(this).addClass('ui-timepicker-selected');

				if (_selectValue(self)) {
					self.trigger('hideTimepicker');
					wrapped_list.hide();
				}
			});
		}
	}

	function _generateNoneElement(optionValue, useSelect)
	{
		var label, className, value;

		if (typeof optionValue == 'object') {
			label = optionValue.label;
			className = optionValue.className;
			value = optionValue.value;
		} else if (typeof optionValue == 'string') {
			label = optionValue;
		} else {
			$.error('Invalid noneOption value');
		}

		if (useSelect) {
			return $('<option />', {
					'value': value,
					'class': className,
					'text': label
				});
		} else {
			return $('<li />', {
					'class': className,
					'text': label
				}).data('time', value);
		}
	}

	function _roundTime(seconds, settings)
	{
		if (!$.isNumeric(seconds)) {
			seconds = _time2int(seconds);
		}

		if (seconds === null) {
			return null;
		} else {
			var offset = seconds % (settings.step*60); // step is in minutes

			if (offset >= settings.step*30) {
				// if offset is larger than a half step, round up
				seconds += (settings.step*60) - offset;
			} else {
				// round down
				seconds -= offset;
			}

			return seconds;
		}
	}

	function _roundAndFormatTime(seconds, settings)
	{
		seconds = _roundTime(seconds, settings);
		if (seconds !== null) {
			return _int2time(seconds, settings.timeFormat);
		}
	}

	function _generateBaseDate()
	{
		return new Date(1970, 1, 1, 0, 0, 0);
	}

	// event handler to decide whether to close timepicker
	function _closeHandler(e)
	{
		var target = $(e.target);
		var input = target.closest('.ui-timepicker-input');
		if (input.length === 0 && target.closest('.ui-timepicker-wrapper').length === 0) {
			methods.hide();
			$(document).unbind('.ui-timepicker');
		}
	}

	function _hideKeyboard(self)
	{
		var settings = self.data('timepicker-settings');
		return ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && settings.disableTouchKeyboard);
	}

	function _findRow(self, list, value)
	{
		if (!value && value !== 0) {
			return false;
		}

		var settings = self.data('timepicker-settings');
		var out = false;
		var halfStep = settings.step*30;

		// loop through the menu items
		list.find('li').each(function(i, obj) {
			var jObj = $(obj);
			if (typeof jObj.data('time') != 'number') {
				return;
			}

			var offset = jObj.data('time') - value;

			// check if the value is less than half a step from each row
			if (Math.abs(offset) < halfStep || offset == halfStep) {
				out = jObj;
				return false;
			}
		});

		return out;
	}

	function _setSelected(self, list)
	{
		list.find('li').removeClass('ui-timepicker-selected');

		var timeValue = _time2int(_getTimeValue(self), self.data('timepicker-settings'));
		if (timeValue === null) {
			return;
		}

		var selected = _findRow(self, list, timeValue);
		if (selected) {

			var topDelta = selected.offset().top - list.offset().top;

			if (topDelta + selected.outerHeight() > list.outerHeight() || topDelta < 0) {
				list.scrollTop(list.scrollTop() + selected.position().top - selected.outerHeight());
			}

			selected.addClass('ui-timepicker-selected');
		}
	}


	function _formatValue(e, origin)
	{
		if (this.value === '' || origin == 'timepicker') {
			return;
		}

		var self = $(this);
		var list = self.data('timepicker-list');

		if (self.is(':focus') && (!e || e.type != 'change')) {
			return;
		}

		var seconds = _time2int(this.value);

		if (seconds === null) {
			self.trigger('timeFormatError');
			return;
		}

		var settings = self.data('timepicker-settings');
		var rangeError = false;
		// check that the time in within bounds
		if (settings.minTime !== null && seconds < settings.minTime) {
			rangeError = true;
		} else if (settings.maxTime !== null && seconds > settings.maxTime) {
			rangeError = true;
		}

		// check that time isn't within disabled time ranges
		$.each(settings.disableTimeRanges, function(){
			if (seconds >= this[0] && seconds < this[1]) {
				rangeError = true;
				return false;
			}
		});

		if (settings.forceRoundTime) {
			var offset = seconds % (settings.step*60); // step is in minutes

			if (offset >= settings.step*30) {
				// if offset is larger than a half step, round up
				seconds += (settings.step*60) - offset;
			} else {
				// round down
				seconds -= offset;
			}
		}

		var prettyTime = _int2time(seconds, settings.timeFormat);

		if (rangeError) {
			if (_setTimeValue(self, prettyTime, 'error')) {
				self.trigger('timeRangeError');
			}
		} else {
			_setTimeValue(self, prettyTime);
		}
	}

	function _getTimeValue(self)
	{
		if (self.is('input')) {
			return self.val();
		} else {
			// use the element's data attributes to store values
			return self.data('ui-timepicker-value');
		}
	}

	function _setTimeValue(self, value, source)
	{
		if (self.is('input')) {
			self.val(value);

			var settings = self.data('timepicker-settings');
			if (settings.useSelect && source != 'select') {
				self.data('timepicker-list').val(_roundAndFormatTime(value, settings));
			}
		}

		if (self.data('ui-timepicker-value') != value) {
			self.data('ui-timepicker-value', value);
			if (source == 'select') {
				self.trigger('selectTime').trigger('changeTime').trigger('change', 'timepicker');
			} else if (source != 'error') {
				self.trigger('changeTime');
			}

			return true;
		} else {
			self.trigger('selectTime');
			return false;
		}
	}

	/*
	*  Keyboard navigation via arrow keys
	*/
	function _keydownhandler(e)
	{
		var self = $(this);
		var list = self.data('timepicker-list');

		if (!list || !_isVisible(list)) {
			if (e.keyCode == 40) {
				// show the list!
				methods.show.call(self.get(0));
				list = self.data('timepicker-list');
				if (!_hideKeyboard(self)) {
					self.focus();
				}
			} else {
				return true;
			}
		}

		switch (e.keyCode) {

			case 13: // return
				if (_selectValue(self)) {
					methods.hide.apply(this);
				}

				e.preventDefault();
				return false;

			case 38: // up
				var selected = list.find('.ui-timepicker-selected');

				if (!selected.length) {
					list.find('li').each(function(i, obj) {
						if ($(obj).position().top > 0) {
							selected = $(obj);
							return false;
						}
					});
					selected.addClass('ui-timepicker-selected');

				} else if (!selected.is(':first-child')) {
					selected.removeClass('ui-timepicker-selected');
					selected.prev().addClass('ui-timepicker-selected');

					if (selected.prev().position().top < selected.outerHeight()) {
						list.scrollTop(list.scrollTop() - selected.outerHeight());
					}
				}

				return false;

			case 40: // down
				selected = list.find('.ui-timepicker-selected');

				if (selected.length === 0) {
					list.find('li').each(function(i, obj) {
						if ($(obj).position().top > 0) {
							selected = $(obj);
							return false;
						}
					});

					selected.addClass('ui-timepicker-selected');
				} else if (!selected.is(':last-child')) {
					selected.removeClass('ui-timepicker-selected');
					selected.next().addClass('ui-timepicker-selected');

					if (selected.next().position().top + 2*selected.outerHeight() > list.outerHeight()) {
						list.scrollTop(list.scrollTop() + selected.outerHeight());
					}
				}

				return false;

			case 27: // escape
				list.find('li').removeClass('ui-timepicker-selected');
				methods.hide();
				break;

			case 9: //tab
				methods.hide();
				break;

			default:
				return true;
		}
	}

	/*
	*	Time typeahead
	*/
	function _keyuphandler(e)
	{
		var self = $(this);
		var list = self.data('timepicker-list');

		if (!list || !_isVisible(list)) {
			return true;
		}

		if (!self.data('timepicker-settings').typeaheadHighlight) {
			list.find('li').removeClass('ui-timepicker-selected');
			return true;
		}

		switch (e.keyCode) {

			case 96: // numpad numerals
			case 97:
			case 98:
			case 99:
			case 100:
			case 101:
			case 102:
			case 103:
			case 104:
			case 105:
			case 48: // numerals
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
			case 65: // a
			case 77: // m
			case 80: // p
			case 186: // colon
			case 8: // backspace
			case 46: // delete
				_setSelected(self, list);
				break;

			default:
				// list.find('li').removeClass('ui-timepicker-selected');
				return;
		}
	}

	function _selectValue(self)
	{
		var settings = self.data('timepicker-settings');
		var list = self.data('timepicker-list');
		var timeValue = null;

		var cursor = list.find('.ui-timepicker-selected');

		if (cursor.hasClass('ui-timepicker-disabled')) {
			return false;
		}

		if (cursor.length) {
			// selected value found
			timeValue = cursor.data('time');
		}

		if (timeValue !== null) {
			if (typeof timeValue == 'string') {
				self.val(timeValue);
			} else {
				var timeString = _int2time(timeValue, settings.timeFormat);
				_setTimeValue(self, timeString, 'select');
			}
		}

		//self.trigger('change').trigger('selectTime');
		return true;
	}

	function _int2duration(seconds, step)
	{
		seconds = Math.abs(seconds);
		var minutes = Math.round(seconds/60),
			duration = [],
			hours, mins;

		if (minutes < 60) {
			// Only show (x mins) under 1 hour
			duration = [minutes, _lang.mins];
		} else {
			hours = Math.floor(minutes/60);
			mins = minutes%60;

			// Show decimal notation (eg: 1.5 hrs) for 30 minute steps
			if (step == 30 && mins == 30) {
				hours += _lang.decimal + 5;
			}

			duration.push(hours);
			duration.push(hours == 1 ? _lang.hr : _lang.hrs);

			// Show remainder minutes notation (eg: 1 hr 15 mins) for non-30 minute steps
			// and only if there are remainder minutes to show
			if (step != 30 && mins) {
				duration.push(mins);
				duration.push(_lang.mins);
			}
		}

		return duration.join(' ');
	}

	function _int2time(seconds, format)
	{
		if (seconds === null) {
			return;
		}

		var time = new Date(_baseDate.valueOf() + (seconds*1000));

		if (isNaN(time.getTime())) {
			return;
		}

		if ($.type(format) === "function") {
			return format(time);
		}

		var output = '';
		var hour, code;
		for (var i=0; i<format.length; i++) {

			code = format.charAt(i);
			switch (code) {

				case 'a':
					output += (time.getHours() > 11) ? _lang.pm : _lang.am;
					break;

				case 'A':
					output += (time.getHours() > 11) ? _lang.pm.toUpperCase() : _lang.am.toUpperCase();
					break;

				case 'g':
					hour = time.getHours() % 12;
					output += (hour === 0) ? '12' : hour;
					break;

				case 'G':
					output += time.getHours();
					break;

				case 'h':
					hour = time.getHours() % 12;

					if (hour !== 0 && hour < 10) {
						hour = '0'+hour;
					}

					output += (hour === 0) ? '12' : hour;
					break;

				case 'H':
					hour = time.getHours();
					if (seconds === _ONE_DAY) hour = 24;
					output += (hour > 9) ? hour : '0'+hour;
					break;

				case 'i':
					var minutes = time.getMinutes();
					output += (minutes > 9) ? minutes : '0'+minutes;
					break;

				case 's':
					seconds = time.getSeconds();
					output += (seconds > 9) ? seconds : '0'+seconds;
					break;

				case '\\':
					// escape character; add the next character and skip ahead
					i++;
					output += format.charAt(i);
					break;

				default:
					output += code;
			}
		}

		return output;
	}

	function _time2int(timeString, settings)
	{
		if (timeString === '') return null;
		if (!timeString || timeString+0 == timeString) return timeString;

		if (typeof(timeString) == 'object') {
			return timeString.getHours()*3600 + timeString.getMinutes()*60 + timeString.getSeconds();
		}

		timeString = timeString.toLowerCase();

		// if the last character is an "a" or "p", add the "m"
		if (timeString.slice(-1) == 'a' || timeString.slice(-1) == 'p') {
			timeString += 'm';
		}

		// try to parse time input
		var pattern = new RegExp('^([0-2]?[0-9])\\W?([0-5][0-9])?\\W?([0-5][0-9])?\\s*('+_lang.am+'|'+_lang.pm+')?$');
		var time = timeString.match(pattern);
		if (!time) {
			return null;
		}

		var hour = parseInt(time[1]*1, 10);
		var ampm = time[4];
		var hours = hour;

		if (hour <= 12 && ampm) {
			if (hour == 12) {
				hours = (time[4] == _lang.pm) ? 12 : 0;
			} else {
				hours = (hour + (time[4] == _lang.pm ? 12 : 0));
			}
		}

		var minutes = ( time[2]*1 || 0 );
		var seconds = ( time[3]*1 || 0 );
		var timeInt = hours*3600 + minutes*60 + seconds;

		// if no am/pm provided, intelligently guess based on the scrollDefault
		if (!ampm && settings && settings._twelveHourTime && settings.scrollDefault) {
			var delta = timeInt - settings.scrollDefault;
			if (delta < 0 && delta >= _ONE_DAY / -2) {
				timeInt = (timeInt + (_ONE_DAY / 2)) % _ONE_DAY;
			}
		}

		return timeInt
	}

	function _pad2(n) {
		return ("0" + n).slice(-2);
	}

	// Plugin entry
	$.fn.timepicker = function(method)
	{
		if (!this.length) return this;
		if (methods[method]) {
			// check if this element is a timepicker
			if (!this.hasClass('ui-timepicker-input')) {
				return this;
			}
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if(typeof method === "object" || !method) { return methods.init.apply(this, arguments); }
		else { $.error("Method "+ method + " does not exist on jQuery.timepicker"); }
	};
	// Global defaults
	$.fn.timepicker.defaults = {
		className: null,
		minTime: null,
		maxTime: null,
		durationTime: null,
		step: 30,
		showDuration: false,
		showOnFocus: true,
		timeFormat: 'g:ia',
		scrollDefault: null,
		selectOnBlur: false,
		disableTouchKeyboard: false,
		forceRoundTime: false,
		appendTo: 'body',
		orientation: 'ltr',
		disableTimeRanges: [],
		closeOnWindowScroll: false,
		typeaheadHighlight: true,
		noneOption: false
	};
}));

/*global angular */
/*
 Directive for jQuery UI timepicker (http://jonthornton.github.io/jquery-timepicker/)

 */
angular.module('ui.timepicker', [])

.value('uiTimepickerConfig', {
    'step' : 15
})

.directive('uiTimepicker', ['uiTimepickerConfig','$parse', function(uiTimepickerConfig, $parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        priority: 1,
        link: function(scope, element, attrs, ngModel) {
            'use strict';
            var config = angular.copy(uiTimepickerConfig);

            ngModel.$render = function () {
                var date = ngModel.$modelValue;
                if ( angular.isDefined(date) && date !== null && !angular.isDate(date) ) {
                    throw new Error('ng-Model value must be a Date object - currently it is a ' + typeof date + '.');
                }
                if (!element.is(':focus')) {
                    element.timepicker('setTime', date);
                }
            };

            scope.$watch(attrs.ngModel, function() {
                ngModel.$render();
            }, true);

            config.appendTo = element.parent();

            element.timepicker(
                angular.extend(
                    config, attrs.uiTimepicker ?
                    $parse(attrs.uiTimepicker)(scope):
                    {}
                )
            );

            if(element.is('input'))  {
                ngModel.$parsers.unshift(function(){
                    var date = element.timepicker('getTime', ngModel.$modelValue);
                    return date;
                });
            } else {
                element.on('changeTime', function() {
                    scope.$evalAsync(function() {
                        var date = element.timepicker('getTime', ngModel.$modelValue);
                        ngModel.$setViewValue(date);
                    });
                });
            }
        }
    };
}]);

/**
 * @license AngularJS v1.3.8
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {

'use strict';

/**
 * @ngdoc object
 * @name angular.mock
 * @description
 *
 * Namespace from 'angular-mocks.js' which contains testing related code.
 */
angular.mock = {};

/**
 * ! This is a private undocumented service !
 *
 * @name $browser
 *
 * @description
 * This service is a mock implementation of {@link ng.$browser}. It provides fake
 * implementation for commonly used browser apis that are hard to test, e.g. setTimeout, xhr,
 * cookies, etc...
 *
 * The api of this service is the same as that of the real {@link ng.$browser $browser}, except
 * that there are several helper methods available which can be used in tests.
 */
angular.mock.$BrowserProvider = function() {
  this.$get = function() {
    return new angular.mock.$Browser();
  };
};

angular.mock.$Browser = function() {
  var self = this;

  this.isMock = true;
  self.$$url = "http://server/";
  self.$$lastUrl = self.$$url; // used by url polling fn
  self.pollFns = [];

  // TODO(vojta): remove this temporary api
  self.$$completeOutstandingRequest = angular.noop;
  self.$$incOutstandingRequestCount = angular.noop;


  // register url polling fn

  self.onUrlChange = function(listener) {
    self.pollFns.push(
      function() {
        if (self.$$lastUrl !== self.$$url || self.$$state !== self.$$lastState) {
          self.$$lastUrl = self.$$url;
          self.$$lastState = self.$$state;
          listener(self.$$url, self.$$state);
        }
      }
    );

    return listener;
  };

  self.$$checkUrlChange = angular.noop;

  self.cookieHash = {};
  self.lastCookieHash = {};
  self.deferredFns = [];
  self.deferredNextId = 0;

  self.defer = function(fn, delay) {
    delay = delay || 0;
    self.deferredFns.push({time:(self.defer.now + delay), fn:fn, id: self.deferredNextId});
    self.deferredFns.sort(function(a, b) { return a.time - b.time;});
    return self.deferredNextId++;
  };


  /**
   * @name $browser#defer.now
   *
   * @description
   * Current milliseconds mock time.
   */
  self.defer.now = 0;


  self.defer.cancel = function(deferId) {
    var fnIndex;

    angular.forEach(self.deferredFns, function(fn, index) {
      if (fn.id === deferId) fnIndex = index;
    });

    if (fnIndex !== undefined) {
      self.deferredFns.splice(fnIndex, 1);
      return true;
    }

    return false;
  };


  /**
   * @name $browser#defer.flush
   *
   * @description
   * Flushes all pending requests and executes the defer callbacks.
   *
   * @param {number=} number of milliseconds to flush. See {@link #defer.now}
   */
  self.defer.flush = function(delay) {
    if (angular.isDefined(delay)) {
      self.defer.now += delay;
    } else {
      if (self.deferredFns.length) {
        self.defer.now = self.deferredFns[self.deferredFns.length - 1].time;
      } else {
        throw new Error('No deferred tasks to be flushed');
      }
    }

    while (self.deferredFns.length && self.deferredFns[0].time <= self.defer.now) {
      self.deferredFns.shift().fn();
    }
  };

  self.$$baseHref = '/';
  self.baseHref = function() {
    return this.$$baseHref;
  };
};
angular.mock.$Browser.prototype = {

/**
  * @name $browser#poll
  *
  * @description
  * run all fns in pollFns
  */
  poll: function poll() {
    angular.forEach(this.pollFns, function(pollFn) {
      pollFn();
    });
  },

  addPollFn: function(pollFn) {
    this.pollFns.push(pollFn);
    return pollFn;
  },

  url: function(url, replace, state) {
    if (angular.isUndefined(state)) {
      state = null;
    }
    if (url) {
      this.$$url = url;
      // Native pushState serializes & copies the object; simulate it.
      this.$$state = angular.copy(state);
      return this;
    }

    return this.$$url;
  },

  state: function() {
    return this.$$state;
  },

  cookies:  function(name, value) {
    if (name) {
      if (angular.isUndefined(value)) {
        delete this.cookieHash[name];
      } else {
        if (angular.isString(value) &&       //strings only
            value.length <= 4096) {          //strict cookie storage limits
          this.cookieHash[name] = value;
        }
      }
    } else {
      if (!angular.equals(this.cookieHash, this.lastCookieHash)) {
        this.lastCookieHash = angular.copy(this.cookieHash);
        this.cookieHash = angular.copy(this.cookieHash);
      }
      return this.cookieHash;
    }
  },

  notifyWhenNoOutstandingRequests: function(fn) {
    fn();
  }
};


/**
 * @ngdoc provider
 * @name $exceptionHandlerProvider
 *
 * @description
 * Configures the mock implementation of {@link ng.$exceptionHandler} to rethrow or to log errors
 * passed to the `$exceptionHandler`.
 */

/**
 * @ngdoc service
 * @name $exceptionHandler
 *
 * @description
 * Mock implementation of {@link ng.$exceptionHandler} that rethrows or logs errors passed
 * to it. See {@link ngMock.$exceptionHandlerProvider $exceptionHandlerProvider} for configuration
 * information.
 *
 *
 * ```js
 *   describe('$exceptionHandlerProvider', function() {
 *
 *     it('should capture log messages and exceptions', function() {
 *
 *       module(function($exceptionHandlerProvider) {
 *         $exceptionHandlerProvider.mode('log');
 *       });
 *
 *       inject(function($log, $exceptionHandler, $timeout) {
 *         $timeout(function() { $log.log(1); });
 *         $timeout(function() { $log.log(2); throw 'banana peel'; });
 *         $timeout(function() { $log.log(3); });
 *         expect($exceptionHandler.errors).toEqual([]);
 *         expect($log.assertEmpty());
 *         $timeout.flush();
 *         expect($exceptionHandler.errors).toEqual(['banana peel']);
 *         expect($log.log.logs).toEqual([[1], [2], [3]]);
 *       });
 *     });
 *   });
 * ```
 */

angular.mock.$ExceptionHandlerProvider = function() {
  var handler;

  /**
   * @ngdoc method
   * @name $exceptionHandlerProvider#mode
   *
   * @description
   * Sets the logging mode.
   *
   * @param {string} mode Mode of operation, defaults to `rethrow`.
   *
   *   - `rethrow`: If any errors are passed to the handler in tests, it typically means that there
   *                is a bug in the application or test, so this mock will make these tests fail.
   *   - `log`: Sometimes it is desirable to test that an error is thrown, for this case the `log`
   *            mode stores an array of errors in `$exceptionHandler.errors`, to allow later
   *            assertion of them. See {@link ngMock.$log#assertEmpty assertEmpty()} and
   *            {@link ngMock.$log#reset reset()}
   */
  this.mode = function(mode) {
    switch (mode) {
      case 'rethrow':
        handler = function(e) {
          throw e;
        };
        break;
      case 'log':
        var errors = [];

        handler = function(e) {
          if (arguments.length == 1) {
            errors.push(e);
          } else {
            errors.push([].slice.call(arguments, 0));
          }
        };

        handler.errors = errors;
        break;
      default:
        throw new Error("Unknown mode '" + mode + "', only 'log'/'rethrow' modes are allowed!");
    }
  };

  this.$get = function() {
    return handler;
  };

  this.mode('rethrow');
};


/**
 * @ngdoc service
 * @name $log
 *
 * @description
 * Mock implementation of {@link ng.$log} that gathers all logged messages in arrays
 * (one array per logging level). These arrays are exposed as `logs` property of each of the
 * level-specific log function, e.g. for level `error` the array is exposed as `$log.error.logs`.
 *
 */
angular.mock.$LogProvider = function() {
  var debug = true;

  function concat(array1, array2, index) {
    return array1.concat(Array.prototype.slice.call(array2, index));
  }

  this.debugEnabled = function(flag) {
    if (angular.isDefined(flag)) {
      debug = flag;
      return this;
    } else {
      return debug;
    }
  };

  this.$get = function() {
    var $log = {
      log: function() { $log.log.logs.push(concat([], arguments, 0)); },
      warn: function() { $log.warn.logs.push(concat([], arguments, 0)); },
      info: function() { $log.info.logs.push(concat([], arguments, 0)); },
      error: function() { $log.error.logs.push(concat([], arguments, 0)); },
      debug: function() {
        if (debug) {
          $log.debug.logs.push(concat([], arguments, 0));
        }
      }
    };

    /**
     * @ngdoc method
     * @name $log#reset
     *
     * @description
     * Reset all of the logging arrays to empty.
     */
    $log.reset = function() {
      /**
       * @ngdoc property
       * @name $log#log.logs
       *
       * @description
       * Array of messages logged using {@link ng.$log#log `log()`}.
       *
       * @example
       * ```js
       * $log.log('Some Log');
       * var first = $log.log.logs.unshift();
       * ```
       */
      $log.log.logs = [];
      /**
       * @ngdoc property
       * @name $log#info.logs
       *
       * @description
       * Array of messages logged using {@link ng.$log#info `info()`}.
       *
       * @example
       * ```js
       * $log.info('Some Info');
       * var first = $log.info.logs.unshift();
       * ```
       */
      $log.info.logs = [];
      /**
       * @ngdoc property
       * @name $log#warn.logs
       *
       * @description
       * Array of messages logged using {@link ng.$log#warn `warn()`}.
       *
       * @example
       * ```js
       * $log.warn('Some Warning');
       * var first = $log.warn.logs.unshift();
       * ```
       */
      $log.warn.logs = [];
      /**
       * @ngdoc property
       * @name $log#error.logs
       *
       * @description
       * Array of messages logged using {@link ng.$log#error `error()`}.
       *
       * @example
       * ```js
       * $log.error('Some Error');
       * var first = $log.error.logs.unshift();
       * ```
       */
      $log.error.logs = [];
        /**
       * @ngdoc property
       * @name $log#debug.logs
       *
       * @description
       * Array of messages logged using {@link ng.$log#debug `debug()`}.
       *
       * @example
       * ```js
       * $log.debug('Some Error');
       * var first = $log.debug.logs.unshift();
       * ```
       */
      $log.debug.logs = [];
    };

    /**
     * @ngdoc method
     * @name $log#assertEmpty
     *
     * @description
     * Assert that all of the logging methods have no logged messages. If any messages are present,
     * an exception is thrown.
     */
    $log.assertEmpty = function() {
      var errors = [];
      angular.forEach(['error', 'warn', 'info', 'log', 'debug'], function(logLevel) {
        angular.forEach($log[logLevel].logs, function(log) {
          angular.forEach(log, function(logItem) {
            errors.push('MOCK $log (' + logLevel + '): ' + String(logItem) + '\n' +
                        (logItem.stack || ''));
          });
        });
      });
      if (errors.length) {
        errors.unshift("Expected $log to be empty! Either a message was logged unexpectedly, or " +
          "an expected log message was not checked and removed:");
        errors.push('');
        throw new Error(errors.join('\n---------\n'));
      }
    };

    $log.reset();
    return $log;
  };
};


/**
 * @ngdoc service
 * @name $interval
 *
 * @description
 * Mock implementation of the $interval service.
 *
 * Use {@link ngMock.$interval#flush `$interval.flush(millis)`} to
 * move forward by `millis` milliseconds and trigger any functions scheduled to run in that
 * time.
 *
 * @param {function()} fn A function that should be called repeatedly.
 * @param {number} delay Number of milliseconds between each function call.
 * @param {number=} [count=0] Number of times to repeat. If not set, or 0, will repeat
 *   indefinitely.
 * @param {boolean=} [invokeApply=true] If set to `false` skips model dirty checking, otherwise
 *   will invoke `fn` within the {@link ng.$rootScope.Scope#$apply $apply} block.
 * @returns {promise} A promise which will be notified on each iteration.
 */
angular.mock.$IntervalProvider = function() {
  this.$get = ['$browser', '$rootScope', '$q', '$$q',
       function($browser,   $rootScope,   $q,   $$q) {
    var repeatFns = [],
        nextRepeatId = 0,
        now = 0;

    var $interval = function(fn, delay, count, invokeApply) {
      var iteration = 0,
          skipApply = (angular.isDefined(invokeApply) && !invokeApply),
          deferred = (skipApply ? $$q : $q).defer(),
          promise = deferred.promise;

      count = (angular.isDefined(count)) ? count : 0;
      promise.then(null, null, fn);

      promise.$$intervalId = nextRepeatId;

      function tick() {
        deferred.notify(iteration++);

        if (count > 0 && iteration >= count) {
          var fnIndex;
          deferred.resolve(iteration);

          angular.forEach(repeatFns, function(fn, index) {
            if (fn.id === promise.$$intervalId) fnIndex = index;
          });

          if (fnIndex !== undefined) {
            repeatFns.splice(fnIndex, 1);
          }
        }

        if (skipApply) {
          $browser.defer.flush();
        } else {
          $rootScope.$apply();
        }
      }

      repeatFns.push({
        nextTime:(now + delay),
        delay: delay,
        fn: tick,
        id: nextRepeatId,
        deferred: deferred
      });
      repeatFns.sort(function(a, b) { return a.nextTime - b.nextTime;});

      nextRepeatId++;
      return promise;
    };
    /**
     * @ngdoc method
     * @name $interval#cancel
     *
     * @description
     * Cancels a task associated with the `promise`.
     *
     * @param {promise} promise A promise from calling the `$interval` function.
     * @returns {boolean} Returns `true` if the task was successfully cancelled.
     */
    $interval.cancel = function(promise) {
      if (!promise) return false;
      var fnIndex;

      angular.forEach(repeatFns, function(fn, index) {
        if (fn.id === promise.$$intervalId) fnIndex = index;
      });

      if (fnIndex !== undefined) {
        repeatFns[fnIndex].deferred.reject('canceled');
        repeatFns.splice(fnIndex, 1);
        return true;
      }

      return false;
    };

    /**
     * @ngdoc method
     * @name $interval#flush
     * @description
     *
     * Runs interval tasks scheduled to be run in the next `millis` milliseconds.
     *
     * @param {number=} millis maximum timeout amount to flush up until.
     *
     * @return {number} The amount of time moved forward.
     */
    $interval.flush = function(millis) {
      now += millis;
      while (repeatFns.length && repeatFns[0].nextTime <= now) {
        var task = repeatFns[0];
        task.fn();
        task.nextTime += task.delay;
        repeatFns.sort(function(a, b) { return a.nextTime - b.nextTime;});
      }
      return millis;
    };

    return $interval;
  }];
};


/* jshint -W101 */
/* The R_ISO8061_STR regex is never going to fit into the 100 char limit!
 * This directive should go inside the anonymous function but a bug in JSHint means that it would
 * not be enacted early enough to prevent the warning.
 */
var R_ISO8061_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?:\:?(\d\d)(?:\:?(\d\d)(?:\.(\d{3}))?)?)?(Z|([+-])(\d\d):?(\d\d)))?$/;

function jsonStringToDate(string) {
  var match;
  if (match = string.match(R_ISO8061_STR)) {
    var date = new Date(0),
        tzHour = 0,
        tzMin  = 0;
    if (match[9]) {
      tzHour = int(match[9] + match[10]);
      tzMin = int(match[9] + match[11]);
    }
    date.setUTCFullYear(int(match[1]), int(match[2]) - 1, int(match[3]));
    date.setUTCHours(int(match[4] || 0) - tzHour,
                     int(match[5] || 0) - tzMin,
                     int(match[6] || 0),
                     int(match[7] || 0));
    return date;
  }
  return string;
}

function int(str) {
  return parseInt(str, 10);
}

function padNumber(num, digits, trim) {
  var neg = '';
  if (num < 0) {
    neg =  '-';
    num = -num;
  }
  num = '' + num;
  while (num.length < digits) num = '0' + num;
  if (trim)
    num = num.substr(num.length - digits);
  return neg + num;
}


/**
 * @ngdoc type
 * @name angular.mock.TzDate
 * @description
 *
 * *NOTE*: this is not an injectable instance, just a globally available mock class of `Date`.
 *
 * Mock of the Date type which has its timezone specified via constructor arg.
 *
 * The main purpose is to create Date-like instances with timezone fixed to the specified timezone
 * offset, so that we can test code that depends on local timezone settings without dependency on
 * the time zone settings of the machine where the code is running.
 *
 * @param {number} offset Offset of the *desired* timezone in hours (fractions will be honored)
 * @param {(number|string)} timestamp Timestamp representing the desired time in *UTC*
 *
 * @example
 * !!!! WARNING !!!!!
 * This is not a complete Date object so only methods that were implemented can be called safely.
 * To make matters worse, TzDate instances inherit stuff from Date via a prototype.
 *
 * We do our best to intercept calls to "unimplemented" methods, but since the list of methods is
 * incomplete we might be missing some non-standard methods. This can result in errors like:
 * "Date.prototype.foo called on incompatible Object".
 *
 * ```js
 * var newYearInBratislava = new TzDate(-1, '2009-12-31T23:00:00Z');
 * newYearInBratislava.getTimezoneOffset() => -60;
 * newYearInBratislava.getFullYear() => 2010;
 * newYearInBratislava.getMonth() => 0;
 * newYearInBratislava.getDate() => 1;
 * newYearInBratislava.getHours() => 0;
 * newYearInBratislava.getMinutes() => 0;
 * newYearInBratislava.getSeconds() => 0;
 * ```
 *
 */
angular.mock.TzDate = function(offset, timestamp) {
  var self = new Date(0);
  if (angular.isString(timestamp)) {
    var tsStr = timestamp;

    self.origDate = jsonStringToDate(timestamp);

    timestamp = self.origDate.getTime();
    if (isNaN(timestamp))
      throw {
        name: "Illegal Argument",
        message: "Arg '" + tsStr + "' passed into TzDate constructor is not a valid date string"
      };
  } else {
    self.origDate = new Date(timestamp);
  }

  var localOffset = new Date(timestamp).getTimezoneOffset();
  self.offsetDiff = localOffset * 60 * 1000 - offset * 1000 * 60 * 60;
  self.date = new Date(timestamp + self.offsetDiff);

  self.getTime = function() {
    return self.date.getTime() - self.offsetDiff;
  };

  self.toLocaleDateString = function() {
    return self.date.toLocaleDateString();
  };

  self.getFullYear = function() {
    return self.date.getFullYear();
  };

  self.getMonth = function() {
    return self.date.getMonth();
  };

  self.getDate = function() {
    return self.date.getDate();
  };

  self.getHours = function() {
    return self.date.getHours();
  };

  self.getMinutes = function() {
    return self.date.getMinutes();
  };

  self.getSeconds = function() {
    return self.date.getSeconds();
  };

  self.getMilliseconds = function() {
    return self.date.getMilliseconds();
  };

  self.getTimezoneOffset = function() {
    return offset * 60;
  };

  self.getUTCFullYear = function() {
    return self.origDate.getUTCFullYear();
  };

  self.getUTCMonth = function() {
    return self.origDate.getUTCMonth();
  };

  self.getUTCDate = function() {
    return self.origDate.getUTCDate();
  };

  self.getUTCHours = function() {
    return self.origDate.getUTCHours();
  };

  self.getUTCMinutes = function() {
    return self.origDate.getUTCMinutes();
  };

  self.getUTCSeconds = function() {
    return self.origDate.getUTCSeconds();
  };

  self.getUTCMilliseconds = function() {
    return self.origDate.getUTCMilliseconds();
  };

  self.getDay = function() {
    return self.date.getDay();
  };

  // provide this method only on browsers that already have it
  if (self.toISOString) {
    self.toISOString = function() {
      return padNumber(self.origDate.getUTCFullYear(), 4) + '-' +
            padNumber(self.origDate.getUTCMonth() + 1, 2) + '-' +
            padNumber(self.origDate.getUTCDate(), 2) + 'T' +
            padNumber(self.origDate.getUTCHours(), 2) + ':' +
            padNumber(self.origDate.getUTCMinutes(), 2) + ':' +
            padNumber(self.origDate.getUTCSeconds(), 2) + '.' +
            padNumber(self.origDate.getUTCMilliseconds(), 3) + 'Z';
    };
  }

  //hide all methods not implemented in this mock that the Date prototype exposes
  var unimplementedMethods = ['getUTCDay',
      'getYear', 'setDate', 'setFullYear', 'setHours', 'setMilliseconds',
      'setMinutes', 'setMonth', 'setSeconds', 'setTime', 'setUTCDate', 'setUTCFullYear',
      'setUTCHours', 'setUTCMilliseconds', 'setUTCMinutes', 'setUTCMonth', 'setUTCSeconds',
      'setYear', 'toDateString', 'toGMTString', 'toJSON', 'toLocaleFormat', 'toLocaleString',
      'toLocaleTimeString', 'toSource', 'toString', 'toTimeString', 'toUTCString', 'valueOf'];

  angular.forEach(unimplementedMethods, function(methodName) {
    self[methodName] = function() {
      throw new Error("Method '" + methodName + "' is not implemented in the TzDate mock");
    };
  });

  return self;
};

//make "tzDateInstance instanceof Date" return true
angular.mock.TzDate.prototype = Date.prototype;
/* jshint +W101 */

angular.mock.animate = angular.module('ngAnimateMock', ['ng'])

  .config(['$provide', function($provide) {

    var reflowQueue = [];
    $provide.value('$$animateReflow', function(fn) {
      var index = reflowQueue.length;
      reflowQueue.push(fn);
      return function cancel() {
        reflowQueue.splice(index, 1);
      };
    });

    $provide.decorator('$animate', ['$delegate', '$$asyncCallback', '$timeout', '$browser',
                            function($delegate,   $$asyncCallback,   $timeout,   $browser) {
      var animate = {
        queue: [],
        cancel: $delegate.cancel,
        enabled: $delegate.enabled,
        triggerCallbackEvents: function() {
          $$asyncCallback.flush();
        },
        triggerCallbackPromise: function() {
          $timeout.flush(0);
        },
        triggerCallbacks: function() {
          this.triggerCallbackEvents();
          this.triggerCallbackPromise();
        },
        triggerReflow: function() {
          angular.forEach(reflowQueue, function(fn) {
            fn();
          });
          reflowQueue = [];
        }
      };

      angular.forEach(
        ['animate','enter','leave','move','addClass','removeClass','setClass'], function(method) {
        animate[method] = function() {
          animate.queue.push({
            event: method,
            element: arguments[0],
            options: arguments[arguments.length - 1],
            args: arguments
          });
          return $delegate[method].apply($delegate, arguments);
        };
      });

      return animate;
    }]);

  }]);


/**
 * @ngdoc function
 * @name angular.mock.dump
 * @description
 *
 * *NOTE*: this is not an injectable instance, just a globally available function.
 *
 * Method for serializing common angular objects (scope, elements, etc..) into strings, useful for
 * debugging.
 *
 * This method is also available on window, where it can be used to display objects on debug
 * console.
 *
 * @param {*} object - any object to turn into string.
 * @return {string} a serialized string of the argument
 */
angular.mock.dump = function(object) {
  return serialize(object);

  function serialize(object) {
    var out;

    if (angular.isElement(object)) {
      object = angular.element(object);
      out = angular.element('<div></div>');
      angular.forEach(object, function(element) {
        out.append(angular.element(element).clone());
      });
      out = out.html();
    } else if (angular.isArray(object)) {
      out = [];
      angular.forEach(object, function(o) {
        out.push(serialize(o));
      });
      out = '[ ' + out.join(', ') + ' ]';
    } else if (angular.isObject(object)) {
      if (angular.isFunction(object.$eval) && angular.isFunction(object.$apply)) {
        out = serializeScope(object);
      } else if (object instanceof Error) {
        out = object.stack || ('' + object.name + ': ' + object.message);
      } else {
        // TODO(i): this prevents methods being logged,
        // we should have a better way to serialize objects
        out = angular.toJson(object, true);
      }
    } else {
      out = String(object);
    }

    return out;
  }

  function serializeScope(scope, offset) {
    offset = offset ||  '  ';
    var log = [offset + 'Scope(' + scope.$id + '): {'];
    for (var key in scope) {
      if (Object.prototype.hasOwnProperty.call(scope, key) && !key.match(/^(\$|this)/)) {
        log.push('  ' + key + ': ' + angular.toJson(scope[key]));
      }
    }
    var child = scope.$$childHead;
    while (child) {
      log.push(serializeScope(child, offset + '  '));
      child = child.$$nextSibling;
    }
    log.push('}');
    return log.join('\n' + offset);
  }
};

/**
 * @ngdoc service
 * @name $httpBackend
 * @description
 * Fake HTTP backend implementation suitable for unit testing applications that use the
 * {@link ng.$http $http service}.
 *
 * *Note*: For fake HTTP backend implementation suitable for end-to-end testing or backend-less
 * development please see {@link ngMockE2E.$httpBackend e2e $httpBackend mock}.
 *
 * During unit testing, we want our unit tests to run quickly and have no external dependencies so
 * we don’t want to send [XHR](https://developer.mozilla.org/en/xmlhttprequest) or
 * [JSONP](http://en.wikipedia.org/wiki/JSONP) requests to a real server. All we really need is
 * to verify whether a certain request has been sent or not, or alternatively just let the
 * application make requests, respond with pre-trained responses and assert that the end result is
 * what we expect it to be.
 *
 * This mock implementation can be used to respond with static or dynamic responses via the
 * `expect` and `when` apis and their shortcuts (`expectGET`, `whenPOST`, etc).
 *
 * When an Angular application needs some data from a server, it calls the $http service, which
 * sends the request to a real server using $httpBackend service. With dependency injection, it is
 * easy to inject $httpBackend mock (which has the same API as $httpBackend) and use it to verify
 * the requests and respond with some testing data without sending a request to a real server.
 *
 * There are two ways to specify what test data should be returned as http responses by the mock
 * backend when the code under test makes http requests:
 *
 * - `$httpBackend.expect` - specifies a request expectation
 * - `$httpBackend.when` - specifies a backend definition
 *
 *
 * # Request Expectations vs Backend Definitions
 *
 * Request expectations provide a way to make assertions about requests made by the application and
 * to define responses for those requests. The test will fail if the expected requests are not made
 * or they are made in the wrong order.
 *
 * Backend definitions allow you to define a fake backend for your application which doesn't assert
 * if a particular request was made or not, it just returns a trained response if a request is made.
 * The test will pass whether or not the request gets made during testing.
 *
 *
 * <table class="table">
 *   <tr><th width="220px"></th><th>Request expectations</th><th>Backend definitions</th></tr>
 *   <tr>
 *     <th>Syntax</th>
 *     <td>.expect(...).respond(...)</td>
 *     <td>.when(...).respond(...)</td>
 *   </tr>
 *   <tr>
 *     <th>Typical usage</th>
 *     <td>strict unit tests</td>
 *     <td>loose (black-box) unit testing</td>
 *   </tr>
 *   <tr>
 *     <th>Fulfills multiple requests</th>
 *     <td>NO</td>
 *     <td>YES</td>
 *   </tr>
 *   <tr>
 *     <th>Order of requests matters</th>
 *     <td>YES</td>
 *     <td>NO</td>
 *   </tr>
 *   <tr>
 *     <th>Request required</th>
 *     <td>YES</td>
 *     <td>NO</td>
 *   </tr>
 *   <tr>
 *     <th>Response required</th>
 *     <td>optional (see below)</td>
 *     <td>YES</td>
 *   </tr>
 * </table>
 *
 * In cases where both backend definitions and request expectations are specified during unit
 * testing, the request expectations are evaluated first.
 *
 * If a request expectation has no response specified, the algorithm will search your backend
 * definitions for an appropriate response.
 *
 * If a request didn't match any expectation or if the expectation doesn't have the response
 * defined, the backend definitions are evaluated in sequential order to see if any of them match
 * the request. The response from the first matched definition is returned.
 *
 *
 * # Flushing HTTP requests
 *
 * The $httpBackend used in production always responds to requests asynchronously. If we preserved
 * this behavior in unit testing, we'd have to create async unit tests, which are hard to write,
 * to follow and to maintain. But neither can the testing mock respond synchronously; that would
 * change the execution of the code under test. For this reason, the mock $httpBackend has a
 * `flush()` method, which allows the test to explicitly flush pending requests. This preserves
 * the async api of the backend, while allowing the test to execute synchronously.
 *
 *
 * # Unit testing with mock $httpBackend
 * The following code shows how to setup and use the mock backend when unit testing a controller.
 * First we create the controller under test:
 *
  ```js
  // The module code
  angular
    .module('MyApp', [])
    .controller('MyController', MyController);

  // The controller code
  function MyController($scope, $http) {
    var authToken;

    $http.get('/auth.py').success(function(data, status, headers) {
      authToken = headers('A-Token');
      $scope.user = data;
    });

    $scope.saveMessage = function(message) {
      var headers = { 'Authorization': authToken };
      $scope.status = 'Saving...';

      $http.post('/add-msg.py', message, { headers: headers } ).success(function(response) {
        $scope.status = '';
      }).error(function() {
        $scope.status = 'ERROR!';
      });
    };
  }
  ```
 *
 * Now we setup the mock backend and create the test specs:
 *
  ```js
    // testing controller
    describe('MyController', function() {
       var $httpBackend, $rootScope, createController, authRequestHandler;

       // Set up the module
       beforeEach(module('MyApp'));

       beforeEach(inject(function($injector) {
         // Set up the mock http service responses
         $httpBackend = $injector.get('$httpBackend');
         // backend definition common for all tests
         authRequestHandler = $httpBackend.when('GET', '/auth.py')
                                .respond({userId: 'userX'}, {'A-Token': 'xxx'});

         // Get hold of a scope (i.e. the root scope)
         $rootScope = $injector.get('$rootScope');
         // The $controller service is used to create instances of controllers
         var $controller = $injector.get('$controller');

         createController = function() {
           return $controller('MyController', {'$scope' : $rootScope });
         };
       }));


       afterEach(function() {
         $httpBackend.verifyNoOutstandingExpectation();
         $httpBackend.verifyNoOutstandingRequest();
       });


       it('should fetch authentication token', function() {
         $httpBackend.expectGET('/auth.py');
         var controller = createController();
         $httpBackend.flush();
       });


       it('should fail authentication', function() {

         // Notice how you can change the response even after it was set
         authRequestHandler.respond(401, '');

         $httpBackend.expectGET('/auth.py');
         var controller = createController();
         $httpBackend.flush();
         expect($rootScope.status).toBe('Failed...');
       });


       it('should send msg to server', function() {
         var controller = createController();
         $httpBackend.flush();

         // now you don’t care about the authentication, but
         // the controller will still send the request and
         // $httpBackend will respond without you having to
         // specify the expectation and response for this request

         $httpBackend.expectPOST('/add-msg.py', 'message content').respond(201, '');
         $rootScope.saveMessage('message content');
         expect($rootScope.status).toBe('Saving...');
         $httpBackend.flush();
         expect($rootScope.status).toBe('');
       });


       it('should send auth header', function() {
         var controller = createController();
         $httpBackend.flush();

         $httpBackend.expectPOST('/add-msg.py', undefined, function(headers) {
           // check if the header was send, if it wasn't the expectation won't
           // match the request and the test will fail
           return headers['Authorization'] == 'xxx';
         }).respond(201, '');

         $rootScope.saveMessage('whatever');
         $httpBackend.flush();
       });
    });
   ```
 */
angular.mock.$HttpBackendProvider = function() {
  this.$get = ['$rootScope', '$timeout', createHttpBackendMock];
};

/**
 * General factory function for $httpBackend mock.
 * Returns instance for unit testing (when no arguments specified):
 *   - passing through is disabled
 *   - auto flushing is disabled
 *
 * Returns instance for e2e testing (when `$delegate` and `$browser` specified):
 *   - passing through (delegating request to real backend) is enabled
 *   - auto flushing is enabled
 *
 * @param {Object=} $delegate Real $httpBackend instance (allow passing through if specified)
 * @param {Object=} $browser Auto-flushing enabled if specified
 * @return {Object} Instance of $httpBackend mock
 */
function createHttpBackendMock($rootScope, $timeout, $delegate, $browser) {
  var definitions = [],
      expectations = [],
      responses = [],
      responsesPush = angular.bind(responses, responses.push),
      copy = angular.copy;

  function createResponse(status, data, headers, statusText) {
    if (angular.isFunction(status)) return status;

    return function() {
      return angular.isNumber(status)
          ? [status, data, headers, statusText]
          : [200, status, data, headers];
    };
  }

  // TODO(vojta): change params to: method, url, data, headers, callback
  function $httpBackend(method, url, data, callback, headers, timeout, withCredentials) {
    var xhr = new MockXhr(),
        expectation = expectations[0],
        wasExpected = false;

    function prettyPrint(data) {
      return (angular.isString(data) || angular.isFunction(data) || data instanceof RegExp)
          ? data
          : angular.toJson(data);
    }

    function wrapResponse(wrapped) {
      if (!$browser && timeout) {
        timeout.then ? timeout.then(handleTimeout) : $timeout(handleTimeout, timeout);
      }

      return handleResponse;

      function handleResponse() {
        var response = wrapped.response(method, url, data, headers);
        xhr.$$respHeaders = response[2];
        callback(copy(response[0]), copy(response[1]), xhr.getAllResponseHeaders(),
                 copy(response[3] || ''));
      }

      function handleTimeout() {
        for (var i = 0, ii = responses.length; i < ii; i++) {
          if (responses[i] === handleResponse) {
            responses.splice(i, 1);
            callback(-1, undefined, '');
            break;
          }
        }
      }
    }

    if (expectation && expectation.match(method, url)) {
      if (!expectation.matchData(data))
        throw new Error('Expected ' + expectation + ' with different data\n' +
            'EXPECTED: ' + prettyPrint(expectation.data) + '\nGOT:      ' + data);

      if (!expectation.matchHeaders(headers))
        throw new Error('Expected ' + expectation + ' with different headers\n' +
                        'EXPECTED: ' + prettyPrint(expectation.headers) + '\nGOT:      ' +
                        prettyPrint(headers));

      expectations.shift();

      if (expectation.response) {
        responses.push(wrapResponse(expectation));
        return;
      }
      wasExpected = true;
    }

    var i = -1, definition;
    while ((definition = definitions[++i])) {
      if (definition.match(method, url, data, headers || {})) {
        if (definition.response) {
          // if $browser specified, we do auto flush all requests
          ($browser ? $browser.defer : responsesPush)(wrapResponse(definition));
        } else if (definition.passThrough) {
          $delegate(method, url, data, callback, headers, timeout, withCredentials);
        } else throw new Error('No response defined !');
        return;
      }
    }
    throw wasExpected ?
        new Error('No response defined !') :
        new Error('Unexpected request: ' + method + ' ' + url + '\n' +
                  (expectation ? 'Expected ' + expectation : 'No more request expected'));
  }

  /**
   * @ngdoc method
   * @name $httpBackend#when
   * @description
   * Creates a new backend definition.
   *
   * @param {string} method HTTP method.
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {(string|RegExp|function(string))=} data HTTP request body or function that receives
   *   data string and returns true if the data is as expected.
   * @param {(Object|function(Object))=} headers HTTP headers or function that receives http header
   *   object and returns true if the headers match the current definition.
   * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
   *   request is handled. You can save this object for later use and invoke `respond` again in
   *   order to change how a matched request is handled.
   *
   *  - respond –
   *      `{function([status,] data[, headers, statusText])
   *      | function(function(method, url, data, headers)}`
   *    – The respond method takes a set of static data to be returned or a function that can
   *    return an array containing response status (number), response data (string), response
   *    headers (Object), and the text for the status (string). The respond method returns the
   *    `requestHandler` object for possible overrides.
   */
  $httpBackend.when = function(method, url, data, headers) {
    var definition = new MockHttpExpectation(method, url, data, headers),
        chain = {
          respond: function(status, data, headers, statusText) {
            definition.passThrough = undefined;
            definition.response = createResponse(status, data, headers, statusText);
            return chain;
          }
        };

    if ($browser) {
      chain.passThrough = function() {
        definition.response = undefined;
        definition.passThrough = true;
        return chain;
      };
    }

    definitions.push(definition);
    return chain;
  };

  /**
   * @ngdoc method
   * @name $httpBackend#whenGET
   * @description
   * Creates a new backend definition for GET requests. For more info see `when()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {(Object|function(Object))=} headers HTTP headers.
   * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
   * request is handled. You can save this object for later use and invoke `respond` again in
   * order to change how a matched request is handled.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#whenHEAD
   * @description
   * Creates a new backend definition for HEAD requests. For more info see `when()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {(Object|function(Object))=} headers HTTP headers.
   * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
   * request is handled. You can save this object for later use and invoke `respond` again in
   * order to change how a matched request is handled.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#whenDELETE
   * @description
   * Creates a new backend definition for DELETE requests. For more info see `when()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {(Object|function(Object))=} headers HTTP headers.
   * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
   * request is handled. You can save this object for later use and invoke `respond` again in
   * order to change how a matched request is handled.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#whenPOST
   * @description
   * Creates a new backend definition for POST requests. For more info see `when()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {(string|RegExp|function(string))=} data HTTP request body or function that receives
   *   data string and returns true if the data is as expected.
   * @param {(Object|function(Object))=} headers HTTP headers.
   * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
   * request is handled. You can save this object for later use and invoke `respond` again in
   * order to change how a matched request is handled.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#whenPUT
   * @description
   * Creates a new backend definition for PUT requests.  For more info see `when()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {(string|RegExp|function(string))=} data HTTP request body or function that receives
   *   data string and returns true if the data is as expected.
   * @param {(Object|function(Object))=} headers HTTP headers.
   * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
   * request is handled. You can save this object for later use and invoke `respond` again in
   * order to change how a matched request is handled.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#whenJSONP
   * @description
   * Creates a new backend definition for JSONP requests. For more info see `when()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
   * request is handled. You can save this object for later use and invoke `respond` again in
   * order to change how a matched request is handled.
   */
  createShortMethods('when');


  /**
   * @ngdoc method
   * @name $httpBackend#expect
   * @description
   * Creates a new request expectation.
   *
   * @param {string} method HTTP method.
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {(string|RegExp|function(string)|Object)=} data HTTP request body or function that
   *  receives data string and returns true if the data is as expected, or Object if request body
   *  is in JSON format.
   * @param {(Object|function(Object))=} headers HTTP headers or function that receives http header
   *   object and returns true if the headers match the current expectation.
   * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
   *  request is handled. You can save this object for later use and invoke `respond` again in
   *  order to change how a matched request is handled.
   *
   *  - respond –
   *    `{function([status,] data[, headers, statusText])
   *    | function(function(method, url, data, headers)}`
   *    – The respond method takes a set of static data to be returned or a function that can
   *    return an array containing response status (number), response data (string), response
   *    headers (Object), and the text for the status (string). The respond method returns the
   *    `requestHandler` object for possible overrides.
   */
  $httpBackend.expect = function(method, url, data, headers) {
    var expectation = new MockHttpExpectation(method, url, data, headers),
        chain = {
          respond: function(status, data, headers, statusText) {
            expectation.response = createResponse(status, data, headers, statusText);
            return chain;
          }
        };

    expectations.push(expectation);
    return chain;
  };


  /**
   * @ngdoc method
   * @name $httpBackend#expectGET
   * @description
   * Creates a new request expectation for GET requests. For more info see `expect()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {Object=} headers HTTP headers.
   * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
   * request is handled. You can save this object for later use and invoke `respond` again in
   * order to change how a matched request is handled. See #expect for more info.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#expectHEAD
   * @description
   * Creates a new request expectation for HEAD requests. For more info see `expect()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {Object=} headers HTTP headers.
   * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
   *   request is handled. You can save this object for later use and invoke `respond` again in
   *   order to change how a matched request is handled.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#expectDELETE
   * @description
   * Creates a new request expectation for DELETE requests. For more info see `expect()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {Object=} headers HTTP headers.
   * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
   *   request is handled. You can save this object for later use and invoke `respond` again in
   *   order to change how a matched request is handled.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#expectPOST
   * @description
   * Creates a new request expectation for POST requests. For more info see `expect()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {(string|RegExp|function(string)|Object)=} data HTTP request body or function that
   *  receives data string and returns true if the data is as expected, or Object if request body
   *  is in JSON format.
   * @param {Object=} headers HTTP headers.
   * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
   *   request is handled. You can save this object for later use and invoke `respond` again in
   *   order to change how a matched request is handled.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#expectPUT
   * @description
   * Creates a new request expectation for PUT requests. For more info see `expect()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {(string|RegExp|function(string)|Object)=} data HTTP request body or function that
   *  receives data string and returns true if the data is as expected, or Object if request body
   *  is in JSON format.
   * @param {Object=} headers HTTP headers.
   * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
   *   request is handled. You can save this object for later use and invoke `respond` again in
   *   order to change how a matched request is handled.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#expectPATCH
   * @description
   * Creates a new request expectation for PATCH requests. For more info see `expect()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {(string|RegExp|function(string)|Object)=} data HTTP request body or function that
   *  receives data string and returns true if the data is as expected, or Object if request body
   *  is in JSON format.
   * @param {Object=} headers HTTP headers.
   * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
   *   request is handled. You can save this object for later use and invoke `respond` again in
   *   order to change how a matched request is handled.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#expectJSONP
   * @description
   * Creates a new request expectation for JSONP requests. For more info see `expect()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
   *   request is handled. You can save this object for later use and invoke `respond` again in
   *   order to change how a matched request is handled.
   */
  createShortMethods('expect');


  /**
   * @ngdoc method
   * @name $httpBackend#flush
   * @description
   * Flushes all pending requests using the trained responses.
   *
   * @param {number=} count Number of responses to flush (in the order they arrived). If undefined,
   *   all pending requests will be flushed. If there are no pending requests when the flush method
   *   is called an exception is thrown (as this typically a sign of programming error).
   */
  $httpBackend.flush = function(count, digest) {
    if (digest !== false) $rootScope.$digest();
    if (!responses.length) throw new Error('No pending request to flush !');

    if (angular.isDefined(count) && count !== null) {
      while (count--) {
        if (!responses.length) throw new Error('No more pending request to flush !');
        responses.shift()();
      }
    } else {
      while (responses.length) {
        responses.shift()();
      }
    }
    $httpBackend.verifyNoOutstandingExpectation(digest);
  };


  /**
   * @ngdoc method
   * @name $httpBackend#verifyNoOutstandingExpectation
   * @description
   * Verifies that all of the requests defined via the `expect` api were made. If any of the
   * requests were not made, verifyNoOutstandingExpectation throws an exception.
   *
   * Typically, you would call this method following each test case that asserts requests using an
   * "afterEach" clause.
   *
   * ```js
   *   afterEach($httpBackend.verifyNoOutstandingExpectation);
   * ```
   */
  $httpBackend.verifyNoOutstandingExpectation = function(digest) {
    if (digest !== false) $rootScope.$digest();
    if (expectations.length) {
      throw new Error('Unsatisfied requests: ' + expectations.join(', '));
    }
  };


  /**
   * @ngdoc method
   * @name $httpBackend#verifyNoOutstandingRequest
   * @description
   * Verifies that there are no outstanding requests that need to be flushed.
   *
   * Typically, you would call this method following each test case that asserts requests using an
   * "afterEach" clause.
   *
   * ```js
   *   afterEach($httpBackend.verifyNoOutstandingRequest);
   * ```
   */
  $httpBackend.verifyNoOutstandingRequest = function() {
    if (responses.length) {
      throw new Error('Unflushed requests: ' + responses.length);
    }
  };


  /**
   * @ngdoc method
   * @name $httpBackend#resetExpectations
   * @description
   * Resets all request expectations, but preserves all backend definitions. Typically, you would
   * call resetExpectations during a multiple-phase test when you want to reuse the same instance of
   * $httpBackend mock.
   */
  $httpBackend.resetExpectations = function() {
    expectations.length = 0;
    responses.length = 0;
  };

  return $httpBackend;


  function createShortMethods(prefix) {
    angular.forEach(['GET', 'DELETE', 'JSONP', 'HEAD'], function(method) {
     $httpBackend[prefix + method] = function(url, headers) {
       return $httpBackend[prefix](method, url, undefined, headers);
     };
    });

    angular.forEach(['PUT', 'POST', 'PATCH'], function(method) {
      $httpBackend[prefix + method] = function(url, data, headers) {
        return $httpBackend[prefix](method, url, data, headers);
      };
    });
  }
}

function MockHttpExpectation(method, url, data, headers) {

  this.data = data;
  this.headers = headers;

  this.match = function(m, u, d, h) {
    if (method != m) return false;
    if (!this.matchUrl(u)) return false;
    if (angular.isDefined(d) && !this.matchData(d)) return false;
    if (angular.isDefined(h) && !this.matchHeaders(h)) return false;
    return true;
  };

  this.matchUrl = function(u) {
    if (!url) return true;
    if (angular.isFunction(url.test)) return url.test(u);
    if (angular.isFunction(url)) return url(u);
    return url == u;
  };

  this.matchHeaders = function(h) {
    if (angular.isUndefined(headers)) return true;
    if (angular.isFunction(headers)) return headers(h);
    return angular.equals(headers, h);
  };

  this.matchData = function(d) {
    if (angular.isUndefined(data)) return true;
    if (data && angular.isFunction(data.test)) return data.test(d);
    if (data && angular.isFunction(data)) return data(d);
    if (data && !angular.isString(data)) {
      return angular.equals(angular.fromJson(angular.toJson(data)), angular.fromJson(d));
    }
    return data == d;
  };

  this.toString = function() {
    return method + ' ' + url;
  };
}

function createMockXhr() {
  return new MockXhr();
}

function MockXhr() {

  // hack for testing $http, $httpBackend
  MockXhr.$$lastInstance = this;

  this.open = function(method, url, async) {
    this.$$method = method;
    this.$$url = url;
    this.$$async = async;
    this.$$reqHeaders = {};
    this.$$respHeaders = {};
  };

  this.send = function(data) {
    this.$$data = data;
  };

  this.setRequestHeader = function(key, value) {
    this.$$reqHeaders[key] = value;
  };

  this.getResponseHeader = function(name) {
    // the lookup must be case insensitive,
    // that's why we try two quick lookups first and full scan last
    var header = this.$$respHeaders[name];
    if (header) return header;

    name = angular.lowercase(name);
    header = this.$$respHeaders[name];
    if (header) return header;

    header = undefined;
    angular.forEach(this.$$respHeaders, function(headerVal, headerName) {
      if (!header && angular.lowercase(headerName) == name) header = headerVal;
    });
    return header;
  };

  this.getAllResponseHeaders = function() {
    var lines = [];

    angular.forEach(this.$$respHeaders, function(value, key) {
      lines.push(key + ': ' + value);
    });
    return lines.join('\n');
  };

  this.abort = angular.noop;
}


/**
 * @ngdoc service
 * @name $timeout
 * @description
 *
 * This service is just a simple decorator for {@link ng.$timeout $timeout} service
 * that adds a "flush" and "verifyNoPendingTasks" methods.
 */

angular.mock.$TimeoutDecorator = ['$delegate', '$browser', function($delegate, $browser) {

  /**
   * @ngdoc method
   * @name $timeout#flush
   * @description
   *
   * Flushes the queue of pending tasks.
   *
   * @param {number=} delay maximum timeout amount to flush up until
   */
  $delegate.flush = function(delay) {
    $browser.defer.flush(delay);
  };

  /**
   * @ngdoc method
   * @name $timeout#verifyNoPendingTasks
   * @description
   *
   * Verifies that there are no pending tasks that need to be flushed.
   */
  $delegate.verifyNoPendingTasks = function() {
    if ($browser.deferredFns.length) {
      throw new Error('Deferred tasks to flush (' + $browser.deferredFns.length + '): ' +
          formatPendingTasksAsString($browser.deferredFns));
    }
  };

  function formatPendingTasksAsString(tasks) {
    var result = [];
    angular.forEach(tasks, function(task) {
      result.push('{id: ' + task.id + ', ' + 'time: ' + task.time + '}');
    });

    return result.join(', ');
  }

  return $delegate;
}];

angular.mock.$RAFDecorator = ['$delegate', function($delegate) {
  var queue = [];
  var rafFn = function(fn) {
    var index = queue.length;
    queue.push(fn);
    return function() {
      queue.splice(index, 1);
    };
  };

  rafFn.supported = $delegate.supported;

  rafFn.flush = function() {
    if (queue.length === 0) {
      throw new Error('No rAF callbacks present');
    }

    var length = queue.length;
    for (var i = 0; i < length; i++) {
      queue[i]();
    }

    queue = [];
  };

  return rafFn;
}];

angular.mock.$AsyncCallbackDecorator = ['$delegate', function($delegate) {
  var callbacks = [];
  var addFn = function(fn) {
    callbacks.push(fn);
  };
  addFn.flush = function() {
    angular.forEach(callbacks, function(fn) {
      fn();
    });
    callbacks = [];
  };
  return addFn;
}];

/**
 *
 */
angular.mock.$RootElementProvider = function() {
  this.$get = function() {
    return angular.element('<div ng-app></div>');
  };
};

/**
 * @ngdoc module
 * @name ngMock
 * @packageName angular-mocks
 * @description
 *
 * # ngMock
 *
 * The `ngMock` module provides support to inject and mock Angular services into unit tests.
 * In addition, ngMock also extends various core ng services such that they can be
 * inspected and controlled in a synchronous manner within test code.
 *
 *
 * <div doc-module-components="ngMock"></div>
 *
 */
angular.module('ngMock', ['ng']).provider({
  $browser: angular.mock.$BrowserProvider,
  $exceptionHandler: angular.mock.$ExceptionHandlerProvider,
  $log: angular.mock.$LogProvider,
  $interval: angular.mock.$IntervalProvider,
  $httpBackend: angular.mock.$HttpBackendProvider,
  $rootElement: angular.mock.$RootElementProvider
}).config(['$provide', function($provide) {
  $provide.decorator('$timeout', angular.mock.$TimeoutDecorator);
  $provide.decorator('$$rAF', angular.mock.$RAFDecorator);
  $provide.decorator('$$asyncCallback', angular.mock.$AsyncCallbackDecorator);
  $provide.decorator('$rootScope', angular.mock.$RootScopeDecorator);
}]);

/**
 * @ngdoc module
 * @name ngMockE2E
 * @module ngMockE2E
 * @packageName angular-mocks
 * @description
 *
 * The `ngMockE2E` is an angular module which contains mocks suitable for end-to-end testing.
 * Currently there is only one mock present in this module -
 * the {@link ngMockE2E.$httpBackend e2e $httpBackend} mock.
 */
angular.module('ngMockE2E', ['ng']).config(['$provide', function($provide) {
  $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
}]);

/**
 * @ngdoc service
 * @name $httpBackend
 * @module ngMockE2E
 * @description
 * Fake HTTP backend implementation suitable for end-to-end testing or backend-less development of
 * applications that use the {@link ng.$http $http service}.
 *
 * *Note*: For fake http backend implementation suitable for unit testing please see
 * {@link ngMock.$httpBackend unit-testing $httpBackend mock}.
 *
 * This implementation can be used to respond with static or dynamic responses via the `when` api
 * and its shortcuts (`whenGET`, `whenPOST`, etc) and optionally pass through requests to the
 * real $httpBackend for specific requests (e.g. to interact with certain remote apis or to fetch
 * templates from a webserver).
 *
 * As opposed to unit-testing, in an end-to-end testing scenario or in scenario when an application
 * is being developed with the real backend api replaced with a mock, it is often desirable for
 * certain category of requests to bypass the mock and issue a real http request (e.g. to fetch
 * templates or static files from the webserver). To configure the backend with this behavior
 * use the `passThrough` request handler of `when` instead of `respond`.
 *
 * Additionally, we don't want to manually have to flush mocked out requests like we do during unit
 * testing. For this reason the e2e $httpBackend flushes mocked out requests
 * automatically, closely simulating the behavior of the XMLHttpRequest object.
 *
 * To setup the application to run with this http backend, you have to create a module that depends
 * on the `ngMockE2E` and your application modules and defines the fake backend:
 *
 * ```js
 *   myAppDev = angular.module('myAppDev', ['myApp', 'ngMockE2E']);
 *   myAppDev.run(function($httpBackend) {
 *     phones = [{name: 'phone1'}, {name: 'phone2'}];
 *
 *     // returns the current list of phones
 *     $httpBackend.whenGET('/phones').respond(phones);
 *
 *     // adds a new phone to the phones array
 *     $httpBackend.whenPOST('/phones').respond(function(method, url, data) {
 *       var phone = angular.fromJson(data);
 *       phones.push(phone);
 *       return [200, phone, {}];
 *     });
 *     $httpBackend.whenGET(/^\/templates\//).passThrough();
 *     //...
 *   });
 * ```
 *
 * Afterwards, bootstrap your app with this new module.
 */

/**
 * @ngdoc method
 * @name $httpBackend#when
 * @module ngMockE2E
 * @description
 * Creates a new backend definition.
 *
 * @param {string} method HTTP method.
 * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
 *   and returns true if the url match the current definition.
 * @param {(string|RegExp)=} data HTTP request body.
 * @param {(Object|function(Object))=} headers HTTP headers or function that receives http header
 *   object and returns true if the headers match the current definition.
 * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
 *   control how a matched request is handled. You can save this object for later use and invoke
 *   `respond` or `passThrough` again in order to change how a matched request is handled.
 *
 *  - respond –
 *    `{function([status,] data[, headers, statusText])
 *    | function(function(method, url, data, headers)}`
 *    – The respond method takes a set of static data to be returned or a function that can return
 *    an array containing response status (number), response data (string), response headers
 *    (Object), and the text for the status (string).
 *  - passThrough – `{function()}` – Any request matching a backend definition with
 *    `passThrough` handler will be passed through to the real backend (an XHR request will be made
 *    to the server.)
 *  - Both methods return the `requestHandler` object for possible overrides.
 */

/**
 * @ngdoc method
 * @name $httpBackend#whenGET
 * @module ngMockE2E
 * @description
 * Creates a new backend definition for GET requests. For more info see `when()`.
 *
 * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
 *   and returns true if the url match the current definition.
 * @param {(Object|function(Object))=} headers HTTP headers.
 * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
 *   control how a matched request is handled. You can save this object for later use and invoke
 *   `respond` or `passThrough` again in order to change how a matched request is handled.
 */

/**
 * @ngdoc method
 * @name $httpBackend#whenHEAD
 * @module ngMockE2E
 * @description
 * Creates a new backend definition for HEAD requests. For more info see `when()`.
 *
 * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
 *   and returns true if the url match the current definition.
 * @param {(Object|function(Object))=} headers HTTP headers.
 * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
 *   control how a matched request is handled. You can save this object for later use and invoke
 *   `respond` or `passThrough` again in order to change how a matched request is handled.
 */

/**
 * @ngdoc method
 * @name $httpBackend#whenDELETE
 * @module ngMockE2E
 * @description
 * Creates a new backend definition for DELETE requests. For more info see `when()`.
 *
 * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
 *   and returns true if the url match the current definition.
 * @param {(Object|function(Object))=} headers HTTP headers.
 * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
 *   control how a matched request is handled. You can save this object for later use and invoke
 *   `respond` or `passThrough` again in order to change how a matched request is handled.
 */

/**
 * @ngdoc method
 * @name $httpBackend#whenPOST
 * @module ngMockE2E
 * @description
 * Creates a new backend definition for POST requests. For more info see `when()`.
 *
 * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
 *   and returns true if the url match the current definition.
 * @param {(string|RegExp)=} data HTTP request body.
 * @param {(Object|function(Object))=} headers HTTP headers.
 * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
 *   control how a matched request is handled. You can save this object for later use and invoke
 *   `respond` or `passThrough` again in order to change how a matched request is handled.
 */

/**
 * @ngdoc method
 * @name $httpBackend#whenPUT
 * @module ngMockE2E
 * @description
 * Creates a new backend definition for PUT requests.  For more info see `when()`.
 *
 * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
 *   and returns true if the url match the current definition.
 * @param {(string|RegExp)=} data HTTP request body.
 * @param {(Object|function(Object))=} headers HTTP headers.
 * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
 *   control how a matched request is handled. You can save this object for later use and invoke
 *   `respond` or `passThrough` again in order to change how a matched request is handled.
 */

/**
 * @ngdoc method
 * @name $httpBackend#whenPATCH
 * @module ngMockE2E
 * @description
 * Creates a new backend definition for PATCH requests.  For more info see `when()`.
 *
 * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
 *   and returns true if the url match the current definition.
 * @param {(string|RegExp)=} data HTTP request body.
 * @param {(Object|function(Object))=} headers HTTP headers.
 * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
 *   control how a matched request is handled. You can save this object for later use and invoke
 *   `respond` or `passThrough` again in order to change how a matched request is handled.
 */

/**
 * @ngdoc method
 * @name $httpBackend#whenJSONP
 * @module ngMockE2E
 * @description
 * Creates a new backend definition for JSONP requests. For more info see `when()`.
 *
 * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
 *   and returns true if the url match the current definition.
 * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
 *   control how a matched request is handled. You can save this object for later use and invoke
 *   `respond` or `passThrough` again in order to change how a matched request is handled.
 */
angular.mock.e2e = {};
angular.mock.e2e.$httpBackendDecorator =
  ['$rootScope', '$timeout', '$delegate', '$browser', createHttpBackendMock];


/**
 * @ngdoc type
 * @name $rootScope.Scope
 * @module ngMock
 * @description
 * {@link ng.$rootScope.Scope Scope} type decorated with helper methods useful for testing. These
 * methods are automatically available on any {@link ng.$rootScope.Scope Scope} instance when
 * `ngMock` module is loaded.
 *
 * In addition to all the regular `Scope` methods, the following helper methods are available:
 */
angular.mock.$RootScopeDecorator = ['$delegate', function($delegate) {

  var $rootScopePrototype = Object.getPrototypeOf($delegate);

  $rootScopePrototype.$countChildScopes = countChildScopes;
  $rootScopePrototype.$countWatchers = countWatchers;

  return $delegate;

  // ------------------------------------------------------------------------------------------ //

  /**
   * @ngdoc method
   * @name $rootScope.Scope#$countChildScopes
   * @module ngMock
   * @description
   * Counts all the direct and indirect child scopes of the current scope.
   *
   * The current scope is excluded from the count. The count includes all isolate child scopes.
   *
   * @returns {number} Total number of child scopes.
   */
  function countChildScopes() {
    // jshint validthis: true
    var count = 0; // exclude the current scope
    var pendingChildHeads = [this.$$childHead];
    var currentScope;

    while (pendingChildHeads.length) {
      currentScope = pendingChildHeads.shift();

      while (currentScope) {
        count += 1;
        pendingChildHeads.push(currentScope.$$childHead);
        currentScope = currentScope.$$nextSibling;
      }
    }

    return count;
  }


  /**
   * @ngdoc method
   * @name $rootScope.Scope#$countWatchers
   * @module ngMock
   * @description
   * Counts all the watchers of direct and indirect child scopes of the current scope.
   *
   * The watchers of the current scope are included in the count and so are all the watchers of
   * isolate child scopes.
   *
   * @returns {number} Total number of watchers.
   */
  function countWatchers() {
    // jshint validthis: true
    var count = this.$$watchers ? this.$$watchers.length : 0; // include the current scope
    var pendingChildHeads = [this.$$childHead];
    var currentScope;

    while (pendingChildHeads.length) {
      currentScope = pendingChildHeads.shift();

      while (currentScope) {
        count += currentScope.$$watchers ? currentScope.$$watchers.length : 0;
        pendingChildHeads.push(currentScope.$$childHead);
        currentScope = currentScope.$$nextSibling;
      }
    }

    return count;
  }
}];


if (window.jasmine || window.mocha) {

  var currentSpec = null,
      isSpecRunning = function() {
        return !!currentSpec;
      };


  (window.beforeEach || window.setup)(function() {
    currentSpec = this;
  });

  (window.afterEach || window.teardown)(function() {
    var injector = currentSpec.$injector;

    angular.forEach(currentSpec.$modules, function(module) {
      if (module && module.$$hashKey) {
        module.$$hashKey = undefined;
      }
    });

    currentSpec.$injector = null;
    currentSpec.$modules = null;
    currentSpec = null;

    if (injector) {
      injector.get('$rootElement').off();
      injector.get('$browser').pollFns.length = 0;
    }

    // clean up jquery's fragment cache
    angular.forEach(angular.element.fragments, function(val, key) {
      delete angular.element.fragments[key];
    });

    MockXhr.$$lastInstance = null;

    angular.forEach(angular.callbacks, function(val, key) {
      delete angular.callbacks[key];
    });
    angular.callbacks.counter = 0;
  });

  /**
   * @ngdoc function
   * @name angular.mock.module
   * @description
   *
   * *NOTE*: This function is also published on window for easy access.<br>
   * *NOTE*: This function is declared ONLY WHEN running tests with jasmine or mocha
   *
   * This function registers a module configuration code. It collects the configuration information
   * which will be used when the injector is created by {@link angular.mock.inject inject}.
   *
   * See {@link angular.mock.inject inject} for usage example
   *
   * @param {...(string|Function|Object)} fns any number of modules which are represented as string
   *        aliases or as anonymous module initialization functions. The modules are used to
   *        configure the injector. The 'ng' and 'ngMock' modules are automatically loaded. If an
   *        object literal is passed they will be registered as values in the module, the key being
   *        the module name and the value being what is returned.
   */
  window.module = angular.mock.module = function() {
    var moduleFns = Array.prototype.slice.call(arguments, 0);
    return isSpecRunning() ? workFn() : workFn;
    /////////////////////
    function workFn() {
      if (currentSpec.$injector) {
        throw new Error('Injector already created, can not register a module!');
      } else {
        var modules = currentSpec.$modules || (currentSpec.$modules = []);
        angular.forEach(moduleFns, function(module) {
          if (angular.isObject(module) && !angular.isArray(module)) {
            modules.push(function($provide) {
              angular.forEach(module, function(value, key) {
                $provide.value(key, value);
              });
            });
          } else {
            modules.push(module);
          }
        });
      }
    }
  };

  /**
   * @ngdoc function
   * @name angular.mock.inject
   * @description
   *
   * *NOTE*: This function is also published on window for easy access.<br>
   * *NOTE*: This function is declared ONLY WHEN running tests with jasmine or mocha
   *
   * The inject function wraps a function into an injectable function. The inject() creates new
   * instance of {@link auto.$injector $injector} per test, which is then used for
   * resolving references.
   *
   *
   * ## Resolving References (Underscore Wrapping)
   * Often, we would like to inject a reference once, in a `beforeEach()` block and reuse this
   * in multiple `it()` clauses. To be able to do this we must assign the reference to a variable
   * that is declared in the scope of the `describe()` block. Since we would, most likely, want
   * the variable to have the same name of the reference we have a problem, since the parameter
   * to the `inject()` function would hide the outer variable.
   *
   * To help with this, the injected parameters can, optionally, be enclosed with underscores.
   * These are ignored by the injector when the reference name is resolved.
   *
   * For example, the parameter `_myService_` would be resolved as the reference `myService`.
   * Since it is available in the function body as _myService_, we can then assign it to a variable
   * defined in an outer scope.
   *
   * ```
   * // Defined out reference variable outside
   * var myService;
   *
   * // Wrap the parameter in underscores
   * beforeEach( inject( function(_myService_){
   *   myService = _myService_;
   * }));
   *
   * // Use myService in a series of tests.
   * it('makes use of myService', function() {
   *   myService.doStuff();
   * });
   *
   * ```
   *
   * See also {@link angular.mock.module angular.mock.module}
   *
   * ## Example
   * Example of what a typical jasmine tests looks like with the inject method.
   * ```js
   *
   *   angular.module('myApplicationModule', [])
   *       .value('mode', 'app')
   *       .value('version', 'v1.0.1');
   *
   *
   *   describe('MyApp', function() {
   *
   *     // You need to load modules that you want to test,
   *     // it loads only the "ng" module by default.
   *     beforeEach(module('myApplicationModule'));
   *
   *
   *     // inject() is used to inject arguments of all given functions
   *     it('should provide a version', inject(function(mode, version) {
   *       expect(version).toEqual('v1.0.1');
   *       expect(mode).toEqual('app');
   *     }));
   *
   *
   *     // The inject and module method can also be used inside of the it or beforeEach
   *     it('should override a version and test the new version is injected', function() {
   *       // module() takes functions or strings (module aliases)
   *       module(function($provide) {
   *         $provide.value('version', 'overridden'); // override version here
   *       });
   *
   *       inject(function(version) {
   *         expect(version).toEqual('overridden');
   *       });
   *     });
   *   });
   *
   * ```
   *
   * @param {...Function} fns any number of functions which will be injected using the injector.
   */



  var ErrorAddingDeclarationLocationStack = function(e, errorForStack) {
    this.message = e.message;
    this.name = e.name;
    if (e.line) this.line = e.line;
    if (e.sourceId) this.sourceId = e.sourceId;
    if (e.stack && errorForStack)
      this.stack = e.stack + '\n' + errorForStack.stack;
    if (e.stackArray) this.stackArray = e.stackArray;
  };
  ErrorAddingDeclarationLocationStack.prototype.toString = Error.prototype.toString;

  window.inject = angular.mock.inject = function() {
    var blockFns = Array.prototype.slice.call(arguments, 0);
    var errorForStack = new Error('Declaration Location');
    return isSpecRunning() ? workFn.call(currentSpec) : workFn;
    /////////////////////
    function workFn() {
      var modules = currentSpec.$modules || [];
      var strictDi = !!currentSpec.$injectorStrict;
      modules.unshift('ngMock');
      modules.unshift('ng');
      var injector = currentSpec.$injector;
      if (!injector) {
        if (strictDi) {
          // If strictDi is enabled, annotate the providerInjector blocks
          angular.forEach(modules, function(moduleFn) {
            if (typeof moduleFn === "function") {
              angular.injector.$$annotate(moduleFn);
            }
          });
        }
        injector = currentSpec.$injector = angular.injector(modules, strictDi);
        currentSpec.$injectorStrict = strictDi;
      }
      for (var i = 0, ii = blockFns.length; i < ii; i++) {
        if (currentSpec.$injectorStrict) {
          // If the injector is strict / strictDi, and the spec wants to inject using automatic
          // annotation, then annotate the function here.
          injector.annotate(blockFns[i]);
        }
        try {
          /* jshint -W040 *//* Jasmine explicitly provides a `this` object when calling functions */
          injector.invoke(blockFns[i] || angular.noop, this);
          /* jshint +W040 */
        } catch (e) {
          if (e.stack && errorForStack) {
            throw new ErrorAddingDeclarationLocationStack(e, errorForStack);
          }
          throw e;
        } finally {
          errorForStack = null;
        }
      }
    }
  };


  angular.mock.inject.strictDi = function(value) {
    value = arguments.length ? !!value : true;
    return isSpecRunning() ? workFn() : workFn;

    function workFn() {
      if (value !== currentSpec.$injectorStrict) {
        if (currentSpec.$injector) {
          throw new Error('Injector already created, can not modify strict annotations');
        } else {
          currentSpec.$injectorStrict = value;
        }
      }
    }
  };
}


})(window, window.angular);

/*
 * promise-tracker - v2.1.0 - 2014-11-15
 * http://github.com/ajoslin/angular-promise-tracker
 * Created by Andy Joslin; Licensed under Public Domain
 */

(function() {

angular.module('ajoslin.promise-tracker', [])

.provider('promiseTracker', function() {
  var trackers = {};

  this.$get = ['$q', '$timeout', function($q, $timeout) {
    function cancelTimeout(promise) {
      if (promise) {
        $timeout.cancel(promise);
      }
    }

    return function PromiseTracker(options) {
      //do new if user doesn't
      if (!(this instanceof PromiseTracker)) {
        return new PromiseTracker(options);
      }

      options = options || {};

      //Array of promises being tracked
      var tracked = [];
      var self = this;

      //Allow an optional "minimum duration" that the tracker has to stay active for.
      var minDuration = options.minDuration;
      //Allow a delay that will stop the tracker from activating until that time is reached
      var activationDelay = options.activationDelay;

      var minDurationPromise;
      var activationDelayPromise;

      self.active = function() {
        //Even if we have a promise in our tracker, we aren't active until delay is elapsed
        if (activationDelayPromise) {
          return false;
        }
        return tracked.length > 0;
      };

      self.tracking = function() {
        //Even if we aren't active, we could still have a promise in our tracker
        return tracked.length > 0;
      };

      self.destroy = self.cancel = function() {
        minDurationPromise = cancelTimeout(minDurationPromise);
        activationDelayPromise = cancelTimeout(activationDelayPromise);
        for (var i=tracked.length-1; i>=0; i--) {
          tracked[i].resolve();
        }
        tracked.length = 0;
      };

      //Create a promise that will make our tracker active until it is resolved.
      // @return deferred - our deferred object that is being tracked
      self.createPromise = function() {
        var deferred = $q.defer();
        tracked.push(deferred);

        //If the tracker was just inactive and this the first in the list of
        //promises, we reset our delay and minDuration
        //again.
        if (tracked.length === 1) {
          if (activationDelay) {
            activationDelayPromise = $timeout(function() {
              activationDelayPromise = cancelTimeout(activationDelayPromise);
              startMinDuration();
            }, activationDelay);
          } else {
            startMinDuration();
          }
        }

        deferred.promise.then(onDone(false), onDone(true));

        return deferred;

        function startMinDuration() {
          if (minDuration) {
            minDurationPromise = $timeout(angular.noop, minDuration);
          }
        }

        //Create a callback for when this promise is done. It will remove our
        //tracked promise from the array if once minDuration is complete
        function onDone(isError) {
          return function(value) {
            (minDurationPromise || $q.when()).then(function() {
              var index = tracked.indexOf(deferred);
              tracked.splice(index, 1);

              //If this is the last promise, cleanup the timeouts
              //for activationDelay
              if (tracked.length === 0) {
                activationDelayPromise = cancelTimeout(activationDelayPromise);
              }
            });
          };
        }
      };

      self.addPromise = function(promise) {
        promise = promise && (promise.$promise || promise) || {};
        if (!promise.then) {
          throw new Error("promiseTracker#addPromise expects a promise object!");
        }
        var deferred = self.createPromise();

        //When given promise is done, resolve our created promise
        //Allow $then for angular-resource objects
        promise.then(function success(value) {
          deferred.resolve(value);
          return value;
        }, function error(value) {
          deferred.reject(value);
          return $q.reject(value);
        });

        return deferred;
      };
    };
  }];
});

}());
/**
 * @license AngularJS v1.3.8
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';

/**
 * @ngdoc module
 * @name ngRoute
 * @description
 *
 * # ngRoute
 *
 * The `ngRoute` module provides routing and deeplinking services and directives for angular apps.
 *
 * ## Example
 * See {@link ngRoute.$route#example $route} for an example of configuring and using `ngRoute`.
 *
 *
 * <div doc-module-components="ngRoute"></div>
 */
 /* global -ngRouteModule */
var ngRouteModule = angular.module('ngRoute', ['ng']).
                        provider('$route', $RouteProvider),
    $routeMinErr = angular.$$minErr('ngRoute');

/**
 * @ngdoc provider
 * @name $routeProvider
 *
 * @description
 *
 * Used for configuring routes.
 *
 * ## Example
 * See {@link ngRoute.$route#example $route} for an example of configuring and using `ngRoute`.
 *
 * ## Dependencies
 * Requires the {@link ngRoute `ngRoute`} module to be installed.
 */
function $RouteProvider() {
  function inherit(parent, extra) {
    return angular.extend(Object.create(parent), extra);
  }

  var routes = {};

  /**
   * @ngdoc method
   * @name $routeProvider#when
   *
   * @param {string} path Route path (matched against `$location.path`). If `$location.path`
   *    contains redundant trailing slash or is missing one, the route will still match and the
   *    `$location.path` will be updated to add or drop the trailing slash to exactly match the
   *    route definition.
   *
   *    * `path` can contain named groups starting with a colon: e.g. `:name`. All characters up
   *        to the next slash are matched and stored in `$routeParams` under the given `name`
   *        when the route matches.
   *    * `path` can contain named groups starting with a colon and ending with a star:
   *        e.g.`:name*`. All characters are eagerly stored in `$routeParams` under the given `name`
   *        when the route matches.
   *    * `path` can contain optional named groups with a question mark: e.g.`:name?`.
   *
   *    For example, routes like `/color/:color/largecode/:largecode*\/edit` will match
   *    `/color/brown/largecode/code/with/slashes/edit` and extract:
   *
   *    * `color: brown`
   *    * `largecode: code/with/slashes`.
   *
   *
   * @param {Object} route Mapping information to be assigned to `$route.current` on route
   *    match.
   *
   *    Object properties:
   *
   *    - `controller` – `{(string|function()=}` – Controller fn that should be associated with
   *      newly created scope or the name of a {@link angular.Module#controller registered
   *      controller} if passed as a string.
   *    - `controllerAs` – `{string=}` – A controller alias name. If present the controller will be
   *      published to scope under the `controllerAs` name.
   *    - `template` – `{string=|function()=}` – html template as a string or a function that
   *      returns an html template as a string which should be used by {@link
   *      ngRoute.directive:ngView ngView} or {@link ng.directive:ngInclude ngInclude} directives.
   *      This property takes precedence over `templateUrl`.
   *
   *      If `template` is a function, it will be called with the following parameters:
   *
   *      - `{Array.<Object>}` - route parameters extracted from the current
   *        `$location.path()` by applying the current route
   *
   *    - `templateUrl` – `{string=|function()=}` – path or function that returns a path to an html
   *      template that should be used by {@link ngRoute.directive:ngView ngView}.
   *
   *      If `templateUrl` is a function, it will be called with the following parameters:
   *
   *      - `{Array.<Object>}` - route parameters extracted from the current
   *        `$location.path()` by applying the current route
   *
   *    - `resolve` - `{Object.<string, function>=}` - An optional map of dependencies which should
   *      be injected into the controller. If any of these dependencies are promises, the router
   *      will wait for them all to be resolved or one to be rejected before the controller is
   *      instantiated.
   *      If all the promises are resolved successfully, the values of the resolved promises are
   *      injected and {@link ngRoute.$route#$routeChangeSuccess $routeChangeSuccess} event is
   *      fired. If any of the promises are rejected the
   *      {@link ngRoute.$route#$routeChangeError $routeChangeError} event is fired. The map object
   *      is:
   *
   *      - `key` – `{string}`: a name of a dependency to be injected into the controller.
   *      - `factory` - `{string|function}`: If `string` then it is an alias for a service.
   *        Otherwise if function, then it is {@link auto.$injector#invoke injected}
   *        and the return value is treated as the dependency. If the result is a promise, it is
   *        resolved before its value is injected into the controller. Be aware that
   *        `ngRoute.$routeParams` will still refer to the previous route within these resolve
   *        functions.  Use `$route.current.params` to access the new route parameters, instead.
   *
   *    - `redirectTo` – {(string|function())=} – value to update
   *      {@link ng.$location $location} path with and trigger route redirection.
   *
   *      If `redirectTo` is a function, it will be called with the following parameters:
   *
   *      - `{Object.<string>}` - route parameters extracted from the current
   *        `$location.path()` by applying the current route templateUrl.
   *      - `{string}` - current `$location.path()`
   *      - `{Object}` - current `$location.search()`
   *
   *      The custom `redirectTo` function is expected to return a string which will be used
   *      to update `$location.path()` and `$location.search()`.
   *
   *    - `[reloadOnSearch=true]` - {boolean=} - reload route when only `$location.search()`
   *      or `$location.hash()` changes.
   *
   *      If the option is set to `false` and url in the browser changes, then
   *      `$routeUpdate` event is broadcasted on the root scope.
   *
   *    - `[caseInsensitiveMatch=false]` - {boolean=} - match routes without being case sensitive
   *
   *      If the option is set to `true`, then the particular route can be matched without being
   *      case sensitive
   *
   * @returns {Object} self
   *
   * @description
   * Adds a new route definition to the `$route` service.
   */
  this.when = function(path, route) {
    //copy original route object to preserve params inherited from proto chain
    var routeCopy = angular.copy(route);
    if (angular.isUndefined(routeCopy.reloadOnSearch)) {
      routeCopy.reloadOnSearch = true;
    }
    if (angular.isUndefined(routeCopy.caseInsensitiveMatch)) {
      routeCopy.caseInsensitiveMatch = this.caseInsensitiveMatch;
    }
    routes[path] = angular.extend(
      routeCopy,
      path && pathRegExp(path, routeCopy)
    );

    // create redirection for trailing slashes
    if (path) {
      var redirectPath = (path[path.length - 1] == '/')
            ? path.substr(0, path.length - 1)
            : path + '/';

      routes[redirectPath] = angular.extend(
        {redirectTo: path},
        pathRegExp(redirectPath, routeCopy)
      );
    }

    return this;
  };

  /**
   * @ngdoc property
   * @name $routeProvider#caseInsensitiveMatch
   * @description
   *
   * A boolean property indicating if routes defined
   * using this provider should be matched using a case insensitive
   * algorithm. Defaults to `false`.
   */
  this.caseInsensitiveMatch = false;

   /**
    * @param path {string} path
    * @param opts {Object} options
    * @return {?Object}
    *
    * @description
    * Normalizes the given path, returning a regular expression
    * and the original path.
    *
    * Inspired by pathRexp in visionmedia/express/lib/utils.js.
    */
  function pathRegExp(path, opts) {
    var insensitive = opts.caseInsensitiveMatch,
        ret = {
          originalPath: path,
          regexp: path
        },
        keys = ret.keys = [];

    path = path
      .replace(/([().])/g, '\\$1')
      .replace(/(\/)?:(\w+)([\?\*])?/g, function(_, slash, key, option) {
        var optional = option === '?' ? option : null;
        var star = option === '*' ? option : null;
        keys.push({ name: key, optional: !!optional });
        slash = slash || '';
        return ''
          + (optional ? '' : slash)
          + '(?:'
          + (optional ? slash : '')
          + (star && '(.+?)' || '([^/]+)')
          + (optional || '')
          + ')'
          + (optional || '');
      })
      .replace(/([\/$\*])/g, '\\$1');

    ret.regexp = new RegExp('^' + path + '$', insensitive ? 'i' : '');
    return ret;
  }

  /**
   * @ngdoc method
   * @name $routeProvider#otherwise
   *
   * @description
   * Sets route definition that will be used on route change when no other route definition
   * is matched.
   *
   * @param {Object|string} params Mapping information to be assigned to `$route.current`.
   * If called with a string, the value maps to `redirectTo`.
   * @returns {Object} self
   */
  this.otherwise = function(params) {
    if (typeof params === 'string') {
      params = {redirectTo: params};
    }
    this.when(null, params);
    return this;
  };


  this.$get = ['$rootScope',
               '$location',
               '$routeParams',
               '$q',
               '$injector',
               '$templateRequest',
               '$sce',
      function($rootScope, $location, $routeParams, $q, $injector, $templateRequest, $sce) {

    /**
     * @ngdoc service
     * @name $route
     * @requires $location
     * @requires $routeParams
     *
     * @property {Object} current Reference to the current route definition.
     * The route definition contains:
     *
     *   - `controller`: The controller constructor as define in route definition.
     *   - `locals`: A map of locals which is used by {@link ng.$controller $controller} service for
     *     controller instantiation. The `locals` contain
     *     the resolved values of the `resolve` map. Additionally the `locals` also contain:
     *
     *     - `$scope` - The current route scope.
     *     - `$template` - The current route template HTML.
     *
     * @property {Object} routes Object with all route configuration Objects as its properties.
     *
     * @description
     * `$route` is used for deep-linking URLs to controllers and views (HTML partials).
     * It watches `$location.url()` and tries to map the path to an existing route definition.
     *
     * Requires the {@link ngRoute `ngRoute`} module to be installed.
     *
     * You can define routes through {@link ngRoute.$routeProvider $routeProvider}'s API.
     *
     * The `$route` service is typically used in conjunction with the
     * {@link ngRoute.directive:ngView `ngView`} directive and the
     * {@link ngRoute.$routeParams `$routeParams`} service.
     *
     * @example
     * This example shows how changing the URL hash causes the `$route` to match a route against the
     * URL, and the `ngView` pulls in the partial.
     *
     * <example name="$route-service" module="ngRouteExample"
     *          deps="angular-route.js" fixBase="true">
     *   <file name="index.html">
     *     <div ng-controller="MainController">
     *       Choose:
     *       <a href="Book/Moby">Moby</a> |
     *       <a href="Book/Moby/ch/1">Moby: Ch1</a> |
     *       <a href="Book/Gatsby">Gatsby</a> |
     *       <a href="Book/Gatsby/ch/4?key=value">Gatsby: Ch4</a> |
     *       <a href="Book/Scarlet">Scarlet Letter</a><br/>
     *
     *       <div ng-view></div>
     *
     *       <hr />
     *
     *       <pre>$location.path() = {{$location.path()}}</pre>
     *       <pre>$route.current.templateUrl = {{$route.current.templateUrl}}</pre>
     *       <pre>$route.current.params = {{$route.current.params}}</pre>
     *       <pre>$route.current.scope.name = {{$route.current.scope.name}}</pre>
     *       <pre>$routeParams = {{$routeParams}}</pre>
     *     </div>
     *   </file>
     *
     *   <file name="book.html">
     *     controller: {{name}}<br />
     *     Book Id: {{params.bookId}}<br />
     *   </file>
     *
     *   <file name="chapter.html">
     *     controller: {{name}}<br />
     *     Book Id: {{params.bookId}}<br />
     *     Chapter Id: {{params.chapterId}}
     *   </file>
     *
     *   <file name="script.js">
     *     angular.module('ngRouteExample', ['ngRoute'])
     *
     *      .controller('MainController', function($scope, $route, $routeParams, $location) {
     *          $scope.$route = $route;
     *          $scope.$location = $location;
     *          $scope.$routeParams = $routeParams;
     *      })
     *
     *      .controller('BookController', function($scope, $routeParams) {
     *          $scope.name = "BookController";
     *          $scope.params = $routeParams;
     *      })
     *
     *      .controller('ChapterController', function($scope, $routeParams) {
     *          $scope.name = "ChapterController";
     *          $scope.params = $routeParams;
     *      })
     *
     *     .config(function($routeProvider, $locationProvider) {
     *       $routeProvider
     *        .when('/Book/:bookId', {
     *         templateUrl: 'book.html',
     *         controller: 'BookController',
     *         resolve: {
     *           // I will cause a 1 second delay
     *           delay: function($q, $timeout) {
     *             var delay = $q.defer();
     *             $timeout(delay.resolve, 1000);
     *             return delay.promise;
     *           }
     *         }
     *       })
     *       .when('/Book/:bookId/ch/:chapterId', {
     *         templateUrl: 'chapter.html',
     *         controller: 'ChapterController'
     *       });
     *
     *       // configure html5 to get links working on jsfiddle
     *       $locationProvider.html5Mode(true);
     *     });
     *
     *   </file>
     *
     *   <file name="protractor.js" type="protractor">
     *     it('should load and compile correct template', function() {
     *       element(by.linkText('Moby: Ch1')).click();
     *       var content = element(by.css('[ng-view]')).getText();
     *       expect(content).toMatch(/controller\: ChapterController/);
     *       expect(content).toMatch(/Book Id\: Moby/);
     *       expect(content).toMatch(/Chapter Id\: 1/);
     *
     *       element(by.partialLinkText('Scarlet')).click();
     *
     *       content = element(by.css('[ng-view]')).getText();
     *       expect(content).toMatch(/controller\: BookController/);
     *       expect(content).toMatch(/Book Id\: Scarlet/);
     *     });
     *   </file>
     * </example>
     */

    /**
     * @ngdoc event
     * @name $route#$routeChangeStart
     * @eventType broadcast on root scope
     * @description
     * Broadcasted before a route change. At this  point the route services starts
     * resolving all of the dependencies needed for the route change to occur.
     * Typically this involves fetching the view template as well as any dependencies
     * defined in `resolve` route property. Once  all of the dependencies are resolved
     * `$routeChangeSuccess` is fired.
     *
     * The route change (and the `$location` change that triggered it) can be prevented
     * by calling `preventDefault` method of the event. See {@link ng.$rootScope.Scope#$on}
     * for more details about event object.
     *
     * @param {Object} angularEvent Synthetic event object.
     * @param {Route} next Future route information.
     * @param {Route} current Current route information.
     */

    /**
     * @ngdoc event
     * @name $route#$routeChangeSuccess
     * @eventType broadcast on root scope
     * @description
     * Broadcasted after a route dependencies are resolved.
     * {@link ngRoute.directive:ngView ngView} listens for the directive
     * to instantiate the controller and render the view.
     *
     * @param {Object} angularEvent Synthetic event object.
     * @param {Route} current Current route information.
     * @param {Route|Undefined} previous Previous route information, or undefined if current is
     * first route entered.
     */

    /**
     * @ngdoc event
     * @name $route#$routeChangeError
     * @eventType broadcast on root scope
     * @description
     * Broadcasted if any of the resolve promises are rejected.
     *
     * @param {Object} angularEvent Synthetic event object
     * @param {Route} current Current route information.
     * @param {Route} previous Previous route information.
     * @param {Route} rejection Rejection of the promise. Usually the error of the failed promise.
     */

    /**
     * @ngdoc event
     * @name $route#$routeUpdate
     * @eventType broadcast on root scope
     * @description
     *
     * The `reloadOnSearch` property has been set to false, and we are reusing the same
     * instance of the Controller.
     */

    var forceReload = false,
        preparedRoute,
        preparedRouteIsUpdateOnly,
        $route = {
          routes: routes,

          /**
           * @ngdoc method
           * @name $route#reload
           *
           * @description
           * Causes `$route` service to reload the current route even if
           * {@link ng.$location $location} hasn't changed.
           *
           * As a result of that, {@link ngRoute.directive:ngView ngView}
           * creates new scope and reinstantiates the controller.
           */
          reload: function() {
            forceReload = true;
            $rootScope.$evalAsync(function() {
              // Don't support cancellation of a reload for now...
              prepareRoute();
              commitRoute();
            });
          },

          /**
           * @ngdoc method
           * @name $route#updateParams
           *
           * @description
           * Causes `$route` service to update the current URL, replacing
           * current route parameters with those specified in `newParams`.
           * Provided property names that match the route's path segment
           * definitions will be interpolated into the location's path, while
           * remaining properties will be treated as query params.
           *
           * @param {Object} newParams mapping of URL parameter names to values
           */
          updateParams: function(newParams) {
            if (this.current && this.current.$$route) {
              var searchParams = {}, self=this;

              angular.forEach(Object.keys(newParams), function(key) {
                if (!self.current.pathParams[key]) searchParams[key] = newParams[key];
              });

              newParams = angular.extend({}, this.current.params, newParams);
              $location.path(interpolate(this.current.$$route.originalPath, newParams));
              $location.search(angular.extend({}, $location.search(), searchParams));
            }
            else {
              throw $routeMinErr('norout', 'Tried updating route when with no current route');
            }
          }
        };

    $rootScope.$on('$locationChangeStart', prepareRoute);
    $rootScope.$on('$locationChangeSuccess', commitRoute);

    return $route;

    /////////////////////////////////////////////////////

    /**
     * @param on {string} current url
     * @param route {Object} route regexp to match the url against
     * @return {?Object}
     *
     * @description
     * Check if the route matches the current url.
     *
     * Inspired by match in
     * visionmedia/express/lib/router/router.js.
     */
    function switchRouteMatcher(on, route) {
      var keys = route.keys,
          params = {};

      if (!route.regexp) return null;

      var m = route.regexp.exec(on);
      if (!m) return null;

      for (var i = 1, len = m.length; i < len; ++i) {
        var key = keys[i - 1];

        var val = m[i];

        if (key && val) {
          params[key.name] = val;
        }
      }
      return params;
    }

    function prepareRoute($locationEvent) {
      var lastRoute = $route.current;

      preparedRoute = parseRoute();
      preparedRouteIsUpdateOnly = preparedRoute && lastRoute && preparedRoute.$$route === lastRoute.$$route
          && angular.equals(preparedRoute.pathParams, lastRoute.pathParams)
          && !preparedRoute.reloadOnSearch && !forceReload;

      if (!preparedRouteIsUpdateOnly && (lastRoute || preparedRoute)) {
        if ($rootScope.$broadcast('$routeChangeStart', preparedRoute, lastRoute).defaultPrevented) {
          if ($locationEvent) {
            $locationEvent.preventDefault();
          }
        }
      }
    }

    function commitRoute() {
      var lastRoute = $route.current;
      var nextRoute = preparedRoute;

      if (preparedRouteIsUpdateOnly) {
        lastRoute.params = nextRoute.params;
        angular.copy(lastRoute.params, $routeParams);
        $rootScope.$broadcast('$routeUpdate', lastRoute);
      } else if (nextRoute || lastRoute) {
        forceReload = false;
        $route.current = nextRoute;
        if (nextRoute) {
          if (nextRoute.redirectTo) {
            if (angular.isString(nextRoute.redirectTo)) {
              $location.path(interpolate(nextRoute.redirectTo, nextRoute.params)).search(nextRoute.params)
                       .replace();
            } else {
              $location.url(nextRoute.redirectTo(nextRoute.pathParams, $location.path(), $location.search()))
                       .replace();
            }
          }
        }

        $q.when(nextRoute).
          then(function() {
            if (nextRoute) {
              var locals = angular.extend({}, nextRoute.resolve),
                  template, templateUrl;

              angular.forEach(locals, function(value, key) {
                locals[key] = angular.isString(value) ?
                    $injector.get(value) : $injector.invoke(value, null, null, key);
              });

              if (angular.isDefined(template = nextRoute.template)) {
                if (angular.isFunction(template)) {
                  template = template(nextRoute.params);
                }
              } else if (angular.isDefined(templateUrl = nextRoute.templateUrl)) {
                if (angular.isFunction(templateUrl)) {
                  templateUrl = templateUrl(nextRoute.params);
                }
                templateUrl = $sce.getTrustedResourceUrl(templateUrl);
                if (angular.isDefined(templateUrl)) {
                  nextRoute.loadedTemplateUrl = templateUrl;
                  template = $templateRequest(templateUrl);
                }
              }
              if (angular.isDefined(template)) {
                locals['$template'] = template;
              }
              return $q.all(locals);
            }
          }).
          // after route change
          then(function(locals) {
            if (nextRoute == $route.current) {
              if (nextRoute) {
                nextRoute.locals = locals;
                angular.copy(nextRoute.params, $routeParams);
              }
              $rootScope.$broadcast('$routeChangeSuccess', nextRoute, lastRoute);
            }
          }, function(error) {
            if (nextRoute == $route.current) {
              $rootScope.$broadcast('$routeChangeError', nextRoute, lastRoute, error);
            }
          });
      }
    }


    /**
     * @returns {Object} the current active route, by matching it against the URL
     */
    function parseRoute() {
      // Match a route
      var params, match;
      angular.forEach(routes, function(route, path) {
        if (!match && (params = switchRouteMatcher($location.path(), route))) {
          match = inherit(route, {
            params: angular.extend({}, $location.search(), params),
            pathParams: params});
          match.$$route = route;
        }
      });
      // No route matched; fallback to "otherwise" route
      return match || routes[null] && inherit(routes[null], {params: {}, pathParams:{}});
    }

    /**
     * @returns {string} interpolation of the redirect path with the parameters
     */
    function interpolate(string, params) {
      var result = [];
      angular.forEach((string || '').split(':'), function(segment, i) {
        if (i === 0) {
          result.push(segment);
        } else {
          var segmentMatch = segment.match(/(\w+)(?:[?*])?(.*)/);
          var key = segmentMatch[1];
          result.push(params[key]);
          result.push(segmentMatch[2] || '');
          delete params[key];
        }
      });
      return result.join('');
    }
  }];
}

ngRouteModule.provider('$routeParams', $RouteParamsProvider);


/**
 * @ngdoc service
 * @name $routeParams
 * @requires $route
 *
 * @description
 * The `$routeParams` service allows you to retrieve the current set of route parameters.
 *
 * Requires the {@link ngRoute `ngRoute`} module to be installed.
 *
 * The route parameters are a combination of {@link ng.$location `$location`}'s
 * {@link ng.$location#search `search()`} and {@link ng.$location#path `path()`}.
 * The `path` parameters are extracted when the {@link ngRoute.$route `$route`} path is matched.
 *
 * In case of parameter name collision, `path` params take precedence over `search` params.
 *
 * The service guarantees that the identity of the `$routeParams` object will remain unchanged
 * (but its properties will likely change) even when a route change occurs.
 *
 * Note that the `$routeParams` are only updated *after* a route change completes successfully.
 * This means that you cannot rely on `$routeParams` being correct in route resolve functions.
 * Instead you can use `$route.current.params` to access the new route's parameters.
 *
 * @example
 * ```js
 *  // Given:
 *  // URL: http://server.com/index.html#/Chapter/1/Section/2?search=moby
 *  // Route: /Chapter/:chapterId/Section/:sectionId
 *  //
 *  // Then
 *  $routeParams ==> {chapterId:'1', sectionId:'2', search:'moby'}
 * ```
 */
function $RouteParamsProvider() {
  this.$get = function() { return {}; };
}

ngRouteModule.directive('ngView', ngViewFactory);
ngRouteModule.directive('ngView', ngViewFillContentFactory);


/**
 * @ngdoc directive
 * @name ngView
 * @restrict ECA
 *
 * @description
 * # Overview
 * `ngView` is a directive that complements the {@link ngRoute.$route $route} service by
 * including the rendered template of the current route into the main layout (`index.html`) file.
 * Every time the current route changes, the included view changes with it according to the
 * configuration of the `$route` service.
 *
 * Requires the {@link ngRoute `ngRoute`} module to be installed.
 *
 * @animations
 * enter - animation is used to bring new content into the browser.
 * leave - animation is used to animate existing content away.
 *
 * The enter and leave animation occur concurrently.
 *
 * @scope
 * @priority 400
 * @param {string=} onload Expression to evaluate whenever the view updates.
 *
 * @param {string=} autoscroll Whether `ngView` should call {@link ng.$anchorScroll
 *                  $anchorScroll} to scroll the viewport after the view is updated.
 *
 *                  - If the attribute is not set, disable scrolling.
 *                  - If the attribute is set without value, enable scrolling.
 *                  - Otherwise enable scrolling only if the `autoscroll` attribute value evaluated
 *                    as an expression yields a truthy value.
 * @example
    <example name="ngView-directive" module="ngViewExample"
             deps="angular-route.js;angular-animate.js"
             animations="true" fixBase="true">
      <file name="index.html">
        <div ng-controller="MainCtrl as main">
          Choose:
          <a href="Book/Moby">Moby</a> |
          <a href="Book/Moby/ch/1">Moby: Ch1</a> |
          <a href="Book/Gatsby">Gatsby</a> |
          <a href="Book/Gatsby/ch/4?key=value">Gatsby: Ch4</a> |
          <a href="Book/Scarlet">Scarlet Letter</a><br/>

          <div class="view-animate-container">
            <div ng-view class="view-animate"></div>
          </div>
          <hr />

          <pre>$location.path() = {{main.$location.path()}}</pre>
          <pre>$route.current.templateUrl = {{main.$route.current.templateUrl}}</pre>
          <pre>$route.current.params = {{main.$route.current.params}}</pre>
          <pre>$routeParams = {{main.$routeParams}}</pre>
        </div>
      </file>

      <file name="book.html">
        <div>
          controller: {{book.name}}<br />
          Book Id: {{book.params.bookId}}<br />
        </div>
      </file>

      <file name="chapter.html">
        <div>
          controller: {{chapter.name}}<br />
          Book Id: {{chapter.params.bookId}}<br />
          Chapter Id: {{chapter.params.chapterId}}
        </div>
      </file>

      <file name="animations.css">
        .view-animate-container {
          position:relative;
          height:100px!important;
          background:white;
          border:1px solid black;
          height:40px;
          overflow:hidden;
        }

        .view-animate {
          padding:10px;
        }

        .view-animate.ng-enter, .view-animate.ng-leave {
          -webkit-transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.5s;
          transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.5s;

          display:block;
          width:100%;
          border-left:1px solid black;

          position:absolute;
          top:0;
          left:0;
          right:0;
          bottom:0;
          padding:10px;
        }

        .view-animate.ng-enter {
          left:100%;
        }
        .view-animate.ng-enter.ng-enter-active {
          left:0;
        }
        .view-animate.ng-leave.ng-leave-active {
          left:-100%;
        }
      </file>

      <file name="script.js">
        angular.module('ngViewExample', ['ngRoute', 'ngAnimate'])
          .config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
              $routeProvider
                .when('/Book/:bookId', {
                  templateUrl: 'book.html',
                  controller: 'BookCtrl',
                  controllerAs: 'book'
                })
                .when('/Book/:bookId/ch/:chapterId', {
                  templateUrl: 'chapter.html',
                  controller: 'ChapterCtrl',
                  controllerAs: 'chapter'
                });

              $locationProvider.html5Mode(true);
          }])
          .controller('MainCtrl', ['$route', '$routeParams', '$location',
            function($route, $routeParams, $location) {
              this.$route = $route;
              this.$location = $location;
              this.$routeParams = $routeParams;
          }])
          .controller('BookCtrl', ['$routeParams', function($routeParams) {
            this.name = "BookCtrl";
            this.params = $routeParams;
          }])
          .controller('ChapterCtrl', ['$routeParams', function($routeParams) {
            this.name = "ChapterCtrl";
            this.params = $routeParams;
          }]);

      </file>

      <file name="protractor.js" type="protractor">
        it('should load and compile correct template', function() {
          element(by.linkText('Moby: Ch1')).click();
          var content = element(by.css('[ng-view]')).getText();
          expect(content).toMatch(/controller\: ChapterCtrl/);
          expect(content).toMatch(/Book Id\: Moby/);
          expect(content).toMatch(/Chapter Id\: 1/);

          element(by.partialLinkText('Scarlet')).click();

          content = element(by.css('[ng-view]')).getText();
          expect(content).toMatch(/controller\: BookCtrl/);
          expect(content).toMatch(/Book Id\: Scarlet/);
        });
      </file>
    </example>
 */


/**
 * @ngdoc event
 * @name ngView#$viewContentLoaded
 * @eventType emit on the current ngView scope
 * @description
 * Emitted every time the ngView content is reloaded.
 */
ngViewFactory.$inject = ['$route', '$anchorScroll', '$animate'];
function ngViewFactory($route, $anchorScroll, $animate) {
  return {
    restrict: 'ECA',
    terminal: true,
    priority: 400,
    transclude: 'element',
    link: function(scope, $element, attr, ctrl, $transclude) {
        var currentScope,
            currentElement,
            previousLeaveAnimation,
            autoScrollExp = attr.autoscroll,
            onloadExp = attr.onload || '';

        scope.$on('$routeChangeSuccess', update);
        update();

        function cleanupLastView() {
          if (previousLeaveAnimation) {
            $animate.cancel(previousLeaveAnimation);
            previousLeaveAnimation = null;
          }

          if (currentScope) {
            currentScope.$destroy();
            currentScope = null;
          }
          if (currentElement) {
            previousLeaveAnimation = $animate.leave(currentElement);
            previousLeaveAnimation.then(function() {
              previousLeaveAnimation = null;
            });
            currentElement = null;
          }
        }

        function update() {
          var locals = $route.current && $route.current.locals,
              template = locals && locals.$template;

          if (angular.isDefined(template)) {
            var newScope = scope.$new();
            var current = $route.current;

            // Note: This will also link all children of ng-view that were contained in the original
            // html. If that content contains controllers, ... they could pollute/change the scope.
            // However, using ng-view on an element with additional content does not make sense...
            // Note: We can't remove them in the cloneAttchFn of $transclude as that
            // function is called before linking the content, which would apply child
            // directives to non existing elements.
            var clone = $transclude(newScope, function(clone) {
              $animate.enter(clone, null, currentElement || $element).then(function onNgViewEnter() {
                if (angular.isDefined(autoScrollExp)
                  && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                  $anchorScroll();
                }
              });
              cleanupLastView();
            });

            currentElement = clone;
            currentScope = current.scope = newScope;
            currentScope.$emit('$viewContentLoaded');
            currentScope.$eval(onloadExp);
          } else {
            cleanupLastView();
          }
        }
    }
  };
}

// This directive is called during the $transclude call of the first `ngView` directive.
// It will replace and compile the content of the element with the loaded template.
// We need this directive so that the element content is already filled when
// the link function of another directive on the same element as ngView
// is called.
ngViewFillContentFactory.$inject = ['$compile', '$controller', '$route'];
function ngViewFillContentFactory($compile, $controller, $route) {
  return {
    restrict: 'ECA',
    priority: -400,
    link: function(scope, $element) {
      var current = $route.current,
          locals = current.locals;

      $element.html(locals.$template);

      var link = $compile($element.contents());

      if (current.controller) {
        locals.$scope = scope;
        var controller = $controller(current.controller, locals);
        if (current.controllerAs) {
          scope[current.controllerAs] = controller;
        }
        $element.data('$ngControllerController', controller);
        $element.children().data('$ngControllerController', controller);
      }

      link(scope);
    }
  };
}


})(window, window.angular);

'use strict';
/*global angular, $, setTimeout*/

/*
 *  AngularJS Autocomplete, version 0.6.0
 *  Wrapper for the jQuery UI Autocomplete Widget - v1.11.2
 *  API @ http://api.jqueryui.com/autocomplete/
 *
 *  <input type="text" ng-model="modelObj" ui-autocomplete="myOptions">
 *  $scope.myOptions = {
 *      options: {
 *          html: false, // boolean, uiAutocomplete extend, if true, you can use html string or DOM object in data.label for source
 *          onlySelectValid: false, // boolean, uiAutocomplete extend, if true, element value must be selected from suggestion menu, otherwise set validity of 'onlyselect' to false.
 *          focusOpen: false, // boolean, uiAutocomplete extend, if true, the suggestion menu auto open with all source data when focus
 *          groupLabel: null, // html string or DOM object, uiAutocomplete extend, it is used to group suggestion result, it can't be seleted.
 *          outHeight: 0, // number, uiAutocomplete extend, it is used to adjust suggestion menu' css style "max-height".
 *          appendTo: null, // jQuery UI Autocomplete Widget Options, the same below. http://api.jqueryui.com/autocomplete/#option
 *          autoFocus: false,
 *          delay: 300,
 *          disabled: false,
 *          minLength: 1,
 *          position: { my: "left top", at: "left bottom", collision: "none" },
 *          source: undefined // must be specified
 *      },
 *      events: // jQuery UI Autocomplete Widget Events, http://api.jqueryui.com/autocomplete/#event
 *      methods: // extend jQuery UI Autocomplete Widget Methods to AngularJS, http://api.jqueryui.com/autocomplete/#methods
 *               // then you can invoke methods like this: $scope.myOptions.methods.search('term');
 *               // add a new method 'filter' for filtering source data in AngularJS controller
 *  };
 */

angular.module('ui.autocomplete', [])
  .directive('uiAutocomplete', ['$timeout', '$exceptionHandler',
    function ($timeout, $exceptionHandler) {
      var proto = $.ui.autocomplete.prototype;
      var initSource = proto._initSource;
      var slice = Array.prototype.slice;

      function filter(array, term) {
        var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), 'i');
        return $.grep(array, function (value) {
          return matcher.test($('<div>').html(value.label || value.value || value).text());
        });
      }

      $.extend(proto, {
        _initSource: function () {
          if (this.options.html && $.isArray(this.options.source)) {
            this.source = function (request, response) {
              response(filter(this.options.source, request.term));
            };
          } else {
            initSource.call(this);
          }
        },

        _normalize: function (items) {
          // assume all items have the right format
          return $.map(items, function (item) {
            if (item && typeof item === "object") {
              return $.extend({
                label: item.label || item.value,
                value: item.value || item.label
              }, item);
            } else {
              return {
                label: item + '',
                value: item
              };
            }
          });
        },

        _renderItemData: function (ul, item) {
          var element = item.groupLabel || item.label;
          if (item.groupLabel) {
            element = $('<div>').append(element).addClass('ui-menu-group');
          } else if (this.options.html) {
            if (typeof element === 'object') {
              element = $(element);
            }
            if (typeof element !== 'object' || element.length > 1 || !element.is('a')) {
              element = $('<a>').append(element);
            }
          } else {
            element = $('<a>').text(element);
          }
          return $('<li>').append(element).appendTo(ul).data('ui-autocomplete-item', item);
        },

        _resizeMenu: function () {
          var that = this;
          setTimeout(function () {
            var ul = that.menu.element;
            var maxHeight = ul.css('max-height') || 0,
              width = Math.max(
                ul.width('').outerWidth() + 1,
                that.element.outerWidth()),
              oHeight = that.element.height(),
              height = $(window).height() - that.options.outHeight - ul.offset().top;
            height = maxHeight && height > maxHeight ? maxHeight : height;
            ul.css({
              width: width,
              maxHeight: height
            });
          }, 10);
        }
      });

      return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
          var status = false,
            selectItem = null,
            events = {},
            ngModel = null,
            each = angular.forEach,
            isObject = angular.isObject,
            extend = angular.extend,
            autocomplete = scope.$eval(attr.uiAutocomplete),
            valueMethod = angular.bind(element, element.val),
            methodsName = ['close', 'destroy', 'disable', 'enable', 'instance', 'option', 'search', 'widget'],
            eventsName = ['change', 'close', 'create', 'focus', 'open', 'response', 'search', 'select'];

          var unregisterWatchModel = scope.$watch(attr.ngModel, function (value) {
            ngModel = value;
            if (isObject(ngModel)) {
              // not only primitive type ngModel, you can also use object type ngModel!
              // there must have a property 'value' in ngModel if object type
              ctrl.$formatters.push(function (obj) {
                return obj.value;
              });
              ctrl.$parsers.push(function (value) {
                ngModel.value = value;
                return ngModel;
              });
              scope.$watch(attr.ngModel, function (model) {
                if (valueMethod() !== model.value) {
                  ctrl.$viewValue = model.value;
                  ctrl.$render();
                }
              }, true);
              ctrl.$pristine = false; // hack:prevent change to dirty
              ctrl.$setViewValue(ngModel.value);
              ctrl.$pristine = true;
            }
            if (value) {
              // unregister the watch after get value
              unregisterWatchModel();
            }
          });

          var uiEvents = {
            open: function (event, ui) {
              status = true;
              selectItem = null;
            },
            close: function (event, ui) {
              status = false;
            },
            select: function (event, ui) {
              selectItem = ui;
              $timeout(function () {
                element.blur();
              }, 0);
            },
            change: function (event, ui) {
              // update view value and Model value
              var value = valueMethod(),
                selected = false;

              if (selectItem && selectItem.item && (value.indexOf(selectItem.item.value) !== -1)) {
                value = selectItem.item.value;
                selected = true;
              }

              scope.$apply(function () {
                if (autocomplete.options.onlySelectValid) {
                  ctrl.$setValidity('onlyselect', selected);
                }
                if (value === null) {
                  ctrl.$render();
                } else if (value === '') {
                  changeNgModel();
                } else if (ctrl.$viewValue !== value) {
                  ctrl.$setViewValue(value);
                  ctrl.$render();
                  changeNgModel(selectItem);
                }
              });
            }
          };

          function changeNgModel(data) {
            if (isObject(ngModel)) {
              if (!ctrl.$viewValue && ctrl.$viewValue !== 0) {
                emptyObj(ngModel);
              } else if (data && data.item) {
                data.item.label = isObject(data.item.label) ? $('<div>').append(data.item.label).html() : data.item.label;
                extend(ngModel, data.item);
              }
              each(ctrl.$viewChangeListeners, function (listener) {
                try {
                  listener();
                } catch (e) {
                  $exceptionHandler(e);
                }
              });
            }
          }

          function cleanNgModel() {
            ctrl.$setViewValue('');
            ctrl.$render();
            changeNgModel();
          }

          function autoFocusHandler() {
            if (autocomplete.options.focusOpen && !status) {
              element.autocomplete('search', '');
            }
          }

          function checkOptions(options) {
            options = isObject(options) ? options : {};
            // if source not set, disabled autocomplete
            options.disabled = options.source ? options.disabled : true;
            // if focusOpen, minLength must be 0
            options.appendTo = options.appendTo || element.parents('.ng-view')[0] || element.parents('[ng-view]')[0] || null;
            options.minLength = options.focusOpen ? 0 : options.minLength;
            options.outHeight = options.outHeight || 0;
            options.position = options.position || {
              my: 'left top',
              at: 'left bottom',
              collision: 'flipfit'
            };
            return options;
          }

          function emptyObj(a) {
            if (isObject(a)) {
              var reg = /^\$/;
              each(a, function (value, key) {
                var type = typeof value;
                if (reg.test(key)) {
                  return; // don't clean private property of AngularJS
                } else if (type === 'number') {
                  a[key] = 0;
                } else if (type === 'string') {
                  a[key] = '';
                } else if (type === 'boolean') {
                  a[key] = false;
                } else if (isObject(value)) {
                  emptyObj(value);
                }
              });
            }
          }

          if (!isObject(autocomplete)) {
            return;
          }

          autocomplete.methods = {};
          autocomplete.options = checkOptions(autocomplete.options);

          // extend events to Autocomplete
          each(eventsName, function (name) {
            var _event = autocomplete.options[name];
            _event = typeof _event === 'function' ? _event : angular.noop;
            events[name] = function (event, ui) {
              if (uiEvents[name]) {
                uiEvents[name](event, ui);
              }
              _event(event, ui);
              if (autocomplete.events && typeof autocomplete.events[name] === 'function') {
                autocomplete.events[name](event, ui);
              }
            };
          });

          // extend Autocomplete methods to AngularJS
          each(methodsName, function (name) {
            autocomplete.methods[name] = function () {
              var args = slice.call(arguments);
              args.unshift(name);
              return element.autocomplete.apply(element, args);
            };
          });
          // add filter method to AngularJS
          autocomplete.methods.filter = filter;
          autocomplete.methods.clean = cleanNgModel;

          element.on('focus', autoFocusHandler);

          element.autocomplete(extend({}, autocomplete.options, events));
          autocomplete.widget = element.autocomplete('widget');
          // remove default class, use bootstrap style
          // autocomplete.widget.removeClass('ui-menu ui-corner-all ui-widget-content').addClass('dropdown-menu');
        }
      };
    }
  ]);

(function(window, angular, undefined) {
'use strict';
/*
 jQuery UI Sortable plugin wrapper

 @param [ui-sortable] {object} Options to pass to $.fn.sortable() merged onto ui.config
 */
angular.module('ui.sortable', [])
  .value('uiSortableConfig',{})
  .directive('uiSortable', [
    'uiSortableConfig', '$timeout', '$log',
    function(uiSortableConfig, $timeout, $log) {
      return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
          var savedNodes;

          function combineCallbacks(first,second){
            if(second && (typeof second === 'function')) {
              return function(e, ui) {
                first(e, ui);
                second(e, ui);
              };
            }
            return first;
          }

          function hasSortingHelper (element, ui) {
            var helperOption = element.sortable('option','helper');
            return helperOption === 'clone' || (typeof helperOption === 'function' && ui.item.sortable.isCustomHelperUsed());
          }

          // thanks jquery-ui
          function isFloating (item) {
            return (/left|right/).test(item.css('float')) || (/inline|table-cell/).test(item.css('display'));
          }

          function afterStop(e, ui) {
            ui.item.sortable._destroy();
          }

          var opts = {};

          // directive specific options
          var directiveOpts = {
            'ui-floating': undefined
          };

          var callbacks = {
            receive: null,
            remove:null,
            start:null,
            stop:null,
            update:null
          };

          var wrappers = {
            helper: null
          };

          angular.extend(opts, directiveOpts, uiSortableConfig, scope.$eval(attrs.uiSortable));

          if (!angular.element.fn || !angular.element.fn.jquery) {
            $log.error('ui.sortable: jQuery should be included before AngularJS!');
            return;
          }

          if (ngModel) {

            // When we add or remove elements, we need the sortable to 'refresh'
            // so it can find the new/removed elements.
            scope.$watch(attrs.ngModel+'.length', function() {
              // Timeout to let ng-repeat modify the DOM
              $timeout(function() {
                // ensure that the jquery-ui-sortable widget instance
                // is still bound to the directive's element
                if (!!element.data('ui-sortable')) {
                  element.sortable('refresh');
                }
              }, 0, false);
            });

            callbacks.start = function(e, ui) {
                console.log("start");
              if (opts['ui-floating'] === 'auto') {
                // since the drag has started, the element will be
                // absolutely positioned, so we check its siblings
                var siblings = ui.item.siblings();
                angular.element(e.target).data('ui-sortable').floating = isFloating(siblings);
              }

              // Save the starting position of dragged item
              console.log(ui.item.index());
              ui.item.sortable = {
                model: ngModel.$modelValue[ui.item.index()],
                index: ui.item.index(),
                source: ui.item.parent(),
                sourceModel: ngModel.$modelValue,
                cancel: function () {
                  ui.item.sortable._isCanceled = true;
                },
                isCanceled: function () {
                  return ui.item.sortable._isCanceled;
                },
                isCustomHelperUsed: function () {
                  return !!ui.item.sortable._isCustomHelperUsed;
                },
                _isCanceled: false,
                _isCustomHelperUsed: ui.item.sortable._isCustomHelperUsed,
                _destroy: function () {
                  angular.forEach(ui.item.sortable, function(value, key) {
                    ui.item.sortable[key] = undefined;
                  });
                }
              };
            };

            callbacks.activate = function(/*e, ui*/) {
                console.log("atct");
              // We need to make a copy of the current element's contents so
              // we can restore it after sortable has messed it up.
              // This is inside activate (instead of start) in order to save
              // both lists when dragging between connected lists.
              savedNodes = element.contents();

              // If this list has a placeholder (the connected lists won't),
              // don't inlcude it in saved nodes.
              var placeholder = element.sortable('option','placeholder');

              // placeholder.element will be a function if the placeholder, has
              // been created (placeholder will be an object).  If it hasn't
              // been created, either placeholder will be false if no
              // placeholder class was given or placeholder.element will be
              // undefined if a class was given (placeholder will be a string)
              if (placeholder && placeholder.element && typeof placeholder.element === 'function') {
                var phElement = placeholder.element();
                // workaround for jquery ui 1.9.x,
                // not returning jquery collection
                phElement = angular.element(phElement);

                // exact match with the placeholder's class attribute to handle
                // the case that multiple connected sortables exist and
                // the placehoilder option equals the class of sortable items
                var excludes = element.find('[class="' + phElement.attr('class') + '"]');

                savedNodes = savedNodes.not(excludes);
              }
            };

            callbacks.update = function(e, ui) {
              // Save current drop position but only if this is not a second
              // update that happens when moving between lists because then
              // the value will be overwritten with the old value
              console.log("update")

              if(!ui.item.sortable.received) {
                console.log("not received")
                ui.item.sortable.dropindex = ui.item.index();
                console.log(ui.item.sortable.dropindex)
                var droptarget = ui.item.parent();
                ui.item.sortable.droptarget = droptarget;
                var attr = droptarget.attr('ng-model') || droptarget.attr('data-ng-model');
                console.log(attr);
                ui.item.sortable.droptargetModel = droptarget.scope().$eval(attr);

                // Cancel the sort (let ng-repeat do the sort for us)
                // Don't cancel if this is the received list because it has
                // already been canceled in the other list, and trying to cancel
                // here will mess up the DOM.
                element.sortable('cancel');
              }

              // Put the nodes back exactly the way they started (this is very
              // important because ng-repeat uses comment elements to delineate
              // the start and stop of repeat sections and sortable doesn't
              // respect their order (even if we cancel, the order of the
              // comments are still messed up).
              if (hasSortingHelper(element, ui) && !ui.item.sortable.received &&
                  element.sortable( 'option', 'appendTo' ) === 'parent') {
                // restore all the savedNodes except .ui-sortable-helper element
                // (which is placed last). That way it will be garbage collected.
                savedNodes = savedNodes.not(savedNodes.last());
              }
              savedNodes.appendTo(element);

              // If this is the target connected list then
              // it's safe to clear the restored nodes since:
              // update is currently running and
              // stop is not called for the target list.
              if(ui.item.sortable.received) {
                savedNodes = null;
              }

              // If received is true (an item was dropped in from another list)
              // then we add the new item to this list otherwise wait until the
              // stop event where we will know if it was a sort or item was
              // moved here from another list
              if(ui.item.sortable.received && !ui.item.sortable.isCanceled()) {
                scope.$apply(function () {
                  ngModel.$modelValue.splice(ui.item.sortable.dropindex, 0,
                                             ui.item.sortable.moved);
                });
              }
            };

            callbacks.stop = function(e, ui) {
                console.log("stop")
              // If the received flag hasn't be set on the item, this is a
              // normal sort, if dropindex is set, the item was moved, so move
              // the items in the list.
              if(!ui.item.sortable.received &&
                 ('dropindex' in ui.item.sortable) &&
                 !ui.item.sortable.isCanceled()) {
                 console.log("sorting?");
                 console.log(ui.item.sortable.dropindex)
                 console.log(ui.item.sortable.index)
                 console.log(ngModel.$modelValue)

                scope.$apply(function () {
                    e = ngModel.$modelValue.splice(ui.item.sortable.index, 1)[0];
                    console.log(e);
                    ngModel.$modelValue.splice(ui.item.sortable.dropindex, 0 , e);

                  //ngModel.$modelValue.splice(
                    //ui.item.sortable.dropindex, 0,
                    //ngModel.$modelValue.splice(ui.item.sortable.index, 1)[0]);
                });
                 console.log(ngModel.$modelValue)
              } else {
                // if the item was not moved, then restore the elements
                // so that the ngRepeat's comment are correct.
                if ((!('dropindex' in ui.item.sortable) || ui.item.sortable.isCanceled()) &&
                    !hasSortingHelper(element, ui)) {
                  savedNodes.appendTo(element);
                }
              }

              // It's now safe to clear the savedNodes
              // since stop is the last callback.
              savedNodes = null;
            };

            callbacks.receive = function(e, ui) {
              // An item was dropped here from another list, set a flag on the
              // item.
              ui.item.sortable.received = true;
            };

            callbacks.remove = function(e, ui) {
              // Workaround for a problem observed in nested connected lists.
              // There should be an 'update' event before 'remove' when moving
              // elements. If the event did not fire, cancel sorting.
              if (!('dropindex' in ui.item.sortable)) {
                element.sortable('cancel');
                ui.item.sortable.cancel();
              }

              // Remove the item from this list's model and copy data into item,
              // so the next list can retrive it
              if (!ui.item.sortable.isCanceled()) {
                scope.$apply(function () {
                  ui.item.sortable.moved = ngModel.$modelValue.splice(
                    ui.item.sortable.index, 1)[0];
                });
              }
            };

            wrappers.helper = function (inner) {
              if (inner && typeof inner === 'function') {
                return function (e, item) {
                  var innerResult = inner(e, item);
                  item.sortable._isCustomHelperUsed = item !== innerResult;
                  return innerResult;
                };
              }
              return inner;
            };

            scope.$watch(attrs.uiSortable, function(newVal /*, oldVal*/) {
              // ensure that the jquery-ui-sortable widget instance
              // is still bound to the directive's element
              if (!!element.data('ui-sortable')) {
                angular.forEach(newVal, function(value, key) {
                  // if it's a custom option of the directive,
                  // handle it approprietly
                  if (key in directiveOpts) {
                    if (key === 'ui-floating' && (value === false || value === true)) {
                      element.data('ui-sortable').floating = value;
                    }

                    opts[key] = value;
                    return;
                  }

                  if (callbacks[key]) {
                    if( key === 'stop' ){
                      // call apply after stop
                      value = combineCallbacks(
                        value, function() { scope.$apply(); });

                      value = combineCallbacks(value, afterStop);
                    }
                    // wrap the callback
                    value = combineCallbacks(callbacks[key], value);
                  } else if (wrappers[key]) {
                    value = wrappers[key](value);
                  }

                  opts[key] = value;
                  element.sortable('option', key, value);
                });
              }
            }, true);

            angular.forEach(callbacks, function(value, key) {
              opts[key] = combineCallbacks(value, opts[key]);
              if( key === 'stop' ){
                opts[key] = combineCallbacks(opts[key], afterStop);
              }
            });

          } else {
            $log.info('ui.sortable: ngModel not provided!', element);
          }

          // Create sortable
          element.sortable(opts);
        }
      };
    }
  ]);

})(window, window.angular);

/*!
 * Bootstrap Confirmation
 * Copyright 2013 Nimit Suwannagate <ethaizone@hotmail.com>
 * Copyright 2014 Damien "Mistic" Sorel <http://www.strangeplanet.fr>
 * Licensed under the Apache License, Version 2.0 (the "License")
 */

(function ($) {
  'use strict';

  // Confirmation extends popover.js
  if (!$.fn.popover) throw new Error('Confirmation requires popover.js');

  // CONFIRMATION PUBLIC CLASS DEFINITION
  // ===============================
  var Confirmation = function (element, options) {
    this.init('confirmation', element, options);

    var that = this;

    if (!this.options.selector) {
      // get existing href and target
      if (this.$element.attr('href')) {
        this.options.href = this.$element.attr('href');
        this.$element.removeAttr('href');
        if (this.$element.attr('target')) {
          this.options.target = this.$element.attr('target');
        }
      }

      // cancel original event
      this.$element.on(that.options.trigger, function(e, ack) {
        if (!ack) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
      });

      // trigger original event on confirm
      this.$element.on('confirmed.bs.confirmation', function(e) {
        $(this).trigger(that.options.trigger, [true]);
      });

      // manage singleton
      this.$element.on('show.bs.confirmation', function(e) {
        if (that.options.singleton) {
          // close all other popover already initialized
          $(that.options._selector).not($(this)).filter(function() {
            return $(this).data('bs.confirmation') !== undefined;
          }).confirmation('hide');
        }
      });
    }

    if (!this.options._isDelegate) {
      // manage popout
      this.eventBody = false;
      this.uid = this.$element[0].id || this.getUID('group_');

      this.$element.on('shown.bs.confirmation', function(e) {
        if (that.options.popout && !that.eventBody) {
          var $this = $(this);
          that.eventBody = $('body').on('click.bs.confirmation.'+that.uid, function(e) {
            if ($(that.options._selector).is(e.target)) {
              return;
            }
  
            // close all popover already initialized
            $(that.options._selector).filter(function() {
              return $(this).data('bs.confirmation') !== undefined;
            }).confirmation('hide');

            $('body').off('click.bs.'+that.uid);
            that.eventBody = false;
          });
        }
      });
    }
  };

  Confirmation.DEFAULTS = $.extend({}, $.fn.popover.Constructor.DEFAULTS, {
    placement: 'top',
    title: 'Are you sure?',
    html: true,
    href: false,
    popout: false,
    singleton: false,
    target: '_self',
    onConfirm: $.noop,
    onCancel: $.noop,
    btnOkClass: 'btn-xs btn-primary',
    btnOkIcon: 'glyphicon glyphicon-ok',
    btnOkLabel: 'Yes',
    btnCancelClass: 'btn-xs btn-default',
    btnCancelIcon: 'glyphicon glyphicon-remove',
    btnCancelLabel: 'No',
    template:
      '<div class="popover confirmation">' +
        '<div class="arrow"></div>' +
        '<h3 class="popover-title"></h3>' +
        '<div class="popover-content text-center">'+
          '<div class="btn-group">'+
            '<a class="btn" data-apply="confirmation"></a>'+
            '<a class="btn" data-dismiss="confirmation"></a>'+
          '</div>'+
        '</div>'+
      '</div>'
  });

  Confirmation.prototype = $.extend({}, $.fn.popover.Constructor.prototype);

  Confirmation.prototype.constructor = Confirmation;

  Confirmation.prototype.getDefaults = function () {
    return Confirmation.DEFAULTS;
  };

  // custom init keeping trace of selectors
  Confirmation.prototype.init = function(type, element, options) {
    $.fn.popover.Constructor.prototype.init.call(this, type, element, options);

    this.options._isDelegate = false;
    if (options.selector) { // container of buttons
      this.options._selector = this._options._selector = options._root_selector +' '+ options.selector;
    }
    else if (options._selector) { // children of container
      this.options._selector = options._selector;
      this.options._isDelegate = true;
    }
    else { // standalone
      this.options._selector = options._root_selector;
    }
  };

  Confirmation.prototype.setContent = function () {
    var that = this,
        $tip = this.tip(),
        o = this.options;

    $tip.find('.popover-title')[o.html ? 'html' : 'text'](this.getTitle());

    // configure 'ok' button
    $tip.find('[data-apply="confirmation"]')
      .addClass(o.btnOkClass)
      .html(o.btnOkLabel)
      .prepend($('<i></i>').addClass(o.btnOkIcon), ' ')
      .off('click')
      .one('click', function(e) {
        that.getOnConfirm.call(that).call(that.$element);
        that.$element.trigger('confirmed.bs.confirmation');
        that.leave(that);
      });

    // add href to confirm button if needed
    if (o.href) {
      $tip.find('[data-apply="confirmation"]').attr({
        href: o.href,
        target: o.target
      });
    }

    // configure 'cancel' button
    $tip.find('[data-dismiss="confirmation"]')
      .addClass(o.btnCancelClass)
      .html(o.btnCancelLabel)
      .prepend($('<i></i>').addClass(o.btnCancelIcon), ' ')
      .off('click')
      .one('click', function(e) {
        that.getOnCancel.call(that).call(that.$element);
        that.$element.trigger('canceled.bs.confirmation');
        that.leave(that);
      });

    $tip.removeClass('fade top bottom left right in');

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) {
      $tip.find('.popover-title').hide();
    }
  };

  Confirmation.prototype.getOnConfirm = function() {
    if (this.$element.attr('data-on-confirm')) {
      return getFunctionFromString(this.$element.attr('data-on-confirm'));
    }
    else {
      return this.options.onConfirm;
    }
  };

  Confirmation.prototype.getOnCancel = function() {
    if (this.$element.attr('data-on-cancel')) {
      return getFunctionFromString(this.$element.attr('data-on-cancel'));
    }
    else {
      return this.options.onCancel;
    }
  };

  /*
   * Generates an anonymous function from a function name
   * function name may contain dots (.) to navigate through objects
   * root context is window
   */
  function getFunctionFromString(functionName) {
    var context = window,
        namespaces = functionName.split('.'),
        func = namespaces.pop();

    for (var i=0, l=namespaces.length; i<l; i++) {
      context = context[namespaces[i]];
    }

    return function() {
      context[func].call(this);
    };
  }


  // CONFIRMATION PLUGIN DEFINITION
  // =========================

  var old = $.fn.confirmation;

  $.fn.confirmation = function (option) {
    var options = (typeof option == 'object' && option) || {};
    options._root_selector = this.selector;

    return this.each(function () {
      var $this = $(this),
          data  = $this.data('bs.confirmation');

      if (!data && option == 'destroy') {
        return;
      }
      if (!data) {
        $this.data('bs.confirmation', (data = new Confirmation(this, options)));
      }
      if (typeof option == 'string') {
        data[option]();
      }
    });
  };

  $.fn.confirmation.Constructor = Confirmation;


  // CONFIRMATION NO CONFLICT
  // ===================

  $.fn.confirmation.noConflict = function () {
    $.fn.confirmation = old;
    return this;
  };

}(jQuery));
/* =========================================================
 * bootstrap-datepicker.js
 * Repo: https://github.com/eternicode/bootstrap-datepicker/
 * Demo: http://eternicode.github.io/bootstrap-datepicker/
 * Docs: http://bootstrap-datepicker.readthedocs.org/
 * Forked from http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Started by Stefan Petre; improvements by Andrew Rowls + contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

(function($, undefined){

	var $window = $(window);

	function UTCDate(){
		return new Date(Date.UTC.apply(Date, arguments));
	}
	function UTCToday(){
		var today = new Date();
		return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
	}
	function alias(method){
		return function(){
			return this[method].apply(this, arguments);
		};
	}

	var DateArray = (function(){
		var extras = {
			get: function(i){
				return this.slice(i)[0];
			},
			contains: function(d){
				// Array.indexOf is not cross-browser;
				// $.inArray doesn't work with Dates
				var val = d && d.valueOf();
				for (var i=0, l=this.length; i < l; i++)
					if (this[i].valueOf() === val)
						return i;
				return -1;
			},
			remove: function(i){
				this.splice(i,1);
			},
			replace: function(new_array){
				if (!new_array)
					return;
				if (!$.isArray(new_array))
					new_array = [new_array];
				this.clear();
				this.push.apply(this, new_array);
			},
			clear: function(){
				this.length = 0;
			},
			copy: function(){
				var a = new DateArray();
				a.replace(this);
				return a;
			}
		};

		return function(){
			var a = [];
			a.push.apply(a, arguments);
			$.extend(a, extras);
			return a;
		};
	})();


	// Picker object

	var Datepicker = function(element, options){
		this.dates = new DateArray();
		this.viewDate = UTCToday();
		this.focusDate = null;

		this._process_options(options);

		this.element = $(element);
		this.isInline = false;
		this.isInput = this.element.is('input');
		this.component = this.element.is('.date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
		this.hasInput = this.component && this.element.find('input').length;
		if (this.component && this.component.length === 0)
			this.component = false;

		this.picker = $(DPGlobal.template);
		this._buildEvents();
		this._attachEvents();

		if (this.isInline){
			this.picker.addClass('datepicker-inline').appendTo(this.element);
		}
		else {
			this.picker.addClass('datepicker-dropdown dropdown-menu');
		}

		if (this.o.rtl){
			this.picker.addClass('datepicker-rtl');
		}

		this.viewMode = this.o.startView;

		if (this.o.calendarWeeks)
			this.picker.find('tfoot th.today, tfoot th.clear')
						.attr('colspan', function(i, val){
							return parseInt(val) + 1;
						});

		this._allow_update = false;

		this.setStartDate(this._o.startDate);
		this.setEndDate(this._o.endDate);
		this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);

		this.fillDow();
		this.fillMonths();

		this._allow_update = true;

		this.update();
		this.showMode();

		if (this.isInline){
			this.show();
		}
	};

	Datepicker.prototype = {
		constructor: Datepicker,

		_process_options: function(opts){
			// Store raw options for reference
			this._o = $.extend({}, this._o, opts);
			// Processed options
			var o = this.o = $.extend({}, this._o);

			// Check if "de-DE" style date is available, if not language should
			// fallback to 2 letter code eg "de"
			var lang = o.language;
			if (!dates[lang]){
				lang = lang.split('-')[0];
				if (!dates[lang])
					lang = defaults.language;
			}
			o.language = lang;

			switch (o.startView){
				case 2:
				case 'decade':
					o.startView = 2;
					break;
				case 1:
				case 'year':
					o.startView = 1;
					break;
				default:
					o.startView = 0;
			}

			switch (o.minViewMode){
				case 1:
				case 'months':
					o.minViewMode = 1;
					break;
				case 2:
				case 'years':
					o.minViewMode = 2;
					break;
				default:
					o.minViewMode = 0;
			}

			o.startView = Math.max(o.startView, o.minViewMode);

			// true, false, or Number > 0
			if (o.multidate !== true){
				o.multidate = Number(o.multidate) || false;
				if (o.multidate !== false)
					o.multidate = Math.max(0, o.multidate);
				else
					o.multidate = 1;
			}
			o.multidateSeparator = String(o.multidateSeparator);

			o.weekStart %= 7;
			o.weekEnd = ((o.weekStart + 6) % 7);

			var format = DPGlobal.parseFormat(o.format);
			if (o.startDate !== -Infinity){
				if (!!o.startDate){
					if (o.startDate instanceof Date)
						o.startDate = this._local_to_utc(this._zero_time(o.startDate));
					else
						o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);
				}
				else {
					o.startDate = -Infinity;
				}
			}
			if (o.endDate !== Infinity){
				if (!!o.endDate){
					if (o.endDate instanceof Date)
						o.endDate = this._local_to_utc(this._zero_time(o.endDate));
					else
						o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);
				}
				else {
					o.endDate = Infinity;
				}
			}

			o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];
			if (!$.isArray(o.daysOfWeekDisabled))
				o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
			o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d){
				return parseInt(d, 10);
			});

			var plc = String(o.orientation).toLowerCase().split(/\s+/g),
				_plc = o.orientation.toLowerCase();
			plc = $.grep(plc, function(word){
				return (/^auto|left|right|top|bottom$/).test(word);
			});
			o.orientation = {x: 'auto', y: 'auto'};
			if (!_plc || _plc === 'auto')
				; // no action
			else if (plc.length === 1){
				switch (plc[0]){
					case 'top':
					case 'bottom':
						o.orientation.y = plc[0];
						break;
					case 'left':
					case 'right':
						o.orientation.x = plc[0];
						break;
				}
			}
			else {
				_plc = $.grep(plc, function(word){
					return (/^left|right$/).test(word);
				});
				o.orientation.x = _plc[0] || 'auto';

				_plc = $.grep(plc, function(word){
					return (/^top|bottom$/).test(word);
				});
				o.orientation.y = _plc[0] || 'auto';
			}
		},
		_events: [],
		_secondaryEvents: [],
		_applyEvents: function(evs){
			for (var i=0, el, ch, ev; i < evs.length; i++){
				el = evs[i][0];
				if (evs[i].length === 2){
					ch = undefined;
					ev = evs[i][1];
				}
				else if (evs[i].length === 3){
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.on(ev, ch);
			}
		},
		_unapplyEvents: function(evs){
			for (var i=0, el, ev, ch; i < evs.length; i++){
				el = evs[i][0];
				if (evs[i].length === 2){
					ch = undefined;
					ev = evs[i][1];
				}
				else if (evs[i].length === 3){
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.off(ev, ch);
			}
		},
		_buildEvents: function(){
			if (this.isInput){ // single input
				this._events = [
					[this.element, {
						focus: $.proxy(this.show, this),
						keyup: $.proxy(function(e){
							if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)
								this.update();
						}, this),
						keydown: $.proxy(this.keydown, this)
					}]
				];
			}
			else if (this.component && this.hasInput){ // component: input + button
				this._events = [
					// For components that are not readonly, allow keyboard nav
					[this.element.find('input'), {
						focus: $.proxy(this.show, this),
						keyup: $.proxy(function(e){
							if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)
								this.update();
						}, this),
						keydown: $.proxy(this.keydown, this)
					}],
					[this.component, {
						click: $.proxy(this.show, this)
					}]
				];
			}
			else if (this.element.is('div')){  // inline datepicker
				this.isInline = true;
			}
			else {
				this._events = [
					[this.element, {
						click: $.proxy(this.show, this)
					}]
				];
			}
			this._events.push(
				// Component: listen for blur on element descendants
				[this.element, '*', {
					blur: $.proxy(function(e){
						this._focused_from = e.target;
					}, this)
				}],
				// Input: listen for blur on element
				[this.element, {
					blur: $.proxy(function(e){
						this._focused_from = e.target;
					}, this)
				}]
			);

			this._secondaryEvents = [
				[this.picker, {
					click: $.proxy(this.click, this)
				}],
				[$(window), {
					resize: $.proxy(this.place, this)
				}],
				[$(document), {
					'mousedown touchstart': $.proxy(function(e){
						// Clicked outside the datepicker, hide it
						if (!(
							this.element.is(e.target) ||
							this.element.find(e.target).length ||
							this.picker.is(e.target) ||
							this.picker.find(e.target).length
						)){
							this.hide();
						}
					}, this)
				}]
			];
		},
		_attachEvents: function(){
			this._detachEvents();
			this._applyEvents(this._events);
		},
		_detachEvents: function(){
			this._unapplyEvents(this._events);
		},
		_attachSecondaryEvents: function(){
			this._detachSecondaryEvents();
			this._applyEvents(this._secondaryEvents);
		},
		_detachSecondaryEvents: function(){
			this._unapplyEvents(this._secondaryEvents);
		},
		_trigger: function(event, altdate){
			var date = altdate || this.dates.get(-1),
				local_date = this._utc_to_local(date);

			this.element.trigger({
				type: event,
				date: local_date,
				dates: $.map(this.dates, this._utc_to_local),
				format: $.proxy(function(ix, format){
					if (arguments.length === 0){
						ix = this.dates.length - 1;
						format = this.o.format;
					}
					else if (typeof ix === 'string'){
						format = ix;
						ix = this.dates.length - 1;
					}
					format = format || this.o.format;
					var date = this.dates.get(ix);
					return DPGlobal.formatDate(date, format, this.o.language);
				}, this)
			});
		},

		show: function(){
			if (!this.isInline)
				this.picker.appendTo('body');
			this.picker.show();
			this.place();
			this._attachSecondaryEvents();
			this._trigger('show');
		},

		hide: function(){
			if (this.isInline)
				return;
			if (!this.picker.is(':visible'))
				return;
			this.focusDate = null;
			this.picker.hide().detach();
			this._detachSecondaryEvents();
			this.viewMode = this.o.startView;
			this.showMode();

			if (
				this.o.forceParse &&
				(
					this.isInput && this.element.val() ||
					this.hasInput && this.element.find('input').val()
				)
			)
				this.setValue();
			this._trigger('hide');
		},

		remove: function(){
			this.hide();
			this._detachEvents();
			this._detachSecondaryEvents();
			this.picker.remove();
			delete this.element.data().datepicker;
			if (!this.isInput){
				delete this.element.data().date;
			}
		},

		_utc_to_local: function(utc){
			return utc && new Date(utc.getTime() + (utc.getTimezoneOffset()*60000));
		},
		_local_to_utc: function(local){
			return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));
		},
		_zero_time: function(local){
			return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
		},
		_zero_utc_time: function(utc){
			return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
		},

		getDates: function(){
			return $.map(this.dates, this._utc_to_local);
		},

		getUTCDates: function(){
			return $.map(this.dates, function(d){
				return new Date(d);
			});
		},

		getDate: function(){
			return this._utc_to_local(this.getUTCDate());
		},

		getUTCDate: function(){
			return new Date(this.dates.get(-1));
		},

		setDates: function(){
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, args);
			this._trigger('changeDate');
			this.setValue();
		},

		setUTCDates: function(){
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, $.map(args, this._utc_to_local));
			this._trigger('changeDate');
			this.setValue();
		},

		setDate: alias('setDates'),
		setUTCDate: alias('setUTCDates'),

		setValue: function(){
			var formatted = this.getFormattedDate();
			if (!this.isInput){
				if (this.component){
					this.element.find('input').val(formatted).change();
				}
			}
			else {
				this.element.val(formatted).change();
			}
		},

		getFormattedDate: function(format){
			if (format === undefined)
				format = this.o.format;

			var lang = this.o.language;
			return $.map(this.dates, function(d){
				return DPGlobal.formatDate(d, format, lang);
			}).join(this.o.multidateSeparator);
		},

		setStartDate: function(startDate){
			this._process_options({startDate: startDate});
			this.update();
			this.updateNavArrows();
		},

		setEndDate: function(endDate){
			this._process_options({endDate: endDate});
			this.update();
			this.updateNavArrows();
		},

		setDaysOfWeekDisabled: function(daysOfWeekDisabled){
			this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
			this.update();
			this.updateNavArrows();
		},

		place: function(){
			if (this.isInline)
				return;
			var calendarWidth = this.picker.outerWidth(),
				calendarHeight = this.picker.outerHeight(),
				visualPadding = 10,
				windowWidth = $window.width(),
				windowHeight = $window.height(),
				scrollTop = $window.scrollTop();

			var parentsZindex = [];
			this.element.parents().each(function() {
				var itemZIndex = $(this).css('z-index');
				if ( itemZIndex !== 'auto' && itemZIndex !== 0 ) parentsZindex.push( parseInt( itemZIndex ) );
			});
			var zIndex = Math.max.apply( Math, parentsZindex ) + 10;
			var offset = this.component ? this.component.parent().offset() : this.element.offset();
			var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
			var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
			var left = offset.left,
				top = offset.top;

			this.picker.removeClass(
				'datepicker-orient-top datepicker-orient-bottom '+
				'datepicker-orient-right datepicker-orient-left'
			);

			if (this.o.orientation.x !== 'auto'){
				this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
				if (this.o.orientation.x === 'right')
					left -= calendarWidth - width;
			}
			// auto x orientation is best-placement: if it crosses a window
			// edge, fudge it sideways
			else {
				// Default to left
				this.picker.addClass('datepicker-orient-left');
				if (offset.left < 0)
					left -= offset.left - visualPadding;
				else if (offset.left + calendarWidth > windowWidth)
					left = windowWidth - calendarWidth - visualPadding;
			}

			// auto y orientation is best-situation: top or bottom, no fudging,
			// decision based on which shows more of the calendar
			var yorient = this.o.orientation.y,
				top_overflow, bottom_overflow;
			if (yorient === 'auto'){
				top_overflow = -scrollTop + offset.top - calendarHeight;
				bottom_overflow = scrollTop + windowHeight - (offset.top + height + calendarHeight);
				if (Math.max(top_overflow, bottom_overflow) === bottom_overflow)
					yorient = 'top';
				else
					yorient = 'bottom';
			}
			this.picker.addClass('datepicker-orient-' + yorient);
			if (yorient === 'top')
				top += height;
			else
				top -= calendarHeight + parseInt(this.picker.css('padding-top'));

			this.picker.css({
				top: top,
				left: left,
				zIndex: zIndex
			});
		},

		_allow_update: true,
		update: function(){
			if (!this._allow_update)
				return;

			var oldDates = this.dates.copy(),
				dates = [],
				fromArgs = false;
			if (arguments.length){
				$.each(arguments, $.proxy(function(i, date){
					if (date instanceof Date)
						date = this._local_to_utc(date);
					dates.push(date);
				}, this));
				fromArgs = true;
			}
			else {
				dates = this.isInput
						? this.element.val()
						: this.element.data('date') || this.element.find('input').val();
				if (dates && this.o.multidate)
					dates = dates.split(this.o.multidateSeparator);
				else
					dates = [dates];
				delete this.element.data().date;
			}

			dates = $.map(dates, $.proxy(function(date){
				return DPGlobal.parseDate(date, this.o.format, this.o.language);
			}, this));
			dates = $.grep(dates, $.proxy(function(date){
				return (
					date < this.o.startDate ||
					date > this.o.endDate ||
					!date
				);
			}, this), true);
			this.dates.replace(dates);

			if (this.dates.length)
				this.viewDate = new Date(this.dates.get(-1));
			else if (this.viewDate < this.o.startDate)
				this.viewDate = new Date(this.o.startDate);
			else if (this.viewDate > this.o.endDate)
				this.viewDate = new Date(this.o.endDate);

			if (fromArgs){
				// setting date by clicking
				this.setValue();
			}
			else if (dates.length){
				// setting date by typing
				if (String(oldDates) !== String(this.dates))
					this._trigger('changeDate');
			}
			if (!this.dates.length && oldDates.length)
				this._trigger('clearDate');

			this.fill();
		},

		fillDow: function(){
			var dowCnt = this.o.weekStart,
				html = '<tr>';
			if (this.o.calendarWeeks){
				var cell = '<th class="cw">&nbsp;</th>';
				html += cell;
				this.picker.find('.datepicker-days thead tr:first-child').prepend(cell);
			}
			while (dowCnt < this.o.weekStart + 7){
				html += '<th class="dow">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
			}
			html += '</tr>';
			this.picker.find('.datepicker-days thead').append(html);
		},

		fillMonths: function(){
			var html = '',
			i = 0;
			while (i < 12){
				html += '<span class="month">'+dates[this.o.language].monthsShort[i++]+'</span>';
			}
			this.picker.find('.datepicker-months td').html(html);
		},

		setRange: function(range){
			if (!range || !range.length)
				delete this.range;
			else
				this.range = $.map(range, function(d){
					return d.valueOf();
				});
			this.fill();
		},

		getClassNames: function(date){
			var cls = [],
				year = this.viewDate.getUTCFullYear(),
				month = this.viewDate.getUTCMonth(),
				today = new Date();
			if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){
				cls.push('old');
			}
			else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){
				cls.push('new');
			}
			if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
				cls.push('focused');
			// Compare internal UTC date with local today, not UTC today
			if (this.o.todayHighlight &&
				date.getUTCFullYear() === today.getFullYear() &&
				date.getUTCMonth() === today.getMonth() &&
				date.getUTCDate() === today.getDate()){
				cls.push('today');
			}
			if (this.dates.contains(date) !== -1)
				cls.push('active');
			if (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate ||
				$.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1){
				cls.push('disabled');
			}
			if (this.range){
				if (date > this.range[0] && date < this.range[this.range.length-1]){
					cls.push('range');
				}
				if ($.inArray(date.valueOf(), this.range) !== -1){
					cls.push('selected');
				}
			}
			return cls;
		},

		fill: function(){
			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
				startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
				endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
				endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
				todaytxt = dates[this.o.language].today || dates['en'].today || '',
				cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
				tooltip;
			if (isNaN(year) || isNaN(month)) return;
			this.picker.find('.datepicker-days thead th.datepicker-switch')
						.text(dates[this.o.language].months[month]+' '+year);
			this.picker.find('tfoot th.today')
						.text(todaytxt)
						.toggle(this.o.todayBtn !== false);
			this.picker.find('tfoot th.clear')
						.text(cleartxt)
						.toggle(this.o.clearBtn !== false);
			this.updateNavArrows();
			this.fillMonths();
			var prevMonth = UTCDate(year, month-1, 28),
				day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
			prevMonth.setUTCDate(day);
			prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
			var nextMonth = new Date(prevMonth);
			nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
			nextMonth = nextMonth.valueOf();
			var html = [];
			var clsName;
			while (prevMonth.valueOf() < nextMonth){
				if (prevMonth.getUTCDay() === this.o.weekStart){
					html.push('<tr>');
					if (this.o.calendarWeeks){
						// ISO 8601: First week contains first thursday.
						// ISO also states week starts on Monday, but we can be more abstract here.
						var
							// Start of current week: based on weekstart/current date
							ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
							// Thursday of this week
							th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
							// First Thursday of year, year from thursday
							yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
							// Calendar week: ms between thursdays, div ms per day, div 7 days
							calWeek =  (th - yth) / 864e5 / 7 + 1;
						html.push('<td class="cw">'+ calWeek +'</td>');

					}
				}
				clsName = this.getClassNames(prevMonth);
				clsName.push('day');

				if (this.o.beforeShowDay !== $.noop){
					var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
					if (before === undefined)
						before = {};
					else if (typeof(before) === 'boolean')
						before = {enabled: before};
					else if (typeof(before) === 'string')
						before = {classes: before};
					if (before.enabled === false)
						clsName.push('disabled');
					if (before.classes)
						clsName = clsName.concat(before.classes.split(/\s+/));
					if (before.tooltip)
						tooltip = before.tooltip;
				}

				clsName = $.unique(clsName);
				html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');
				tooltip = null;
				if (prevMonth.getUTCDay() === this.o.weekEnd){
					html.push('</tr>');
				}
				prevMonth.setUTCDate(prevMonth.getUTCDate()+1);
			}
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));

			var months = this.picker.find('.datepicker-months')
						.find('th:eq(1)')
							.text(year)
							.end()
						.find('span').removeClass('active');

			$.each(this.dates, function(i, d){
				if (d.getUTCFullYear() === year)
					months.eq(d.getUTCMonth()).addClass('active');
			});

			if (year < startYear || year > endYear){
				months.addClass('disabled');
			}
			if (year === startYear){
				months.slice(0, startMonth).addClass('disabled');
			}
			if (year === endYear){
				months.slice(endMonth+1).addClass('disabled');
			}

			html = '';
			year = parseInt(year/10, 10) * 10;
			var yearCont = this.picker.find('.datepicker-years')
								.find('th:eq(1)')
									.text(year + '-' + (year + 9))
									.end()
								.find('td');
			year -= 1;
			var years = $.map(this.dates, function(d){
					return d.getUTCFullYear();
				}),
				classes;
			for (var i = -1; i < 11; i++){
				classes = ['year'];
				if (i === -1)
					classes.push('old');
				else if (i === 10)
					classes.push('new');
				if ($.inArray(year, years) !== -1)
					classes.push('active');
				if (year < startYear || year > endYear)
					classes.push('disabled');
				html += '<span class="' + classes.join(' ') + '">'+year+'</span>';
				year += 1;
			}
			yearCont.html(html);
		},

		updateNavArrows: function(){
			if (!this._allow_update)
				return;

			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth();
			switch (this.viewMode){
				case 0:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()){
						this.picker.find('.prev').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()){
						this.picker.find('.next').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
				case 1:
				case 2:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear()){
						this.picker.find('.prev').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear()){
						this.picker.find('.next').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
			}
		},

		click: function(e){
			e.preventDefault();
			var target = $(e.target).closest('span, td, th'),
				year, month, day;
			if (target.length === 1){
				switch (target[0].nodeName.toLowerCase()){
					case 'th':
						switch (target[0].className){
							case 'datepicker-switch':
								this.showMode(1);
								break;
							case 'prev':
							case 'next':
								var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1);
								switch (this.viewMode){
									case 0:
										this.viewDate = this.moveMonth(this.viewDate, dir);
										this._trigger('changeMonth', this.viewDate);
										break;
									case 1:
									case 2:
										this.viewDate = this.moveYear(this.viewDate, dir);
										if (this.viewMode === 1)
											this._trigger('changeYear', this.viewDate);
										break;
								}
								this.fill();
								break;
							case 'today':
								var date = new Date();
								date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

								this.showMode(-2);
								var which = this.o.todayBtn === 'linked' ? null : 'view';
								this._setDate(date, which);
								break;
							case 'clear':
								var element;
								if (this.isInput)
									element = this.element;
								else if (this.component)
									element = this.element.find('input');
								if (element)
									element.val("").change();
								this.update();
								this._trigger('changeDate');
								if (this.o.autoclose)
									this.hide();
								break;
						}
						break;
					case 'span':
						if (!target.is('.disabled')){
							this.viewDate.setUTCDate(1);
							if (target.is('.month')){
								day = 1;
								month = target.parent().find('span').index(target);
								year = this.viewDate.getUTCFullYear();
								this.viewDate.setUTCMonth(month);
								this._trigger('changeMonth', this.viewDate);
								if (this.o.minViewMode === 1){
									this._setDate(UTCDate(year, month, day));
								}
							}
							else {
								day = 1;
								month = 0;
								year = parseInt(target.text(), 10)||0;
								this.viewDate.setUTCFullYear(year);
								this._trigger('changeYear', this.viewDate);
								if (this.o.minViewMode === 2){
									this._setDate(UTCDate(year, month, day));
								}
							}
							this.showMode(-1);
							this.fill();
						}
						break;
					case 'td':
						if (target.is('.day') && !target.is('.disabled')){
							day = parseInt(target.text(), 10)||1;
							year = this.viewDate.getUTCFullYear();
							month = this.viewDate.getUTCMonth();
							if (target.is('.old')){
								if (month === 0){
									month = 11;
									year -= 1;
								}
								else {
									month -= 1;
								}
							}
							else if (target.is('.new')){
								if (month === 11){
									month = 0;
									year += 1;
								}
								else {
									month += 1;
								}
							}
							this._setDate(UTCDate(year, month, day));
						}
						break;
				}
			}
			if (this.picker.is(':visible') && this._focused_from){
				$(this._focused_from).focus();
			}
			delete this._focused_from;
		},

		_toggle_multidate: function(date){
			var ix = this.dates.contains(date);
			if (!date){
				this.dates.clear();
			}
			if (this.o.multidate === 1 && ix === 0){
                // single datepicker, don't remove selected date
            }
			else if (ix !== -1){
				this.dates.remove(ix);
			}
			else {
				this.dates.push(date);
			}
			if (typeof this.o.multidate === 'number')
				while (this.dates.length > this.o.multidate)
					this.dates.remove(0);
		},

		_setDate: function(date, which){
			if (!which || which === 'date')
				this._toggle_multidate(date && new Date(date));
			if (!which || which  === 'view')
				this.viewDate = date && new Date(date);

			this.fill();
			this.setValue();
			this._trigger('changeDate');
			var element;
			if (this.isInput){
				element = this.element;
			}
			else if (this.component){
				element = this.element.find('input');
			}
			if (element){
				element.change();
			}
			if (this.o.autoclose && (!which || which === 'date')){
				this.hide();
			}
		},

		moveMonth: function(date, dir){
			if (!date)
				return undefined;
			if (!dir)
				return date;
			var new_date = new Date(date.valueOf()),
				day = new_date.getUTCDate(),
				month = new_date.getUTCMonth(),
				mag = Math.abs(dir),
				new_month, test;
			dir = dir > 0 ? 1 : -1;
			if (mag === 1){
				test = dir === -1
					// If going back one month, make sure month is not current month
					// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
					? function(){
						return new_date.getUTCMonth() === month;
					}
					// If going forward one month, make sure month is as expected
					// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
					: function(){
						return new_date.getUTCMonth() !== new_month;
					};
				new_month = month + dir;
				new_date.setUTCMonth(new_month);
				// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
				if (new_month < 0 || new_month > 11)
					new_month = (new_month + 12) % 12;
			}
			else {
				// For magnitudes >1, move one month at a time...
				for (var i=0; i < mag; i++)
					// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
					new_date = this.moveMonth(new_date, dir);
				// ...then reset the day, keeping it in the new month
				new_month = new_date.getUTCMonth();
				new_date.setUTCDate(day);
				test = function(){
					return new_month !== new_date.getUTCMonth();
				};
			}
			// Common date-resetting loop -- if date is beyond end of month, make it
			// end of month
			while (test()){
				new_date.setUTCDate(--day);
				new_date.setUTCMonth(new_month);
			}
			return new_date;
		},

		moveYear: function(date, dir){
			return this.moveMonth(date, dir*12);
		},

		dateWithinRange: function(date){
			return date >= this.o.startDate && date <= this.o.endDate;
		},

		keydown: function(e){
			if (this.picker.is(':not(:visible)')){
				if (e.keyCode === 27) // allow escape to hide and re-show picker
					this.show();
				return;
			}
			var dateChanged = false,
				dir, newDate, newViewDate,
				focusDate = this.focusDate || this.viewDate;
			switch (e.keyCode){
				case 27: // escape
					if (this.focusDate){
						this.focusDate = null;
						this.viewDate = this.dates.get(-1) || this.viewDate;
						this.fill();
					}
					else
						this.hide();
					e.preventDefault();
					break;
				case 37: // left
				case 39: // right
					if (!this.o.keyboardNavigation)
						break;
					dir = e.keyCode === 37 ? -1 : 1;
					if (e.ctrlKey){
						newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveYear(focusDate, dir);
						this._trigger('changeYear', this.viewDate);
					}
					else if (e.shiftKey){
						newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveMonth(focusDate, dir);
						this._trigger('changeMonth', this.viewDate);
					}
					else {
						newDate = new Date(this.dates.get(-1) || UTCToday());
						newDate.setUTCDate(newDate.getUTCDate() + dir);
						newViewDate = new Date(focusDate);
						newViewDate.setUTCDate(focusDate.getUTCDate() + dir);
					}
					if (this.dateWithinRange(newDate)){
						this.focusDate = this.viewDate = newViewDate;
						this.setValue();
						this.fill();
						e.preventDefault();
					}
					break;
				case 38: // up
				case 40: // down
					if (!this.o.keyboardNavigation)
						break;
					dir = e.keyCode === 38 ? -1 : 1;
					if (e.ctrlKey){
						newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveYear(focusDate, dir);
						this._trigger('changeYear', this.viewDate);
					}
					else if (e.shiftKey){
						newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveMonth(focusDate, dir);
						this._trigger('changeMonth', this.viewDate);
					}
					else {
						newDate = new Date(this.dates.get(-1) || UTCToday());
						newDate.setUTCDate(newDate.getUTCDate() + dir * 7);
						newViewDate = new Date(focusDate);
						newViewDate.setUTCDate(focusDate.getUTCDate() + dir * 7);
					}
					if (this.dateWithinRange(newDate)){
						this.focusDate = this.viewDate = newViewDate;
						this.setValue();
						this.fill();
						e.preventDefault();
					}
					break;
				case 32: // spacebar
					// Spacebar is used in manually typing dates in some formats.
					// As such, its behavior should not be hijacked.
					break;
				case 13: // enter
					focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
					if (this.o.keyboardNavigation) {
						this._toggle_multidate(focusDate);
						dateChanged = true;
					}
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.setValue();
					this.fill();
					if (this.picker.is(':visible')){
						e.preventDefault();
						if (this.o.autoclose)
							this.hide();
					}
					break;
				case 9: // tab
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.fill();
					this.hide();
					break;
			}
			if (dateChanged){
				if (this.dates.length)
					this._trigger('changeDate');
				else
					this._trigger('clearDate');
				var element;
				if (this.isInput){
					element = this.element;
				}
				else if (this.component){
					element = this.element.find('input');
				}
				if (element){
					element.change();
				}
			}
		},

		showMode: function(dir){
			if (dir){
				this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir));
			}
			this.picker
				.find('>div')
				.hide()
				.filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName)
					.css('display', 'block');
			this.updateNavArrows();
		}
	};

	var DateRangePicker = function(element, options){
		this.element = $(element);
		this.inputs = $.map(options.inputs, function(i){
			return i.jquery ? i[0] : i;
		});
		delete options.inputs;

		$(this.inputs)
			.datepicker(options)
			.bind('changeDate', $.proxy(this.dateUpdated, this));

		this.pickers = $.map(this.inputs, function(i){
			return $(i).data('datepicker');
		});
		this.updateDates();
	};
	DateRangePicker.prototype = {
		updateDates: function(){
			this.dates = $.map(this.pickers, function(i){
				return i.getUTCDate();
			});
			this.updateRanges();
		},
		updateRanges: function(){
			var range = $.map(this.dates, function(d){
				return d.valueOf();
			});
			$.each(this.pickers, function(i, p){
				p.setRange(range);
			});
		},
		dateUpdated: function(e){
			// `this.updating` is a workaround for preventing infinite recursion
			// between `changeDate` triggering and `setUTCDate` calling.  Until
			// there is a better mechanism.
			if (this.updating)
				return;
			this.updating = true;

			var dp = $(e.target).data('datepicker'),
				new_date = dp.getUTCDate(),
				i = $.inArray(e.target, this.inputs),
				l = this.inputs.length;
			if (i === -1)
				return;

			$.each(this.pickers, function(i, p){
				if (!p.getUTCDate())
					p.setUTCDate(new_date);
			});

			if (new_date < this.dates[i]){
				// Date being moved earlier/left
				while (i >= 0 && new_date < this.dates[i]){
					this.pickers[i--].setUTCDate(new_date);
				}
			}
			else if (new_date > this.dates[i]){
				// Date being moved later/right
				while (i < l && new_date > this.dates[i]){
					this.pickers[i++].setUTCDate(new_date);
				}
			}
			this.updateDates();

			delete this.updating;
		},
		remove: function(){
			$.map(this.pickers, function(p){ p.remove(); });
			delete this.element.data().datepicker;
		}
	};

	function opts_from_el(el, prefix){
		// Derive options from element data-attrs
		var data = $(el).data(),
			out = {}, inkey,
			replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
		prefix = new RegExp('^' + prefix.toLowerCase());
		function re_lower(_,a){
			return a.toLowerCase();
		}
		for (var key in data)
			if (prefix.test(key)){
				inkey = key.replace(replace, re_lower);
				out[inkey] = data[key];
			}
		return out;
	}

	function opts_from_locale(lang){
		// Derive options from locale plugins
		var out = {};
		// Check if "de-DE" style date is available, if not language should
		// fallback to 2 letter code eg "de"
		if (!dates[lang]){
			lang = lang.split('-')[0];
			if (!dates[lang])
				return;
		}
		var d = dates[lang];
		$.each(locale_opts, function(i,k){
			if (k in d)
				out[k] = d[k];
		});
		return out;
	}

	var old = $.fn.datepicker;
	$.fn.datepicker = function(option){
		var args = Array.apply(null, arguments);
		args.shift();
		var internal_return;
		this.each(function(){
			var $this = $(this),
				data = $this.data('datepicker'),
				options = typeof option === 'object' && option;
			if (!data){
				var elopts = opts_from_el(this, 'date'),
					// Preliminary otions
					xopts = $.extend({}, defaults, elopts, options),
					locopts = opts_from_locale(xopts.language),
					// Options priority: js args, data-attrs, locales, defaults
					opts = $.extend({}, defaults, locopts, elopts, options);
				if ($this.is('.input-daterange') || opts.inputs){
					var ropts = {
						inputs: opts.inputs || $this.find('input').toArray()
					};
					$this.data('datepicker', (data = new DateRangePicker(this, $.extend(opts, ropts))));
				}
				else {
					$this.data('datepicker', (data = new Datepicker(this, opts)));
				}
			}
			if (typeof option === 'string' && typeof data[option] === 'function'){
				internal_return = data[option].apply(data, args);
				if (internal_return !== undefined)
					return false;
			}
		});
		if (internal_return !== undefined)
			return internal_return;
		else
			return this;
	};

	var defaults = $.fn.datepicker.defaults = {
		autoclose: false,
		beforeShowDay: $.noop,
		calendarWeeks: false,
		clearBtn: false,
		daysOfWeekDisabled: [],
		endDate: Infinity,
		forceParse: true,
		format: 'mm/dd/yyyy',
		keyboardNavigation: true,
		language: 'en',
		minViewMode: 0,
		multidate: false,
		multidateSeparator: ',',
		orientation: "auto",
		rtl: false,
		startDate: -Infinity,
		startView: 0,
		todayBtn: false,
		todayHighlight: false,
		weekStart: 0
	};
	var locale_opts = $.fn.datepicker.locale_opts = [
		'format',
		'rtl',
		'weekStart'
	];
	$.fn.datepicker.Constructor = Datepicker;
	var dates = $.fn.datepicker.dates = {
		en: {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			today: "Today",
			clear: "Clear"
		}
	};

	var DPGlobal = {
		modes: [
			{
				clsName: 'days',
				navFnc: 'Month',
				navStep: 1
			},
			{
				clsName: 'months',
				navFnc: 'FullYear',
				navStep: 1
			},
			{
				clsName: 'years',
				navFnc: 'FullYear',
				navStep: 10
		}],
		isLeapYear: function(year){
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
		},
		getDaysInMonth: function(year, month){
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
		},
		validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
		nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
		parseFormat: function(format){
			// IE treats \0 as a string end in inputs (truncating the value),
			// so it's a bad format delimiter, anyway
			var separators = format.replace(this.validParts, '\0').split('\0'),
				parts = format.match(this.validParts);
			if (!separators || !separators.length || !parts || parts.length === 0){
				throw new Error("Invalid date format.");
			}
			return {separators: separators, parts: parts};
		},
		parseDate: function(date, format, language){
			if (!date)
				return undefined;
			if (date instanceof Date)
				return date;
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			var part_re = /([\-+]\d+)([dmwy])/,
				parts = date.match(/([\-+]\d+)([dmwy])/g),
				part, dir, i;
			if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){
				date = new Date();
				for (i=0; i < parts.length; i++){
					part = part_re.exec(parts[i]);
					dir = parseInt(part[1]);
					switch (part[2]){
						case 'd':
							date.setUTCDate(date.getUTCDate() + dir);
							break;
						case 'm':
							date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
							break;
						case 'w':
							date.setUTCDate(date.getUTCDate() + dir * 7);
							break;
						case 'y':
							date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
							break;
					}
				}
				return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
			}
			parts = date && date.match(this.nonpunctuation) || [];
			date = new Date();
			var parsed = {},
				setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
				setters_map = {
					yyyy: function(d,v){
						return d.setUTCFullYear(v);
					},
					yy: function(d,v){
						return d.setUTCFullYear(2000+v);
					},
					m: function(d,v){
						if (isNaN(d))
							return d;
						v -= 1;
						while (v < 0) v += 12;
						v %= 12;
						d.setUTCMonth(v);
						while (d.getUTCMonth() !== v)
							d.setUTCDate(d.getUTCDate()-1);
						return d;
					},
					d: function(d,v){
						return d.setUTCDate(v);
					}
				},
				val, filtered;
			setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
			setters_map['dd'] = setters_map['d'];
			date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
			var fparts = format.parts.slice();
			// Remove noop parts
			if (parts.length !== fparts.length){
				fparts = $(fparts).filter(function(i,p){
					return $.inArray(p, setters_order) !== -1;
				}).toArray();
			}
			// Process remainder
			function match_part(){
				var m = this.slice(0, parts[i].length),
					p = parts[i].slice(0, m.length);
				return m === p;
			}
			if (parts.length === fparts.length){
				var cnt;
				for (i=0, cnt = fparts.length; i < cnt; i++){
					val = parseInt(parts[i], 10);
					part = fparts[i];
					if (isNaN(val)){
						switch (part){
							case 'MM':
								filtered = $(dates[language].months).filter(match_part);
								val = $.inArray(filtered[0], dates[language].months) + 1;
								break;
							case 'M':
								filtered = $(dates[language].monthsShort).filter(match_part);
								val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
								break;
						}
					}
					parsed[part] = val;
				}
				var _date, s;
				for (i=0; i < setters_order.length; i++){
					s = setters_order[i];
					if (s in parsed && !isNaN(parsed[s])){
						_date = new Date(date);
						setters_map[s](_date, parsed[s]);
						if (!isNaN(_date))
							date = _date;
					}
				}
			}
			return date;
		},
		formatDate: function(date, format, language){
			if (!date)
				return '';
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			var val = {
				d: date.getUTCDate(),
				D: dates[language].daysShort[date.getUTCDay()],
				DD: dates[language].days[date.getUTCDay()],
				m: date.getUTCMonth() + 1,
				M: dates[language].monthsShort[date.getUTCMonth()],
				MM: dates[language].months[date.getUTCMonth()],
				yy: date.getUTCFullYear().toString().substring(2),
				yyyy: date.getUTCFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			date = [];
			var seps = $.extend([], format.separators);
			for (var i=0, cnt = format.parts.length; i <= cnt; i++){
				if (seps.length)
					date.push(seps.shift());
				date.push(val[format.parts[i]]);
			}
			return date.join('');
		},
		headTemplate: '<thead>'+
							'<tr>'+
								'<th class="prev">&laquo;</th>'+
								'<th colspan="5" class="datepicker-switch"></th>'+
								'<th class="next">&raquo;</th>'+
							'</tr>'+
						'</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
		footTemplate: '<tfoot>'+
							'<tr>'+
								'<th colspan="7" class="today"></th>'+
							'</tr>'+
							'<tr>'+
								'<th colspan="7" class="clear"></th>'+
							'</tr>'+
						'</tfoot>'
	};
	DPGlobal.template = '<div class="datepicker">'+
							'<div class="datepicker-days">'+
								'<table class=" table-condensed">'+
									DPGlobal.headTemplate+
									'<tbody></tbody>'+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-months">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-years">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
						'</div>';

	$.fn.datepicker.DPGlobal = DPGlobal;


	/* DATEPICKER NO CONFLICT
	* =================== */

	$.fn.datepicker.noConflict = function(){
		$.fn.datepicker = old;
		return this;
	};


	/* DATEPICKER DATA-API
	* ================== */

	$(document).on(
		'focus.datepicker.data-api click.datepicker.data-api',
		'[data-provide="datepicker"]',
		function(e){
			var $this = $(this);
			if ($this.data('datepicker'))
				return;
			e.preventDefault();
			// component click requires us to explicitly show it
			$this.datepicker('show');
		}
	);
	$(function(){
		$('[data-provide="datepicker-inline"]').datepicker();
	});

}(window.jQuery));

/* ===================================================
 * bootstrap-markdown.js v2.8.0
 * http://github.com/toopay/bootstrap-markdown
 * ===================================================
 * Copyright 2013-2014 Taufan Aditya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

!function ($) {

  "use strict"; // jshint ;_;

  /* MARKDOWN CLASS DEFINITION
   * ========================== */

  var Markdown = function (element, options) {
    // @TODO : remove this BC on next major release
    // @see : https://github.com/toopay/bootstrap-markdown/issues/109
    var opts = ['autofocus', 'savable', 'hideable', 'width', 
      'height', 'resize', 'iconlibrary', 'language', 
      'footer', 'fullscreen', 'hiddenButtons', 'disabledButtons'];
    $.each(opts,function(_, opt){
      if (typeof $(element).data(opt) !== 'undefined') {
        options = typeof options == 'object' ? options : {}
        options[opt] = $(element).data(opt)
      }
    });
    // End BC

    // Class Properties
    this.$ns           = 'bootstrap-markdown';
    this.$element      = $(element);
    this.$editable     = {el:null, type:null,attrKeys:[], attrValues:[], content:null};
    this.$options      = $.extend(true, {}, $.fn.markdown.defaults, options, this.$element.data('options'));
    this.$oldContent   = null;
    this.$isPreview    = false;
    this.$isFullscreen = false;
    this.$editor       = null;
    this.$textarea     = null;
    this.$handler      = [];
    this.$callback     = [];
    this.$nextTab      = [];

    this.showEditor();
  };

  Markdown.prototype = {

    constructor: Markdown

  , __alterButtons: function(name,alter) {
      var handler = this.$handler, isAll = (name == 'all'),that = this;

      $.each(handler,function(k,v) {
        var halt = true;
        if (isAll) {
          halt = false;
        } else {
          halt = v.indexOf(name) < 0;
        }

        if (halt === false) {
          alter(that.$editor.find('button[data-handler="'+v+'"]'));
        }
      });
    }

  , __buildButtons: function(buttonsArray, container) {
      var i,
          ns = this.$ns,
          handler = this.$handler,
          callback = this.$callback;

      for (i=0;i<buttonsArray.length;i++) {
        // Build each group container
        var y, btnGroups = buttonsArray[i];
        for (y=0;y<btnGroups.length;y++) {
          // Build each button group
          var z,
              buttons = btnGroups[y].data,
              btnGroupContainer = $('<div/>', {
                                    'class': 'btn-group'
                                  });

          for (z=0;z<buttons.length;z++) {
            var button = buttons[z],
                buttonContainer, buttonIconContainer,
                buttonHandler = ns+'-'+button.name,
                buttonIcon = this.__getIcon(button.icon),
                btnText = button.btnText ? button.btnText : '',
                btnClass = button.btnClass ? button.btnClass : 'btn',
                tabIndex = button.tabIndex ? button.tabIndex : '-1',
                hotkey = typeof button.hotkey !== 'undefined' ? button.hotkey : '',
                hotkeyCaption = typeof jQuery.hotkeys !== 'undefined' && hotkey !== '' ? ' ('+hotkey+')' : '';

            // Construct the button object
            buttonContainer = $('<button></button>');
            buttonContainer.text(' ' + this.__localize(btnText)).addClass('btn-default btn-sm').addClass(btnClass);
            if(btnClass.match(/btn\-(primary|success|info|warning|danger|link)/)){
                buttonContainer.removeClass('btn-default');
            }
            buttonContainer.attr({
                'type': 'button',
                'title': this.__localize(button.title) + hotkeyCaption,
                'tabindex': tabIndex,
                'data-provider': ns,
                'data-handler': buttonHandler,
                'data-hotkey': hotkey
            });
            if (button.toggle === true){
              buttonContainer.attr('data-toggle', 'button');
            }
            buttonIconContainer = $('<span/>');
            buttonIconContainer.addClass(buttonIcon);
            buttonIconContainer.prependTo(buttonContainer);

            // Attach the button object
            btnGroupContainer.append(buttonContainer);

            // Register handler and callback
            handler.push(buttonHandler);
            callback.push(button.callback);
          }

          // Attach the button group into container dom
          container.append(btnGroupContainer);
        }
      }

      return container;
    }
  , __setListener: function() {
      // Set size and resizable Properties
      var hasRows = typeof this.$textarea.attr('rows') !== 'undefined',
          maxRows = this.$textarea.val().split("\n").length > 5 ? this.$textarea.val().split("\n").length : '5',
          rowsVal = hasRows ? this.$textarea.attr('rows') : maxRows;

      this.$textarea.attr('rows',rowsVal);
      if (this.$options.resize) {
        this.$textarea.css('resize',this.$options.resize);
      }

      this.$textarea
        .on('focus',    $.proxy(this.focus, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))
        .on('change',   $.proxy(this.change, this));

      if (this.eventSupported('keydown')) {
        this.$textarea.on('keydown', $.proxy(this.keydown, this));
      }

      // Re-attach markdown data
      this.$textarea.data('markdown',this);
    }

  , __handle: function(e) {
      var target = $(e.currentTarget),
          handler = this.$handler,
          callback = this.$callback,
          handlerName = target.attr('data-handler'),
          callbackIndex = handler.indexOf(handlerName),
          callbackHandler = callback[callbackIndex];

      // Trigger the focusin
      $(e.currentTarget).focus();

      callbackHandler(this);

      // Trigger onChange for each button handle
      this.change(this);

      // Unless it was the save handler,
      // focusin the textarea
      if (handlerName.indexOf('cmdSave') < 0) {
        this.$textarea.focus();
      }

      e.preventDefault();
    }

  , __localize: function(string) {
      var messages = $.fn.markdown.messages,
          language = this.$options.language;
      if (
        typeof messages !== 'undefined' &&
        typeof messages[language] !== 'undefined' &&
        typeof messages[language][string] !== 'undefined'
      ) {
        return messages[language][string];
      }
      return string;
    }

  , __getIcon: function(src) {
    return typeof src == 'object' ? src[this.$options.iconlibrary] : src;
  }

  , setFullscreen: function(mode) {
    var $editor = this.$editor,
        $textarea = this.$textarea;

    if (mode === true) {
      $editor.addClass('md-fullscreen-mode');
      $('body').addClass('md-nooverflow');
      this.$options.onFullscreen(this);
    } else {
      $editor.removeClass('md-fullscreen-mode');
      $('body').removeClass('md-nooverflow');
    }

    this.$isFullscreen = mode;
    $textarea.focus();
  }

  , showEditor: function() {
      var instance = this,
          textarea,
          ns = this.$ns,
          container = this.$element,
          originalHeigth = container.css('height'),
          originalWidth = container.css('width'),
          editable = this.$editable,
          handler = this.$handler,
          callback = this.$callback,
          options = this.$options,
          editor = $( '<div/>', {
                      'class': 'md-editor',
                      click: function() {
                        instance.focus();
                      }
                    });

      // Prepare the editor
      if (this.$editor === null) {
        // Create the panel
        var editorHeader = $('<div/>', {
                            'class': 'md-header btn-toolbar'
                            });

        // Merge the main & additional button groups together
        var allBtnGroups = [];
        if (options.buttons.length > 0) allBtnGroups = allBtnGroups.concat(options.buttons[0]);
        if (options.additionalButtons.length > 0) allBtnGroups = allBtnGroups.concat(options.additionalButtons[0]);

        // Reduce and/or reorder the button groups
        if (options.reorderButtonGroups.length > 0) {
          allBtnGroups = allBtnGroups
              .filter(function(btnGroup) {
                return options.reorderButtonGroups.indexOf(btnGroup.name) > -1;
              })
              .sort(function(a, b) {
                if (options.reorderButtonGroups.indexOf(a.name) < options.reorderButtonGroups.indexOf(b.name)) return -1;
                if (options.reorderButtonGroups.indexOf(a.name) > options.reorderButtonGroups.indexOf(b.name)) return 1;
                return 0;
              });
        }

        // Build the buttons
        if (allBtnGroups.length > 0) {
          editorHeader = this.__buildButtons([allBtnGroups], editorHeader);
        }

        if (options.fullscreen.enable) {
          editorHeader.append('<div class="md-controls"><a class="md-control md-control-fullscreen" href="#"><span class="'+this.__getIcon(options.fullscreen.icons.fullscreenOn)+'"></span></a></div>').on('click', '.md-control-fullscreen', function(e) {
              e.preventDefault();
              instance.setFullscreen(true);
          });
        }

        editor.append(editorHeader);

        // Wrap the textarea
        if (container.is('textarea')) {
          container.before(editor);
          textarea = container;
          textarea.addClass('md-input');
          editor.append(textarea);
        } else {
          var rawContent = (typeof toMarkdown == 'function') ? toMarkdown(container.html()) : container.html(),
              currentContent = $.trim(rawContent);

          // This is some arbitrary content that could be edited
          textarea = $('<textarea/>', {
                       'class': 'md-input',
                       'val' : currentContent
                      });

          editor.append(textarea);

          // Save the editable
          editable.el = container;
          editable.type = container.prop('tagName').toLowerCase();
          editable.content = container.html();

          $(container[0].attributes).each(function(){
            editable.attrKeys.push(this.nodeName);
            editable.attrValues.push(this.nodeValue);
          });

          // Set editor to blocked the original container
          container.replaceWith(editor);
        }

        var editorFooter = $('<div/>', {
                           'class': 'md-footer'
                         }),
            createFooter = false,
            footer = '';
        // Create the footer if savable
        if (options.savable) {
          createFooter = true;
          var saveHandler = 'cmdSave';

          // Register handler and callback
          handler.push(saveHandler);
          callback.push(options.onSave);

          editorFooter.append('<button class="btn btn-success" data-provider="'
                              + ns
                              + '" data-handler="'
                              + saveHandler
                              + '"><i class="icon icon-white icon-ok"></i> '
                              + this.__localize('Save')
                              + '</button>');


        }

        footer = typeof options.footer === 'function' ? options.footer(this) : options.footer;

        if ($.trim(footer) !== '') {
          createFooter = true;
          editorFooter.append(footer);
        }

        if (createFooter) editor.append(editorFooter);

        // Set width
        if (options.width && options.width !== 'inherit') {
          if (jQuery.isNumeric(options.width)) {
            editor.css('display', 'table');
            textarea.css('width', options.width + 'px');
          } else {
            editor.addClass(options.width);
          }
        }

        // Set height
        if (options.height && options.height !== 'inherit') {
          if (jQuery.isNumeric(options.height)) {
            var height = options.height;
            if (editorHeader) height = Math.max(0, height - editorHeader.outerHeight());
            if (editorFooter) height = Math.max(0, height - editorFooter.outerHeight());
            textarea.css('height', height + 'px');
          } else {
            editor.addClass(options.height);
          }
        }

        // Reference
        this.$editor     = editor;
        this.$textarea   = textarea;
        this.$editable   = editable;
        this.$oldContent = this.getContent();

        this.__setListener();

        // Set editor attributes, data short-hand API and listener
        this.$editor.attr('id',(new Date()).getTime());
        this.$editor.on('click', '[data-provider="bootstrap-markdown"]', $.proxy(this.__handle, this));

        if (this.$element.is(':disabled') || this.$element.is('[readonly]')) {
          this.$editor.addClass('md-editor-disabled');
          this.disableButtons('all');
        }

        if (this.eventSupported('keydown') && typeof jQuery.hotkeys === 'object') {
          editorHeader.find('[data-provider="bootstrap-markdown"]').each(function() {
            var $button = $(this),
                hotkey = $button.attr('data-hotkey');
            if (hotkey.toLowerCase() !== '') {
              textarea.bind('keydown', hotkey, function() {
                $button.trigger('click');
                return false;
              });
            }
          });
        }

        if (options.initialstate === 'preview') {
          this.showPreview();
        } else if (options.initialstate === 'fullscreen' && options.fullscreen.enable) {
          this.setFullscreen(true);
        }

      } else {
        this.$editor.show();
      }

      if (options.autofocus) {
        this.$textarea.focus();
        this.$editor.addClass('active');
      }

      if (options.fullscreen.enable && options.fullscreen !== false) {
        this.$editor.append('\
          <div class="md-fullscreen-controls">\
            <a href="#" class="exit-fullscreen" title="Exit fullscreen"><span class="'+this.__getIcon(options.fullscreen.icons.fullscreenOff)+'"></span></a>\
          </div>');

        this.$editor.on('click', '.exit-fullscreen', function(e) {
          e.preventDefault();
          instance.setFullscreen(false);
        });
      }

      // hide hidden buttons from options
      this.hideButtons(options.hiddenButtons);

      // disable disabled buttons from options
      this.disableButtons(options.disabledButtons);

      // Trigger the onShow hook
      options.onShow(this);

      return this;
    }

  , parseContent: function(val) {
      var content;

      // parse with supported markdown parser
      var val = val || this.$textarea.val();

      if (typeof markdown == 'object') {
        content = markdown.toHTML(val);
      } else if (typeof marked == 'function') {
        content = marked(val);
      } else {
        content = val;
      }

      return content;
    }

  , showPreview: function() {
      var options = this.$options,
          container = this.$textarea,
          afterContainer = container.next(),
          replacementContainer = $('<div/>',{'class':'md-preview','data-provider':'markdown-preview'}),
          content,
          callbackContent;

      // Give flag that tell the editor enter preview mode
      this.$isPreview = true;
      // Disable all buttons
      this.disableButtons('all').enableButtons('cmdPreview');

      // Try to get the content from callback
      callbackContent = options.onPreview(this);
      // Set the content based from the callback content if string otherwise parse value from textarea
      content = typeof callbackContent == 'string' ? callbackContent : this.parseContent();

      // Build preview element
      replacementContainer.html(content);

      if (afterContainer && afterContainer.attr('class') == 'md-footer') {
        // If there is footer element, insert the preview container before it
        replacementContainer.insertBefore(afterContainer);
      } else {
        // Otherwise, just append it after textarea
        container.parent().append(replacementContainer);
      }

      // Set the preview element dimensions
      replacementContainer.css({
        width: container.outerWidth() + 'px',
        height: container.outerHeight() + 'px'
      });

      if (this.$options.resize) {
        replacementContainer.css('resize',this.$options.resize);
      }

      // Hide the last-active textarea
      container.hide();

      // Attach the editor instances
      replacementContainer.data('markdown',this);

      if (this.$element.is(':disabled') || this.$element.is('[readonly]')) {
        this.$editor.addClass('md-editor-disabled');
        this.disableButtons('all');
      }

      return this;
    }

  , hidePreview: function() {
      // Give flag that tell the editor quit preview mode
      this.$isPreview = false;

      // Obtain the preview container
      var container = this.$editor.find('div[data-provider="markdown-preview"]');

      // Remove the preview container
      container.remove();

      // Enable all buttons
      this.enableButtons('all');
      // Disable configured disabled buttons
      this.disableButtons(this.$options.disabledButtons);

      // Back to the editor
      this.$textarea.show();
      this.__setListener();

      return this;
    }

  , isDirty: function() {
      return this.$oldContent != this.getContent();
    }

  , getContent: function() {
      return this.$textarea.val();
    }

  , setContent: function(content) {
      this.$textarea.val(content);

      return this;
    }

  , findSelection: function(chunk) {
    var content = this.getContent(), startChunkPosition;

    if (startChunkPosition = content.indexOf(chunk), startChunkPosition >= 0 && chunk.length > 0) {
      var oldSelection = this.getSelection(), selection;

      this.setSelection(startChunkPosition,startChunkPosition+chunk.length);
      selection = this.getSelection();

      this.setSelection(oldSelection.start,oldSelection.end);

      return selection;
    } else {
      return null;
    }
  }

  , getSelection: function() {

      var e = this.$textarea[0];

      return (

          ('selectionStart' in e && function() {
              var l = e.selectionEnd - e.selectionStart;
              return { start: e.selectionStart, end: e.selectionEnd, length: l, text: e.value.substr(e.selectionStart, l) };
          }) ||

          /* browser not supported */
          function() {
            return null;
          }

      )();

    }

  , setSelection: function(start,end) {

      var e = this.$textarea[0];

      return (

          ('selectionStart' in e && function() {
              e.selectionStart = start;
              e.selectionEnd = end;
              return;
          }) ||

          /* browser not supported */
          function() {
            return null;
          }

      )();

    }

  , replaceSelection: function(text) {

      var e = this.$textarea[0];

      return (

          ('selectionStart' in e && function() {
              e.value = e.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length);
              // Set cursor to the last replacement end
              e.selectionStart = e.value.length;
              return this;
          }) ||

          /* browser not supported */
          function() {
              e.value += text;
              return jQuery(e);
          }

      )();
    }

  , getNextTab: function() {
      // Shift the nextTab
      if (this.$nextTab.length === 0) {
        return null;
      } else {
        var nextTab, tab = this.$nextTab.shift();

        if (typeof tab == 'function') {
          nextTab = tab();
        } else if (typeof tab == 'object' && tab.length > 0) {
          nextTab = tab;
        }

        return nextTab;
      }
    }

  , setNextTab: function(start,end) {
      // Push new selection into nextTab collections
      if (typeof start == 'string') {
        var that = this;
        this.$nextTab.push(function(){
          return that.findSelection(start);
        });
      } else if (typeof start == 'number' && typeof end == 'number') {
        var oldSelection = this.getSelection();

        this.setSelection(start,end);
        this.$nextTab.push(this.getSelection());

        this.setSelection(oldSelection.start,oldSelection.end);
      }

      return;
    }

  , __parseButtonNameParam: function(nameParam) {
      var buttons = [];

      if (typeof nameParam == 'string') {
        buttons = nameParam.split(',')
      } else {
        buttons = nameParam;
      }

      return buttons;
    }

  , enableButtons: function(name) {
      var buttons = this.__parseButtonNameParam(name),
        that = this;

      $.each(buttons, function(i, v) {
        that.__alterButtons(buttons[i], function (el) {
          el.removeAttr('disabled');
        });
      });

      return this;
    }

  , disableButtons: function(name) {
      var buttons = this.__parseButtonNameParam(name),
        that = this;

      $.each(buttons, function(i, v) {
        that.__alterButtons(buttons[i], function (el) {
          el.attr('disabled','disabled');
        });
      });

      return this;
    }

  , hideButtons: function(name) {
      var buttons = this.__parseButtonNameParam(name),
        that = this;

      $.each(buttons, function(i, v) {
        that.__alterButtons(buttons[i], function (el) {
          el.addClass('hidden');
        });
      });

      return this;
    }

  , showButtons: function(name) {
      var buttons = this.__parseButtonNameParam(name),
        that = this;

      $.each(buttons, function(i, v) {
        that.__alterButtons(buttons[i], function (el) {
          el.removeClass('hidden');
        });
      });

      return this;
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element;
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;');
        isSupported = typeof this.$element[eventName] === 'function';
      }
      return isSupported;
    }

  , keyup: function (e) {
      var blocked = false;
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break;

        case 9: // tab
          var nextTab;
          if (nextTab = this.getNextTab(),nextTab !== null) {
            // Get the nextTab if exists
            var that = this;
            setTimeout(function(){
              that.setSelection(nextTab.start,nextTab.end);
            },500);

            blocked = true;
          } else {
            // The next tab memory contains nothing...
            // check the cursor position to determine tab action
            var cursor = this.getSelection();

            if (cursor.start == cursor.end && cursor.end == this.getContent().length) {
              // The cursor already reach the end of the content
              blocked = false;
            } else {
              // Put the cursor to the end
              this.setSelection(this.getContent().length,this.getContent().length);

              blocked = true;
            }
          }

          break;

        case 13: // enter
          blocked = false;
          break;
        case 27: // escape
          if (this.$isFullscreen) this.setFullscreen(false);
          blocked = false;
          break;

        default:
          blocked = false;
      }

      if (blocked) {
        e.stopPropagation();
        e.preventDefault();
      }

      this.$options.onChange(this);
    }

  , change: function(e) {
      this.$options.onChange(this);
      return this;
    }

  , focus: function (e) {
      var options = this.$options,
          isHideable = options.hideable,
          editor = this.$editor;

      editor.addClass('active');

      // Blur other markdown(s)
      $(document).find('.md-editor').each(function(){
        if ($(this).attr('id') !== editor.attr('id')) {
          var attachedMarkdown;

          if (attachedMarkdown = $(this).find('textarea').data('markdown'),
              attachedMarkdown === null) {
              attachedMarkdown = $(this).find('div[data-provider="markdown-preview"]').data('markdown');
          }

          if (attachedMarkdown) {
            attachedMarkdown.blur();
          }
        }
      });

      // Trigger the onFocus hook
      options.onFocus(this);

      return this;
    }

  , blur: function (e) {
      var options = this.$options,
          isHideable = options.hideable,
          editor = this.$editor,
          editable = this.$editable;

      if (editor.hasClass('active') || this.$element.parent().length === 0) {
        editor.removeClass('active');

        if (isHideable) {
          // Check for editable elements
          if (editable.el !== null) {
            // Build the original element
            var oldElement = $('<'+editable.type+'/>'),
                content = this.getContent(),
                currentContent = (typeof markdown == 'object') ? markdown.toHTML(content) : content;

            $(editable.attrKeys).each(function(k,v) {
              oldElement.attr(editable.attrKeys[k],editable.attrValues[k]);
            });

            // Get the editor content
            oldElement.html(currentContent);

            editor.replaceWith(oldElement);
          } else {
            editor.hide();
          }
        }

        // Trigger the onBlur hook
        options.onBlur(this);
      }

      return this;
    }

  };

 /* MARKDOWN PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.markdown;

  $.fn.markdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('markdown')
        , options = typeof option == 'object' && option;
      if (!data) $this.data('markdown', (data = new Markdown(this, options)))
    })
  };

  $.fn.markdown.messages = {};

  $.fn.markdown.defaults = {
    /* Editor Properties */
    autofocus: false,
    hideable: false,
    savable:false,
    width: 'inherit',
    height: 'inherit',
    resize: 'none',
    iconlibrary: 'glyph',
    language: 'en',
    initialstate: 'editor',

    /* Buttons Properties */
    buttons: [
      [{
        name: 'groupFont',
        data: [{
          name: 'cmdBold',
          hotkey: 'Ctrl+B',
          title: 'Bold',
          icon: { glyph: 'glyphicon glyphicon-bold', fa: 'fa fa-bold', 'fa-3': 'icon-bold' },
          callback: function(e){
            // Give/remove ** surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('strong text');
            } else {
              chunk = selected.text;
            }

            // transform selection and set the cursor into chunked text
            if (content.substr(selected.start-2,2) === '**'
                && content.substr(selected.end,2) === '**' ) {
              e.setSelection(selected.start-2,selected.end+2);
              e.replaceSelection(chunk);
              cursor = selected.start-2;
            } else {
              e.replaceSelection('**'+chunk+'**');
              cursor = selected.start+2;
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        },{
          name: 'cmdItalic',
          title: 'Italic',
          hotkey: 'Ctrl+I',
          icon: { glyph: 'glyphicon glyphicon-italic', fa: 'fa fa-italic', 'fa-3': 'icon-italic' },
          callback: function(e){
            // Give/remove * surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('emphasized text');
            } else {
              chunk = selected.text;
            }

            // transform selection and set the cursor into chunked text
            if (content.substr(selected.start-1,1) === '_'
                && content.substr(selected.end,1) === '_' ) {
              e.setSelection(selected.start-1,selected.end+1);
              e.replaceSelection(chunk);
              cursor = selected.start-1;
            } else {
              e.replaceSelection('_'+chunk+'_');
              cursor = selected.start+1;
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        },{
          name: 'cmdHeading',
          title: 'Heading',
          hotkey: 'Ctrl+H',
          icon: { glyph: 'glyphicon glyphicon-header', fa: 'fa fa-header', 'fa-3': 'icon-font' },
          callback: function(e){
            // Append/remove ### surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent(), pointer, prevChar;

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('heading text');
            } else {
              chunk = selected.text + '\n';
            }

            // transform selection and set the cursor into chunked text
            if ((pointer = 4, content.substr(selected.start-pointer,pointer) === '### ')
                || (pointer = 3, content.substr(selected.start-pointer,pointer) === '###')) {
              e.setSelection(selected.start-pointer,selected.end);
              e.replaceSelection(chunk);
              cursor = selected.start-pointer;
            } else if (selected.start > 0 && (prevChar = content.substr(selected.start-1,1), !!prevChar && prevChar != '\n')) {
              e.replaceSelection('\n\n### '+chunk);
              cursor = selected.start+6;
            } else {
              // Empty string before element
              e.replaceSelection('### '+chunk);
              cursor = selected.start+4;
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        }]
      },{
        name: 'groupLink',
        data: [{
          name: 'cmdUrl',
          title: 'URL/Link',
          hotkey: 'Ctrl+L',
          icon: { glyph: 'glyphicon glyphicon-link', fa: 'fa fa-link', 'fa-3': 'icon-link' },
          callback: function(e){
            // Give [] surround the selection and prepend the link
            var chunk, cursor, selected = e.getSelection(), content = e.getContent(), link;

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('enter link description here');
            } else {
              chunk = selected.text;
            }

            link = prompt(e.__localize('Insert Hyperlink'),'http://');

            if (link !== null && link !== '' && link !== 'http://' && link.substr(0,4) === 'http') {
              var sanitizedLink = $('<div>'+link+'</div>').text();

              // transform selection and set the cursor into chunked text
              e.replaceSelection('['+chunk+']('+sanitizedLink+')');
              cursor = selected.start+1;

              // Set the cursor
              e.setSelection(cursor,cursor+chunk.length);
            }
          }
        },{
          name: 'cmdImage',
          title: 'Image',
          hotkey: 'Ctrl+G',
          icon: { glyph: 'glyphicon glyphicon-picture', fa: 'fa fa-picture-o', 'fa-3': 'icon-picture' },
          callback: function(e){
            // Give ![] surround the selection and prepend the image link
            var chunk, cursor, selected = e.getSelection(), content = e.getContent(), link;

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('enter image description here');
            } else {
              chunk = selected.text;
            }

            link = prompt(e.__localize('Insert Image Hyperlink'),'http://');

            if (link !== null && link !== '' && link !== 'http://' && link.substr(0,4) === 'http') {
              var sanitizedLink = $('<div>'+link+'</div>').text();

              // transform selection and set the cursor into chunked text
              e.replaceSelection('!['+chunk+']('+sanitizedLink+' "'+e.__localize('enter image title here')+'")');
              cursor = selected.start+2;

              // Set the next tab
              e.setNextTab(e.__localize('enter image title here'));

              // Set the cursor
              e.setSelection(cursor,cursor+chunk.length);
            }
          }
        }]
      },{
        name: 'groupMisc',
        data: [{
          name: 'cmdList',
          hotkey: 'Ctrl+U',
          title: 'Unordered List',
          icon: { glyph: 'glyphicon glyphicon-list', fa: 'fa fa-list', 'fa-3': 'icon-list-ul' },
          callback: function(e){
            // Prepend/Give - surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

            // transform selection and set the cursor into chunked text
            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('list text here');

              e.replaceSelection('- '+chunk);
              // Set the cursor
              cursor = selected.start+2;
            } else {
              if (selected.text.indexOf('\n') < 0) {
                chunk = selected.text;

                e.replaceSelection('- '+chunk);

                // Set the cursor
                cursor = selected.start+2;
              } else {
                var list = [];

                list = selected.text.split('\n');
                chunk = list[0];

                $.each(list,function(k,v) {
                  list[k] = '- '+v;
                });

                e.replaceSelection('\n\n'+list.join('\n'));

                // Set the cursor
                cursor = selected.start+4;
              }
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        },
        {
          name: 'cmdListO',
          hotkey: 'Ctrl+O',
          title: 'Ordered List',
          icon: { glyph: 'glyphicon glyphicon-th-list', fa: 'fa fa-list-ol', 'fa-3': 'icon-list-ol' },
          callback: function(e) {

            // Prepend/Give - surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

            // transform selection and set the cursor into chunked text
            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('list text here');
              e.replaceSelection('1. '+chunk);
              // Set the cursor
              cursor = selected.start+3;
            } else {
              if (selected.text.indexOf('\n') < 0) {
                chunk = selected.text;

                e.replaceSelection('1. '+chunk);

                // Set the cursor
                cursor = selected.start+3;
              } else {
                var list = [];

                list = selected.text.split('\n');
                chunk = list[0];

                $.each(list,function(k,v) {
                  list[k] = '1. '+v;
                });

                e.replaceSelection('\n\n'+list.join('\n'));

                // Set the cursor
                cursor = selected.start+5;
              }
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        },
        {
          name: 'cmdCode',
          hotkey: 'Ctrl+K',
          title: 'Code',
          icon: { glyph: 'glyphicon glyphicon-asterisk', fa: 'fa fa-code', 'fa-3': 'icon-code' },
          callback: function(e) {
            // Give/remove ** surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('code text here');
            } else {
              chunk = selected.text;
            }

            // transform selection and set the cursor into chunked text
            if (content.substr(selected.start-4,4) === '```\n'
                && content.substr(selected.end,4) === '\n```') {
              e.setSelection(selected.start-4, selected.end+4);
              e.replaceSelection(chunk);
              cursor = selected.start-4;
            } else if (content.substr(selected.start-1,1) === '`'
                && content.substr(selected.end,1) === '`') {
              e.setSelection(selected.start-1,selected.end+1);
              e.replaceSelection(chunk);
              cursor = selected.start-1;
            } else if (content.indexOf('\n') > -1) {
              e.replaceSelection('```\n'+chunk+'\n```');
              cursor = selected.start+4;
            } else {
              e.replaceSelection('`'+chunk+'`');
              cursor = selected.start+1;
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        },
        {
          name: 'cmdQuote',
          hotkey: 'Ctrl+Q',
          title: 'Quote',
          icon: { glyph: 'glyphicon glyphicon-comment', fa: 'fa fa-quote-left', 'fa-3': 'icon-quote-left' },
          callback: function(e) {
            // Prepend/Give - surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

            // transform selection and set the cursor into chunked text
            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('quote here');

              e.replaceSelection('> '+chunk);

              // Set the cursor
              cursor = selected.start+2;
            } else {
              if (selected.text.indexOf('\n') < 0) {
                chunk = selected.text;

                e.replaceSelection('> '+chunk);

                // Set the cursor
                cursor = selected.start+2;
              } else {
                var list = [];

                list = selected.text.split('\n');
                chunk = list[0];

                $.each(list,function(k,v) {
                  list[k] = '> '+v;
                });

                e.replaceSelection('\n\n'+list.join('\n'));

                // Set the cursor
                cursor = selected.start+4;
              }
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        }]
      },{
        name: 'groupUtil',
        data: [{
          name: 'cmdPreview',
          toggle: true,
          hotkey: 'Ctrl+P',
          title: 'Preview',
          btnText: 'Preview',
          btnClass: 'btn btn-primary btn-sm',
          icon: { glyph: 'glyphicon glyphicon-search', fa: 'fa fa-search', 'fa-3': 'icon-search' },
          callback: function(e){
            // Check the preview mode and toggle based on this flag
            var isPreview = e.$isPreview,content;

            if (isPreview === false) {
              // Give flag that tell the editor enter preview mode
              e.showPreview();
            } else {
              e.hidePreview();
            }
          }
        }]
      }]
    ],
    additionalButtons:[], // Place to hook more buttons by code
    reorderButtonGroups:[],
    hiddenButtons:[], // Default hidden buttons
    disabledButtons:[], // Default disabled buttons
    footer: '',
    fullscreen: {
      enable: true,
      icons: {
        fullscreenOn: {
          fa: 'fa fa-expand',
          glyph: 'glyphicon glyphicon-fullscreen',
          'fa-3': 'icon-resize-full'
        },
        fullscreenOff: {
          fa: 'fa fa-compress',
          glyph: 'glyphicon glyphicon-fullscreen',
          'fa-3': 'icon-resize-small'
        }
      }
    },

    /* Events hook */
    onShow: function (e) {},
    onPreview: function (e) {},
    onSave: function (e) {},
    onBlur: function (e) {},
    onFocus: function (e) {},
    onChange: function(e) {},
    onFullscreen: function(e) {}
  };

  $.fn.markdown.Constructor = Markdown;


 /* MARKDOWN NO CONFLICT
  * ==================== */

  $.fn.markdown.noConflict = function () {
    $.fn.markdown = old;
    return this;
  };

  /* MARKDOWN GLOBAL FUNCTION & DATA-API
  * ==================================== */
  var initMarkdown = function(el) {
    var $this = el;

    if ($this.data('markdown')) {
      $this.data('markdown').showEditor();
      return;
    }

    $this.markdown()
  };

  var blurNonFocused = function(e) {
    var $activeElement = $(document.activeElement);

    // Blur event
    $(document).find('.md-editor').each(function(){
      var $this            = $(this),
          focused          = $activeElement.closest('.md-editor')[0] === this,
          attachedMarkdown = $this.find('textarea').data('markdown') ||
                             $this.find('div[data-provider="markdown-preview"]').data('markdown');

      if (attachedMarkdown && !focused) {
        attachedMarkdown.blur();
      }
    })
  };

  $(document)
    .on('click.markdown.data-api', '[data-provide="markdown-editable"]', function (e) {
      initMarkdown($(this));
      e.preventDefault();
    })
    .on('click focusin', function (e) {
      blurNonFocused(e);
    })
    .ready(function(){
      $('textarea[data-provide="markdown"]').each(function(){
        initMarkdown($(this));
      })
    });

}(window.jQuery);

/*!
 * datepair.js v0.4.4 - A javascript plugin for intelligently selecting date and time ranges inspired by Google Calendar.
 * Copyright (c) 2014 Jon Thornton - http://jonthornton.github.com/Datepair.js
 * License: MIT
 */

(function(window, document) {

	'use strict';

	var _ONE_DAY = 86400000;
	var jq = window.Zepto || window.jQuery
	
	function simpleExtend(obj1, obj2) {
		var out = obj2 || {};
	
		for (var i in obj1) {
			if (!(i in out)) {
				out[i] = obj1[i]
			}
		}
	
		return out;
	}
	
	// IE's custom event support is totally borked.
	// Use jQuery if possible
	function triggerSimpleCustomEvent(el, eventName) {
		if (jq) {
			jq(el).trigger(eventName);
		} else {
			var event = document.createEvent('CustomEvent');
			event.initCustomEvent(eventName, true, true, {});
			el.dispatchEvent(event);
		}
	}
	
	// el.classList not supported by < IE10
	// use jQuery if available
	function hasClass(el, className) {
		if (jq) {
			return jq(el).hasClass(className);
		} else {
			return el.classList.contains(className);
		}
	}
	
	function Datepair(container, options) {
		this.dateDelta = null;
		this.timeDelta = null;
		this._defaults =	{
			startClass: 'start',
			endClass: 'end',
			timeClass: 'time',
			dateClass: 'date',
			defaultDateDelta: 0,
			defaultTimeDelta: 3600000,
			anchor: 'start',
	
			// defaults for jquery-timepicker; override when using other input widgets
			parseTime: function(input){
				return jq(input).timepicker('getTime');
			},
			updateTime: function(input, dateObj){
				jq(input).timepicker('setTime', dateObj);
			},
			setMinTime: function(input, dateObj){
				jq(input).timepicker('option', 'minTime', dateObj);
			},
	
			// defaults for bootstrap datepicker; override when using other input widgets
			parseDate: function(input){
				return jq(input).datepicker('getDate');
			},
			updateDate: function(input, dateObj){
				jq(input).datepicker('update', dateObj);
			}
		};
	
		this.container = container;
		this.settings = simpleExtend(this._defaults, options);
	
		this.startDateInput = this.container.querySelector('.'+this.settings.startClass+'.'+this.settings.dateClass);
		this.endDateInput = this.container.querySelector('.'+this.settings.endClass+'.'+this.settings.dateClass);
		this.startTimeInput = this.container.querySelector('.'+this.settings.startClass+'.'+this.settings.timeClass);
		this.endTimeInput = this.container.querySelector('.'+this.settings.endClass+'.'+this.settings.timeClass);
	
		// initialize date and time deltas
		this.refresh()
		this._updateEndMintime();
	
		// init starts here
		this._bindChangeHandler();
	}
	
	Datepair.prototype = {
		constructor: Datepair,
	
		option: function(key, value)
		{
			if (typeof key == 'object') {
				this.settings = simpleExtend(this.settings, key);
	
			} else if (typeof key == 'string' && typeof value != 'undefined') {
				this.settings[key] = value;
	
			} else if (typeof key == 'string') {
				return this.settings[key];
			}
	
			this._updateEndMintime();
		},
	
		getTimeDiff: function()
		{
			// due to the fact that times can wrap around, timeDiff for any
			// time-only pair will always be >= 0
			var delta = this.dateDelta + this.timeDelta;
			if (delta < 0 && (!this.startDateInput || !this.endDateInput) ) {
				delta += _ONE_DAY
			}
	
			return delta;
		},
	
		refresh: function()
		{
			if (this.startDateInput && this.startDateInput.value && this.startDateInput && this.endDateInput.value) {
				var startDate = this.settings.parseDate(this.startDateInput);
				var endDate = this.settings.parseDate(this.endDateInput);
				this.dateDelta = endDate.getTime() - startDate.getTime();
			}
			if (this.startTimeInput && this.startTimeInput.value && this.endTimeInput && this.endTimeInput.value) {
				var startTime = this.settings.parseTime(this.startTimeInput);
				var endTime = this.settings.parseTime(this.endTimeInput);
				this.timeDelta = endTime.getTime() - startTime.getTime();
			}
		},
	
		remove: function()
		{
			this._unbindChangeHandler()
		},
	
		_bindChangeHandler: function(){
			// addEventListener doesn't work with synthetic "change" events
			// fired by jQuery's trigger() functioin. If jQuery is present,
			// use that for event binding
			if (jq) {
				jq(this.container).on('change.datepair', jq.proxy(this.handleEvent, this));
			} else {
				this.container.addEventListener('change', this, false);
			}
		},
	
		_unbindChangeHandler: function(){
			if (jq) {
				jq(this.container).off('change.datepair');
			} else {
				this.container.removeEventListener('change', this, false);
			}
		},
	
		// This function will be called when passing 'this' to addEventListener
		handleEvent: function(e){
			// temporarily unbind the change handler to prevent triggering this
			// if we update other inputs
			this._unbindChangeHandler();
	
			if (hasClass(e.target, this.settings.dateClass)) {
				if (e.target.value != '') {
					this._dateChanged(e.target);
				} else {
					this.dateDelta = null;
				}
	
			} else if (hasClass(e.target, this.settings.timeClass)) {
				if (e.target.value != '') {
					this._timeChanged(e.target);
				} else {
					this.timeDelta = null;
				}
			}
	
			this._validateRanges();
			this._updateEndMintime()
			this._bindChangeHandler();
		},
	
		_dateChanged: function(target){
			if (!this.startDateInput || !this.endDateInput) {
				return
			}
	
			if (!this.startDateInput.value || !this.endDateInput.value) {
				if (this.settings.defaultDateDelta !== null) {
					if (this.startDateInput.value) {
						var startDate = this.settings.parseDate(this.startDateInput);
						var newEnd = new Date(startDate.getTime() + this.settings.defaultDateDelta * _ONE_DAY);
						this.settings.updateDate(this.endDateInput, newEnd);
	
					} else if (this.endDateInput.value) {
						var endDate = this.settings.parseDate(this.endDateInput);
						var newStart = new Date(endDate.getTime() - this.settings.defaultDateDelta * _ONE_DAY);
						this.settings.updateDate(this.startDateInput, newStart);
					}
	
					this.dateDelta = this.settings.defaultDateDelta * _ONE_DAY;
				} else {
					this.dateDelta = null;
				}
	
				return;
			}
	
			var startDate = this.settings.parseDate(this.startDateInput);
			var endDate = this.settings.parseDate(this.endDateInput);
	
			if (this.settings.anchor == 'start' && hasClass(target, this.settings.startClass)) {
				var newDate = new Date(startDate.getTime() + this.dateDelta);
				this.settings.updateDate(this.endDateInput, newDate);
			} else if (this.settings.anchor == 'end' && hasClass(target, this.settings.endClass)) {
				var newDate = new Date(endDate.getTime() - this.dateDelta);
				this.settings.updateDate(this.startDateInput, newDate);
			} else {
				if (endDate < startDate) {
					var otherInput = hasClass(target, this.settings.startClass) ? this.endDateInput : this.startDateInput;
					var selectedDate = this.settings.parseDate(target);
					this.dateDelta = 0;
					this.settings.updateDate(otherInput, selectedDate);
				} else {
					this.dateDelta = endDate.getTime() - startDate.getTime();
				}
			}
		},
	
		_timeChanged: function(target){
			if (!this.startTimeInput || !this.endTimeInput) {
				return
			}
	
			if (!this.startTimeInput.value || !this.endTimeInput.value) {
				if (this.settings.defaultTimeDelta !== null) {
					if (this.startTimeInput.value) {
						var startTime = this.settings.parseTime(this.startTimeInput);
						var newEnd = new Date(startTime.getTime() + this.settings.defaultTimeDelta);
						this.settings.updateTime(this.endTimeInput, newEnd);
					} else if (this.endTimeInput.value) {
						var endTime = this.settings.parseTime(this.endTimeInput);
						var newStart = new Date(endTime.getTime() - this.settings.defaultTimeDelta);
						this.settings.updateTime(this.startTimeInput, newStart);
					}
	
					this.timeDelta = this.settings.defaultTimeDelta;
				} else {
					this.timeDelta = null;
					return;
				}
			}
	
			var startTime = this.settings.parseTime(this.startTimeInput);
			var endTime = this.settings.parseTime(this.endTimeInput);
	
			if (this.settings.anchor == 'start' && hasClass(target, this.settings.startClass)) {
				var newTime = new Date(startTime.getTime() + this.timeDelta);
				this.settings.updateTime(this.endTimeInput, newTime);
				endTime = this.settings.parseTime(this.endTimeInput);
			} else if (this.settings.anchor == 'end' && hasClass(target, this.settings.endClass)) {
				var newTime = new Date(endTime.getTime() - this.timeDelta);
				this.settings.updateTime(this.startTimeInput, newTime);
				startTime = this.settings.parseTime(this.startTimeInput);
			}
	
			var newDelta = endTime.getTime() - startTime.getTime();
	
			if (this.dateDelta !== null
					&& this.dateDelta + this.timeDelta <= _ONE_DAY
					&& this.dateDelta + newDelta != 0
					&& (newDelta >= 0 && this.timeDelta < 0) || (newDelta < 0 && this.timeDelta >= 0)) {
				var offset = (endTime < startTime) ? _ONE_DAY : -1 * _ONE_DAY;
				if (this.settings.anchor == 'start') {
					var endDate = this.settings.parseDate(this.endDateInput);
					this.settings.updateDate(this.endDateInput, new Date(endDate.getTime() + offset));
					this._dateChanged(this.endDateInput);
				} else if (this.settings.anchor == 'end') {
					var startDate = this.settings.parseDate(this.startDateInput);
					this.settings.updateDate(this.startDateInput, new Date(startDate.getTime() - offset));
					this._dateChanged(this.startDateInput);
				}
			}
			this.timeDelta = newDelta;
		},
	
		_updateEndMintime: function(){
			if (typeof this.settings.setMinTime != 'function') return;
	
			var baseTime = null;
			if (this.settings.anchor == 'start' && (!this.dateDelta || this.dateDelta < _ONE_DAY || (this.timeDelta && this.dateDelta + this.timeDelta < _ONE_DAY))) {
				baseTime = this.settings.parseTime(this.startTimeInput);
			}
	
			this.settings.setMinTime(this.endTimeInput, baseTime);
		},
	
		_validateRanges: function(){
			if (this.startTimeInput && this.endTimeInput && this.timeDelta === null) {
				triggerSimpleCustomEvent(this.container, 'rangeIncomplete');
				return;
			}
	
			if (this.startDateInput && this.endDateInput && this.dateDelta === null) {
				triggerSimpleCustomEvent(this.container, 'rangeIncomplete');
				return;
			}
	
			// due to the fact that times can wrap around, any time-only pair will be considered valid
			if (!this.startDateInput || !this.endDateInput || this.dateDelta + this.timeDelta >= 0) {
				triggerSimpleCustomEvent(this.container, 'rangeSelected');
			} else {
				triggerSimpleCustomEvent(this.container, 'rangeError');
			}
		}
	}

	window.Datepair = Datepair;

}(window, document));
/*!
 * datepair.js v0.4.4 - A javascript plugin for intelligently selecting date and time ranges inspired by Google Calendar.
 * Copyright (c) 2014 Jon Thornton - http://jonthornton.github.com/Datepair.js
 * License: MIT
 */

(function($) {

	if(!$) {
		return;
	}

	////////////
	// Plugin //
	////////////

	$.fn.datepair = function(option) {
		var out;
		this.each(function() {
			var $this = $(this);
			var data = $this.data('datepair');
			var options = typeof option === 'object' && option;

			if (!data) {
				data = new Datepair(this, options);
				$this.data('datepair', data);
			}

			if (typeof option === 'string') {
				out = data[option]();
			}
		});

		return out || this;
	};

	//////////////
	// Data API //
	//////////////

	$('[data-datepair]').each(function() {
		var $this = $(this);
		$this.datepair($this.data());
	});

}(window.Zepto || window.jQuery));
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
  ('def', '\\n+(?=' + block.def.source + ')')
  ();

block.blockquote = replace(block.blockquote)
  ('def', block.def)
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top, bq) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , bull
    , b
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3]
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top, true);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false, bq);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style',
        text: cap[0]
      });
      continue;
    }

    // def
    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer;
  this.renderer.options = this.options;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? escape(cap[0])
        : cap[0];
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2], true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += escape(this.smartypants(cap[0]));
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href)
    , title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/--/g, '\u2014')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer;
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options, renderer) {
  var parser = new Parser(options, renderer);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options, this.renderer);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        this.token.text);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = ''
        , body = ''
        , i
        , row
        , cell
        , flags
        , j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        flags = { header: true, align: this.token.align[i] };
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      var body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      var body = ''
        , ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
  return html.replace(/&([#\w]+);/g, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}


/**
 * Marked
 */

function marked(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight
      , tokens
      , pending
      , i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occured:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer,
  xhtml: false
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  this.marked = marked;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());

/*! ngTagsInput v2.1.1 License: MIT */!function(){"use strict";function a(){var a={};return{on:function(b,c){return b.split(" ").forEach(function(b){a[b]||(a[b]=[]),a[b].push(c)}),this},trigger:function(b,c){return angular.forEach(a[b],function(a){a.call(null,c)}),this}}}function b(a,b){return a=a||[],a.length>0&&!angular.isObject(a[0])&&a.forEach(function(c,d){a[d]={},a[d][b]=c}),a}function c(a,b,c){for(var d=null,f=0;f<a.length;f++)if(e(a[f][c]).toLowerCase()===e(b[c]).toLowerCase()){d=a[f];break}return d}function d(a,b,c){if(!b)return a;var d=b.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");return a.replace(new RegExp(d,"gi"),c)}function e(a){return angular.isUndefined(a)||null==a?"":a.toString().trim()}function f(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var g={backspace:8,tab:9,enter:13,escape:27,space:32,up:38,down:40,comma:188},h=9007199254740991,i=["text","email","url"],j=angular.module("ngTagsInput",[]);j.directive("tagsInput",["$timeout","$document","tagsInputConfig",function(d,f,j){function k(a,b){var d,f,g,h={};return d=function(b){return e(b[a.displayProperty])},f=function(b,c){b[a.displayProperty]=c},g=function(b){var e=d(b);return e&&e.length>=a.minLength&&e.length<=a.maxLength&&a.allowedTagsPattern.test(e)&&!c(h.items,b,a.displayProperty)},h.items=[],h.addText=function(a){var b={};return f(b,a),h.add(b)},h.add=function(c){var e=d(c);return a.replaceSpacesWithDashes&&(e=e.replace(/\s/g,"-")),f(c,e),g(c)?(h.items.push(c),b.trigger("tag-added",{$tag:c})):e&&b.trigger("invalid-tag",{$tag:c}),c},h.remove=function(a){var c=h.items.splice(a,1)[0];return b.trigger("tag-removed",{$tag:c}),c},h.removeLast=function(){var b,c=h.items.length-1;return a.enableEditingLastTag||h.selected?(h.selected=null,b=h.remove(c)):h.selected||(h.selected=h.items[c]),b},h}function l(a){return-1!==i.indexOf(a)}return{restrict:"E",require:"ngModel",scope:{tags:"=ngModel",onTagAdded:"&",onTagRemoved:"&"},replace:!1,transclude:!0,templateUrl:"ngTagsInput/tags-input.html",controller:["$scope","$attrs","$element",function(b,c,d){b.events=new a,j.load("tagsInput",b,c,{type:[String,"text",l],placeholder:[String,"Add a tag"],tabindex:[Number,null],removeTagSymbol:[String,String.fromCharCode(215)],replaceSpacesWithDashes:[Boolean,!0],minLength:[Number,3],maxLength:[Number,h],addOnEnter:[Boolean,!0],addOnSpace:[Boolean,!1],addOnComma:[Boolean,!0],addOnBlur:[Boolean,!0],allowedTagsPattern:[RegExp,/.+/],enableEditingLastTag:[Boolean,!1],minTags:[Number,0],maxTags:[Number,h],displayProperty:[String,"text"],allowLeftoverText:[Boolean,!1],addFromAutocompleteOnly:[Boolean,!1]}),b.tagList=new k(b.options,b.events),this.registerAutocomplete=function(){var a=d.find("input");return a.on("keydown",function(a){b.events.trigger("input-keydown",a)}),{addTag:function(a){return b.tagList.add(a)},focusInput:function(){a[0].focus()},getTags:function(){return b.tags},getCurrentTagText:function(){return b.newTag.text},getOptions:function(){return b.options},on:function(a,c){return b.events.on(a,c),this}}}}],link:function(a,c,h,i){var j,k=[g.enter,g.comma,g.space,g.backspace],l=a.tagList,m=a.events,n=a.options,o=c.find("input"),p=["minTags","maxTags","allowLeftoverText"];j=function(){i.$setValidity("maxTags",a.tags.length<=n.maxTags),i.$setValidity("minTags",a.tags.length>=n.minTags),i.$setValidity("leftoverText",n.allowLeftoverText?!0:!a.newTag.text)},m.on("tag-added",a.onTagAdded).on("tag-removed",a.onTagRemoved).on("tag-added",function(){a.newTag.text=""}).on("tag-added tag-removed",function(){i.$setViewValue(a.tags)}).on("invalid-tag",function(){a.newTag.invalid=!0}).on("input-change",function(){l.selected=null,a.newTag.invalid=null}).on("input-focus",function(){i.$setValidity("leftoverText",!0)}).on("input-blur",function(){n.addFromAutocompleteOnly||(n.addOnBlur&&l.addText(a.newTag.text),j())}).on("option-change",function(a){-1!==p.indexOf(a.name)&&j()}),a.newTag={text:"",invalid:null},a.getDisplayText=function(a){return e(a[n.displayProperty])},a.track=function(a){return a[n.displayProperty]},a.newTagChange=function(){m.trigger("input-change",a.newTag.text)},a.$watch("tags",function(c){a.tags=b(c,n.displayProperty),l.items=a.tags}),a.$watch("tags.length",function(){j()}),o.on("keydown",function(b){if(!b.isImmediatePropagationStopped||!b.isImmediatePropagationStopped()){var c,d,e=b.keyCode,f=b.shiftKey||b.altKey||b.ctrlKey||b.metaKey,h={};if(!f&&-1!==k.indexOf(e))if(h[g.enter]=n.addOnEnter,h[g.comma]=n.addOnComma,h[g.space]=n.addOnSpace,c=!n.addFromAutocompleteOnly&&h[e],d=!c&&e===g.backspace&&0===a.newTag.text.length,c)l.addText(a.newTag.text),a.$apply(),b.preventDefault();else if(d){var i=l.removeLast();i&&n.enableEditingLastTag&&(a.newTag.text=i[n.displayProperty]),a.$apply(),b.preventDefault()}}}).on("focus",function(){a.hasFocus||(a.hasFocus=!0,m.trigger("input-focus"),a.$apply())}).on("blur",function(){d(function(){var b=f.prop("activeElement"),d=b===o[0],e=c[0].contains(b);(d||!e)&&(a.hasFocus=!1,m.trigger("input-blur"))})}),c.find("div").on("click",function(){o[0].focus()})}}}]),j.directive("autoComplete",["$document","$timeout","$sce","tagsInputConfig",function(a,h,i,j){function k(a,d){var e,f,g,i={};return f=function(a,b){return a.filter(function(a){return!c(b,a,d.tagsInput.displayProperty)})},i.reset=function(){g=null,i.items=[],i.visible=!1,i.index=-1,i.selected=null,i.query=null,h.cancel(e)},i.show=function(){i.selected=null,i.visible=!0},i.load=function(c,j){h.cancel(e),e=h(function(){i.query=c;var e=a({$query:c});g=e,e.then(function(a){e===g&&(a=b(a.data||a,d.tagsInput.displayProperty),a=f(a,j),i.items=a.slice(0,d.maxResultsToShow),i.items.length>0?i.show():i.reset())})},d.debounceDelay,!1)},i.selectNext=function(){i.select(++i.index)},i.selectPrior=function(){i.select(--i.index)},i.select=function(a){0>a?a=i.items.length-1:a>=i.items.length&&(a=0),i.index=a,i.selected=i.items[a]},i.reset(),i}return{restrict:"E",require:"^tagsInput",scope:{source:"&"},templateUrl:"ngTagsInput/auto-complete.html",link:function(a,b,c,h){var l,m,n,o,p,q,r=[g.enter,g.tab,g.escape,g.up,g.down];j.load("autoComplete",a,c,{debounceDelay:[Number,100],minLength:[Number,3],highlightMatchedText:[Boolean,!0],maxResultsToShow:[Number,10],loadOnDownArrow:[Boolean,!1],loadOnEmpty:[Boolean,!1],loadOnFocus:[Boolean,!1]}),n=a.options,m=h.registerAutocomplete(),n.tagsInput=m.getOptions(),l=new k(a.source,n),o=function(a){return a[n.tagsInput.displayProperty]},p=function(a){return e(o(a))},q=function(a){return a&&a.length>=n.minLength||!a&&n.loadOnEmpty},a.suggestionList=l,a.addSuggestionByIndex=function(b){l.select(b),a.addSuggestion()},a.addSuggestion=function(){var a=!1;return l.selected&&(m.addTag(l.selected),l.reset(),m.focusInput(),a=!0),a},a.highlight=function(a){var b=p(a);return b=f(b),n.highlightMatchedText&&(b=d(b,f(l.query),"<em>$&</em>")),i.trustAsHtml(b)},a.track=function(a){return o(a)},m.on("tag-added tag-removed invalid-tag input-blur",function(){l.reset()}).on("input-change",function(a){q(a)?l.load(a,m.getTags()):l.reset()}).on("input-focus",function(){var a=m.getCurrentTagText();n.loadOnFocus&&q(a)&&l.load(a,m.getTags())}).on("input-keydown",function(b){var c=!1;b.stopImmediatePropagation=function(){c=!0,b.stopPropagation()},b.isImmediatePropagationStopped=function(){return c};var d=b.keyCode,e=!1;-1!==r.indexOf(d)&&(l.visible?d===g.down?(l.selectNext(),e=!0):d===g.up?(l.selectPrior(),e=!0):d===g.escape?(l.reset(),e=!0):(d===g.enter||d===g.tab)&&(e=a.addSuggestion()):d===g.down&&a.options.loadOnDownArrow&&(l.load(m.getCurrentTagText(),m.getTags()),e=!0),e&&(b.preventDefault(),b.stopImmediatePropagation(),a.$apply()))})}}}]),j.directive("tiTranscludeAppend",function(){return function(a,b,c,d,e){e(function(a){b.append(a)})}}),j.directive("tiAutosize",["tagsInputConfig",function(a){return{restrict:"A",require:"ngModel",link:function(b,c,d,e){var f,g,h=a.getTextAutosizeThreshold();f=angular.element('<span class="input"></span>'),f.css("display","none").css("visibility","hidden").css("width","auto").css("white-space","pre"),c.parent().append(f),g=function(a){var b,e=a;return angular.isString(e)&&0===e.length&&(e=d.placeholder),e&&(f.text(e),f.css("display",""),b=f.prop("offsetWidth"),f.css("display","none")),c.css("width",b?b+h+"px":""),a},e.$parsers.unshift(g),e.$formatters.unshift(g),d.$observe("placeholder",function(a){e.$modelValue||g(a)})}}}]),j.directive("tiBindAttrs",function(){return function(a,b,c){a.$watch(c.tiBindAttrs,function(a){angular.forEach(a,function(a,b){c.$set(b,a)})},!0)}}),j.provider("tagsInputConfig",function(){var a={},b={},c=3;this.setDefaults=function(b,c){return a[b]=c,this},this.setActiveInterpolation=function(a,c){return b[a]=c,this},this.setTextAutosizeThreshold=function(a){return c=a,this},this.$get=["$interpolate",function(d){var e={};return e[String]=function(a){return a},e[Number]=function(a){return parseInt(a,10)},e[Boolean]=function(a){return"true"===a.toLowerCase()},e[RegExp]=function(a){return new RegExp(a)},{load:function(c,f,g,h){var i=function(){return!0};f.options={},angular.forEach(h,function(h,j){var k,l,m,n,o,p;k=h[0],l=h[1],m=h[2]||i,n=e[k],o=function(){var b=a[c]&&a[c][j];return angular.isDefined(b)?b:l},p=function(a){f.options[j]=a&&m(a)?n(a):o()},b[c]&&b[c][j]?g.$observe(j,function(a){p(a),f.events.trigger("option-change",{name:j,newValue:a})}):p(g[j]&&d(g[j])(f.$parent))})},getTextAutosizeThreshold:function(){return c}}}]}),j.run(["$templateCache",function(a){a.put("ngTagsInput/tags-input.html",'<div class="host" tabindex="-1" ti-transclude-append=""><div class="tags" ng-class="{focused: hasFocus}"><ul class="tag-list"><li class="tag-item" ng-repeat="tag in tagList.items track by track(tag)" ng-class="{ selected: tag == tagList.selected }"><span ng-bind="getDisplayText(tag)"></span> <a class="remove-button" ng-click="tagList.remove($index)" ng-bind="options.removeTagSymbol"></a></li></ul><input class="input" ng-model="newTag.text" ng-change="newTagChange()" ng-trim="false" ng-class="{\'invalid-tag\': newTag.invalid}" ti-bind-attrs="{type: options.type, placeholder: options.placeholder, tabindex: options.tabindex}" ti-autosize=""></div></div>'),a.put("ngTagsInput/auto-complete.html",'<div class="autocomplete" ng-show="suggestionList.visible"><ul class="suggestion-list"><li class="suggestion-item" ng-repeat="item in suggestionList.items track by track(item)" ng-class="{selected: item == suggestionList.selected}" ng-click="addSuggestionByIndex($index)" ng-mouseenter="suggestionList.select($index)" ng-bind-html="highlight(item)"></li></ul></div>')}])}();

/*
 * shariff - v1.4.8 - 14.01.2015
 * https://github.com/heiseonline/shariff
 * Copyright (c) 2015 Ines Pauer, Philipp Busse, Sebastian Hilbig, Erich Kramer, Deniz Sesli
 * Licensed under the MIT <http://www.opensource.org/licenses/mit-license.php> license
 */


(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
!function(o){function e(o){throw RangeError(L[o])}function n(o,e){for(var n=o.length;n--;)o[n]=e(o[n]);return o}function t(o,e){return n(o.split(S),e).join(".")}function r(o){for(var e,n,t=[],r=0,u=o.length;u>r;)e=o.charCodeAt(r++),e>=55296&&56319>=e&&u>r?(n=o.charCodeAt(r++),56320==(64512&n)?t.push(((1023&e)<<10)+(1023&n)+65536):(t.push(e),r--)):t.push(e);return t}function u(o){return n(o,function(o){var e="";return o>65535&&(o-=65536,e+=R(o>>>10&1023|55296),o=56320|1023&o),e+=R(o)}).join("")}function i(o){return 10>o-48?o-22:26>o-65?o-65:26>o-97?o-97:x}function f(o,e){return o+22+75*(26>o)-((0!=e)<<5)}function c(o,e,n){var t=0;for(o=n?P(o/m):o>>1,o+=P(o/e);o>M*C>>1;t+=x)o=P(o/M);return P(t+(M+1)*o/(o+j))}function l(o){var n,t,r,f,l,d,s,a,p,h,v=[],g=o.length,w=0,j=I,m=A;for(t=o.lastIndexOf(F),0>t&&(t=0),r=0;t>r;++r)o.charCodeAt(r)>=128&&e("not-basic"),v.push(o.charCodeAt(r));for(f=t>0?t+1:0;g>f;){for(l=w,d=1,s=x;f>=g&&e("invalid-input"),a=i(o.charCodeAt(f++)),(a>=x||a>P((b-w)/d))&&e("overflow"),w+=a*d,p=m>=s?y:s>=m+C?C:s-m,!(p>a);s+=x)h=x-p,d>P(b/h)&&e("overflow"),d*=h;n=v.length+1,m=c(w-l,n,0==l),P(w/n)>b-j&&e("overflow"),j+=P(w/n),w%=n,v.splice(w++,0,j)}return u(v)}function d(o){var n,t,u,i,l,d,s,a,p,h,v,g,w,j,m,E=[];for(o=r(o),g=o.length,n=I,t=0,l=A,d=0;g>d;++d)v=o[d],128>v&&E.push(R(v));for(u=i=E.length,i&&E.push(F);g>u;){for(s=b,d=0;g>d;++d)v=o[d],v>=n&&s>v&&(s=v);for(w=u+1,s-n>P((b-t)/w)&&e("overflow"),t+=(s-n)*w,n=s,d=0;g>d;++d)if(v=o[d],n>v&&++t>b&&e("overflow"),v==n){for(a=t,p=x;h=l>=p?y:p>=l+C?C:p-l,!(h>a);p+=x)m=a-h,j=x-h,E.push(R(f(h+m%j,0))),a=P(m/j);E.push(R(f(a,0))),l=c(t,w,u==i),t=0,++u}++t,++n}return E.join("")}function s(o){return t(o,function(o){return E.test(o)?l(o.slice(4).toLowerCase()):o})}function a(o){return t(o,function(o){return O.test(o)?"xn--"+d(o):o})}var p="object"==typeof exports&&exports,h="object"==typeof module&&module&&module.exports==p&&module,v="object"==typeof global&&global;(v.global===v||v.window===v)&&(o=v);var g,w,b=2147483647,x=36,y=1,C=26,j=38,m=700,A=72,I=128,F="-",E=/^xn--/,O=/[^ -~]/,S=/\x2E|\u3002|\uFF0E|\uFF61/g,L={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},M=x-y,P=Math.floor,R=String.fromCharCode;if(g={version:"1.2.4",ucs2:{decode:r,encode:u},decode:l,encode:d,toASCII:a,toUnicode:s},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){return g});else if(p&&!p.nodeType)if(h)h.exports=g;else for(w in g)g.hasOwnProperty(w)&&(p[w]=g[w]);else o.punycode=g}(this);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
"use strict";function hasOwnProperty(r,e){return Object.prototype.hasOwnProperty.call(r,e)}module.exports=function(r,e,t,n){e=e||"&",t=t||"=";var o={};if("string"!=typeof r||0===r.length)return o;var a=/\+/g;r=r.split(e);var s=1e3;n&&"number"==typeof n.maxKeys&&(s=n.maxKeys);var p=r.length;s>0&&p>s&&(p=s);for(var y=0;p>y;++y){var u,c,i,l,f=r[y].replace(a,"%20"),v=f.indexOf(t);v>=0?(u=f.substr(0,v),c=f.substr(v+1)):(u=f,c=""),i=decodeURIComponent(u),l=decodeURIComponent(c),hasOwnProperty(o,i)?isArray(o[i])?o[i].push(l):o[i]=[o[i],l]:o[i]=l}return o};var isArray=Array.isArray||function(r){return"[object Array]"===Object.prototype.toString.call(r)};
},{}],3:[function(require,module,exports){
"use strict";function map(r,e){if(r.map)return r.map(e);for(var t=[],n=0;n<r.length;n++)t.push(e(r[n],n));return t}var stringifyPrimitive=function(r){switch(typeof r){case"string":return r;case"boolean":return r?"true":"false";case"number":return isFinite(r)?r:"";default:return""}};module.exports=function(r,e,t,n){return e=e||"&",t=t||"=",null===r&&(r=void 0),"object"==typeof r?map(objectKeys(r),function(n){var i=encodeURIComponent(stringifyPrimitive(n))+t;return isArray(r[n])?map(r[n],function(r){return i+encodeURIComponent(stringifyPrimitive(r))}).join(e):i+encodeURIComponent(stringifyPrimitive(r[n]))}).join(e):n?encodeURIComponent(stringifyPrimitive(n))+t+encodeURIComponent(stringifyPrimitive(r)):""};var isArray=Array.isArray||function(r){return"[object Array]"===Object.prototype.toString.call(r)},objectKeys=Object.keys||function(r){var e=[];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&e.push(t);return e};
},{}],4:[function(require,module,exports){
"use strict";exports.decode=exports.parse=require("./decode"),exports.encode=exports.stringify=require("./encode");
},{"./decode":2,"./encode":3}],5:[function(require,module,exports){
function Url(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function urlParse(t,s,e){if(t&&isObject(t)&&t instanceof Url)return t;var h=new Url;return h.parse(t,s,e),h}function urlFormat(t){return isString(t)&&(t=urlParse(t)),t instanceof Url?t.format():Url.prototype.format.call(t)}function urlResolve(t,s){return urlParse(t,!1,!0).resolve(s)}function urlResolveObject(t,s){return t?urlParse(t,!1,!0).resolveObject(s):s}function isString(t){return"string"==typeof t}function isObject(t){return"object"==typeof t&&null!==t}function isNull(t){return null===t}function isNullOrUndefined(t){return null==t}var punycode=require("punycode");exports.parse=urlParse,exports.resolve=urlResolve,exports.resolveObject=urlResolveObject,exports.format=urlFormat,exports.Url=Url;var protocolPattern=/^([a-z0-9.+-]+:)/i,portPattern=/:[0-9]*$/,delims=["<",">",'"',"`"," ","\r","\n","	"],unwise=["{","}","|","\\","^","`"].concat(delims),autoEscape=["'"].concat(unwise),nonHostChars=["%","/","?",";","#"].concat(autoEscape),hostEndingChars=["/","?","#"],hostnameMaxLen=255,hostnamePartPattern=/^[a-z0-9A-Z_-]{0,63}$/,hostnamePartStart=/^([a-z0-9A-Z_-]{0,63})(.*)$/,unsafeProtocol={javascript:!0,"javascript:":!0},hostlessProtocol={javascript:!0,"javascript:":!0},slashedProtocol={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},querystring=require("querystring");Url.prototype.parse=function(t,s,e){if(!isString(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);var h=t;h=h.trim();var r=protocolPattern.exec(h);if(r){r=r[0];var o=r.toLowerCase();this.protocol=o,h=h.substr(r.length)}if(e||r||h.match(/^\/\/[^@\/]+@[^@\/]+/)){var a="//"===h.substr(0,2);!a||r&&hostlessProtocol[r]||(h=h.substr(2),this.slashes=!0)}if(!hostlessProtocol[r]&&(a||r&&!slashedProtocol[r])){for(var n=-1,i=0;i<hostEndingChars.length;i++){var l=h.indexOf(hostEndingChars[i]);-1!==l&&(-1===n||n>l)&&(n=l)}var c,u;u=-1===n?h.lastIndexOf("@"):h.lastIndexOf("@",n),-1!==u&&(c=h.slice(0,u),h=h.slice(u+1),this.auth=decodeURIComponent(c)),n=-1;for(var i=0;i<nonHostChars.length;i++){var l=h.indexOf(nonHostChars[i]);-1!==l&&(-1===n||n>l)&&(n=l)}-1===n&&(n=h.length),this.host=h.slice(0,n),h=h.slice(n),this.parseHost(),this.hostname=this.hostname||"";var p="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!p)for(var f=this.hostname.split(/\./),i=0,m=f.length;m>i;i++){var v=f[i];if(v&&!v.match(hostnamePartPattern)){for(var g="",y=0,d=v.length;d>y;y++)g+=v.charCodeAt(y)>127?"x":v[y];if(!g.match(hostnamePartPattern)){var P=f.slice(0,i),b=f.slice(i+1),j=v.match(hostnamePartStart);j&&(P.push(j[1]),b.unshift(j[2])),b.length&&(h="/"+b.join(".")+h),this.hostname=P.join(".");break}}}if(this.hostname=this.hostname.length>hostnameMaxLen?"":this.hostname.toLowerCase(),!p){for(var O=this.hostname.split("."),q=[],i=0;i<O.length;++i){var x=O[i];q.push(x.match(/[^A-Za-z0-9_-]/)?"xn--"+punycode.encode(x):x)}this.hostname=q.join(".")}var U=this.port?":"+this.port:"",C=this.hostname||"";this.host=C+U,this.href+=this.host,p&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==h[0]&&(h="/"+h))}if(!unsafeProtocol[o])for(var i=0,m=autoEscape.length;m>i;i++){var A=autoEscape[i],E=encodeURIComponent(A);E===A&&(E=escape(A)),h=h.split(A).join(E)}var w=h.indexOf("#");-1!==w&&(this.hash=h.substr(w),h=h.slice(0,w));var R=h.indexOf("?");if(-1!==R?(this.search=h.substr(R),this.query=h.substr(R+1),s&&(this.query=querystring.parse(this.query)),h=h.slice(0,R)):s&&(this.search="",this.query={}),h&&(this.pathname=h),slashedProtocol[o]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var U=this.pathname||"",x=this.search||"";this.path=U+x}return this.href=this.format(),this},Url.prototype.format=function(){var t=this.auth||"";t&&(t=encodeURIComponent(t),t=t.replace(/%3A/i,":"),t+="@");var s=this.protocol||"",e=this.pathname||"",h=this.hash||"",r=!1,o="";this.host?r=t+this.host:this.hostname&&(r=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(r+=":"+this.port)),this.query&&isObject(this.query)&&Object.keys(this.query).length&&(o=querystring.stringify(this.query));var a=this.search||o&&"?"+o||"";return s&&":"!==s.substr(-1)&&(s+=":"),this.slashes||(!s||slashedProtocol[s])&&r!==!1?(r="//"+(r||""),e&&"/"!==e.charAt(0)&&(e="/"+e)):r||(r=""),h&&"#"!==h.charAt(0)&&(h="#"+h),a&&"?"!==a.charAt(0)&&(a="?"+a),e=e.replace(/[?#]/g,function(t){return encodeURIComponent(t)}),a=a.replace("#","%23"),s+r+e+a+h},Url.prototype.resolve=function(t){return this.resolveObject(urlParse(t,!1,!0)).format()},Url.prototype.resolveObject=function(t){if(isString(t)){var s=new Url;s.parse(t,!1,!0),t=s}var e=new Url;if(Object.keys(this).forEach(function(t){e[t]=this[t]},this),e.hash=t.hash,""===t.href)return e.href=e.format(),e;if(t.slashes&&!t.protocol)return Object.keys(t).forEach(function(s){"protocol"!==s&&(e[s]=t[s])}),slashedProtocol[e.protocol]&&e.hostname&&!e.pathname&&(e.path=e.pathname="/"),e.href=e.format(),e;if(t.protocol&&t.protocol!==e.protocol){if(!slashedProtocol[t.protocol])return Object.keys(t).forEach(function(s){e[s]=t[s]}),e.href=e.format(),e;if(e.protocol=t.protocol,t.host||hostlessProtocol[t.protocol])e.pathname=t.pathname;else{for(var h=(t.pathname||"").split("/");h.length&&!(t.host=h.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==h[0]&&h.unshift(""),h.length<2&&h.unshift(""),e.pathname=h.join("/")}if(e.search=t.search,e.query=t.query,e.host=t.host||"",e.auth=t.auth,e.hostname=t.hostname||t.host,e.port=t.port,e.pathname||e.search){var r=e.pathname||"",o=e.search||"";e.path=r+o}return e.slashes=e.slashes||t.slashes,e.href=e.format(),e}var a=e.pathname&&"/"===e.pathname.charAt(0),n=t.host||t.pathname&&"/"===t.pathname.charAt(0),i=n||a||e.host&&t.pathname,l=i,c=e.pathname&&e.pathname.split("/")||[],h=t.pathname&&t.pathname.split("/")||[],u=e.protocol&&!slashedProtocol[e.protocol];if(u&&(e.hostname="",e.port=null,e.host&&(""===c[0]?c[0]=e.host:c.unshift(e.host)),e.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===h[0]?h[0]=t.host:h.unshift(t.host)),t.host=null),i=i&&(""===h[0]||""===c[0])),n)e.host=t.host||""===t.host?t.host:e.host,e.hostname=t.hostname||""===t.hostname?t.hostname:e.hostname,e.search=t.search,e.query=t.query,c=h;else if(h.length)c||(c=[]),c.pop(),c=c.concat(h),e.search=t.search,e.query=t.query;else if(!isNullOrUndefined(t.search)){if(u){e.hostname=e.host=c.shift();var p=e.host&&e.host.indexOf("@")>0?e.host.split("@"):!1;p&&(e.auth=p.shift(),e.host=e.hostname=p.shift())}return e.search=t.search,e.query=t.query,isNull(e.pathname)&&isNull(e.search)||(e.path=(e.pathname?e.pathname:"")+(e.search?e.search:"")),e.href=e.format(),e}if(!c.length)return e.pathname=null,e.path=e.search?"/"+e.search:null,e.href=e.format(),e;for(var f=c.slice(-1)[0],m=(e.host||t.host)&&("."===f||".."===f)||""===f,v=0,g=c.length;g>=0;g--)f=c[g],"."==f?c.splice(g,1):".."===f?(c.splice(g,1),v++):v&&(c.splice(g,1),v--);if(!i&&!l)for(;v--;v)c.unshift("..");!i||""===c[0]||c[0]&&"/"===c[0].charAt(0)||c.unshift(""),m&&"/"!==c.join("/").substr(-1)&&c.push("");var y=""===c[0]||c[0]&&"/"===c[0].charAt(0);if(u){e.hostname=e.host=y?"":c.length?c.shift():"";var p=e.host&&e.host.indexOf("@")>0?e.host.split("@"):!1;p&&(e.auth=p.shift(),e.host=e.hostname=p.shift())}return i=i||e.host&&c.length,i&&!y&&c.unshift(""),c.length?e.pathname=c.join("/"):(e.pathname=null,e.path=null),isNull(e.pathname)&&isNull(e.search)||(e.path=(e.pathname?e.pathname:"")+(e.search?e.search:"")),e.auth=t.auth||e.auth,e.slashes=e.slashes||t.slashes,e.href=e.format(),e},Url.prototype.parseHost=function(){var t=this.host,s=portPattern.exec(t);s&&(s=s[0],":"!==s&&(this.port=s.substr(1)),t=t.substr(0,t.length-s.length)),t&&(this.hostname=t)};
},{"punycode":1,"querystring":4}],6:[function(require,module,exports){
"use strict";module.exports=function(e){var r=encodeURIComponent(e.getURL());return{popup:!0,shareText:{de:"teilen",en:"share",es:"compartir"},name:"facebook",title:{de:"Bei Facebook teilen",en:"Share on Facebook",es:"Compartir en Facebook"},shareUrl:"https://www.facebook.com/sharer/sharer.php?u="+r+e.getReferrerTrack()}};
},{}],7:[function(require,module,exports){
"use strict";module.exports=function(e){return{popup:!0,shareText:"+1",name:"googleplus",title:{de:"Bei Google+ teilen",en:"Share on Google+",es:"Compartir en Google+"},shareUrl:"https://plus.google.com/share?url="+e.getURL()+e.getReferrerTrack()}};
},{}],8:[function(require,module,exports){
"use strict";module.exports=function(e){return{popup:!1,shareText:"Info",name:"info",title:{de:"weitere Informationen",en:"more information",es:"Más informaciones"},shareUrl:e.getInfoUrl()}};
},{}],9:[function(require,module,exports){
"use strict";var url=require("url");module.exports=function(e){var r=url.parse(e.getURL(),!0);return r.query.view="mail",delete r.search,{popup:!1,shareText:"mail",name:"mail",title:{de:"Per E-Mail versenden",en:"Send by email",es:"Enviar por email"},shareUrl:url.format(r)}};
},{"url":5}],10:[function(require,module,exports){
"use strict";module.exports=function(e){return{popup:!0,shareText:"tweet",name:"twitter",title:{de:"Bei Twitter teilen",en:"Share on Twitter",es:"Compartir en Twitter"},shareUrl:"https://twitter.com/intent/tweet?text="+e.getShareText()+"&url="+e.getURL()+e.getReferrerTrack()}};
},{}],11:[function(require,module,exports){
"use strict";module.exports=function(e){return{popup:!1,shareText:"WhatsApp",name:"whatsapp",title:{de:"Bei Whatsapp teilen",en:"Share on Whatsapp",es:"Compartir en Whatsapp"},shareUrl:"whatsapp://send?text="+e.getShareText()+"%20"+e.getURL()+e.getReferrerTrack()}};
},{}],12:[function(require,module,exports){
(function (global){
"use strict";var $=(typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null),_Shariff=function(t,e){var r=this;this.element=t,this.options=$.extend({},this.defaults,e,$(t).data());var n=[require("./services/facebook"),require("./services/googleplus"),require("./services/twitter"),require("./services/whatsapp"),require("./services/mail"),require("./services/info")];this.services=$.map(this.options.services,function(t){var e;return n.forEach(function(n){return n=n(r),n.name===t?(e=n,null):void 0}),e}),this._addButtonList(),null!==this.options.backendUrl&&this.getShares().then($.proxy(this._updateCounts,this))};_Shariff.prototype={defaults:{theme:"color",backendUrl:null,infoUrl:"http://ct.de/-2467514",lang:"de",orientation:"horizontal",referrerTrack:null,services:["twitter","facebook","googleplus","info"],url:function(){var t=global.document.location.href,e=$("link[rel=canonical]").attr("href")||this.getMeta("og:url")||"";return e.length>0&&(e.indexOf("http")<0&&(e=global.document.location.protocol+"//"+global.document.location.host+e),t=e),t}},$socialshareElement:function(){return $(this.element)},getLocalized:function(t,e){return"object"==typeof t[e]?t[e][this.options.lang]:"string"==typeof t[e]?t[e]:void 0},getMeta:function(t){var e=$('meta[name="'+t+'"],[property="'+t+'"]').attr("content");return e||""},getInfoUrl:function(){return this.options.infoUrl},getURL:function(){var t=this.options.url;return"function"==typeof t?$.proxy(t,this)():t},getReferrerTrack:function(){return this.options.referrerTrack||""},getShares:function(){return $.getJSON(this.options.backendUrl+"?url="+encodeURIComponent(this.getURL()))},_updateCounts:function(t){var e=this;$.each(t,function(t,r){r>=1e3&&(r=Math.round(r/1e3)+"k"),$(e.element).find("."+t+" a").append('<span class="share_count">'+r)})},_addButtonList:function(){var t=this,e=this.$socialshareElement(),r="theme-"+this.options.theme,n="orientation-"+this.options.orientation,i=$("<ul>").addClass(r).addClass(n);this.services.forEach(function(e){var r=$('<li class="shariff-button">').addClass(e.name),n='<span class="share_text">'+t.getLocalized(e,"shareText"),o=$("<a>").attr("href",e.shareUrl).append(n);e.popup?o.attr("rel","popup"):o.attr("target","_blank"),o.attr("title",t.getLocalized(e,"title")),r.append(o),i.append(r)}),i.on("click",'[rel="popup"]',function(t){t.preventDefault();var e=$(this).attr("href"),r=$(this).attr("title"),n="600",i="460",o="width="+n+",height="+i;global.window.open(e,r,o)}),e.append(i)},abbreviateText:function(t,e){var r=decodeURIComponent(t);if(r.length<=e)return t;var n=r.substring(0,e-1).lastIndexOf(" ");return r=encodeURIComponent(r.substring(0,n))+"…"},getShareText:function(){var t=this.getMeta("DC.title"),e=this.getMeta("DC.creator");return t.length>0&&e.length>0?t+=" - "+e:t=$("title").text(),encodeURIComponent(this.abbreviateText(t,120))}},module.exports=_Shariff,$(".shariff").each(function(){this.shariff=new _Shariff(this)});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./services/facebook":6,"./services/googleplus":7,"./services/info":8,"./services/mail":9,"./services/twitter":10,"./services/whatsapp":11}]},{},[12]);

// 4.1.9 (2015-03-10)
!function(e,t){"use strict";function n(e,t){for(var n,r=[],i=0;i<e.length;++i){if(n=s[e[i]]||o(e[i]),!n)throw"module definition dependecy not found: "+e[i];r.push(n)}t.apply(null,r)}function r(e,r,i){if("string"!=typeof e)throw"invalid module definition, module id must be defined and be a string";if(r===t)throw"invalid module definition, dependencies must be specified";if(i===t)throw"invalid module definition, definition function must be specified";n(r,function(){s[e]=i.apply(null,arguments)})}function i(e){return!!s[e]}function o(t){for(var n=e,r=t.split(/[.\/]/),i=0;i<r.length;++i){if(!n[r[i]])return;n=n[r[i]]}return n}function a(n){for(var r=0;r<n.length;r++){for(var i=e,o=n[r],a=o.split(/[.\/]/),l=0;l<a.length-1;++l)i[a[l]]===t&&(i[a[l]]={}),i=i[a[l]];i[a[a.length-1]]=s[o]}}var s={},l="tinymce/dom/EventUtils",c="tinymce/dom/Sizzle",u="tinymce/Env",d="tinymce/util/Tools",f="tinymce/dom/DomQuery",p="tinymce/html/Styles",h="tinymce/dom/TreeWalker",m="tinymce/dom/Range",g="tinymce/html/Entities",v="tinymce/dom/StyleSheetLoader",y="tinymce/dom/DOMUtils",b="tinymce/dom/ScriptLoader",C="tinymce/AddOnManager",x="tinymce/dom/RangeUtils",w="tinymce/NodeChange",_="tinymce/html/Node",E="tinymce/html/Schema",N="tinymce/html/SaxParser",k="tinymce/html/DomParser",S="tinymce/html/Writer",T="tinymce/html/Serializer",R="tinymce/dom/Serializer",A="tinymce/dom/TridentSelection",B="tinymce/util/VK",D="tinymce/dom/ControlSelection",L="tinymce/dom/BookmarkManager",M="tinymce/dom/Selection",H="tinymce/dom/ElementUtils",P="tinymce/fmt/Preview",O="tinymce/Formatter",I="tinymce/UndoManager",F="tinymce/EnterKey",z="tinymce/ForceBlocks",W="tinymce/EditorCommands",V="tinymce/util/URI",U="tinymce/util/Class",$="tinymce/util/EventDispatcher",q="tinymce/ui/Selector",j="tinymce/ui/Collection",Y="tinymce/ui/DomUtils",K="tinymce/ui/Control",G="tinymce/ui/Factory",X="tinymce/ui/KeyboardNavigation",J="tinymce/ui/Container",Q="tinymce/ui/DragHelper",Z="tinymce/ui/Scrollable",et="tinymce/ui/Panel",tt="tinymce/ui/Movable",nt="tinymce/ui/Resizable",rt="tinymce/ui/FloatPanel",it="tinymce/ui/Window",ot="tinymce/ui/MessageBox",at="tinymce/WindowManager",st="tinymce/util/Quirks",lt="tinymce/util/Observable",ct="tinymce/EditorObservable",ut="tinymce/Shortcuts",dt="tinymce/Editor",ft="tinymce/util/I18n",pt="tinymce/FocusManager",ht="tinymce/EditorManager",mt="tinymce/LegacyInput",gt="tinymce/util/XHR",vt="tinymce/util/JSON",yt="tinymce/util/JSONRequest",bt="tinymce/util/JSONP",Ct="tinymce/util/LocalStorage",xt="tinymce/Compat",wt="tinymce/ui/Layout",_t="tinymce/ui/AbsoluteLayout",Et="tinymce/ui/Tooltip",Nt="tinymce/ui/Widget",kt="tinymce/ui/Button",St="tinymce/ui/ButtonGroup",Tt="tinymce/ui/Checkbox",Rt="tinymce/ui/ComboBox",At="tinymce/ui/ColorBox",Bt="tinymce/ui/PanelButton",Dt="tinymce/ui/ColorButton",Lt="tinymce/util/Color",Mt="tinymce/ui/ColorPicker",Ht="tinymce/ui/Path",Pt="tinymce/ui/ElementPath",Ot="tinymce/ui/FormItem",It="tinymce/ui/Form",Ft="tinymce/ui/FieldSet",zt="tinymce/ui/FilePicker",Wt="tinymce/ui/FitLayout",Vt="tinymce/ui/FlexLayout",Ut="tinymce/ui/FlowLayout",$t="tinymce/ui/FormatControls",qt="tinymce/ui/GridLayout",jt="tinymce/ui/Iframe",Yt="tinymce/ui/Label",Kt="tinymce/ui/Toolbar",Gt="tinymce/ui/MenuBar",Xt="tinymce/ui/MenuButton",Jt="tinymce/ui/ListBox",Qt="tinymce/ui/MenuItem",Zt="tinymce/ui/Menu",en="tinymce/ui/Radio",tn="tinymce/ui/ResizeHandle",nn="tinymce/ui/Spacer",rn="tinymce/ui/SplitButton",on="tinymce/ui/StackLayout",an="tinymce/ui/TabPanel",sn="tinymce/ui/TextBox",ln="tinymce/ui/Throbber";r(l,[],function(){function e(e,t,n,r){e.addEventListener?e.addEventListener(t,n,r||!1):e.attachEvent&&e.attachEvent("on"+t,n)}function t(e,t,n,r){e.removeEventListener?e.removeEventListener(t,n,r||!1):e.detachEvent&&e.detachEvent("on"+t,n)}function n(e,t){function n(){return!1}function r(){return!0}var i,o=t||{},l;for(i in e)s[i]||(o[i]=e[i]);if(o.target||(o.target=o.srcElement||document),e&&a.test(e.type)&&e.pageX===l&&e.clientX!==l){var c=o.target.ownerDocument||document,u=c.documentElement,d=c.body;o.pageX=e.clientX+(u&&u.scrollLeft||d&&d.scrollLeft||0)-(u&&u.clientLeft||d&&d.clientLeft||0),o.pageY=e.clientY+(u&&u.scrollTop||d&&d.scrollTop||0)-(u&&u.clientTop||d&&d.clientTop||0)}return o.preventDefault=function(){o.isDefaultPrevented=r,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},o.stopPropagation=function(){o.isPropagationStopped=r,e&&(e.stopPropagation?e.stopPropagation():e.cancelBubble=!0)},o.stopImmediatePropagation=function(){o.isImmediatePropagationStopped=r,o.stopPropagation()},o.isDefaultPrevented||(o.isDefaultPrevented=n,o.isPropagationStopped=n,o.isImmediatePropagationStopped=n),o}function r(n,r,i){function o(){i.domLoaded||(i.domLoaded=!0,r(c))}function a(){("complete"===l.readyState||"interactive"===l.readyState&&l.body)&&(t(l,"readystatechange",a),o())}function s(){try{l.documentElement.doScroll("left")}catch(e){return void setTimeout(s,0)}o()}var l=n.document,c={type:"ready"};return i.domLoaded?void r(c):(l.addEventListener?"complete"===l.readyState?o():e(n,"DOMContentLoaded",o):(e(l,"readystatechange",a),l.documentElement.doScroll&&n.self===n.top&&s()),void e(n,"load",o))}function i(){function i(e,t){var n,r,i,o,a=s[t];if(n=a&&a[e.type])for(r=0,i=n.length;i>r;r++)if(o=n[r],o&&o.func.call(o.scope,e)===!1&&e.preventDefault(),e.isImmediatePropagationStopped())return}var a=this,s={},l,c,u,d,f;c=o+(+new Date).toString(32),d="onmouseenter"in document.documentElement,u="onfocusin"in document.documentElement,f={mouseenter:"mouseover",mouseleave:"mouseout"},l=1,a.domLoaded=!1,a.events=s,a.bind=function(t,o,p,h){function m(e){i(n(e||_.event),g)}var g,v,y,b,C,x,w,_=window;if(t&&3!==t.nodeType&&8!==t.nodeType){for(t[c]?g=t[c]:(g=l++,t[c]=g,s[g]={}),h=h||t,o=o.split(" "),y=o.length;y--;)b=o[y],x=m,C=w=!1,"DOMContentLoaded"===b&&(b="ready"),a.domLoaded&&"ready"===b&&"complete"==t.readyState?p.call(h,n({type:b})):(d||(C=f[b],C&&(x=function(e){var t,r;if(t=e.currentTarget,r=e.relatedTarget,r&&t.contains)r=t.contains(r);else for(;r&&r!==t;)r=r.parentNode;r||(e=n(e||_.event),e.type="mouseout"===e.type?"mouseleave":"mouseenter",e.target=t,i(e,g))})),u||"focusin"!==b&&"focusout"!==b||(w=!0,C="focusin"===b?"focus":"blur",x=function(e){e=n(e||_.event),e.type="focus"===e.type?"focusin":"focusout",i(e,g)}),v=s[g][b],v?"ready"===b&&a.domLoaded?p({type:b}):v.push({func:p,scope:h}):(s[g][b]=v=[{func:p,scope:h}],v.fakeName=C,v.capture=w,v.nativeHandler=x,"ready"===b?r(t,x,a):e(t,C||b,x,w)));return t=v=0,p}},a.unbind=function(e,n,r){var i,o,l,u,d,f;if(!e||3===e.nodeType||8===e.nodeType)return a;if(i=e[c]){if(f=s[i],n){for(n=n.split(" "),l=n.length;l--;)if(d=n[l],o=f[d]){if(r)for(u=o.length;u--;)if(o[u].func===r){var p=o.nativeHandler,h=o.fakeName,m=o.capture;o=o.slice(0,u).concat(o.slice(u+1)),o.nativeHandler=p,o.fakeName=h,o.capture=m,f[d]=o}r&&0!==o.length||(delete f[d],t(e,o.fakeName||d,o.nativeHandler,o.capture))}}else{for(d in f)o=f[d],t(e,o.fakeName||d,o.nativeHandler,o.capture);f={}}for(d in f)return a;delete s[i];try{delete e[c]}catch(g){e[c]=null}}return a},a.fire=function(e,t,r){var o;if(!e||3===e.nodeType||8===e.nodeType)return a;r=n(null,r),r.type=t,r.target=e;do o=e[c],o&&i(r,o),e=e.parentNode||e.ownerDocument||e.defaultView||e.parentWindow;while(e&&!r.isPropagationStopped());return a},a.clean=function(e){var t,n,r=a.unbind;if(!e||3===e.nodeType||8===e.nodeType)return a;if(e[c]&&r(e),e.getElementsByTagName||(e=e.document),e&&e.getElementsByTagName)for(r(e),n=e.getElementsByTagName("*"),t=n.length;t--;)e=n[t],e[c]&&r(e);return a},a.destroy=function(){s={}},a.cancel=function(e){return e&&(e.preventDefault(),e.stopImmediatePropagation()),!1}}var o="mce-data-",a=/^(?:mouse|contextmenu)|click/,s={keyLocation:1,layerX:1,layerY:1,returnValue:1};return i.Event=new i,i.Event.bind(window,"ready",function(){}),i}),r(c,[],function(){function e(e,t,n,r){var i,o,a,s,l,c,d,p,h,m;if((t?t.ownerDocument||t:z)!==D&&B(t),t=t||D,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(M&&!r){if(i=vt.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&I(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return Z.apply(n,t.getElementsByTagName(e)),n;if((a=i[3])&&x.getElementsByClassName)return Z.apply(n,t.getElementsByClassName(a)),n}if(x.qsa&&(!H||!H.test(e))){if(p=d=F,h=t,m=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){for(c=N(e),(d=t.getAttribute("id"))?p=d.replace(bt,"\\$&"):t.setAttribute("id",p),p="[id='"+p+"'] ",l=c.length;l--;)c[l]=p+f(c[l]);h=yt.test(e)&&u(t.parentNode)||t,m=c.join(",")}if(m)try{return Z.apply(n,h.querySelectorAll(m)),n}catch(g){}finally{d||t.removeAttribute("id")}}}return S(e.replace(st,"$1"),t,n,r)}function n(){function e(n,r){return t.push(n+" ")>w.cacheLength&&delete e[t.shift()],e[n+" "]=r}var t=[];return e}function r(e){return e[F]=!0,e}function i(e){var t=D.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function o(e,t){for(var n=e.split("|"),r=e.length;r--;)w.attrHandle[n[r]]=t}function a(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||K)-(~e.sourceIndex||K);if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function s(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function l(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function c(e){return r(function(t){return t=+t,r(function(n,r){for(var i,o=e([],n.length,t),a=o.length;a--;)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function u(e){return e&&typeof e.getElementsByTagName!==Y&&e}function d(){}function f(e){for(var t=0,n=e.length,r="";n>t;t++)r+=e[t].value;return r}function p(e,t,n){var r=t.dir,i=n&&"parentNode"===r,o=V++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||i)return e(t,n,o)}:function(t,n,a){var s,l,c=[W,o];if(a){for(;t=t[r];)if((1===t.nodeType||i)&&e(t,n,a))return!0}else for(;t=t[r];)if(1===t.nodeType||i){if(l=t[F]||(t[F]={}),(s=l[r])&&s[0]===W&&s[1]===o)return c[2]=s[2];if(l[r]=c,c[2]=e(t,n,a))return!0}}}function h(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function m(t,n,r){for(var i=0,o=n.length;o>i;i++)e(t,n[i],r);return r}function g(e,t,n,r,i){for(var o,a=[],s=0,l=e.length,c=null!=t;l>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),c&&t.push(s));return a}function v(e,t,n,i,o,a){return i&&!i[F]&&(i=v(i)),o&&!o[F]&&(o=v(o,a)),r(function(r,a,s,l){var c,u,d,f=[],p=[],h=a.length,v=r||m(t||"*",s.nodeType?[s]:s,[]),y=!e||!r&&t?v:g(v,f,e,s,l),b=n?o||(r?e:h||i)?[]:a:y;if(n&&n(y,b,s,l),i)for(c=g(b,p),i(c,[],s,l),u=c.length;u--;)(d=c[u])&&(b[p[u]]=!(y[p[u]]=d));if(r){if(o||e){if(o){for(c=[],u=b.length;u--;)(d=b[u])&&c.push(y[u]=d);o(null,b=[],c,l)}for(u=b.length;u--;)(d=b[u])&&(c=o?tt.call(r,d):f[u])>-1&&(r[c]=!(a[c]=d))}}else b=g(b===a?b.splice(h,b.length):b),o?o(null,a,b,l):Z.apply(a,b)})}function y(e){for(var t,n,r,i=e.length,o=w.relative[e[0].type],a=o||w.relative[" "],s=o?1:0,l=p(function(e){return e===t},a,!0),c=p(function(e){return tt.call(t,e)>-1},a,!0),u=[function(e,n,r){return!o&&(r||n!==T)||((t=n).nodeType?l(e,n,r):c(e,n,r))}];i>s;s++)if(n=w.relative[e[s].type])u=[p(h(u),n)];else{if(n=w.filter[e[s].type].apply(null,e[s].matches),n[F]){for(r=++s;i>r&&!w.relative[e[r].type];r++);return v(s>1&&h(u),s>1&&f(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(st,"$1"),n,r>s&&y(e.slice(s,r)),i>r&&y(e=e.slice(r)),i>r&&f(e))}u.push(n)}return h(u)}function b(t,n){var i=n.length>0,o=t.length>0,a=function(r,a,s,l,c){var u,d,f,p=0,h="0",m=r&&[],v=[],y=T,b=r||o&&w.find.TAG("*",c),C=W+=null==y?1:Math.random()||.1,x=b.length;for(c&&(T=a!==D&&a);h!==x&&null!=(u=b[h]);h++){if(o&&u){for(d=0;f=t[d++];)if(f(u,a,s)){l.push(u);break}c&&(W=C)}i&&((u=!f&&u)&&p--,r&&m.push(u))}if(p+=h,i&&h!==p){for(d=0;f=n[d++];)f(m,v,a,s);if(r){if(p>0)for(;h--;)m[h]||v[h]||(v[h]=J.call(l));v=g(v)}Z.apply(l,v),c&&!r&&v.length>0&&p+n.length>1&&e.uniqueSort(l)}return c&&(W=C,T=y),m};return i?r(a):a}var C,x,w,_,E,N,k,S,T,R,A,B,D,L,M,H,P,O,I,F="sizzle"+-new Date,z=window.document,W=0,V=0,U=n(),$=n(),q=n(),j=function(e,t){return e===t&&(A=!0),0},Y=typeof t,K=1<<31,G={}.hasOwnProperty,X=[],J=X.pop,Q=X.push,Z=X.push,et=X.slice,tt=X.indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(this[t]===e)return t;return-1},nt="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",rt="[\\x20\\t\\r\\n\\f]",it="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",ot="\\["+rt+"*("+it+")(?:"+rt+"*([*^$|!~]?=)"+rt+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+it+"))|)"+rt+"*\\]",at=":("+it+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+ot+")*)|.*)\\)|)",st=new RegExp("^"+rt+"+|((?:^|[^\\\\])(?:\\\\.)*)"+rt+"+$","g"),lt=new RegExp("^"+rt+"*,"+rt+"*"),ct=new RegExp("^"+rt+"*([>+~]|"+rt+")"+rt+"*"),ut=new RegExp("="+rt+"*([^\\]'\"]*?)"+rt+"*\\]","g"),dt=new RegExp(at),ft=new RegExp("^"+it+"$"),pt={ID:new RegExp("^#("+it+")"),CLASS:new RegExp("^\\.("+it+")"),TAG:new RegExp("^("+it+"|[*])"),ATTR:new RegExp("^"+ot),PSEUDO:new RegExp("^"+at),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+rt+"*(even|odd|(([+-]|)(\\d*)n|)"+rt+"*(?:([+-]|)"+rt+"*(\\d+)|))"+rt+"*\\)|)","i"),bool:new RegExp("^(?:"+nt+")$","i"),needsContext:new RegExp("^"+rt+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+rt+"*((?:-\\d)?\\d*)"+rt+"*\\)|)(?=[^-]|$)","i")},ht=/^(?:input|select|textarea|button)$/i,mt=/^h\d$/i,gt=/^[^{]+\{\s*\[native \w/,vt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,yt=/[+~]/,bt=/'|\\/g,Ct=new RegExp("\\\\([\\da-f]{1,6}"+rt+"?|("+rt+")|.)","ig"),xt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)};try{Z.apply(X=et.call(z.childNodes),z.childNodes),X[z.childNodes.length].nodeType}catch(wt){Z={apply:X.length?function(e,t){Q.apply(e,et.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}x=e.support={},E=e.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},B=e.setDocument=function(e){var t,n=e?e.ownerDocument||e:z,r=n.defaultView;return n!==D&&9===n.nodeType&&n.documentElement?(D=n,L=n.documentElement,M=!E(n),r&&r!==r.top&&(r.addEventListener?r.addEventListener("unload",function(){B()},!1):r.attachEvent&&r.attachEvent("onunload",function(){B()})),x.attributes=i(function(e){return e.className="i",!e.getAttribute("className")}),x.getElementsByTagName=i(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),x.getElementsByClassName=gt.test(n.getElementsByClassName),x.getById=i(function(e){return L.appendChild(e).id=F,!n.getElementsByName||!n.getElementsByName(F).length}),x.getById?(w.find.ID=function(e,t){if(typeof t.getElementById!==Y&&M){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},w.filter.ID=function(e){var t=e.replace(Ct,xt);return function(e){return e.getAttribute("id")===t}}):(delete w.find.ID,w.filter.ID=function(e){var t=e.replace(Ct,xt);return function(e){var n=typeof e.getAttributeNode!==Y&&e.getAttributeNode("id");return n&&n.value===t}}),w.find.TAG=x.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==Y?t.getElementsByTagName(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o},w.find.CLASS=x.getElementsByClassName&&function(e,t){return M?t.getElementsByClassName(e):void 0},P=[],H=[],(x.qsa=gt.test(n.querySelectorAll))&&(i(function(e){e.innerHTML="<select msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&H.push("[*^$]="+rt+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||H.push("\\["+rt+"*(?:value|"+nt+")"),e.querySelectorAll(":checked").length||H.push(":checked")}),i(function(e){var t=n.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&H.push("name"+rt+"*[*^$|!~]?="),e.querySelectorAll(":enabled").length||H.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),H.push(",.*:")})),(x.matchesSelector=gt.test(O=L.matches||L.webkitMatchesSelector||L.mozMatchesSelector||L.oMatchesSelector||L.msMatchesSelector))&&i(function(e){x.disconnectedMatch=O.call(e,"div"),O.call(e,"[s!='']:x"),P.push("!=",at)}),H=H.length&&new RegExp(H.join("|")),P=P.length&&new RegExp(P.join("|")),t=gt.test(L.compareDocumentPosition),I=t||gt.test(L.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},j=t?function(e,t){if(e===t)return A=!0,0;var r=!e.compareDocumentPosition-!t.compareDocumentPosition;return r?r:(r=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&r||!x.sortDetached&&t.compareDocumentPosition(e)===r?e===n||e.ownerDocument===z&&I(z,e)?-1:t===n||t.ownerDocument===z&&I(z,t)?1:R?tt.call(R,e)-tt.call(R,t):0:4&r?-1:1)}:function(e,t){if(e===t)return A=!0,0;var r,i=0,o=e.parentNode,s=t.parentNode,l=[e],c=[t];if(!o||!s)return e===n?-1:t===n?1:o?-1:s?1:R?tt.call(R,e)-tt.call(R,t):0;if(o===s)return a(e,t);for(r=e;r=r.parentNode;)l.unshift(r);for(r=t;r=r.parentNode;)c.unshift(r);for(;l[i]===c[i];)i++;return i?a(l[i],c[i]):l[i]===z?-1:c[i]===z?1:0},n):D},e.matches=function(t,n){return e(t,null,null,n)},e.matchesSelector=function(t,n){if((t.ownerDocument||t)!==D&&B(t),n=n.replace(ut,"='$1']"),!(!x.matchesSelector||!M||P&&P.test(n)||H&&H.test(n)))try{var r=O.call(t,n);if(r||x.disconnectedMatch||t.document&&11!==t.document.nodeType)return r}catch(i){}return e(n,D,null,[t]).length>0},e.contains=function(e,t){return(e.ownerDocument||e)!==D&&B(e),I(e,t)},e.attr=function(e,n){(e.ownerDocument||e)!==D&&B(e);var r=w.attrHandle[n.toLowerCase()],i=r&&G.call(w.attrHandle,n.toLowerCase())?r(e,n,!M):t;return i!==t?i:x.attributes||!M?e.getAttribute(n):(i=e.getAttributeNode(n))&&i.specified?i.value:null},e.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},e.uniqueSort=function(e){var t,n=[],r=0,i=0;if(A=!x.detectDuplicates,R=!x.sortStable&&e.slice(0),e.sort(j),A){for(;t=e[i++];)t===e[i]&&(r=n.push(i));for(;r--;)e.splice(n[r],1)}return R=null,e},_=e.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=_(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r++];)n+=_(t);return n},w=e.selectors={cacheLength:50,createPseudo:r,match:pt,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(Ct,xt),e[3]=(e[3]||e[4]||e[5]||"").replace(Ct,xt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(t){return t[1]=t[1].toLowerCase(),"nth"===t[1].slice(0,3)?(t[3]||e.error(t[0]),t[4]=+(t[4]?t[5]+(t[6]||1):2*("even"===t[3]||"odd"===t[3])),t[5]=+(t[7]+t[8]||"odd"===t[3])):t[3]&&e.error(t[0]),t},PSEUDO:function(e){var t,n=!e[6]&&e[2];return pt.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&dt.test(n)&&(t=N(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(Ct,xt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=U[e+" "];return t||(t=new RegExp("(^|"+rt+")"+e+"("+rt+"|$)"))&&U(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==Y&&e.getAttribute("class")||"")})},ATTR:function(t,n,r){return function(i){var o=e.attr(i,t);return null==o?"!="===n:n?(o+="","="===n?o===r:"!="===n?o!==r:"^="===n?r&&0===o.indexOf(r):"*="===n?r&&o.indexOf(r)>-1:"$="===n?r&&o.slice(-r.length)===r:"~="===n?(" "+o+" ").indexOf(r)>-1:"|="===n?o===r||o.slice(0,r.length+1)===r+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,l){var c,u,d,f,p,h,m=o!==a?"nextSibling":"previousSibling",g=t.parentNode,v=s&&t.nodeName.toLowerCase(),y=!l&&!s;if(g){if(o){for(;m;){for(d=t;d=d[m];)if(s?d.nodeName.toLowerCase()===v:1===d.nodeType)return!1;h=m="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?g.firstChild:g.lastChild],a&&y){for(u=g[F]||(g[F]={}),c=u[e]||[],p=c[0]===W&&c[1],f=c[0]===W&&c[2],d=p&&g.childNodes[p];d=++p&&d&&d[m]||(f=p=0)||h.pop();)if(1===d.nodeType&&++f&&d===t){u[e]=[W,p,f];break}}else if(y&&(c=(t[F]||(t[F]={}))[e])&&c[0]===W)f=c[1];else for(;(d=++p&&d&&d[m]||(f=p=0)||h.pop())&&((s?d.nodeName.toLowerCase()!==v:1!==d.nodeType)||!++f||(y&&((d[F]||(d[F]={}))[e]=[W,f]),d!==t)););return f-=i,f===r||f%r===0&&f/r>=0}}},PSEUDO:function(t,n){var i,o=w.pseudos[t]||w.setFilters[t.toLowerCase()]||e.error("unsupported pseudo: "+t);return o[F]?o(n):o.length>1?(i=[t,t,"",n],w.setFilters.hasOwnProperty(t.toLowerCase())?r(function(e,t){for(var r,i=o(e,n),a=i.length;a--;)r=tt.call(e,i[a]),e[r]=!(t[r]=i[a])}):function(e){return o(e,0,i)}):o}},pseudos:{not:r(function(e){var t=[],n=[],i=k(e.replace(st,"$1"));return i[F]?r(function(e,t,n,r){for(var o,a=i(e,null,r,[]),s=e.length;s--;)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,r,o){return t[0]=e,i(t,null,o,n),!n.pop()}}),has:r(function(t){return function(n){return e(t,n).length>0}}),contains:r(function(e){return e=e.replace(Ct,xt),function(t){return(t.textContent||t.innerText||_(t)).indexOf(e)>-1}}),lang:r(function(t){return ft.test(t||"")||e.error("unsupported lang: "+t),t=t.replace(Ct,xt).toLowerCase(),function(e){var n;do if(n=M?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return n=n.toLowerCase(),n===t||0===n.indexOf(t+"-");while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=window.location&&window.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===L},focus:function(e){return e===D.activeElement&&(!D.hasFocus||D.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!w.pseudos.empty(e)},header:function(e){return mt.test(e.nodeName)},input:function(e){return ht.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:c(function(){return[0]}),last:c(function(e,t){return[t-1]}),eq:c(function(e,t,n){return[0>n?n+t:n]}),even:c(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),odd:c(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:c(function(e,t,n){for(var r=0>n?n+t:n;--r>=0;)e.push(r);return e}),gt:c(function(e,t,n){for(var r=0>n?n+t:n;++r<t;)e.push(r);return e})}},w.pseudos.nth=w.pseudos.eq;for(C in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})w.pseudos[C]=s(C);for(C in{submit:!0,reset:!0})w.pseudos[C]=l(C);return d.prototype=w.filters=w.pseudos,w.setFilters=new d,N=e.tokenize=function(t,n){var r,i,o,a,s,l,c,u=$[t+" "];if(u)return n?0:u.slice(0);for(s=t,l=[],c=w.preFilter;s;){(!r||(i=lt.exec(s)))&&(i&&(s=s.slice(i[0].length)||s),l.push(o=[])),r=!1,(i=ct.exec(s))&&(r=i.shift(),o.push({value:r,type:i[0].replace(st," ")}),s=s.slice(r.length));for(a in w.filter)!(i=pt[a].exec(s))||c[a]&&!(i=c[a](i))||(r=i.shift(),o.push({value:r,type:a,matches:i}),s=s.slice(r.length));if(!r)break}return n?s.length:s?e.error(t):$(t,l).slice(0)},k=e.compile=function(e,t){var n,r=[],i=[],o=q[e+" "];if(!o){for(t||(t=N(e)),n=t.length;n--;)o=y(t[n]),o[F]?r.push(o):i.push(o);o=q(e,b(i,r)),o.selector=e}return o},S=e.select=function(e,t,n,r){var i,o,a,s,l,c="function"==typeof e&&e,d=!r&&N(e=c.selector||e);if(n=n||[],1===d.length){if(o=d[0]=d[0].slice(0),o.length>2&&"ID"===(a=o[0]).type&&x.getById&&9===t.nodeType&&M&&w.relative[o[1].type]){if(t=(w.find.ID(a.matches[0].replace(Ct,xt),t)||[])[0],!t)return n;c&&(t=t.parentNode),e=e.slice(o.shift().value.length)}for(i=pt.needsContext.test(e)?0:o.length;i--&&(a=o[i],!w.relative[s=a.type]);)if((l=w.find[s])&&(r=l(a.matches[0].replace(Ct,xt),yt.test(o[0].type)&&u(t.parentNode)||t))){if(o.splice(i,1),e=r.length&&f(o),!e)return Z.apply(n,r),n;break}}return(c||k(e,d))(r,t,!M,n,yt.test(e)&&u(t.parentNode)||t),n},x.sortStable=F.split("").sort(j).join("")===F,x.detectDuplicates=!!A,B(),x.sortDetached=i(function(e){return 1&e.compareDocumentPosition(D.createElement("div"))}),i(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||o("type|href|height|width",function(e,t,n){return n?void 0:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),x.attributes&&i(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||o("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?void 0:e.defaultValue}),i(function(e){return null==e.getAttribute("disabled")})||o(nt,function(e,t,n){var r;return n?void 0:e[t]===!0?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),e}),r(u,[],function(){var e=navigator,t=e.userAgent,n,r,i,o,a,s,l,c;n=window.opera&&window.opera.buildNumber,c=/Android/.test(t),r=/WebKit/.test(t),i=!r&&!n&&/MSIE/gi.test(t)&&/Explorer/gi.test(e.appName),i=i&&/MSIE (\w+)\./.exec(t)[1],o=-1==t.indexOf("Trident/")||-1==t.indexOf("rv:")&&-1==e.appName.indexOf("Netscape")?!1:11,i=i||o,a=!r&&!o&&/Gecko/.test(t),s=-1!=t.indexOf("Mac"),l=/(iPad|iPhone)/.test(t);var u=!l||t.match(/AppleWebKit\/(\d*)/)[1]>=534;return{opera:n,webkit:r,ie:i,gecko:a,mac:s,iOS:l,android:c,contentEditable:u,transparentSrc:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",caretAfter:8!=i,range:window.getSelection&&"Range"in window,documentMode:i?document.documentMode||7:10}}),r(d,[u],function(e){function n(e){return null===e||e===t?"":(""+e).replace(v,"")}function r(e,n){return n?"array"==n&&y(e)?!0:typeof e==n:e!==t}function i(e){var t=e,n,r;if(!y(e))for(t=[],n=0,r=e.length;r>n;n++)t[n]=e[n];return t}function o(e,t,n){var r;for(e=e||[],t=t||",","string"==typeof e&&(e=e.split(t)),n=n||{},r=e.length;r--;)n[e[r]]={};return n}function a(e,n,r){var i,o;if(!e)return 0;if(r=r||e,e.length!==t){for(i=0,o=e.length;o>i;i++)if(n.call(r,e[i],i,e)===!1)return 0}else for(i in e)if(e.hasOwnProperty(i)&&n.call(r,e[i],i,e)===!1)return 0;return 1}function s(e,t){var n=[];return a(e,function(e){n.push(t(e))}),n}function l(e,t){var n=[];return a(e,function(e){(!t||t(e))&&n.push(e)}),n}function c(e,t,n){var r=this,i,o,a,s,l,c=0;if(e=/^((static) )?([\w.]+)(:([\w.]+))?/.exec(e),a=e[3].match(/(^|\.)(\w+)$/i)[2],o=r.createNS(e[3].replace(/\.\w+$/,""),n),!o[a]){if("static"==e[2])return o[a]=t,void(this.onCreate&&this.onCreate(e[2],e[3],o[a]));t[a]||(t[a]=function(){},c=1),o[a]=t[a],r.extend(o[a].prototype,t),e[5]&&(i=r.resolve(e[5]).prototype,s=e[5].match(/\.(\w+)$/i)[1],l=o[a],o[a]=c?function(){return i[s].apply(this,arguments)}:function(){return this.parent=i[s],l.apply(this,arguments)},o[a].prototype[a]=o[a],r.each(i,function(e,t){o[a].prototype[t]=i[t]}),r.each(t,function(e,t){i[t]?o[a].prototype[t]=function(){return this.parent=i[t],e.apply(this,arguments)}:t!=a&&(o[a].prototype[t]=e)})),r.each(t["static"],function(e,t){o[a][t]=e})}}function u(e,t){var n,r;if(e)for(n=0,r=e.length;r>n;n++)if(e[n]===t)return n;return-1}function d(e,n){var r,i,o,a=arguments,s;for(r=1,i=a.length;i>r;r++){n=a[r];for(o in n)n.hasOwnProperty(o)&&(s=n[o],s!==t&&(e[o]=s))}return e}function f(e,t,n,r){r=r||this,e&&(n&&(e=e[n]),a(e,function(e,i){return t.call(r,e,i,n)===!1?!1:void f(e,t,n,r)}))}function p(e,t){var n,r;for(t=t||window,e=e.split("."),n=0;n<e.length;n++)r=e[n],t[r]||(t[r]={}),t=t[r];return t}function h(e,t){var n,r;for(t=t||window,e=e.split("."),n=0,r=e.length;r>n&&(t=t[e[n]],t);n++);return t}function m(e,t){return!e||r(e,"array")?e:s(e.split(t||","),n)}function g(t){var n=e.cacheSuffix;return n&&(t+=(-1===t.indexOf("?")?"?":"&")+n),t}var v=/^\s*|\s*$/g,y=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};return{trim:n,isArray:y,is:r,toArray:i,makeMap:o,each:a,map:s,grep:l,inArray:u,extend:d,create:c,walk:f,createNS:p,resolve:h,explode:m,_addCacheSuffix:g}}),r(f,[l,c,d,u],function(e,n,r,i){function o(e){return"undefined"!=typeof e}function a(e){return"string"==typeof e}function s(e){return e&&e==e.window}function l(e,t){var n,r,i;for(t=t||w,i=t.createElement("div"),n=t.createDocumentFragment(),i.innerHTML=e;r=i.firstChild;)n.appendChild(r);return n}function c(e,t,n,r){var i;if(a(t))t=l(t,v(e[0]));else if(t.length&&!t.nodeType){if(t=f.makeArray(t),r)for(i=t.length-1;i>=0;i--)c(e,t[i],n,r);else for(i=0;i<t.length;i++)c(e,t[i],n,r);return e}if(t.nodeType)for(i=e.length;i--;)n.call(e[i],t);return e}function u(e,t){return e&&t&&-1!==(" "+e.className+" ").indexOf(" "+t+" ")}function d(e,t,n){var r,i;return t=f(t)[0],e.each(function(){var e=this;n&&r==e.parentNode?i.appendChild(e):(r=e.parentNode,i=t.cloneNode(!1),e.parentNode.insertBefore(i,e),i.appendChild(e))}),e}function f(e,t){return new f.fn.init(e,t)}function p(e,t){var n;if(t.indexOf)return t.indexOf(e);for(n=t.length;n--;)if(t[n]===e)return n;return-1}function h(e){return null===e||e===S?"":(""+e).replace(M,"")}function m(e,t){var n,r,i,o,a;if(e)if(n=e.length,n===o){for(r in e)if(e.hasOwnProperty(r)&&(a=e[r],t.call(a,r,a)===!1))break}else for(i=0;n>i&&(a=e[i],t.call(a,i,a)!==!1);i++);return e}function g(e,t){var n=[];return m(e,function(e,r){t(r,e)&&n.push(r)}),n}function v(e){return e?9==e.nodeType?e:e.ownerDocument:w}function y(e,n,r){var i=[],o=e[n];for("string"!=typeof r&&r instanceof f&&(r=r[0]);o&&9!==o.nodeType;){if(r!==t){if(o===r)break;if("string"==typeof r&&f(o).is(r))break}1===o.nodeType&&i.push(o),o=o[n]}return i}function b(e,n,r,i){var o=[];for(i instanceof f&&(i=i[0]);e;e=e[n])if(!r||e.nodeType===r){if(i!==t){if(e===i)break;if("string"==typeof i&&f(e).is(i))break}o.push(e)}return o}function C(e,t,n){for(e=e[t];e;e=e[t])if(e.nodeType==n)return e;return null}function x(e,t,n){m(n,function(n,r){e[n]=e[n]||{},e[n][t]=r})}var w=document,_=Array.prototype.push,E=Array.prototype.slice,N=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,k=e.Event,S,T=r.makeMap("fillOpacity fontWeight lineHeight opacity orphans widows zIndex zoom"," "),R=r.makeMap("checked compact declare defer disabled ismap multiple nohref noshade nowrap readonly selected"," "),A={"for":"htmlFor","class":"className",readonly:"readOnly"},B={"float":"cssFloat"},D={},L={},M=/^\s*|\s*$/g;return f.fn=f.prototype={constructor:f,selector:"",context:null,length:0,init:function(e,t){var n=this,r,i;if(!e)return n;if(e.nodeType)return n.context=n[0]=e,n.length=1,n;if(t&&t.nodeType)n.context=t;else{if(t)return f(e).attr(t);n.context=t=document}if(a(e)){if(n.selector=e,r="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!r)return f(t).find(e);if(r[1])for(i=l(e,v(t)).firstChild;i;)_.call(n,i),i=i.nextSibling;else{if(i=v(t).getElementById(r[2]),!i)return n;if(i.id!==r[2])return n.find(e);n.length=1,n[0]=i}}else this.add(e,!1);return n},toArray:function(){return r.toArray(this)},add:function(e,t){var n=this,r,i;if(a(e))return n.add(f(e));
if(t!==!1)for(r=f.unique(n.toArray().concat(f.makeArray(e))),n.length=r.length,i=0;i<r.length;i++)n[i]=r[i];else _.apply(n,f.makeArray(e));return n},attr:function(e,t){var n=this,r;if("object"==typeof e)m(e,function(e,t){n.attr(e,t)});else{if(!o(t)){if(n[0]&&1===n[0].nodeType){if(r=D[e],r&&r.get)return r.get(n[0],e);if(R[e])return n.prop(e)?e:S;t=n[0].getAttribute(e,2),null===t&&(t=S)}return t}this.each(function(){var n;if(1===this.nodeType){if(n=D[e],n&&n.set)return void n.set(this,t);null===t?this.removeAttribute(e,2):this.setAttribute(e,t,2)}})}return n},removeAttr:function(e){return this.attr(e,null)},prop:function(e,t){var n=this;if(e=A[e]||e,"object"==typeof e)m(e,function(e,t){n.prop(e,t)});else{if(!o(t))return n[0]&&n[0].nodeType&&e in n[0]?n[0][e]:t;this.each(function(){1==this.nodeType&&(this[e]=t)})}return n},css:function(e,t){function n(e){return e.replace(/-(\D)/g,function(e,t){return t.toUpperCase()})}function r(e){return e.replace(/[A-Z]/g,function(e){return"-"+e})}var i=this,a,s;if("object"==typeof e)m(e,function(e,t){i.css(e,t)});else if(o(t))e=n(e),"number"!=typeof t||T[e]||(t+="px"),i.each(function(){var n=this.style;if(s=L[e],s&&s.set)return void s.set(this,t);try{this.style[B[e]||e]=t}catch(i){}(null===t||""===t)&&(n.removeProperty?n.removeProperty(r(e)):n.removeAttribute(e))});else{if(a=i[0],s=L[e],s&&s.get)return s.get(a);if(a.ownerDocument.defaultView)try{return a.ownerDocument.defaultView.getComputedStyle(a,null).getPropertyValue(r(e))}catch(l){return S}else if(a.currentStyle)return a.currentStyle[n(e)]}return i},remove:function(){for(var e=this,t,n=this.length;n--;)t=e[n],k.clean(t),t.parentNode&&t.parentNode.removeChild(t);return this},empty:function(){for(var e=this,t,n=this.length;n--;)for(t=e[n];t.firstChild;)t.removeChild(t.firstChild);return this},html:function(e){var t=this,n;if(o(e)){n=t.length;try{for(;n--;)t[n].innerHTML=e}catch(r){f(t[n]).empty().append(e)}return t}return t[0]?t[0].innerHTML:""},text:function(e){var t=this,n;if(o(e)){for(n=t.length;n--;)"innerText"in t[n]?t[n].innerText=e:t[0].textContent=e;return t}return t[0]?t[0].innerText||t[0].textContent:""},append:function(){return c(this,arguments,function(e){1===this.nodeType&&this.appendChild(e)})},prepend:function(){return c(this,arguments,function(e){1===this.nodeType&&this.insertBefore(e,this.firstChild)},!0)},before:function(){var e=this;return e[0]&&e[0].parentNode?c(e,arguments,function(e){this.parentNode.insertBefore(e,this)}):e},after:function(){var e=this;return e[0]&&e[0].parentNode?c(e,arguments,function(e){this.parentNode.insertBefore(e,this.nextSibling)},!0):e},appendTo:function(e){return f(e).append(this),this},prependTo:function(e){return f(e).prepend(this),this},replaceWith:function(e){return this.before(e).remove()},wrap:function(e){return d(this,e)},wrapAll:function(e){return d(this,e,!0)},wrapInner:function(e){return this.each(function(){f(this).contents().wrapAll(e)}),this},unwrap:function(){return this.parent().each(function(){f(this).replaceWith(this.childNodes)})},clone:function(){var e=[];return this.each(function(){e.push(this.cloneNode(!0))}),f(e)},addClass:function(e){return this.toggleClass(e,!0)},removeClass:function(e){return this.toggleClass(e,!1)},toggleClass:function(e,t){var n=this;return"string"!=typeof e?n:(-1!==e.indexOf(" ")?m(e.split(" "),function(){n.toggleClass(this,t)}):n.each(function(n,r){var i,o;o=u(r,e),o!==t&&(i=r.className,o?r.className=h((" "+i+" ").replace(" "+e+" "," ")):r.className+=i?" "+e:e)}),n)},hasClass:function(e){return u(this[0],e)},each:function(e){return m(this,e)},on:function(e,t){return this.each(function(){k.bind(this,e,t)})},off:function(e,t){return this.each(function(){k.unbind(this,e,t)})},trigger:function(e){return this.each(function(){"object"==typeof e?k.fire(this,e.type,e):k.fire(this,e)})},show:function(){return this.css("display","")},hide:function(){return this.css("display","none")},slice:function(){return new f(E.apply(this,arguments))},eq:function(e){return-1===e?this.slice(e):this.slice(e,+e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},find:function(e){var t,n,r=[];for(t=0,n=this.length;n>t;t++)f.find(e,this[t],r);return f(r)},filter:function(e){return f("function"==typeof e?g(this.toArray(),function(t,n){return e(n,t)}):f.filter(e,this.toArray()))},closest:function(e){var t=[];return e instanceof f&&(e=e[0]),this.each(function(n,r){for(;r;){if("string"==typeof e&&f(r).is(e)){t.push(r);break}if(r==e){t.push(r);break}r=r.parentNode}}),f(t)},offset:function(e){var t,n,r,i=0,o=0,a;return e?this.css(e):(t=this[0],t&&(n=t.ownerDocument,r=n.documentElement,t.getBoundingClientRect&&(a=t.getBoundingClientRect(),i=a.left+(r.scrollLeft||n.body.scrollLeft)-r.clientLeft,o=a.top+(r.scrollTop||n.body.scrollTop)-r.clientTop)),{left:i,top:o})},push:_,sort:[].sort,splice:[].splice},r.extend(f,{extend:r.extend,makeArray:function(e){return s(e)||e.nodeType?[e]:r.toArray(e)},inArray:p,isArray:r.isArray,each:m,trim:h,grep:g,find:n,expr:n.selectors,unique:n.uniqueSort,text:n.getText,contains:n.contains,filter:function(e,t,n){var r=t.length;for(n&&(e=":not("+e+")");r--;)1!=t[r].nodeType&&t.splice(r,1);return t=1===t.length?f.find.matchesSelector(t[0],e)?[t[0]]:[]:f.find.matches(e,t)}}),m({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return y(e,"parentNode")},next:function(e){return C(e,"nextSibling",1)},prev:function(e){return C(e,"previousSibling",1)},children:function(e){return b(e.firstChild,"nextSibling",1)},contents:function(e){return r.toArray(("iframe"===e.nodeName?e.contentDocument||e.contentWindow.document:e).childNodes)}},function(e,t){f.fn[e]=function(n){var r=this,i=[];return r.each(function(){var e=t.call(i,this,n,i);e&&(f.isArray(e)?i.push.apply(i,e):i.push(e))}),this.length>1&&(i=f.unique(i),0===e.indexOf("parents")&&(i=i.reverse())),i=f(i),n?i.filter(n):i}}),m({parentsUntil:function(e,t){return y(e,"parentNode",t)},nextUntil:function(e,t){return b(e,"nextSibling",1,t).slice(1)},prevUntil:function(e,t){return b(e,"previousSibling",1,t).slice(1)}},function(e,t){f.fn[e]=function(n,r){var i=this,o=[];return i.each(function(){var e=t.call(o,this,n,o);e&&(f.isArray(e)?o.push.apply(o,e):o.push(e))}),this.length>1&&(o=f.unique(o),(0===e.indexOf("parents")||"prevUntil"===e)&&(o=o.reverse())),o=f(o),r?o.filter(r):o}}),f.fn.is=function(e){return!!e&&this.filter(e).length>0},f.fn.init.prototype=f.fn,f.overrideDefaults=function(e){function t(r,i){return n=n||e(),0===arguments.length&&(r=n.element),i||(i=n.context),new t.fn.init(r,i)}var n;return f.extend(t,this),t},i.ie&&i.ie<8&&(x(D,"get",{maxlength:function(e){var t=e.maxLength;return 2147483647===t?S:t},size:function(e){var t=e.size;return 20===t?S:t},"class":function(e){return e.className},style:function(e){var t=e.style.cssText;return 0===t.length?S:t}}),x(D,"set",{"class":function(e,t){e.className=t},style:function(e,t){e.style.cssText=t}})),i.ie&&i.ie<9&&(B["float"]="styleFloat",x(L,"set",{opacity:function(e,t){var n=e.style;null===t||""===t?n.removeAttribute("filter"):(n.zoom=1,n.filter="alpha(opacity="+100*t+")")}})),f.attrHooks=D,f.cssHooks=L,f}),r(p,[],function(){return function(e,t){function n(e,t,n,r){function i(e){return e=parseInt(e,10).toString(16),e.length>1?e:"0"+e}return"#"+i(t)+i(n)+i(r)}var r=/rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/gi,i=/(?:url(?:(?:\(\s*\"([^\"]+)\"\s*\))|(?:\(\s*\'([^\']+)\'\s*\))|(?:\(\s*([^)\s]+)\s*\))))|(?:\'([^\']+)\')|(?:\"([^\"]+)\")/gi,o=/\s*([^:]+):\s*([^;]+);?/g,a=/\s+$/,s,l,c={},u,d,f,p="\ufeff";for(e=e||{},t&&(d=t.getValidStyles(),f=t.getInvalidStyles()),u=("\\\" \\' \\; \\: ; : "+p).split(" "),l=0;l<u.length;l++)c[u[l]]=p+l,c[p+l]=u[l];return{toHex:function(e){return e.replace(r,n)},parse:function(t){function s(e,t,n){var r,i,o,a;if(r=m[e+"-top"+t],r&&(i=m[e+"-right"+t],i&&(o=m[e+"-bottom"+t],o&&(a=m[e+"-left"+t])))){var s=[r,i,o,a];for(l=s.length-1;l--&&s[l]===s[l+1];);l>-1&&n||(m[e+t]=-1==l?s[0]:s.join(" "),delete m[e+"-top"+t],delete m[e+"-right"+t],delete m[e+"-bottom"+t],delete m[e+"-left"+t])}}function u(e){var t=m[e],n;if(t){for(t=t.split(" "),n=t.length;n--;)if(t[n]!==t[0])return!1;return m[e]=t[0],!0}}function d(e,t,n,r){u(t)&&u(n)&&u(r)&&(m[e]=m[t]+" "+m[n]+" "+m[r],delete m[t],delete m[n],delete m[r])}function f(e){return b=!0,c[e]}function p(e,t){return b&&(e=e.replace(/\uFEFF[0-9]/g,function(e){return c[e]})),t||(e=e.replace(/\\([\'\";:])/g,"$1")),e}function h(t,n,r,i,o,a){if(o=o||a)return o=p(o),"'"+o.replace(/\'/g,"\\'")+"'";if(n=p(n||r||i),!e.allow_script_urls){var s=n.replace(/[\s\r\n]+/,"");if(/(java|vb)script:/i.test(s))return"";if(!e.allow_svg_data_urls&&/^data:image\/svg/i.test(s))return""}return C&&(n=C.call(x,n,"style")),"url('"+n.replace(/\'/g,"\\'")+"')"}var m={},g,v,y,b,C=e.url_converter,x=e.url_converter_scope||this;if(t){for(t=t.replace(/[\u0000-\u001F]/g,""),t=t.replace(/\\[\"\';:\uFEFF]/g,f).replace(/\"[^\"]+\"|\'[^\']+\'/g,function(e){return e.replace(/[;:]/g,f)});g=o.exec(t);){if(v=g[1].replace(a,"").toLowerCase(),y=g[2].replace(a,""),y=y.replace(/\\[0-9a-f]+/g,function(e){return String.fromCharCode(parseInt(e.substr(1),16))}),v&&y.length>0){if(!e.allow_script_urls&&("behavior"==v||/expression\s*\(|\/\*|\*\//.test(y)))continue;"font-weight"===v&&"700"===y?y="bold":("color"===v||"background-color"===v)&&(y=y.toLowerCase()),y=y.replace(r,n),y=y.replace(i,h),m[v]=b?p(y,!0):y}o.lastIndex=g.index+g[0].length}s("border","",!0),s("border","-width"),s("border","-color"),s("border","-style"),s("padding",""),s("margin",""),d("border","border-width","border-style","border-color"),"medium none"===m.border&&delete m.border,"none"===m["border-image"]&&delete m["border-image"]}return m},serialize:function(e,t){function n(t){var n,r,o,a;if(n=d[t])for(r=0,o=n.length;o>r;r++)t=n[r],a=e[t],a!==s&&a.length>0&&(i+=(i.length>0?" ":"")+t+": "+a+";")}function r(e,t){var n;return n=f["*"],n&&n[e]?!1:(n=f[t],n&&n[e]?!1:!0)}var i="",o,a;if(t&&d)n("*"),n(t);else for(o in e)a=e[o],a!==s&&a.length>0&&(!f||r(o,t))&&(i+=(i.length>0?" ":"")+o+": "+a+";");return i}}}}),r(h,[],function(){return function(e,t){function n(e,n,r,i){var o,a;if(e){if(!i&&e[n])return e[n];if(e!=t){if(o=e[r])return o;for(a=e.parentNode;a&&a!=t;a=a.parentNode)if(o=a[r])return o}}}var r=e;this.current=function(){return r},this.next=function(e){return r=n(r,"firstChild","nextSibling",e)},this.prev=function(e){return r=n(r,"lastChild","previousSibling",e)}}}),r(m,[d],function(e){function t(n){function r(){return H.createDocumentFragment()}function i(e,t){_(F,e,t)}function o(e,t){_(z,e,t)}function a(e){i(e.parentNode,j(e))}function s(e){i(e.parentNode,j(e)+1)}function l(e){o(e.parentNode,j(e))}function c(e){o(e.parentNode,j(e)+1)}function u(e){e?(M[U]=M[V],M[$]=M[W]):(M[V]=M[U],M[W]=M[$]),M.collapsed=F}function d(e){a(e),c(e)}function f(e){i(e,0),o(e,1===e.nodeType?e.childNodes.length:e.nodeValue.length)}function p(e,t){var n=M[V],r=M[W],i=M[U],o=M[$],a=t.startContainer,s=t.startOffset,l=t.endContainer,c=t.endOffset;return 0===e?w(n,r,a,s):1===e?w(i,o,a,s):2===e?w(i,o,l,c):3===e?w(n,r,l,c):void 0}function h(){E(I)}function m(){return E(P)}function g(){return E(O)}function v(e){var t=this[V],r=this[W],i,o;3!==t.nodeType&&4!==t.nodeType||!t.nodeValue?(t.childNodes.length>0&&(o=t.childNodes[r]),o?t.insertBefore(e,o):3==t.nodeType?n.insertAfter(e,t):t.appendChild(e)):r?r>=t.nodeValue.length?n.insertAfter(e,t):(i=t.splitText(r),t.parentNode.insertBefore(e,i)):t.parentNode.insertBefore(e,t)}function y(e){var t=M.extractContents();M.insertNode(e),e.appendChild(t),M.selectNode(e)}function b(){return q(new t(n),{startContainer:M[V],startOffset:M[W],endContainer:M[U],endOffset:M[$],collapsed:M.collapsed,commonAncestorContainer:M.commonAncestorContainer})}function C(e,t){var n;if(3==e.nodeType)return e;if(0>t)return e;for(n=e.firstChild;n&&t>0;)--t,n=n.nextSibling;return n?n:e}function x(){return M[V]==M[U]&&M[W]==M[$]}function w(e,t,r,i){var o,a,s,l,c,u;if(e==r)return t==i?0:i>t?-1:1;for(o=r;o&&o.parentNode!=e;)o=o.parentNode;if(o){for(a=0,s=e.firstChild;s!=o&&t>a;)a++,s=s.nextSibling;return a>=t?-1:1}for(o=e;o&&o.parentNode!=r;)o=o.parentNode;if(o){for(a=0,s=r.firstChild;s!=o&&i>a;)a++,s=s.nextSibling;return i>a?-1:1}for(l=n.findCommonAncestor(e,r),c=e;c&&c.parentNode!=l;)c=c.parentNode;for(c||(c=l),u=r;u&&u.parentNode!=l;)u=u.parentNode;if(u||(u=l),c==u)return 0;for(s=l.firstChild;s;){if(s==c)return-1;if(s==u)return 1;s=s.nextSibling}}function _(e,t,r){var i,o;for(e?(M[V]=t,M[W]=r):(M[U]=t,M[$]=r),i=M[U];i.parentNode;)i=i.parentNode;for(o=M[V];o.parentNode;)o=o.parentNode;o==i?w(M[V],M[W],M[U],M[$])>0&&M.collapse(e):M.collapse(e),M.collapsed=x(),M.commonAncestorContainer=n.findCommonAncestor(M[V],M[U])}function E(e){var t,n=0,r=0,i,o,a,s,l,c;if(M[V]==M[U])return N(e);for(t=M[U],i=t.parentNode;i;t=i,i=i.parentNode){if(i==M[V])return k(t,e);++n}for(t=M[V],i=t.parentNode;i;t=i,i=i.parentNode){if(i==M[U])return S(t,e);++r}for(o=r-n,a=M[V];o>0;)a=a.parentNode,o--;for(s=M[U];0>o;)s=s.parentNode,o++;for(l=a.parentNode,c=s.parentNode;l!=c;l=l.parentNode,c=c.parentNode)a=l,s=c;return T(a,s,e)}function N(e){var t,n,i,o,a,s,l,c,u;if(e!=I&&(t=r()),M[W]==M[$])return t;if(3==M[V].nodeType){if(n=M[V].nodeValue,i=n.substring(M[W],M[$]),e!=O&&(o=M[V],c=M[W],u=M[$]-M[W],0===c&&u>=o.nodeValue.length-1?o.parentNode.removeChild(o):o.deleteData(c,u),M.collapse(F)),e==I)return;return i.length>0&&t.appendChild(H.createTextNode(i)),t}for(o=C(M[V],M[W]),a=M[$]-M[W];o&&a>0;)s=o.nextSibling,l=D(o,e),t&&t.appendChild(l),--a,o=s;return e!=O&&M.collapse(F),t}function k(e,t){var n,i,o,a,s,l;if(t!=I&&(n=r()),i=R(e,t),n&&n.appendChild(i),o=j(e),a=o-M[W],0>=a)return t!=O&&(M.setEndBefore(e),M.collapse(z)),n;for(i=e.previousSibling;a>0;)s=i.previousSibling,l=D(i,t),n&&n.insertBefore(l,n.firstChild),--a,i=s;return t!=O&&(M.setEndBefore(e),M.collapse(z)),n}function S(e,t){var n,i,o,a,s,l;for(t!=I&&(n=r()),o=A(e,t),n&&n.appendChild(o),i=j(e),++i,a=M[$]-i,o=e.nextSibling;o&&a>0;)s=o.nextSibling,l=D(o,t),n&&n.appendChild(l),--a,o=s;return t!=O&&(M.setStartAfter(e),M.collapse(F)),n}function T(e,t,n){var i,o,a,s,l,c,u;for(n!=I&&(o=r()),i=A(e,n),o&&o.appendChild(i),a=j(e),s=j(t),++a,l=s-a,c=e.nextSibling;l>0;)u=c.nextSibling,i=D(c,n),o&&o.appendChild(i),c=u,--l;return i=R(t,n),o&&o.appendChild(i),n!=O&&(M.setStartAfter(e),M.collapse(F)),o}function R(e,t){var n=C(M[U],M[$]-1),r,i,o,a,s,l=n!=M[U];if(n==e)return B(n,l,z,t);for(r=n.parentNode,i=B(r,z,z,t);r;){for(;n;)o=n.previousSibling,a=B(n,l,z,t),t!=I&&i.insertBefore(a,i.firstChild),l=F,n=o;if(r==e)return i;n=r.previousSibling,r=r.parentNode,s=B(r,z,z,t),t!=I&&s.appendChild(i),i=s}}function A(e,t){var n=C(M[V],M[W]),r=n!=M[V],i,o,a,s,l;if(n==e)return B(n,r,F,t);for(i=n.parentNode,o=B(i,z,F,t);i;){for(;n;)a=n.nextSibling,s=B(n,r,F,t),t!=I&&o.appendChild(s),r=F,n=a;if(i==e)return o;n=i.nextSibling,i=i.parentNode,l=B(i,z,F,t),t!=I&&l.appendChild(o),o=l}}function B(e,t,r,i){var o,a,s,l,c;if(t)return D(e,i);if(3==e.nodeType){if(o=e.nodeValue,r?(l=M[W],a=o.substring(l),s=o.substring(0,l)):(l=M[$],a=o.substring(0,l),s=o.substring(l)),i!=O&&(e.nodeValue=s),i==I)return;return c=n.clone(e,z),c.nodeValue=a,c}if(i!=I)return n.clone(e,z)}function D(e,t){return t!=I?t==O?n.clone(e,F):e:void e.parentNode.removeChild(e)}function L(){return n.create("body",null,g()).outerText}var M=this,H=n.doc,P=0,O=1,I=2,F=!0,z=!1,W="startOffset",V="startContainer",U="endContainer",$="endOffset",q=e.extend,j=n.nodeIndex;return q(M,{startContainer:H,startOffset:0,endContainer:H,endOffset:0,collapsed:F,commonAncestorContainer:H,START_TO_START:0,START_TO_END:1,END_TO_END:2,END_TO_START:3,setStart:i,setEnd:o,setStartBefore:a,setStartAfter:s,setEndBefore:l,setEndAfter:c,collapse:u,selectNode:d,selectNodeContents:f,compareBoundaryPoints:p,deleteContents:h,extractContents:m,cloneContents:g,insertNode:v,surroundContents:y,cloneRange:b,toStringIE:L}),M}return t.prototype.toString=function(){return this.toStringIE()},t}),r(g,[d],function(e){function t(e){var t;return t=document.createElement("div"),t.innerHTML=e,t.textContent||t.innerText||e}function n(e,t){var n,r,i,a={};if(e){for(e=e.split(","),t=t||10,n=0;n<e.length;n+=2)r=String.fromCharCode(parseInt(e[n],t)),o[r]||(i="&"+e[n+1]+";",a[r]=i,a[i]=r);return a}}var r=e.makeMap,i,o,a,s=/[&<>\"\u0060\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,l=/[<>&\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,c=/[<>&\"\']/g,u=/&(#x|#)?([\w]+);/g,d={128:"\u20ac",130:"\u201a",131:"\u0192",132:"\u201e",133:"\u2026",134:"\u2020",135:"\u2021",136:"\u02c6",137:"\u2030",138:"\u0160",139:"\u2039",140:"\u0152",142:"\u017d",145:"\u2018",146:"\u2019",147:"\u201c",148:"\u201d",149:"\u2022",150:"\u2013",151:"\u2014",152:"\u02dc",153:"\u2122",154:"\u0161",155:"\u203a",156:"\u0153",158:"\u017e",159:"\u0178"};o={'"':"&quot;","'":"&#39;","<":"&lt;",">":"&gt;","&":"&amp;","`":"&#96;"},a={"&lt;":"<","&gt;":">","&amp;":"&","&quot;":'"',"&apos;":"'"},i=n("50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro",32);var f={encodeRaw:function(e,t){return e.replace(t?s:l,function(e){return o[e]||e})},encodeAllRaw:function(e){return(""+e).replace(c,function(e){return o[e]||e})},encodeNumeric:function(e,t){return e.replace(t?s:l,function(e){return e.length>1?"&#"+(1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320)+65536)+";":o[e]||"&#"+e.charCodeAt(0)+";"})},encodeNamed:function(e,t,n){return n=n||i,e.replace(t?s:l,function(e){return o[e]||n[e]||e})},getEncodeFunc:function(e,t){function a(e,n){return e.replace(n?s:l,function(e){return o[e]||t[e]||"&#"+e.charCodeAt(0)+";"||e})}function c(e,n){return f.encodeNamed(e,n,t)}return t=n(t)||i,e=r(e.replace(/\+/g,",")),e.named&&e.numeric?a:e.named?t?c:f.encodeNamed:e.numeric?f.encodeNumeric:f.encodeRaw},decode:function(e){return e.replace(u,function(e,n,r){return n?(r=parseInt(r,2===n.length?16:10),r>65535?(r-=65536,String.fromCharCode(55296+(r>>10),56320+(1023&r))):d[r]||String.fromCharCode(r)):a[e]||i[e]||t(e)})}};return f}),r(v,[d],function(e){return function(t,n){function r(e){t.getElementsByTagName("head")[0].appendChild(e)}function i(n,i,l){function c(){for(var e=y.passed,t=e.length;t--;)e[t]();y.status=2,y.passed=[],y.failed=[]}function u(){for(var e=y.failed,t=e.length;t--;)e[t]();y.status=3,y.passed=[],y.failed=[]}function d(){var e=navigator.userAgent.match(/WebKit\/(\d*)/);return!!(e&&e[1]<536)}function f(e,t){e()||((new Date).getTime()-v<s?window.setTimeout(t,0):u())}function p(){f(function(){for(var e=t.styleSheets,n,r=e.length,i;r--;)if(n=e[r],i=n.ownerNode?n.ownerNode:n.owningElement,i&&i.id===m.id)return c(),!0},p)}function h(){f(function(){try{var e=g.sheet.cssRules;return c(),!!e}catch(t){}},h)}var m,g,v,y;if(n=e._addCacheSuffix(n),a[n]?y=a[n]:(y={passed:[],failed:[]},a[n]=y),i&&y.passed.push(i),l&&y.failed.push(l),1!=y.status){if(2==y.status)return void c();if(3==y.status)return void u();if(y.status=1,m=t.createElement("link"),m.rel="stylesheet",m.type="text/css",m.id="u"+o++,m.async=!1,m.defer=!1,v=(new Date).getTime(),"onload"in m&&!d())m.onload=p,m.onerror=u;else{if(navigator.userAgent.indexOf("Firefox")>0)return g=t.createElement("style"),g.textContent='@import "'+n+'"',h(),void r(g);p()}r(m),m.href=n}}var o=0,a={},s;n=n||{},s=n.maxLoadTime||5e3,this.load=i}}),r(y,[c,f,p,l,h,m,g,u,d,v],function(e,n,r,i,o,a,s,l,c,u){function d(e,t){var n={},r=t.keep_values,i;return i={set:function(n,r,i){t.url_converter&&(r=t.url_converter.call(t.url_converter_scope||e,r,i,n[0])),n.attr("data-mce-"+i,r).attr(i,r)},get:function(e,t){return e.attr("data-mce-"+t)||e.attr(t)}},n={style:{set:function(e,t){return null!==t&&"object"==typeof t?void e.css(t):(r&&e.attr("data-mce-style",t),void e.attr("style",t))},get:function(t){var n=t.attr("data-mce-style")||t.attr("style");return n=e.serializeStyle(e.parseStyle(n),t[0].nodeName)}}},r&&(n.href=n.src=i),n}function f(e,t){var o=this,a;o.doc=e,o.win=window,o.files={},o.counter=0,o.stdMode=!v||e.documentMode>=8,o.boxModel=!v||"CSS1Compat"==e.compatMode||o.stdMode,o.styleSheetLoader=new u(e),o.boundEvents=[],o.settings=t=t||{},o.schema=t.schema,o.styles=new r({url_converter:t.url_converter,url_converter_scope:t.url_converter_scope},t.schema),o.fixDoc(e),o.events=t.ownEvents?new i(t.proxy):i.Event,o.attrHooks=d(o,t),a=t.schema?t.schema.getBlockElements():{},o.$=n.overrideDefaults(function(){return{context:e,element:o.getRoot()}}),o.isBlock=function(e){if(!e)return!1;var t=e.nodeType;return t?!(1!==t||!a[e.nodeName]):!!a[e]}}var p=c.each,h=c.is,m=c.grep,g=c.trim,v=l.ie,y=/^([a-z0-9],?)+$/i,b=/^[ \t\r\n]*$/;return f.prototype={$$:function(e){return"string"==typeof e&&(e=this.get(e)),this.$(e)},root:null,fixDoc:function(e){var t=this.settings,n;if(v&&t.schema){"abbr article aside audio canvas details figcaption figure footer header hgroup mark menu meter nav output progress section summary time video".replace(/\w+/g,function(t){e.createElement(t)});for(n in t.schema.getCustomElements())e.createElement(n)}},clone:function(e,t){var n=this,r,i;return!v||1!==e.nodeType||t?e.cloneNode(t):(i=n.doc,t?r.firstChild:(r=i.createElement(e.nodeName),p(n.getAttribs(e),function(t){n.setAttrib(r,t.nodeName,n.getAttrib(e,t.nodeName))}),r))},getRoot:function(){var e=this;return e.settings.root_element||e.doc.body},getViewPort:function(e){var t,n;return e=e?e:this.win,t=e.document,n=this.boxModel?t.documentElement:t.body,{x:e.pageXOffset||n.scrollLeft,y:e.pageYOffset||n.scrollTop,w:e.innerWidth||n.clientWidth,h:e.innerHeight||n.clientHeight}},getRect:function(e){var t=this,n,r;return e=t.get(e),n=t.getPos(e),r=t.getSize(e),{x:n.x,y:n.y,w:r.w,h:r.h}},getSize:function(e){var t=this,n,r;return e=t.get(e),n=t.getStyle(e,"width"),r=t.getStyle(e,"height"),-1===n.indexOf("px")&&(n=0),-1===r.indexOf("px")&&(r=0),{w:parseInt(n,10)||e.offsetWidth||e.clientWidth,h:parseInt(r,10)||e.offsetHeight||e.clientHeight}},getParent:function(e,t,n){return this.getParents(e,t,n,!1)},getParents:function(e,n,r,i){var o=this,a,s=[];for(e=o.get(e),i=i===t,r=r||("BODY"!=o.getRoot().nodeName?o.getRoot().parentNode:null),h(n,"string")&&(a=n,n="*"===n?function(e){return 1==e.nodeType}:function(e){return o.is(e,a)});e&&e!=r&&e.nodeType&&9!==e.nodeType;){if(!n||n(e)){if(!i)return e;s.push(e)}e=e.parentNode}return i?s:null},get:function(e){var t;return e&&this.doc&&"string"==typeof e&&(t=e,e=this.doc.getElementById(e),e&&e.id!==t)?this.doc.getElementsByName(t)[1]:e},getNext:function(e,t){return this._findSib(e,t,"nextSibling")},getPrev:function(e,t){return this._findSib(e,t,"previousSibling")},select:function(t,n){var r=this;return e(t,r.get(n)||r.settings.root_element||r.doc,[])},is:function(n,r){var i;if(n.length===t){if("*"===r)return 1==n.nodeType;if(y.test(r)){for(r=r.toLowerCase().split(/,/),n=n.nodeName.toLowerCase(),i=r.length-1;i>=0;i--)if(r[i]==n)return!0;return!1}}if(n.nodeType&&1!=n.nodeType)return!1;var o=n.nodeType?[n]:n;return e(r,o[0].ownerDocument||o[0],null,o).length>0},add:function(e,t,n,r,i){var o=this;return this.run(e,function(e){var a;return a=h(t,"string")?o.doc.createElement(t):t,o.setAttribs(a,n),r&&(r.nodeType?a.appendChild(r):o.setHTML(a,r)),i?a:e.appendChild(a)})},create:function(e,t,n){return this.add(this.doc.createElement(e),e,t,n,1)},createHTML:function(e,t,n){var r="",i;r+="<"+e;for(i in t)t.hasOwnProperty(i)&&null!==t[i]&&"undefined"!=typeof t[i]&&(r+=" "+i+'="'+this.encode(t[i])+'"');return"undefined"!=typeof n?r+">"+n+"</"+e+">":r+" />"},createFragment:function(e){var t,n,r=this.doc,i;for(i=r.createElement("div"),t=r.createDocumentFragment(),e&&(i.innerHTML=e);n=i.firstChild;)t.appendChild(n);return t},remove:function(e,t){return e=this.$$(e),t?e.each(function(){for(var e;e=this.firstChild;)3==e.nodeType&&0===e.data.length?this.removeChild(e):this.parentNode.insertBefore(e,this)}).remove():e.remove(),e.length>1?e.toArray():e[0]},setStyle:function(e,t,n){e=this.$$(e).css(t,n),this.settings.update_styles&&e.attr("data-mce-style",null)},getStyle:function(e,n,r){return e=this.$$(e),r?e.css(n):(n=n.replace(/-(\D)/g,function(e,t){return t.toUpperCase()}),"float"==n&&(n=v?"styleFloat":"cssFloat"),e[0]&&e[0].style?e[0].style[n]:t)},setStyles:function(e,t){e=this.$$(e).css(t),this.settings.update_styles&&e.attr("data-mce-style",null)},removeAllAttribs:function(e){return this.run(e,function(e){var t,n=e.attributes;for(t=n.length-1;t>=0;t--)e.removeAttributeNode(n.item(t))})},setAttrib:function(e,t,n){var r=this,i,o,a=r.settings;""===n&&(n=null),e=r.$$(e),i=e.attr(t),e.length&&(o=r.attrHooks[t],o&&o.set?o.set(e,n,t):e.attr(t,n),i!=n&&a.onSetAttrib&&a.onSetAttrib({attrElm:e,attrName:t,attrValue:n}))},setAttribs:function(e,t){var n=this;n.$$(e).each(function(e,r){p(t,function(e,t){n.setAttrib(r,t,e)})})},getAttrib:function(e,t,n){var r=this,i,o;return e=r.$$(e),e.length&&(i=r.attrHooks[t],o=i&&i.get?i.get(e,t):e.attr(t)),"undefined"==typeof o&&(o=n||""),o},getPos:function(e,t){var r=this,i=0,o=0,a,s=r.doc,l=s.body,c;if(e=r.get(e),t=t||l,e){if(t===l&&e.getBoundingClientRect&&"static"===n(l).css("position"))return c=e.getBoundingClientRect(),t=r.boxModel?s.documentElement:l,i=c.left+(s.documentElement.scrollLeft||l.scrollLeft)-t.clientLeft,o=c.top+(s.documentElement.scrollTop||l.scrollTop)-t.clientTop,{x:i,y:o};for(a=e;a&&a!=t&&a.nodeType;)i+=a.offsetLeft||0,o+=a.offsetTop||0,a=a.offsetParent;for(a=e.parentNode;a&&a!=t&&a.nodeType;)i-=a.scrollLeft||0,o-=a.scrollTop||0,a=a.parentNode}return{x:i,y:o}},parseStyle:function(e){return this.styles.parse(e)},serializeStyle:function(e,t){return this.styles.serialize(e,t)},addStyle:function(e){var t=this,n=t.doc,r,i;if(t!==f.DOM&&n===document){var o=f.DOM.addedStyles;if(o=o||[],o[e])return;o[e]=!0,f.DOM.addedStyles=o}i=n.getElementById("mceDefaultStyles"),i||(i=n.createElement("style"),i.id="mceDefaultStyles",i.type="text/css",r=n.getElementsByTagName("head")[0],r.firstChild?r.insertBefore(i,r.firstChild):r.appendChild(i)),i.styleSheet?i.styleSheet.cssText+=e:i.appendChild(n.createTextNode(e))},loadCSS:function(e){var t=this,n=t.doc,r;return t!==f.DOM&&n===document?void f.DOM.loadCSS(e):(e||(e=""),r=n.getElementsByTagName("head")[0],void p(e.split(","),function(e){var i;e=c._addCacheSuffix(e),t.files[e]||(t.files[e]=!0,i=t.create("link",{rel:"stylesheet",href:e}),v&&n.documentMode&&n.recalc&&(i.onload=function(){n.recalc&&n.recalc(),i.onload=null}),r.appendChild(i))}))},addClass:function(e,t){this.$$(e).addClass(t)},removeClass:function(e,t){this.toggleClass(e,t,!1)},hasClass:function(e,t){return this.$$(e).hasClass(t)},toggleClass:function(e,t,r){this.$$(e).toggleClass(t,r).each(function(){""===this.className&&n(this).attr("class",null)})},show:function(e){this.$$(e).show()},hide:function(e){this.$$(e).hide()},isHidden:function(e){return"none"==this.$$(e).css("display")},uniqueId:function(e){return(e?e:"mce_")+this.counter++},setHTML:function(e,t){e=this.$$(e),v?e.each(function(e,r){if(r.canHaveHTML!==!1){for(;r.firstChild;)r.removeChild(r.firstChild);try{r.innerHTML="<br>"+t,r.removeChild(r.firstChild)}catch(i){n("<div>").html("<br>"+t).contents().slice(1).appendTo(r)}return t}}):e.html(t)},getOuterHTML:function(e){return e=this.get(e),1==e.nodeType&&"outerHTML"in e?e.outerHTML:n("<div>").append(n(e).clone()).html()},setOuterHTML:function(e,t){var r=this;r.$$(e).each(function(){try{if("outerHTML"in this)return void(this.outerHTML=t)}catch(e){}r.remove(n(this).html(t),!0)})},decode:s.decode,encode:s.encodeAllRaw,insertAfter:function(e,t){return t=this.get(t),this.run(e,function(e){var n,r;return n=t.parentNode,r=t.nextSibling,r?n.insertBefore(e,r):n.appendChild(e),e})},replace:function(e,t,n){var r=this;return r.run(t,function(t){return h(t,"array")&&(e=e.cloneNode(!0)),n&&p(m(t.childNodes),function(t){e.appendChild(t)}),t.parentNode.replaceChild(e,t)})},rename:function(e,t){var n=this,r;return e.nodeName!=t.toUpperCase()&&(r=n.create(t),p(n.getAttribs(e),function(t){n.setAttrib(r,t.nodeName,n.getAttrib(e,t.nodeName))}),n.replace(r,e,1)),r||e},findCommonAncestor:function(e,t){for(var n=e,r;n;){for(r=t;r&&n!=r;)r=r.parentNode;if(n==r)break;n=n.parentNode}return!n&&e.ownerDocument?e.ownerDocument.documentElement:n},toHex:function(e){return this.styles.toHex(c.trim(e))},run:function(e,t,n){var r=this,i;return"string"==typeof e&&(e=r.get(e)),e?(n=n||this,e.nodeType||!e.length&&0!==e.length?t.call(n,e):(i=[],p(e,function(e,o){e&&("string"==typeof e&&(e=r.get(e)),i.push(t.call(n,e,o)))}),i)):!1},getAttribs:function(e){var t;if(e=this.get(e),!e)return[];if(v){if(t=[],"OBJECT"==e.nodeName)return e.attributes;"OPTION"===e.nodeName&&this.getAttrib(e,"selected")&&t.push({specified:1,nodeName:"selected"});var n=/<\/?[\w:\-]+ ?|=[\"][^\"]+\"|=\'[^\']+\'|=[\w\-]+|>/gi;return e.cloneNode(!1).outerHTML.replace(n,"").replace(/[\w:\-]+/gi,function(e){t.push({specified:1,nodeName:e})}),t}return e.attributes},isEmpty:function(e,t){var n=this,r,i,a,s,l,c=0;if(e=e.firstChild){s=new o(e,e.parentNode),t=t||(n.schema?n.schema.getNonEmptyElements():null);do{if(a=e.nodeType,1===a){if(e.getAttribute("data-mce-bogus"))continue;if(l=e.nodeName.toLowerCase(),t&&t[l]){if("br"===l){c++;continue}return!1}for(i=n.getAttribs(e),r=i.length;r--;)if(l=i[r].nodeName,"name"===l||"data-mce-bookmark"===l)return!1}if(8==a)return!1;if(3===a&&!b.test(e.nodeValue))return!1}while(e=s.next())}return 1>=c},createRng:function(){var e=this.doc;return e.createRange?e.createRange():new a(this)},nodeIndex:function(e,t){var n=0,r,i;if(e)for(r=e.nodeType,e=e.previousSibling;e;e=e.previousSibling)i=e.nodeType,(!t||3!=i||i!=r&&e.nodeValue.length)&&(n++,r=i);return n},split:function(e,t,n){function r(e){function t(e){var t=e.previousSibling&&"SPAN"==e.previousSibling.nodeName,n=e.nextSibling&&"SPAN"==e.nextSibling.nodeName;return t&&n}var n,o=e.childNodes,a=e.nodeType;if(1!=a||"bookmark"!=e.getAttribute("data-mce-type")){for(n=o.length-1;n>=0;n--)r(o[n]);
if(9!=a){if(3==a&&e.nodeValue.length>0){var s=g(e.nodeValue).length;if(!i.isBlock(e.parentNode)||s>0||0===s&&t(e))return}else if(1==a&&(o=e.childNodes,1==o.length&&o[0]&&1==o[0].nodeType&&"bookmark"==o[0].getAttribute("data-mce-type")&&e.parentNode.insertBefore(o[0],e),o.length||/^(br|hr|input|img)$/i.test(e.nodeName)))return;i.remove(e)}return e}}var i=this,o=i.createRng(),a,s,l;return e&&t?(o.setStart(e.parentNode,i.nodeIndex(e)),o.setEnd(t.parentNode,i.nodeIndex(t)),a=o.extractContents(),o=i.createRng(),o.setStart(t.parentNode,i.nodeIndex(t)+1),o.setEnd(e.parentNode,i.nodeIndex(e)+1),s=o.extractContents(),l=e.parentNode,l.insertBefore(r(a),e),n?l.replaceChild(n,t):l.insertBefore(t,e),l.insertBefore(r(s),e),i.remove(e),n||t):void 0},bind:function(e,t,n,r){var i=this;if(c.isArray(e)){for(var o=e.length;o--;)e[o]=i.bind(e[o],t,n,r);return e}return!i.settings.collect||e!==i.doc&&e!==i.win||i.boundEvents.push([e,t,n,r]),i.events.bind(e,t,n,r||i)},unbind:function(e,t,n){var r=this,i;if(c.isArray(e)){for(i=e.length;i--;)e[i]=r.unbind(e[i],t,n);return e}if(r.boundEvents&&(e===r.doc||e===r.win))for(i=r.boundEvents.length;i--;){var o=r.boundEvents[i];e!=o[0]||t&&t!=o[1]||n&&n!=o[2]||this.events.unbind(o[0],o[1],o[2])}return this.events.unbind(e,t,n)},fire:function(e,t,n){return this.events.fire(e,t,n)},getContentEditable:function(e){var t;return e&&1==e.nodeType?(t=e.getAttribute("data-mce-contenteditable"),t&&"inherit"!==t?t:"inherit"!==e.contentEditable?e.contentEditable:null):null},getContentEditableParent:function(e){for(var t=this.getRoot(),n=null;e&&e!==t&&(n=this.getContentEditable(e),null===n);e=e.parentNode);return n},destroy:function(){var t=this;if(t.boundEvents){for(var n=t.boundEvents.length;n--;){var r=t.boundEvents[n];this.events.unbind(r[0],r[1],r[2])}t.boundEvents=null}e.setDocument&&e.setDocument(),t.win=t.doc=t.root=t.events=t.frag=null},isChildOf:function(e,t){for(;e;){if(t===e)return!0;e=e.parentNode}return!1},dumpRng:function(e){return"startContainer: "+e.startContainer.nodeName+", startOffset: "+e.startOffset+", endContainer: "+e.endContainer.nodeName+", endOffset: "+e.endOffset},_findSib:function(e,t,n){var r=this,i=t;if(e)for("string"==typeof i&&(i=function(e){return r.is(e,t)}),e=e[n];e;e=e[n])if(i(e))return e;return null}},f.DOM=new f(document),f}),r(b,[y,d],function(e,t){function n(){function e(e,n){function i(){a.remove(l),s&&(s.onreadystatechange=s.onload=s=null),n()}function o(){"undefined"!=typeof console&&console.log&&console.log("Failed to load: "+e)}var a=r,s,l;l=a.uniqueId(),s=document.createElement("script"),s.id=l,s.type="text/javascript",s.src=t._addCacheSuffix(e),"onreadystatechange"in s?s.onreadystatechange=function(){/loaded|complete/.test(s.readyState)&&i()}:s.onload=i,s.onerror=o,(document.getElementsByTagName("head")[0]||document.body).appendChild(s)}var n=0,a=1,s=2,l={},c=[],u={},d=[],f=0,p;this.isDone=function(e){return l[e]==s},this.markDone=function(e){l[e]=s},this.add=this.load=function(e,t,r){var i=l[e];i==p&&(c.push(e),l[e]=n),t&&(u[e]||(u[e]=[]),u[e].push({func:t,scope:r||this}))},this.loadQueue=function(e,t){this.loadScripts(c,e,t)},this.loadScripts=function(t,n,r){function c(e){i(u[e],function(e){e.func.call(e.scope)}),u[e]=p}var h;d.push({func:n,scope:r||this}),(h=function(){var n=o(t);t.length=0,i(n,function(t){return l[t]==s?void c(t):void(l[t]!=a&&(l[t]=a,f++,e(t,function(){l[t]=s,f--,c(t),h()})))}),f||(i(d,function(e){e.func.call(e.scope)}),d.length=0)})()}}var r=e.DOM,i=t.each,o=t.grep;return n.ScriptLoader=new n,n}),r(C,[b,d],function(e,n){function r(){var e=this;e.items=[],e.urls={},e.lookup={}}var i=n.each;return r.prototype={get:function(e){return this.lookup[e]?this.lookup[e].instance:t},dependencies:function(e){var t;return this.lookup[e]&&(t=this.lookup[e].dependencies),t||[]},requireLangPack:function(t,n){var i=r.language;if(i&&r.languageLoad!==!1){if(n)if(n=","+n+",",-1!=n.indexOf(","+i.substr(0,2)+","))i=i.substr(0,2);else if(-1==n.indexOf(","+i+","))return;e.ScriptLoader.add(this.urls[t]+"/langs/"+i+".js")}},add:function(e,t,n){return this.items.push(t),this.lookup[e]={instance:t,dependencies:n},t},createUrl:function(e,t){return"object"==typeof t?t:{prefix:e.prefix,resource:t,suffix:e.suffix}},addComponents:function(t,n){var r=this.urls[t];i(n,function(t){e.ScriptLoader.add(r+"/"+t)})},load:function(n,o,a,s){function l(){var r=c.dependencies(n);i(r,function(e){var n=c.createUrl(o,e);c.load(n.resource,n,t,t)}),a&&a.call(s?s:e)}var c=this,u=o;c.urls[n]||("object"==typeof o&&(u=o.prefix+o.resource+o.suffix),0!==u.indexOf("/")&&-1==u.indexOf("://")&&(u=r.baseURL+"/"+u),c.urls[n]=u.substring(0,u.lastIndexOf("/")),c.lookup[n]?l():e.ScriptLoader.add(u,l,s))}},r.PluginManager=new r,r.ThemeManager=new r,r}),r(x,[d,h],function(e,t){function n(e,t){var n=e.childNodes;return t--,t>n.length-1?t=n.length-1:0>t&&(t=0),n[t]||e}function r(e){this.walk=function(t,r){function o(e){var t;return t=e[0],3===t.nodeType&&t===c&&u>=t.nodeValue.length&&e.splice(0,1),t=e[e.length-1],0===f&&e.length>0&&t===d&&3===t.nodeType&&e.splice(e.length-1,1),e}function a(e,t,n){for(var r=[];e&&e!=n;e=e[t])r.push(e);return r}function s(e,t){do{if(e.parentNode==t)return e;e=e.parentNode}while(e)}function l(e,t,n){var i=n?"nextSibling":"previousSibling";for(g=e,v=g.parentNode;g&&g!=t;g=v)v=g.parentNode,y=a(g==e?g:g[i],i),y.length&&(n||y.reverse(),r(o(y)))}var c=t.startContainer,u=t.startOffset,d=t.endContainer,f=t.endOffset,p,h,m,g,v,y,b;if(b=e.select("td.mce-item-selected,th.mce-item-selected"),b.length>0)return void i(b,function(e){r([e])});if(1==c.nodeType&&c.hasChildNodes()&&(c=c.childNodes[u]),1==d.nodeType&&d.hasChildNodes()&&(d=n(d,f)),c==d)return r(o([c]));for(p=e.findCommonAncestor(c,d),g=c;g;g=g.parentNode){if(g===d)return l(c,p,!0);if(g===p)break}for(g=d;g;g=g.parentNode){if(g===c)return l(d,p);if(g===p)break}h=s(c,p)||c,m=s(d,p)||d,l(c,h,!0),y=a(h==c?h:h.nextSibling,"nextSibling",m==d?m.nextSibling:m),y.length&&r(o(y)),l(d,m)},this.split=function(e){function t(e,t){return e.splitText(t)}var n=e.startContainer,r=e.startOffset,i=e.endContainer,o=e.endOffset;return n==i&&3==n.nodeType?r>0&&r<n.nodeValue.length&&(i=t(n,r),n=i.previousSibling,o>r?(o-=r,n=i=t(i,o).previousSibling,o=i.nodeValue.length,r=0):o=0):(3==n.nodeType&&r>0&&r<n.nodeValue.length&&(n=t(n,r),r=0),3==i.nodeType&&o>0&&o<i.nodeValue.length&&(i=t(i,o).previousSibling,o=i.nodeValue.length)),{startContainer:n,startOffset:r,endContainer:i,endOffset:o}},this.normalize=function(n){function r(r){function a(n,r){for(var i=new t(n,e.getParent(n.parentNode,e.isBlock)||f);n=i[r?"prev":"next"]();)if("BR"===n.nodeName)return!0}function s(e,t){return e.previousSibling&&e.previousSibling.nodeName==t}function l(n,r){var a,s,l;if(r=r||c,l=e.getParent(r.parentNode,e.isBlock)||f,n&&"BR"==r.nodeName&&g&&e.isEmpty(l))return c=r.parentNode,u=e.nodeIndex(r),void(i=!0);for(a=new t(r,l);p=a[n?"prev":"next"]();){if("false"===e.getContentEditableParent(p))return;if(3===p.nodeType&&p.nodeValue.length>0)return c=p,u=n?p.nodeValue.length:0,void(i=!0);if(e.isBlock(p)||h[p.nodeName.toLowerCase()])return;s=p}o&&s&&(c=s,i=!0,u=0)}var c,u,d,f=e.getRoot(),p,h,m,g;if(c=n[(r?"start":"end")+"Container"],u=n[(r?"start":"end")+"Offset"],g=1==c.nodeType&&u===c.childNodes.length,h=e.schema.getNonEmptyElements(),m=r,1==c.nodeType&&u>c.childNodes.length-1&&(m=!1),9===c.nodeType&&(c=e.getRoot(),u=0),c===f){if(m&&(p=c.childNodes[u>0?u-1:0],p&&(h[p.nodeName]||"TABLE"==p.nodeName)))return;if(c.hasChildNodes()&&(u=Math.min(!m&&u>0?u-1:u,c.childNodes.length-1),c=c.childNodes[u],u=0,c.hasChildNodes()&&!/TABLE/.test(c.nodeName))){p=c,d=new t(c,f);do{if(3===p.nodeType&&p.nodeValue.length>0){u=m?0:p.nodeValue.length,c=p,i=!0;break}if(h[p.nodeName.toLowerCase()]){u=e.nodeIndex(p),c=p.parentNode,"IMG"!=p.nodeName||m||u++,i=!0;break}}while(p=m?d.next():d.prev())}}o&&(3===c.nodeType&&0===u&&l(!0),1===c.nodeType&&(p=c.childNodes[u],p||(p=c.childNodes[u-1]),!p||"BR"!==p.nodeName||s(p,"A")||a(p)||a(p,!0)||l(!0,p))),m&&!o&&3===c.nodeType&&u===c.nodeValue.length&&l(!1),i&&n["set"+(r?"Start":"End")](c,u)}var i,o;return o=n.collapsed,r(!0),o||r(),i&&o&&n.collapse(!0),i}}var i=e.each;return r.compareRanges=function(e,t){if(e&&t){if(!e.item&&!e.duplicate)return e.startContainer==t.startContainer&&e.startOffset==t.startOffset;if(e.item&&t.item&&e.item(0)===t.item(0))return!0;if(e.isEqual&&t.isEqual&&t.isEqual(e))return!0}return!1},r.getCaretRangeFromPoint=function(e,t,n){var r,i;if(n.caretPositionFromPoint)i=n.caretPositionFromPoint(e,t),r=n.createRange(),r.setStart(i.offsetNode,i.offset),r.collapse(!0);else if(n.caretRangeFromPoint)r=n.caretRangeFromPoint(e,t);else if(n.body.createTextRange){r=n.body.createTextRange();try{r.moveToPoint(e,t),r.collapse(!0)}catch(o){r.collapse(t<n.body.clientHeight)}}return r},r.getNode=function(e,t){return 1==e.nodeType&&e.hasChildNodes()&&(t>=e.childNodes.length&&(t=e.childNodes.length-1),e=e.childNodes[t]),e},r}),r(w,[x,u],function(e,t){return function(n){function r(e){var t,r;if(r=n.$(e).parentsUntil(n.getBody()).add(e),r.length===o.length){for(t=r.length;t>=0&&r[t]===o[t];t--);if(-1===t)return o=r,!0}return o=r,!1}var i,o=[];"onselectionchange"in n.getDoc()||n.on("NodeChange Click MouseUp KeyUp Focus",function(t){var r,o;r=n.selection.getRng(),o={startContainer:r.startContainer,startOffset:r.startOffset,endContainer:r.endContainer,endOffset:r.endOffset},"nodechange"!=t.type&&e.compareRanges(o,i)||n.fire("SelectionChange"),i=o}),n.on("contextmenu",function(){n.fire("SelectionChange")}),n.on("SelectionChange",function(){var e=n.selection.getStart(!0);(t.range||!n.selection.isCollapsed())&&!r(e)&&n.dom.isChildOf(e,n.getBody())&&n.nodeChanged({selectionChange:!0})}),n.on("MouseUp",function(e){e.isDefaultPrevented()||("IMG"==n.selection.getNode().nodeName?setTimeout(function(){n.nodeChanged()},0):n.nodeChanged())}),this.nodeChanged=function(e){var t=n.selection,r,i,o;n.initialized&&t&&!n.settings.disable_nodechange&&!n.settings.readonly&&(o=n.getBody(),r=t.getStart()||o,r=r.ownerDocument!=n.getDoc()?n.getBody():r,"IMG"==r.nodeName&&t.isCollapsed()&&(r=r.parentNode),i=[],n.dom.getParent(r,function(e){return e===o?!0:void i.push(e)}),e=e||{},e.element=r,e.parents=i,n.fire("NodeChange",e))}}}),r(_,[],function(){function e(e,t,n){var r,i,o=n?"lastChild":"firstChild",a=n?"prev":"next";if(e[o])return e[o];if(e!==t){if(r=e[a])return r;for(i=e.parent;i&&i!==t;i=i.parent)if(r=i[a])return r}}function t(e,t){this.name=e,this.type=t,1===t&&(this.attributes=[],this.attributes.map={})}var n=/^[ \t\r\n]*$/,r={"#text":3,"#comment":8,"#cdata":4,"#pi":7,"#doctype":10,"#document-fragment":11};return t.prototype={replace:function(e){var t=this;return e.parent&&e.remove(),t.insert(e,t),t.remove(),t},attr:function(e,t){var n=this,r,i,o;if("string"!=typeof e){for(i in e)n.attr(i,e[i]);return n}if(r=n.attributes){if(t!==o){if(null===t){if(e in r.map)for(delete r.map[e],i=r.length;i--;)if(r[i].name===e)return r=r.splice(i,1),n;return n}if(e in r.map){for(i=r.length;i--;)if(r[i].name===e){r[i].value=t;break}}else r.push({name:e,value:t});return r.map[e]=t,n}return r.map[e]}},clone:function(){var e=this,n=new t(e.name,e.type),r,i,o,a,s;if(o=e.attributes){for(s=[],s.map={},r=0,i=o.length;i>r;r++)a=o[r],"id"!==a.name&&(s[s.length]={name:a.name,value:a.value},s.map[a.name]=a.value);n.attributes=s}return n.value=e.value,n.shortEnded=e.shortEnded,n},wrap:function(e){var t=this;return t.parent.insert(e,t),e.append(t),t},unwrap:function(){var e=this,t,n;for(t=e.firstChild;t;)n=t.next,e.insert(t,e,!0),t=n;e.remove()},remove:function(){var e=this,t=e.parent,n=e.next,r=e.prev;return t&&(t.firstChild===e?(t.firstChild=n,n&&(n.prev=null)):r.next=n,t.lastChild===e?(t.lastChild=r,r&&(r.next=null)):n.prev=r,e.parent=e.next=e.prev=null),e},append:function(e){var t=this,n;return e.parent&&e.remove(),n=t.lastChild,n?(n.next=e,e.prev=n,t.lastChild=e):t.lastChild=t.firstChild=e,e.parent=t,e},insert:function(e,t,n){var r;return e.parent&&e.remove(),r=t.parent||this,n?(t===r.firstChild?r.firstChild=e:t.prev.next=e,e.prev=t.prev,e.next=t,t.prev=e):(t===r.lastChild?r.lastChild=e:t.next.prev=e,e.next=t.next,e.prev=t,t.next=e),e.parent=r,e},getAll:function(t){var n=this,r,i=[];for(r=n.firstChild;r;r=e(r,n))r.name===t&&i.push(r);return i},empty:function(){var t=this,n,r,i;if(t.firstChild){for(n=[],i=t.firstChild;i;i=e(i,t))n.push(i);for(r=n.length;r--;)i=n[r],i.parent=i.firstChild=i.lastChild=i.next=i.prev=null}return t.firstChild=t.lastChild=null,t},isEmpty:function(t){var r=this,i=r.firstChild,o,a;if(i)do{if(1===i.type){if(i.attributes.map["data-mce-bogus"])continue;if(t[i.name])return!1;for(o=i.attributes.length;o--;)if(a=i.attributes[o].name,"name"===a||0===a.indexOf("data-mce-bookmark"))return!1}if(8===i.type)return!1;if(3===i.type&&!n.test(i.value))return!1}while(i=e(i,r));return!0},walk:function(t){return e(this,null,t)}},t.create=function(e,n){var i,o;if(i=new t(e,r[e]||1),n)for(o in n)i.attr(o,n[o]);return i},t}),r(E,[d],function(e){function t(e,t){return e?e.split(t||" "):[]}function n(e){function n(e,n,r){function i(e,t){var n={},r,i;for(r=0,i=e.length;i>r;r++)n[e[r]]=t||{};return n}var s,c,u,d=arguments;for(r=r||[],n=n||"","string"==typeof r&&(r=t(r)),c=3;c<d.length;c++)"string"==typeof d[c]&&(d[c]=t(d[c])),r.push.apply(r,d[c]);for(e=t(e),s=e.length;s--;)u=[].concat(l,t(n)),a[e[s]]={attributes:i(u),attributesOrder:u,children:i(r,o)}}function r(e,n){var r,i,o,s;for(e=t(e),r=e.length,n=t(n);r--;)for(i=a[e[r]],o=0,s=n.length;s>o;o++)i.attributes[n[o]]={},i.attributesOrder.push(n[o])}var a={},l,c,u,d,f,p;return i[e]?i[e]:(l=t("id accesskey class dir lang style tabindex title"),c=t("address blockquote div dl fieldset form h1 h2 h3 h4 h5 h6 hr menu ol p pre table ul"),u=t("a abbr b bdo br button cite code del dfn em embed i iframe img input ins kbd label map noscript object q s samp script select small span strong sub sup textarea u var #text #comment"),"html4"!=e&&(l.push.apply(l,t("contenteditable contextmenu draggable dropzone hidden spellcheck translate")),c.push.apply(c,t("article aside details dialog figure header footer hgroup section nav")),u.push.apply(u,t("audio canvas command datalist mark meter output progress time wbr video ruby bdi keygen"))),"html5-strict"!=e&&(l.push("xml:lang"),p=t("acronym applet basefont big font strike tt"),u.push.apply(u,p),s(p,function(e){n(e,"",u)}),f=t("center dir isindex noframes"),c.push.apply(c,f),d=[].concat(c,u),s(f,function(e){n(e,"",d)})),d=d||[].concat(c,u),n("html","manifest","head body"),n("head","","base command link meta noscript script style title"),n("title hr noscript br"),n("base","href target"),n("link","href rel media hreflang type sizes hreflang"),n("meta","name http-equiv content charset"),n("style","media type scoped"),n("script","src async defer type charset"),n("body","onafterprint onbeforeprint onbeforeunload onblur onerror onfocus onhashchange onload onmessage onoffline ononline onpagehide onpageshow onpopstate onresize onscroll onstorage onunload",d),n("address dt dd div caption","",d),n("h1 h2 h3 h4 h5 h6 pre p abbr code var samp kbd sub sup i b u bdo span legend em strong small s cite dfn","",u),n("blockquote","cite",d),n("ol","reversed start type","li"),n("ul","","li"),n("li","value",d),n("dl","","dt dd"),n("a","href target rel media hreflang type",u),n("q","cite",u),n("ins del","cite datetime",d),n("img","src sizes srcset alt usemap ismap width height"),n("iframe","src name width height",d),n("embed","src type width height"),n("object","data type typemustmatch name usemap form width height",d,"param"),n("param","name value"),n("map","name",d,"area"),n("area","alt coords shape href target rel media hreflang type"),n("table","border","caption colgroup thead tfoot tbody tr"+("html4"==e?" col":"")),n("colgroup","span","col"),n("col","span"),n("tbody thead tfoot","","tr"),n("tr","","td th"),n("td","colspan rowspan headers",d),n("th","colspan rowspan headers scope abbr",d),n("form","accept-charset action autocomplete enctype method name novalidate target",d),n("fieldset","disabled form name",d,"legend"),n("label","form for",u),n("input","accept alt autocomplete checked dirname disabled form formaction formenctype formmethod formnovalidate formtarget height list max maxlength min multiple name pattern readonly required size src step type value width"),n("button","disabled form formaction formenctype formmethod formnovalidate formtarget name type value","html4"==e?d:u),n("select","disabled form multiple name required size","option optgroup"),n("optgroup","disabled label","option"),n("option","disabled label selected value"),n("textarea","cols dirname disabled form maxlength name readonly required rows wrap"),n("menu","type label",d,"li"),n("noscript","",d),"html4"!=e&&(n("wbr"),n("ruby","",u,"rt rp"),n("figcaption","",d),n("mark rt rp summary bdi","",u),n("canvas","width height",d),n("video","src crossorigin poster preload autoplay mediagroup loop muted controls width height buffered",d,"track source"),n("audio","src crossorigin preload autoplay mediagroup loop muted controls buffered volume",d,"track source"),n("picture","","img source"),n("source","src srcset type media sizes"),n("track","kind src srclang label default"),n("datalist","",u,"option"),n("article section nav aside header footer","",d),n("hgroup","","h1 h2 h3 h4 h5 h6"),n("figure","",d,"figcaption"),n("time","datetime",u),n("dialog","open",d),n("command","type label icon disabled checked radiogroup command"),n("output","for form name",u),n("progress","value max",u),n("meter","value min max low high optimum",u),n("details","open",d,"summary"),n("keygen","autofocus challenge disabled form keytype name")),"html5-strict"!=e&&(r("script","language xml:space"),r("style","xml:space"),r("object","declare classid code codebase codetype archive standby align border hspace vspace"),r("embed","align name hspace vspace"),r("param","valuetype type"),r("a","charset name rev shape coords"),r("br","clear"),r("applet","codebase archive code object alt name width height align hspace vspace"),r("img","name longdesc align border hspace vspace"),r("iframe","longdesc frameborder marginwidth marginheight scrolling align"),r("font basefont","size color face"),r("input","usemap align"),r("select","onchange"),r("textarea"),r("h1 h2 h3 h4 h5 h6 div p legend caption","align"),r("ul","type compact"),r("li","type"),r("ol dl menu dir","compact"),r("pre","width xml:space"),r("hr","align noshade size width"),r("isindex","prompt"),r("table","summary width frame rules cellspacing cellpadding align bgcolor"),r("col","width align char charoff valign"),r("colgroup","width align char charoff valign"),r("thead","align char charoff valign"),r("tr","align char charoff valign bgcolor"),r("th","axis align char charoff valign nowrap bgcolor width height"),r("form","accept"),r("td","abbr axis scope align char charoff valign nowrap bgcolor width height"),r("tfoot","align char charoff valign"),r("tbody","align char charoff valign"),r("area","nohref"),r("body","background bgcolor text link vlink alink")),"html4"!=e&&(r("input button select textarea","autofocus"),r("input textarea","placeholder"),r("a","download"),r("link script img","crossorigin"),r("iframe","sandbox seamless allowfullscreen")),s(t("a form meter progress dfn"),function(e){a[e]&&delete a[e].children[e]}),delete a.caption.children.table,i[e]=a,a)}function r(e,t){var n;return e&&(n={},"string"==typeof e&&(e={"*":e}),s(e,function(e,r){n[r]=n[r.toUpperCase()]="map"==t?a(e,/[, ]/):c(e,/[, ]/)})),n}var i={},o={},a=e.makeMap,s=e.each,l=e.extend,c=e.explode,u=e.inArray;return function(e){function o(t,n,r){var o=e[t];return o?o=a(o,/[, ]/,a(o.toUpperCase(),/[, ]/)):(o=i[t],o||(o=a(n," ",a(n.toUpperCase()," ")),o=l(o,r),i[t]=o)),o}function d(e){return new RegExp("^"+e.replace(/([?+*])/g,".$1")+"$")}function f(e){var n,r,i,o,s,l,c,f,p,h,m,g,v,b,x,w,_,E,N,k=/^([#+\-])?([^\[!\/]+)(?:\/([^\[!]+))?(?:(!?)\[([^\]]+)\])?$/,S=/^([!\-])?(\w+::\w+|[^=:<]+)?(?:([=:<])(.*))?$/,T=/[*?+]/;if(e)for(e=t(e,","),y["@"]&&(w=y["@"].attributes,_=y["@"].attributesOrder),n=0,r=e.length;r>n;n++)if(s=k.exec(e[n])){if(b=s[1],p=s[2],x=s[3],f=s[5],g={},v=[],l={attributes:g,attributesOrder:v},"#"===b&&(l.paddEmpty=!0),"-"===b&&(l.removeEmpty=!0),"!"===s[4]&&(l.removeEmptyAttrs=!0),w){for(E in w)g[E]=w[E];v.push.apply(v,_)}if(f)for(f=t(f,"|"),i=0,o=f.length;o>i;i++)if(s=S.exec(f[i])){if(c={},m=s[1],h=s[2].replace(/::/g,":"),b=s[3],N=s[4],"!"===m&&(l.attributesRequired=l.attributesRequired||[],l.attributesRequired.push(h),c.required=!0),"-"===m){delete g[h],v.splice(u(v,h),1);continue}b&&("="===b&&(l.attributesDefault=l.attributesDefault||[],l.attributesDefault.push({name:h,value:N}),c.defaultValue=N),":"===b&&(l.attributesForced=l.attributesForced||[],l.attributesForced.push({name:h,value:N}),c.forcedValue=N),"<"===b&&(c.validValues=a(N,"?"))),T.test(h)?(l.attributePatterns=l.attributePatterns||[],c.pattern=d(h),l.attributePatterns.push(c)):(g[h]||v.push(h),g[h]=c)}w||"@"!=p||(w=g,_=v),x&&(l.outputName=p,y[x]=l),T.test(p)?(l.pattern=d(p),C.push(l)):y[p]=l}}function p(e){y={},C=[],f(e),s(_,function(e,t){b[t]=e.children})}function h(e){var n=/^(~)?(.+)$/;e&&(i.text_block_elements=i.block_elements=null,s(t(e,","),function(e){var t=n.exec(e),r="~"===t[1],i=r?"span":"div",o=t[2];if(b[o]=b[i],M[o]=i,r||(R[o.toUpperCase()]={},R[o]={}),!y[o]){var a=y[i];a=l({},a),delete a.removeEmptyAttrs,delete a.removeEmpty,y[o]=a}s(b,function(e,t){e[i]&&(b[t]=e=l({},b[t]),e[o]=e[i])})}))}function m(e){var n=/^([+\-]?)(\w+)\[([^\]]+)\]$/;e&&s(t(e,","),function(e){var r=n.exec(e),i,o;r&&(o=r[1],i=o?b[r[2]]:b[r[2]]={"#comment":{}},i=b[r[2]],s(t(r[3],"|"),function(e){"-"===o?(b[r[2]]=i=l({},b[r[2]]),delete i[e]):i[e]={}}))})}function g(e){var t=y[e],n;if(t)return t;for(n=C.length;n--;)if(t=C[n],t.pattern.test(e))return t}var v=this,y={},b={},C=[],x,w,_,E,N,k,S,T,R,A,B,D,L,M={},H={};e=e||{},_=n(e.schema),e.verify_html===!1&&(e.valid_elements="*[*]"),x=r(e.valid_styles),w=r(e.invalid_styles,"map"),T=r(e.valid_classes,"map"),E=o("whitespace_elements","pre script noscript style textarea video audio iframe object"),N=o("self_closing_elements","colgroup dd dt li option p td tfoot th thead tr"),k=o("short_ended_elements","area base basefont br col frame hr img input isindex link meta param embed source wbr track"),S=o("boolean_attributes","checked compact declare defer disabled ismap multiple nohref noresize noshade nowrap readonly selected autoplay loop controls"),A=o("non_empty_elements","td th iframe video audio object script",k),B=o("move_caret_before_on_enter_elements","table",A),D=o("text_block_elements","h1 h2 h3 h4 h5 h6 p div address pre form blockquote center dir fieldset header footer article section hgroup aside nav figure"),R=o("block_elements","hr table tbody thead tfoot th tr td li ol ul caption dl dt dd noscript menu isindex option datalist select optgroup",D),L=o("text_inline_elements","span strong b em i font strike u var cite dfn code mark q sup sub samp"),s((e.special||"script noscript style textarea").split(" "),function(e){H[e]=new RegExp("</"+e+"[^>]*>","gi")}),e.valid_elements?p(e.valid_elements):(s(_,function(e,t){y[t]={attributes:e.attributes,attributesOrder:e.attributesOrder},b[t]=e.children}),"html5"!=e.schema&&s(t("strong/b em/i"),function(e){e=t(e,"/"),y[e[1]].outputName=e[0]}),y.img.attributesDefault=[{name:"alt",value:""}],s(t("ol ul sub sup blockquote span font a table tbody tr strong em b i"),function(e){y[e]&&(y[e].removeEmpty=!0)}),s(t("p h1 h2 h3 h4 h5 h6 th td pre div address caption"),function(e){y[e].paddEmpty=!0}),s(t("span"),function(e){y[e].removeEmptyAttrs=!0})),h(e.custom_elements),m(e.valid_children),f(e.extended_valid_elements),m("+ol[ul|ol],+ul[ul|ol]"),e.invalid_elements&&s(c(e.invalid_elements),function(e){y[e]&&delete y[e]}),g("span")||f("span[!data-mce-type|*]"),v.children=b,v.getValidStyles=function(){return x},v.getInvalidStyles=function(){return w},v.getValidClasses=function(){return T},v.getBoolAttrs=function(){return S},v.getBlockElements=function(){return R},v.getTextBlockElements=function(){return D},v.getTextInlineElements=function(){return L},v.getShortEndedElements=function(){return k},v.getSelfClosingElements=function(){return N},v.getNonEmptyElements=function(){return A},v.getMoveCaretBeforeOnEnterElements=function(){return B},v.getWhiteSpaceElements=function(){return E},v.getSpecialElements=function(){return H},v.isValidChild=function(e,t){var n=b[e];return!(!n||!n[t])},v.isValid=function(e,t){var n,r,i=g(e);if(i){if(!t)return!0;if(i.attributes[t])return!0;if(n=i.attributePatterns)for(r=n.length;r--;)if(n[r].pattern.test(e))return!0}return!1},v.getElementRule=g,v.getCustomElements=function(){return M},v.addValidElements=f,v.setValidElements=p,v.addCustomElements=h,v.addValidChildren=m,v.elements=y}}),r(N,[E,g,d],function(e,t,n){function r(e,t,n){var r=1,i,o,a,s;for(s=e.getShortEndedElements(),a=/<([!?\/])?([A-Za-z0-9\-_\:\.]+)((?:\s+[^"\'>]+(?:(?:"[^"]*")|(?:\'[^\']*\')|[^>]*))*|\/|\s+)>/g,a.lastIndex=i=n;o=a.exec(t);){if(i=a.lastIndex,"/"===o[1])r--;else if(!o[1]){if(o[2]in s)continue;r++}if(0===r)break}return i}function i(i,a){function s(){}var l=this;i=i||{},l.schema=a=a||new e,i.fix_self_closing!==!1&&(i.fix_self_closing=!0),o("comment cdata text start end pi doctype".split(" "),function(e){e&&(l[e]=i[e]||s)}),l.parse=function(e){function o(e){var t,n;for(t=p.length;t--&&p[t].name!==e;);if(t>=0){for(n=p.length-1;n>=t;n--)e=p[n],e.valid&&l.end(e.name);p.length=t}}function s(e,t,n,r,o){var a,s,l=/[\s\u0000-\u001F]+/g;if(t=t.toLowerCase(),n=t in x?t:z(n||r||o||""),_&&!y&&0!==t.indexOf("data-")){if(a=T[t],!a&&R){for(s=R.length;s--&&(a=R[s],!a.pattern.test(t)););-1===s&&(a=null)}if(!a)return;if(a.validValues&&!(n in a.validValues))return}if(V[t]&&!i.allow_script_urls){var c=n.replace(l,"");try{c=decodeURIComponent(c)}catch(u){c=unescape(c)}if(U.test(c))return;if(!i.allow_html_data_urls&&$.test(c)&&!/^data:image\//i.test(c))return}h.map[t]=n,h.push({name:t,value:n})}var l=this,c,u=0,d,f,p=[],h,m,g,v,y,b,C,x,w,_,E,N,k,S,T,R,A,B,D,L,M,H,P,O,I,F=0,z=t.decode,W,V=n.makeMap("src,href,data,background,formaction,poster"),U=/((java|vb)script|mhtml):/i,$=/^data:/i;for(H=new RegExp("<(?:(?:!--([\\w\\W]*?)-->)|(?:!\\[CDATA\\[([\\w\\W]*?)\\]\\]>)|(?:!DOCTYPE([\\w\\W]*?)>)|(?:\\?([^\\s\\/<>]+) ?([\\w\\W]*?)[?/]>)|(?:\\/([^>]+)>)|(?:([A-Za-z0-9\\-_\\:\\.]+)((?:\\s+[^\"'>]+(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>]*))*|\\/|\\s+)>))","g"),P=/([\w:\-]+)(?:\s*=\s*(?:(?:\"((?:[^\"])*)\")|(?:\'((?:[^\'])*)\')|([^>\s]+)))?/g,C=a.getShortEndedElements(),M=i.self_closing_elements||a.getSelfClosingElements(),x=a.getBoolAttrs(),_=i.validate,b=i.remove_internals,W=i.fix_self_closing,O=a.getSpecialElements();c=H.exec(e);){if(u<c.index&&l.text(z(e.substr(u,c.index-u))),d=c[6])d=d.toLowerCase(),":"===d.charAt(0)&&(d=d.substr(1)),o(d);else if(d=c[7]){if(d=d.toLowerCase(),":"===d.charAt(0)&&(d=d.substr(1)),w=d in C,W&&M[d]&&p.length>0&&p[p.length-1].name===d&&o(d),!_||(E=a.getElementRule(d))){if(N=!0,_&&(T=E.attributes,R=E.attributePatterns),(S=c[8])?(y=-1!==S.indexOf("data-mce-type"),y&&b&&(N=!1),h=[],h.map={},S.replace(P,s)):(h=[],h.map={}),_&&!y){if(A=E.attributesRequired,B=E.attributesDefault,D=E.attributesForced,L=E.removeEmptyAttrs,L&&!h.length&&(N=!1),D)for(m=D.length;m--;)k=D[m],v=k.name,I=k.value,"{$uid}"===I&&(I="mce_"+F++),h.map[v]=I,h.push({name:v,value:I});if(B)for(m=B.length;m--;)k=B[m],v=k.name,v in h.map||(I=k.value,"{$uid}"===I&&(I="mce_"+F++),h.map[v]=I,h.push({name:v,value:I}));if(A){for(m=A.length;m--&&!(A[m]in h.map););-1===m&&(N=!1)}if(k=h.map["data-mce-bogus"]){if("all"===k){u=r(a,e,H.lastIndex),H.lastIndex=u;continue}N=!1}}N&&l.start(d,h,w)}else N=!1;if(f=O[d]){f.lastIndex=u=c.index+c[0].length,(c=f.exec(e))?(N&&(g=e.substr(u,c.index-u)),u=c.index+c[0].length):(g=e.substr(u),u=e.length),N&&(g.length>0&&l.text(g,!0),l.end(d)),H.lastIndex=u;continue}w||(S&&S.indexOf("/")==S.length-1?N&&l.end(d):p.push({name:d,valid:N}))}else(d=c[1])?(">"===d.charAt(0)&&(d=" "+d),i.allow_conditional_comments||"[if"!==d.substr(0,3)||(d=" "+d),l.comment(d)):(d=c[2])?l.cdata(d):(d=c[3])?l.doctype(d):(d=c[4])&&l.pi(d,c[5]);u=c.index+c[0].length}for(u<e.length&&l.text(z(e.substr(u))),m=p.length-1;m>=0;m--)d=p[m],d.valid&&l.end(d.name)}}var o=n.each;return i.findEndTag=r,i}),r(k,[_,E,N,d],function(e,t,n,r){var i=r.makeMap,o=r.each,a=r.explode,s=r.extend;return function(r,l){function c(t){var n,r,o,a,s,c,d,f,p,h,m,g,v,y;for(m=i("tr,td,th,tbody,thead,tfoot,table"),h=l.getNonEmptyElements(),g=l.getTextBlockElements(),n=0;n<t.length;n++)if(r=t[n],r.parent&&!r.fixed)if(g[r.name]&&"li"==r.parent.name){for(v=r.next;v&&g[v.name];)v.name="li",v.fixed=!0,r.parent.insert(v,r.parent),v=v.next;r.unwrap(r)}else{for(a=[r],o=r.parent;o&&!l.isValidChild(o.name,r.name)&&!m[o.name];o=o.parent)a.push(o);if(o&&a.length>1){for(a.reverse(),s=c=u.filterNode(a[0].clone()),p=0;p<a.length-1;p++){for(l.isValidChild(c.name,a[p].name)?(d=u.filterNode(a[p].clone()),c.append(d)):d=c,f=a[p].firstChild;f&&f!=a[p+1];)y=f.next,d.append(f),f=y;c=d}s.isEmpty(h)?o.insert(r,a[0],!0):(o.insert(s,a[0],!0),o.insert(r,s)),o=a[0],(o.isEmpty(h)||o.firstChild===o.lastChild&&"br"===o.firstChild.name)&&o.empty().remove()}else if(r.parent){if("li"===r.name){if(v=r.prev,v&&("ul"===v.name||"ul"===v.name)){v.append(r);continue}if(v=r.next,v&&("ul"===v.name||"ul"===v.name)){v.insert(r,v.firstChild,!0);continue}r.wrap(u.filterNode(new e("ul",1)));continue}l.isValidChild(r.parent.name,"div")&&l.isValidChild("div",r.name)?r.wrap(u.filterNode(new e("div",1))):"style"===r.name||"script"===r.name?r.empty().remove():r.unwrap()}}}var u=this,d={},f=[],p={},h={};r=r||{},r.validate="validate"in r?r.validate:!0,r.root_name=r.root_name||"body",u.schema=l=l||new t,u.filterNode=function(e){var t,n,r;n in d&&(r=p[n],r?r.push(e):p[n]=[e]),t=f.length;for(;t--;)n=f[t].name,n in e.attributes.map&&(r=h[n],r?r.push(e):h[n]=[e]);return e},u.addNodeFilter=function(e,t){o(a(e),function(e){var n=d[e];n||(d[e]=n=[]),n.push(t)})},u.addAttributeFilter=function(e,t){o(a(e),function(e){var n;for(n=0;n<f.length;n++)if(f[n].name===e)return void f[n].callbacks.push(t);f.push({name:e,callbacks:[t]})})},u.parse=function(t,o){function a(){function e(e){e&&(t=e.firstChild,t&&3==t.type&&(t.value=t.value.replace(R,"")),t=e.lastChild,t&&3==t.type&&(t.value=t.value.replace(D,"")))}var t=y.firstChild,n,i;if(l.isValidChild(y.name,I.toLowerCase())){for(;t;)n=t.next,3==t.type||1==t.type&&"p"!==t.name&&!T[t.name]&&!t.attr("data-mce-type")?i?i.append(t):(i=u(I,1),i.attr(r.forced_root_block_attrs),y.insert(i,t),i.append(t)):(e(i),i=null),t=n;e(i)}}function u(t,n){var r=new e(t,n),i;return t in d&&(i=p[t],i?i.push(r):p[t]=[r]),r}function m(e){var t,n,r;for(t=e.prev;t&&3===t.type;)n=t.value.replace(D,""),n.length>0?(t.value=n,t=t.prev):(r=t.prev,t.remove(),t=r)}function g(e){var t,n={};for(t in e)"li"!==t&&"p"!=t&&(n[t]=e[t]);return n}var v,y,b,C,x,w,_,E,N,k,S,T,R,A=[],B,D,L,M,H,P,O,I;if(o=o||{},p={},h={},T=s(i("script,style,head,html,body,title,meta,param"),l.getBlockElements()),O=l.getNonEmptyElements(),P=l.children,S=r.validate,I="forced_root_block"in o?o.forced_root_block:r.forced_root_block,H=l.getWhiteSpaceElements(),R=/^[ \t\r\n]+/,D=/[ \t\r\n]+$/,L=/[ \t\r\n]+/g,M=/^[ \t\r\n]+$/,v=new n({validate:S,allow_script_urls:r.allow_script_urls,allow_conditional_comments:r.allow_conditional_comments,self_closing_elements:g(l.getSelfClosingElements()),cdata:function(e){b.append(u("#cdata",4)).value=e},text:function(e,t){var n;B||(e=e.replace(L," "),b.lastChild&&T[b.lastChild.name]&&(e=e.replace(R,""))),0!==e.length&&(n=u("#text",3),n.raw=!!t,b.append(n).value=e)},comment:function(e){b.append(u("#comment",8)).value=e},pi:function(e,t){b.append(u(e,7)).value=t,m(b)},doctype:function(e){var t;t=b.append(u("#doctype",10)),t.value=e,m(b)},start:function(e,t,n){var r,i,o,a,s;if(o=S?l.getElementRule(e):{}){for(r=u(o.outputName||e,1),r.attributes=t,r.shortEnded=n,b.append(r),s=P[b.name],s&&P[r.name]&&!s[r.name]&&A.push(r),i=f.length;i--;)a=f[i].name,a in t.map&&(N=h[a],N?N.push(r):h[a]=[r]);
T[e]&&m(r),n||(b=r),!B&&H[e]&&(B=!0)}},end:function(t){var n,r,i,o,a;if(r=S?l.getElementRule(t):{}){if(T[t]&&!B){if(n=b.firstChild,n&&3===n.type)if(i=n.value.replace(R,""),i.length>0)n.value=i,n=n.next;else for(o=n.next,n.remove(),n=o;n&&3===n.type;)i=n.value,o=n.next,(0===i.length||M.test(i))&&(n.remove(),n=o),n=o;if(n=b.lastChild,n&&3===n.type)if(i=n.value.replace(D,""),i.length>0)n.value=i,n=n.prev;else for(o=n.prev,n.remove(),n=o;n&&3===n.type;)i=n.value,o=n.prev,(0===i.length||M.test(i))&&(n.remove(),n=o),n=o}if(B&&H[t]&&(B=!1),(r.removeEmpty||r.paddEmpty)&&b.isEmpty(O))if(r.paddEmpty)b.empty().append(new e("#text","3")).value="\xa0";else if(!b.attributes.map.name&&!b.attributes.map.id)return a=b.parent,T[b.name]?b.empty().remove():b.unwrap(),void(b=a);b=b.parent}}},l),y=b=new e(o.context||r.root_name,11),v.parse(t),S&&A.length&&(o.context?o.invalid=!0:c(A)),I&&("body"==y.name||o.isRootContent)&&a(),!o.invalid){for(k in p){for(N=d[k],C=p[k],_=C.length;_--;)C[_].parent||C.splice(_,1);for(x=0,w=N.length;w>x;x++)N[x](C,k,o)}for(x=0,w=f.length;w>x;x++)if(N=f[x],N.name in h){for(C=h[N.name],_=C.length;_--;)C[_].parent||C.splice(_,1);for(_=0,E=N.callbacks.length;E>_;_++)N.callbacks[_](C,N.name,o)}}return y},r.remove_trailing_brs&&u.addNodeFilter("br",function(t){var n,r=t.length,i,o=s({},l.getBlockElements()),a=l.getNonEmptyElements(),c,u,d,f,p,h;for(o.body=1,n=0;r>n;n++)if(i=t[n],c=i.parent,o[i.parent.name]&&i===c.lastChild){for(d=i.prev;d;){if(f=d.name,"span"!==f||"bookmark"!==d.attr("data-mce-type")){if("br"!==f)break;if("br"===f){i=null;break}}d=d.prev}i&&(i.remove(),c.isEmpty(a)&&(p=l.getElementRule(c.name),p&&(p.removeEmpty?c.remove():p.paddEmpty&&(c.empty().append(new e("#text",3)).value="\xa0"))))}else{for(u=i;c&&c.firstChild===u&&c.lastChild===u&&(u=c,!o[c.name]);)c=c.parent;u===c&&(h=new e("#text",3),h.value="\xa0",i.replace(h))}}),r.allow_html_in_named_anchor||u.addAttributeFilter("id,name",function(e){for(var t=e.length,n,r,i,o;t--;)if(o=e[t],"a"===o.name&&o.firstChild&&!o.attr("href")){i=o.parent,n=o.lastChild;do r=n.prev,i.insert(n,o),n=r;while(n)}}),r.validate&&l.getValidClasses()&&u.addAttributeFilter("class",function(e){for(var t=e.length,n,r,i,o,a,s=l.getValidClasses(),c,u;t--;){for(n=e[t],r=n.attr("class").split(" "),a="",i=0;i<r.length;i++)o=r[i],u=!1,c=s["*"],c&&c[o]&&(u=!0),c=s[n.name],!u&&c&&c[o]&&(u=!0),u&&(a&&(a+=" "),a+=o);a.length||(a=null),n.attr("class",a)}})}}),r(S,[g,d],function(e,t){var n=t.makeMap;return function(t){var r=[],i,o,a,s,l;return t=t||{},i=t.indent,o=n(t.indent_before||""),a=n(t.indent_after||""),s=e.getEncodeFunc(t.entity_encoding||"raw",t.entities),l="html"==t.element_format,{start:function(e,t,n){var c,u,d,f;if(i&&o[e]&&r.length>0&&(f=r[r.length-1],f.length>0&&"\n"!==f&&r.push("\n")),r.push("<",e),t)for(c=0,u=t.length;u>c;c++)d=t[c],r.push(" ",d.name,'="',s(d.value,!0),'"');r[r.length]=!n||l?">":" />",n&&i&&a[e]&&r.length>0&&(f=r[r.length-1],f.length>0&&"\n"!==f&&r.push("\n"))},end:function(e){var t;r.push("</",e,">"),i&&a[e]&&r.length>0&&(t=r[r.length-1],t.length>0&&"\n"!==t&&r.push("\n"))},text:function(e,t){e.length>0&&(r[r.length]=t?e:s(e))},cdata:function(e){r.push("<![CDATA[",e,"]]>")},comment:function(e){r.push("<!--",e,"-->")},pi:function(e,t){t?r.push("<?",e," ",t,"?>"):r.push("<?",e,"?>"),i&&r.push("\n")},doctype:function(e){r.push("<!DOCTYPE",e,">",i?"\n":"")},reset:function(){r.length=0},getContent:function(){return r.join("").replace(/\n$/,"")}}}}),r(T,[S,E],function(e,t){return function(n,r){var i=this,o=new e(n);n=n||{},n.validate="validate"in n?n.validate:!0,i.schema=r=r||new t,i.writer=o,i.serialize=function(e){function t(e){var n=i[e.type],s,l,c,u,d,f,p,h,m;if(n)n(e);else{if(s=e.name,l=e.shortEnded,c=e.attributes,a&&c&&c.length>1){for(f=[],f.map={},m=r.getElementRule(e.name),p=0,h=m.attributesOrder.length;h>p;p++)u=m.attributesOrder[p],u in c.map&&(d=c.map[u],f.map[u]=d,f.push({name:u,value:d}));for(p=0,h=c.length;h>p;p++)u=c[p].name,u in f.map||(d=c.map[u],f.map[u]=d,f.push({name:u,value:d}));c=f}if(o.start(e.name,c,l),!l){if(e=e.firstChild)do t(e);while(e=e.next);o.end(s)}}}var i,a;return a=n.validate,i={3:function(e){o.text(e.value,e.raw)},8:function(e){o.comment(e.value)},7:function(e){o.pi(e.name,e.value)},10:function(e){o.doctype(e.value)},4:function(e){o.cdata(e.value)},11:function(e){if(e=e.firstChild)do t(e);while(e=e.next)}},o.reset(),1!=e.type||n.inner?i[11](e):t(e),o.getContent()}}}),r(R,[y,k,g,T,_,E,u,d],function(e,t,n,r,i,o,a,s){var l=s.each,c=s.trim,u=e.DOM;return function(e,i){var s,d,f;return i&&(s=i.dom,d=i.schema),s=s||u,d=d||new o(e),e.entity_encoding=e.entity_encoding||"named",e.remove_trailing_brs="remove_trailing_brs"in e?e.remove_trailing_brs:!0,f=new t(e,d),f.addAttributeFilter("data-mce-tabindex",function(e,t){for(var n=e.length,r;n--;)r=e[n],r.attr("tabindex",r.attributes.map["data-mce-tabindex"]),r.attr(t,null)}),f.addAttributeFilter("src,href,style",function(t,n){for(var r=t.length,i,o,a="data-mce-"+n,l=e.url_converter,c=e.url_converter_scope,u;r--;)i=t[r],o=i.attributes.map[a],o!==u?(i.attr(n,o.length>0?o:null),i.attr(a,null)):(o=i.attributes.map[n],"style"===n?o=s.serializeStyle(s.parseStyle(o),i.name):l&&(o=l.call(c,o,n,i.name)),i.attr(n,o.length>0?o:null))}),f.addAttributeFilter("class",function(e){for(var t=e.length,n,r;t--;)n=e[t],r=n.attr("class"),r&&(r=n.attr("class").replace(/(?:^|\s)mce-item-\w+(?!\S)/g,""),n.attr("class",r.length>0?r:null))}),f.addAttributeFilter("data-mce-type",function(e,t,n){for(var r=e.length,i;r--;)i=e[r],"bookmark"!==i.attributes.map["data-mce-type"]||n.cleanup||i.remove()}),f.addNodeFilter("noscript",function(e){for(var t=e.length,r;t--;)r=e[t].firstChild,r&&(r.value=n.decode(r.value))}),f.addNodeFilter("script,style",function(e,t){function n(e){return e.replace(/(<!--\[CDATA\[|\]\]-->)/g,"\n").replace(/^[\r\n]*|[\r\n]*$/g,"").replace(/^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi,"").replace(/\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g,"")}for(var r=e.length,i,o,a;r--;)i=e[r],o=i.firstChild?i.firstChild.value:"","script"===t?(a=i.attr("type"),a&&i.attr("type","mce-no/type"==a?null:a.replace(/^mce\-/,"")),o.length>0&&(i.firstChild.value="// <![CDATA[\n"+n(o)+"\n// ]]>")):o.length>0&&(i.firstChild.value="<!--\n"+n(o)+"\n-->")}),f.addNodeFilter("#comment",function(e){for(var t=e.length,n;t--;)n=e[t],0===n.value.indexOf("[CDATA[")?(n.name="#cdata",n.type=4,n.value=n.value.replace(/^\[CDATA\[|\]\]$/g,"")):0===n.value.indexOf("mce:protected ")&&(n.name="#text",n.type=3,n.raw=!0,n.value=unescape(n.value).substr(14))}),f.addNodeFilter("xml:namespace,input",function(e,t){for(var n=e.length,r;n--;)r=e[n],7===r.type?r.remove():1===r.type&&("input"!==t||"type"in r.attributes.map||r.attr("type","text"))}),e.fix_list_elements&&f.addNodeFilter("ul,ol",function(e){for(var t=e.length,n,r;t--;)n=e[t],r=n.parent,("ul"===r.name||"ol"===r.name)&&n.prev&&"li"===n.prev.name&&n.prev.append(n)}),f.addAttributeFilter("data-mce-src,data-mce-href,data-mce-style,data-mce-selected,data-mce-expando,data-mce-type,data-mce-resize",function(e,t){for(var n=e.length;n--;)e[n].attr(t,null)}),{schema:d,addNodeFilter:f.addNodeFilter,addAttributeFilter:f.addAttributeFilter,serialize:function(t,n){var i=this,o,u,p,h,m;return a.ie&&s.select("script,style,select,map").length>0?(m=t.innerHTML,t=t.cloneNode(!1),s.setHTML(t,m)):t=t.cloneNode(!0),o=t.ownerDocument.implementation,o.createHTMLDocument&&(u=o.createHTMLDocument(""),l("BODY"==t.nodeName?t.childNodes:[t],function(e){u.body.appendChild(u.importNode(e,!0))}),t="BODY"!=t.nodeName?u.body.firstChild:u.body,p=s.doc,s.doc=u),n=n||{},n.format=n.format||"html",n.selection&&(n.forced_root_block=""),n.no_events||(n.node=t,i.onPreProcess(n)),h=new r(e,d),n.content=h.serialize(f.parse(c(n.getInner?t.innerHTML:s.getOuterHTML(t)),n)),n.cleanup||(n.content=n.content.replace(/\uFEFF/g,"")),n.no_events||i.onPostProcess(n),p&&(s.doc=p),n.node=null,n.content},addRules:function(e){d.addValidElements(e)},setRules:function(e){d.setValidElements(e)},onPreProcess:function(e){i&&i.fire("PreProcess",e)},onPostProcess:function(e){i&&i.fire("PostProcess",e)}}}}),r(A,[],function(){function e(e){function t(t,n){var r,i=0,o,a,s,l,c,u,d=-1,f;if(r=t.duplicate(),r.collapse(n),f=r.parentElement(),f.ownerDocument===e.dom.doc){for(;"false"===f.contentEditable;)f=f.parentNode;if(!f.hasChildNodes())return{node:f,inside:1};for(s=f.children,o=s.length-1;o>=i;)if(u=Math.floor((i+o)/2),l=s[u],r.moveToElementText(l),d=r.compareEndPoints(n?"StartToStart":"EndToEnd",t),d>0)o=u-1;else{if(!(0>d))return{node:l};i=u+1}if(0>d)for(l?r.collapse(!1):(r.moveToElementText(f),r.collapse(!0),l=f,a=!0),c=0;0!==r.compareEndPoints(n?"StartToStart":"StartToEnd",t)&&0!==r.move("character",1)&&f==r.parentElement();)c++;else for(r.collapse(!0),c=0;0!==r.compareEndPoints(n?"StartToStart":"StartToEnd",t)&&0!==r.move("character",-1)&&f==r.parentElement();)c++;return{node:l,position:d,offset:c,inside:a}}}function n(){function n(e){var n=t(o,e),r,i,s=0,l,c,u;if(r=n.node,i=n.offset,n.inside&&!r.hasChildNodes())return void a[e?"setStart":"setEnd"](r,0);if(i===c)return void a[e?"setStartBefore":"setEndAfter"](r);if(n.position<0){if(l=n.inside?r.firstChild:r.nextSibling,!l)return void a[e?"setStartAfter":"setEndAfter"](r);if(!i)return void(3==l.nodeType?a[e?"setStart":"setEnd"](l,0):a[e?"setStartBefore":"setEndBefore"](l));for(;l;){if(3==l.nodeType&&(u=l.nodeValue,s+=u.length,s>=i)){r=l,s-=i,s=u.length-s;break}l=l.nextSibling}}else{if(l=r.previousSibling,!l)return a[e?"setStartBefore":"setEndBefore"](r);if(!i)return void(3==r.nodeType?a[e?"setStart":"setEnd"](l,r.nodeValue.length):a[e?"setStartAfter":"setEndAfter"](l));for(;l;){if(3==l.nodeType&&(s+=l.nodeValue.length,s>=i)){r=l,s-=i;break}l=l.previousSibling}}a[e?"setStart":"setEnd"](r,s)}var o=e.getRng(),a=i.createRng(),s,l,c,u,d;if(s=o.item?o.item(0):o.parentElement(),s.ownerDocument!=i.doc)return a;if(l=e.isCollapsed(),o.item)return a.setStart(s.parentNode,i.nodeIndex(s)),a.setEnd(a.startContainer,a.startOffset+1),a;try{n(!0),l||n()}catch(f){if(-2147024809!=f.number)throw f;d=r.getBookmark(2),c=o.duplicate(),c.collapse(!0),s=c.parentElement(),l||(c=o.duplicate(),c.collapse(!1),u=c.parentElement(),u.innerHTML=u.innerHTML),s.innerHTML=s.innerHTML,r.moveToBookmark(d),o=e.getRng(),n(!0),l||n()}return a}var r=this,i=e.dom,o=!1;this.getBookmark=function(n){function r(e){var t,n,r,o,a=[];for(t=e.parentNode,n=i.getRoot().parentNode;t!=n&&9!==t.nodeType;){for(r=t.children,o=r.length;o--;)if(e===r[o]){a.push(o);break}e=t,t=t.parentNode}return a}function o(e){var n;return n=t(a,e),n?{position:n.position,offset:n.offset,indexes:r(n.node),inside:n.inside}:void 0}var a=e.getRng(),s={};return 2===n&&(a.item?s.start={ctrl:!0,indexes:r(a.item(0))}:(s.start=o(!0),e.isCollapsed()||(s.end=o()))),s},this.moveToBookmark=function(e){function t(e){var t,n,r,o;for(t=i.getRoot(),n=e.length-1;n>=0;n--)o=t.children,r=e[n],r<=o.length-1&&(t=o[r]);return t}function n(n){var i=e[n?"start":"end"],a,s,l,c;i&&(a=i.position>0,s=o.createTextRange(),s.moveToElementText(t(i.indexes)),c=i.offset,c!==l?(s.collapse(i.inside||a),s.moveStart("character",a?-c:c)):s.collapse(n),r.setEndPoint(n?"StartToStart":"EndToStart",s),n&&r.collapse(!0))}var r,o=i.doc.body;e.start&&(e.start.ctrl?(r=o.createControlRange(),r.addElement(t(e.start.indexes)),r.select()):(r=o.createTextRange(),n(!0),n(),r.select()))},this.addRange=function(t){function n(e){var t,n,a,d,h;a=i.create("a"),t=e?s:c,n=e?l:u,d=r.duplicate(),(t==f||t==f.documentElement)&&(t=p,n=0),3==t.nodeType?(t.parentNode.insertBefore(a,t),d.moveToElementText(a),d.moveStart("character",n),i.remove(a),r.setEndPoint(e?"StartToStart":"EndToEnd",d)):(h=t.childNodes,h.length?(n>=h.length?i.insertAfter(a,h[h.length-1]):t.insertBefore(a,h[n]),d.moveToElementText(a)):t.canHaveHTML&&(t.innerHTML="<span>&#xFEFF;</span>",a=t.firstChild,d.moveToElementText(a),d.collapse(o)),r.setEndPoint(e?"StartToStart":"EndToEnd",d),i.remove(a))}var r,a,s,l,c,u,d,f=e.dom.doc,p=f.body,h,m;if(s=t.startContainer,l=t.startOffset,c=t.endContainer,u=t.endOffset,r=p.createTextRange(),s==c&&1==s.nodeType){if(l==u&&!s.hasChildNodes()){if(s.canHaveHTML)return d=s.previousSibling,d&&!d.hasChildNodes()&&i.isBlock(d)?d.innerHTML="&#xFEFF;":d=null,s.innerHTML="<span>&#xFEFF;</span><span>&#xFEFF;</span>",r.moveToElementText(s.lastChild),r.select(),i.doc.selection.clear(),s.innerHTML="",void(d&&(d.innerHTML=""));l=i.nodeIndex(s),s=s.parentNode}if(l==u-1)try{if(m=s.childNodes[l],a=p.createControlRange(),a.addElement(m),a.select(),h=e.getRng(),h.item&&m===h.item(0))return}catch(g){}}n(!0),n(),r.select()},this.getRangeAt=n}return e}),r(B,[u],function(e){return{BACKSPACE:8,DELETE:46,DOWN:40,ENTER:13,LEFT:37,RIGHT:39,SPACEBAR:32,TAB:9,UP:38,modifierPressed:function(e){return e.shiftKey||e.ctrlKey||e.altKey||this.metaKeyPressed(e)},metaKeyPressed:function(t){return e.mac?t.metaKey:t.ctrlKey&&!t.altKey}}}),r(D,[B,d,u],function(e,t,n){return function(r,i){function o(e){var t=i.settings.object_resizing;return t===!1||n.iOS?!1:("string"!=typeof t&&(t="table,img,div"),"false"===e.getAttribute("data-mce-resize")?!1:i.dom.is(e,t))}function a(t){var n,r,o,a,s;n=t.screenX-T,r=t.screenY-R,P=n*k[2]+D,O=r*k[3]+L,P=5>P?5:P,O=5>O?5:O,o="IMG"==w.nodeName&&i.settings.resize_img_proportional!==!1?!e.modifierPressed(t):e.modifierPressed(t)||"IMG"==w.nodeName&&k[2]*k[3]!==0,o&&(W(n)>W(r)?(O=V(P*M),P=V(O/M)):(P=V(O/M),O=V(P*M))),C.setStyles(_,{width:P,height:O}),a=k.startPos.x+n,s=k.startPos.y+r,a=a>0?a:0,s=s>0?s:0,C.setStyles(E,{left:a,top:s,display:"block"}),E.innerHTML=P+" &times; "+O,k[2]<0&&_.clientWidth<=P&&C.setStyle(_,"left",A+(D-P)),k[3]<0&&_.clientHeight<=O&&C.setStyle(_,"top",B+(L-O)),n=U.scrollWidth-$,r=U.scrollHeight-q,n+r!==0&&C.setStyles(E,{left:a-n,top:s-r}),H||(i.fire("ObjectResizeStart",{target:w,width:D,height:L}),H=!0)}function s(){function e(e,t){t&&(w.style[e]||!i.schema.isValid(w.nodeName.toLowerCase(),e)?C.setStyle(w,e,t):C.setAttrib(w,e,t))}H=!1,e("width",P),e("height",O),C.unbind(I,"mousemove",a),C.unbind(I,"mouseup",s),F!=I&&(C.unbind(F,"mousemove",a),C.unbind(F,"mouseup",s)),C.remove(_),C.remove(E),z&&"TABLE"!=w.nodeName||l(w),i.fire("ObjectResized",{target:w,width:P,height:O}),C.setAttrib(w,"style",C.getAttrib(w,"style")),i.nodeChanged()}function l(e,t,r){var l,u,d,f,p;g(),l=C.getPos(e,U),A=l.x,B=l.y,p=e.getBoundingClientRect(),u=p.width||p.right-p.left,d=p.height||p.bottom-p.top,w!=e&&(m(),w=e,P=O=0),f=i.fire("ObjectSelected",{target:e}),o(e)&&!f.isDefaultPrevented()?x(N,function(e,i){function o(t){T=t.screenX,R=t.screenY,D=w.clientWidth,L=w.clientHeight,M=L/D,k=e,e.startPos={x:u*e[0]+A,y:d*e[1]+B},$=U.scrollWidth,q=U.scrollHeight,_=w.cloneNode(!0),C.addClass(_,"mce-clonedresizable"),C.setAttrib(_,"data-mce-bogus","all"),_.contentEditable=!1,_.unSelectabe=!0,C.setStyles(_,{left:A,top:B,margin:0}),_.removeAttribute("data-mce-selected"),U.appendChild(_),C.bind(I,"mousemove",a),C.bind(I,"mouseup",s),F!=I&&(C.bind(F,"mousemove",a),C.bind(F,"mouseup",s)),E=C.add(U,"div",{"class":"mce-resize-helper","data-mce-bogus":"all"},D+" &times; "+L)}var l,c;return t?void(i==t&&o(r)):(l=C.get("mceResizeHandle"+i),l?C.show(l):(c=U,l=C.add(c,"div",{id:"mceResizeHandle"+i,"data-mce-bogus":"all","class":"mce-resizehandle",unselectable:!0,style:"cursor:"+i+"-resize; margin:0; padding:0"}),n.ie&&(l.contentEditable=!1)),e.elm||(C.bind(l,"mousedown",function(e){e.stopImmediatePropagation(),e.preventDefault(),o(e)}),e.elm=l),void C.setStyles(l,{left:u*e[0]+A-l.offsetWidth/2,top:d*e[1]+B-l.offsetHeight/2}))}):c(),w.setAttribute("data-mce-selected","1")}function c(){var e,t;g(),w&&w.removeAttribute("data-mce-selected");for(e in N)t=C.get("mceResizeHandle"+e),t&&(C.unbind(t),C.remove(t))}function u(e){function t(e,t){if(e)do if(e===t)return!0;while(e=e.parentNode)}var n,i;if(!H)return x(C.select("img[data-mce-selected],hr[data-mce-selected]"),function(e){e.removeAttribute("data-mce-selected")}),i="mousedown"==e.type?e.target:r.getNode(),i=C.$(i).closest(z?"table":"table,img,hr")[0],t(i,U)&&(v(),n=r.getStart(!0),t(n,i)&&t(r.getEnd(!0),i)&&(!z||i!=n&&"IMG"!==n.nodeName))?void l(i):void c()}function d(e,t,n){e&&e.attachEvent&&e.attachEvent("on"+t,n)}function f(e,t,n){e&&e.detachEvent&&e.detachEvent("on"+t,n)}function p(e){var t=e.srcElement,n,r,o,a,s,c,u;n=t.getBoundingClientRect(),c=S.clientX-n.left,u=S.clientY-n.top;for(r in N)if(o=N[r],a=t.offsetWidth*o[0],s=t.offsetHeight*o[1],W(a-c)<8&&W(s-u)<8){k=o;break}H=!0,i.fire("ObjectResizeStart",{target:w,width:w.clientWidth,height:w.clientHeight}),i.getDoc().selection.empty(),l(t,r,S)}function h(e){var t=e.srcElement;if(t!=w){if(i.fire("ObjectSelected",{target:t}),m(),0===t.id.indexOf("mceResizeHandle"))return void(e.returnValue=!1);("IMG"==t.nodeName||"TABLE"==t.nodeName)&&(c(),w=t,d(t,"resizestart",p))}}function m(){f(w,"resizestart",p)}function g(){for(var e in N){var t=N[e];t.elm&&(C.unbind(t.elm),delete t.elm)}}function v(){try{i.getDoc().execCommand("enableObjectResizing",!1,!1)}catch(e){}}function y(e){var t;if(z){t=I.body.createControlRange();try{return t.addElement(e),t.select(),!0}catch(n){}}}function b(){w=_=null,z&&(m(),f(U,"controlselect",h))}var C=i.dom,x=t.each,w,_,E,N,k,S,T,R,A,B,D,L,M,H,P,O,I=i.getDoc(),F=document,z=n.ie&&n.ie<11,W=Math.abs,V=Math.round,U=i.getBody(),$,q;N={n:[.5,0,0,-1],e:[1,.5,1,0],s:[.5,1,0,1],w:[0,.5,-1,0],nw:[0,0,-1,-1],ne:[1,0,1,-1],se:[1,1,1,1],sw:[0,1,-1,1]};var j=".mce-content-body";return i.contentStyles.push(j+" div.mce-resizehandle {position: absolute;border: 1px solid black;background: #FFF;width: 5px;height: 5px;z-index: 10000}"+j+" .mce-resizehandle:hover {background: #000}"+j+" img[data-mce-selected], hr[data-mce-selected] {outline: 1px solid black;resize: none}"+j+" .mce-clonedresizable {position: absolute;"+(n.gecko?"":"outline: 1px dashed black;")+"opacity: .5;filter: alpha(opacity=50);z-index: 10000}"+j+" .mce-resize-helper {background: #555;background: rgba(0,0,0,0.75);border-radius: 3px;border: 1px;color: white;display: none;font-family: sans-serif;font-size: 12px;white-space: nowrap;line-height: 14px;margin: 5px 10px;padding: 5px;position: absolute;z-index: 10001}"),i.on("init",function(){z?(i.on("ObjectResized",function(e){"TABLE"!=e.target.nodeName&&(c(),y(e.target))}),d(U,"controlselect",h),i.on("mousedown",function(e){S=e})):(v(),n.ie>=11&&(i.on("mouseup",function(e){var t=e.target.nodeName;!H&&/^(TABLE|IMG|HR)$/.test(t)&&(i.selection.select(e.target,"TABLE"==t),i.nodeChanged())}),i.dom.bind(U,"mscontrolselect",function(e){/^(TABLE|IMG|HR)$/.test(e.target.nodeName)&&(e.preventDefault(),"IMG"==e.target.tagName&&window.setTimeout(function(){i.selection.select(e.target)},0))}))),i.on("nodechange ResizeEditor",u),i.on("keydown keyup",function(e){w&&"TABLE"==w.nodeName&&u(e)}),i.on("hide",c)}),i.on("remove",g),{isResizable:o,showResizeRect:l,hideResizeRect:c,updateResizeRect:u,controlSelect:y,destroy:b}}}),r(L,[u,d],function(e,t){function n(n){var r=n.dom;this.getBookmark=function(e,i){function o(e,n){var i=0;return t.each(r.select(e),function(e,t){e==n&&(i=t)}),i}function a(e){function t(t){var n,r,i,o=t?"start":"end";n=e[o+"Container"],r=e[o+"Offset"],1==n.nodeType&&"TR"==n.nodeName&&(i=n.childNodes,n=i[Math.min(t?r:r-1,i.length-1)],n&&(r=t?0:n.childNodes.length,e["set"+(t?"Start":"End")](n,r)))}return t(!0),t(),e}function s(){function e(e,t){var n=e[t?"startContainer":"endContainer"],a=e[t?"startOffset":"endOffset"],s=[],l,c,u=0;if(3==n.nodeType){if(i)for(l=n.previousSibling;l&&3==l.nodeType;l=l.previousSibling)a+=l.nodeValue.length;s.push(a)}else c=n.childNodes,a>=c.length&&c.length&&(u=1,a=Math.max(0,c.length-1)),s.push(r.nodeIndex(c[a],i)+u);for(;n&&n!=o;n=n.parentNode)s.push(r.nodeIndex(n,i));return s}var t=n.getRng(!0),o=r.getRoot(),a={};return a.start=e(t,!0),n.isCollapsed()||(a.end=e(t)),a}var l,c,u,d,f,p,h="&#xFEFF;",m;if(2==e)return p=n.getNode(),f=p?p.nodeName:null,"IMG"==f?{name:f,index:o(f,p)}:n.tridentSel?n.tridentSel.getBookmark(e):s();if(e)return{rng:n.getRng()};if(l=n.getRng(),u=r.uniqueId(),d=n.isCollapsed(),m="overflow:hidden;line-height:0px",l.duplicate||l.item){if(l.item)return p=l.item(0),f=p.nodeName,{name:f,index:o(f,p)};c=l.duplicate();try{l.collapse(),l.pasteHTML('<span data-mce-type="bookmark" id="'+u+'_start" style="'+m+'">'+h+"</span>"),d||(c.collapse(!1),l.moveToElementText(c.parentElement()),0===l.compareEndPoints("StartToEnd",c)&&c.move("character",-1),c.pasteHTML('<span data-mce-type="bookmark" id="'+u+'_end" style="'+m+'">'+h+"</span>"))}catch(g){return null}}else{if(p=n.getNode(),f=p.nodeName,"IMG"==f)return{name:f,index:o(f,p)};c=a(l.cloneRange()),d||(c.collapse(!1),c.insertNode(r.create("span",{"data-mce-type":"bookmark",id:u+"_end",style:m},h))),l=a(l),l.collapse(!0),l.insertNode(r.create("span",{"data-mce-type":"bookmark",id:u+"_start",style:m},h))}return n.moveToBookmark({id:u,keep:1}),{id:u}},this.moveToBookmark=function(i){function o(e){var t=i[e?"start":"end"],n,r,o,a;if(t){for(o=t[0],r=c,n=t.length-1;n>=1;n--){if(a=r.childNodes,t[n]>a.length-1)return;r=a[t[n]]}3===r.nodeType&&(o=Math.min(t[0],r.nodeValue.length)),1===r.nodeType&&(o=Math.min(t[0],r.childNodes.length)),e?l.setStart(r,o):l.setEnd(r,o)}return!0}function a(n){var o=r.get(i.id+"_"+n),a,s,l,c,h=i.keep;if(o&&(a=o.parentNode,"start"==n?(h?(a=o.firstChild,s=1):s=r.nodeIndex(o),u=d=a,f=p=s):(h?(a=o.firstChild,s=1):s=r.nodeIndex(o),d=a,p=s),!h)){for(c=o.previousSibling,l=o.nextSibling,t.each(t.grep(o.childNodes),function(e){3==e.nodeType&&(e.nodeValue=e.nodeValue.replace(/\uFEFF/g,""))});o=r.get(i.id+"_"+n);)r.remove(o,1);c&&l&&c.nodeType==l.nodeType&&3==c.nodeType&&!e.opera&&(s=c.nodeValue.length,c.appendData(l.nodeValue),r.remove(l),"start"==n?(u=d=c,f=p=s):(d=c,p=s))}}function s(t){return!r.isBlock(t)||t.innerHTML||e.ie||(t.innerHTML='<br data-mce-bogus="1" />'),t}var l,c,u,d,f,p;if(i)if(i.start){if(l=r.createRng(),c=r.getRoot(),n.tridentSel)return n.tridentSel.moveToBookmark(i);o(!0)&&o()&&n.setRng(l)}else i.id?(a("start"),a("end"),u&&(l=r.createRng(),l.setStart(s(u),f),l.setEnd(s(d),p),n.setRng(l))):i.name?n.select(r.select(i.name)[i.index]):i.rng&&n.setRng(i.rng)}}return n.isBookmarkNode=function(e){return e&&"SPAN"===e.tagName&&"bookmark"===e.getAttribute("data-mce-type")},n}),r(M,[h,A,D,x,L,u,d],function(e,n,r,i,o,a,s){function l(e,t,i,a){var s=this;s.dom=e,s.win=t,s.serializer=i,s.editor=a,s.bookmarkManager=new o(s),s.controlSelection=new r(s,a),s.win.getSelection||(s.tridentSel=new n(s))}var c=s.each,u=s.trim,d=a.ie;return l.prototype={setCursorLocation:function(e,t){var n=this,r=n.dom.createRng();e?(r.setStart(e,t),r.setEnd(e,t),n.setRng(r),n.collapse(!1)):(n._moveEndPoint(r,n.editor.getBody(),!0),n.setRng(r))},getContent:function(e){var n=this,r=n.getRng(),i=n.dom.create("body"),o=n.getSel(),a,s,l;return e=e||{},a=s="",e.get=!0,e.format=e.format||"html",e.selection=!0,n.editor.fire("BeforeGetContent",e),"text"==e.format?n.isCollapsed()?"":r.text||(o.toString?o.toString():""):(r.cloneContents?(l=r.cloneContents(),l&&i.appendChild(l)):r.item!==t||r.htmlText!==t?(i.innerHTML="<br>"+(r.item?r.item(0).outerHTML:r.htmlText),i.removeChild(i.firstChild)):i.innerHTML=r.toString(),/^\s/.test(i.innerHTML)&&(a=" "),/\s+$/.test(i.innerHTML)&&(s=" "),e.getInner=!0,e.content=n.isCollapsed()?"":a+n.serializer.serialize(i,e)+s,n.editor.fire("GetContent",e),e.content)},setContent:function(e,t){var n=this,r=n.getRng(),i,o=n.win.document,a,s;if(t=t||{format:"html"},t.set=!0,t.selection=!0,e=t.content=e,t.no_events||n.editor.fire("BeforeSetContent",t),e=t.content,r.insertNode){e+='<span id="__caret">_</span>',r.startContainer==o&&r.endContainer==o?o.body.innerHTML=e:(r.deleteContents(),0===o.body.childNodes.length?o.body.innerHTML=e:r.createContextualFragment?r.insertNode(r.createContextualFragment(e)):(a=o.createDocumentFragment(),s=o.createElement("div"),a.appendChild(s),s.outerHTML=e,r.insertNode(a))),i=n.dom.get("__caret"),r=o.createRange(),r.setStartBefore(i),r.setEndBefore(i),n.setRng(r),n.dom.remove("__caret");try{n.setRng(r)}catch(l){}}else r.item&&(o.execCommand("Delete",!1,null),r=n.getRng()),/^\s+/.test(e)?(r.pasteHTML('<span id="__mce_tmp">_</span>'+e),n.dom.remove("__mce_tmp")):r.pasteHTML(e);t.no_events||n.editor.fire("SetContent",t)},getStart:function(e){var t=this,n=t.getRng(),r,i,o,a;if(n.duplicate||n.item){if(n.item)return n.item(0);for(o=n.duplicate(),o.collapse(1),r=o.parentElement(),r.ownerDocument!==t.dom.doc&&(r=t.dom.getRoot()),i=a=n.parentElement();a=a.parentNode;)if(a==r){r=i;break}return r}return r=n.startContainer,1==r.nodeType&&r.hasChildNodes()&&(e&&n.collapsed||(r=r.childNodes[Math.min(r.childNodes.length-1,n.startOffset)])),r&&3==r.nodeType?r.parentNode:r},getEnd:function(e){var t=this,n=t.getRng(),r,i;return n.duplicate||n.item?n.item?n.item(0):(n=n.duplicate(),n.collapse(0),r=n.parentElement(),r.ownerDocument!==t.dom.doc&&(r=t.dom.getRoot()),r&&"BODY"==r.nodeName?r.lastChild||r:r):(r=n.endContainer,i=n.endOffset,1==r.nodeType&&r.hasChildNodes()&&(e&&n.collapsed||(r=r.childNodes[i>0?i-1:i])),r&&3==r.nodeType?r.parentNode:r)},getBookmark:function(e,t){return this.bookmarkManager.getBookmark(e,t)},moveToBookmark:function(e){return this.bookmarkManager.moveToBookmark(e)},select:function(e,t){var n=this,r=n.dom,i=r.createRng(),o;if(n.lastFocusBookmark=null,e){if(!t&&n.controlSelection.controlSelect(e))return;o=r.nodeIndex(e),i.setStart(e.parentNode,o),i.setEnd(e.parentNode,o+1),t&&(n._moveEndPoint(i,e,!0),n._moveEndPoint(i,e)),n.setRng(i)}return e},isCollapsed:function(){var e=this,t=e.getRng(),n=e.getSel();return!t||t.item?!1:t.compareEndPoints?0===t.compareEndPoints("StartToEnd",t):!n||t.collapsed},collapse:function(e){var t=this,n=t.getRng(),r;n.item&&(r=n.item(0),n=t.win.document.body.createTextRange(),n.moveToElementText(r)),n.collapse(!!e),t.setRng(n)},getSel:function(){var e=this.win;return e.getSelection?e.getSelection():e.document.selection},getRng:function(e){function t(e,t,n){try{return t.compareBoundaryPoints(e,n)}catch(r){return-1}}var n=this,r,i,o,a=n.win.document,s;if(!e&&n.lastFocusBookmark){var l=n.lastFocusBookmark;return l.startContainer?(i=a.createRange(),i.setStart(l.startContainer,l.startOffset),i.setEnd(l.endContainer,l.endOffset)):i=l,i}if(e&&n.tridentSel)return n.tridentSel.getRangeAt(0);try{(r=n.getSel())&&(i=r.rangeCount>0?r.getRangeAt(0):r.createRange?r.createRange():a.createRange())}catch(c){}if(d&&i&&i.setStart&&a.selection){try{s=a.selection.createRange()}catch(c){}s&&s.item&&(o=s.item(0),i=a.createRange(),i.setStartBefore(o),i.setEndAfter(o))}return i||(i=a.createRange?a.createRange():a.body.createTextRange()),i.setStart&&9===i.startContainer.nodeType&&i.collapsed&&(o=n.dom.getRoot(),i.setStart(o,0),i.setEnd(o,0)),n.selectedRange&&n.explicitRange&&(0===t(i.START_TO_START,i,n.selectedRange)&&0===t(i.END_TO_END,i,n.selectedRange)?i=n.explicitRange:(n.selectedRange=null,n.explicitRange=null)),i},setRng:function(e,t){var n=this,r;if(e)if(e.select)try{e.select()}catch(i){}else if(n.tridentSel){if(e.cloneRange)try{return void n.tridentSel.addRange(e)}catch(i){}}else if(r=n.getSel()){n.explicitRange=e;try{r.removeAllRanges(),r.addRange(e)}catch(i){}t===!1&&r.extend&&(r.collapse(e.endContainer,e.endOffset),r.extend(e.startContainer,e.startOffset)),n.selectedRange=r.rangeCount>0?r.getRangeAt(0):null}},setNode:function(e){var t=this;return t.setContent(t.dom.getOuterHTML(e)),e},getNode:function(){function e(e,t){for(var n=e;e&&3===e.nodeType&&0===e.length;)e=t?e.nextSibling:e.previousSibling;return e||n}var t=this,n=t.getRng(),r,i=n.startContainer,o=n.endContainer,a=n.startOffset,s=n.endOffset,l=t.dom.getRoot();return n?n.setStart?(r=n.commonAncestorContainer,!n.collapsed&&(i==o&&2>s-a&&i.hasChildNodes()&&(r=i.childNodes[a]),3===i.nodeType&&3===o.nodeType&&(i=i.length===a?e(i.nextSibling,!0):i.parentNode,o=0===s?e(o.previousSibling,!1):o.parentNode,i&&i===o))?i:r&&3==r.nodeType?r.parentNode:r):(r=n.item?n.item(0):n.parentElement(),r.ownerDocument!==t.win.document&&(r=l),r):l},getSelectedBlocks:function(t,n){var r=this,i=r.dom,o,a,s=[];if(a=i.getRoot(),t=i.getParent(t||r.getStart(),i.isBlock),n=i.getParent(n||r.getEnd(),i.isBlock),t&&t!=a&&s.push(t),t&&n&&t!=n){o=t;for(var l=new e(t,a);(o=l.next())&&o!=n;)i.isBlock(o)&&s.push(o)}return n&&t!=n&&n!=a&&s.push(n),s},isForward:function(){var e=this.dom,t=this.getSel(),n,r;return t&&t.anchorNode&&t.focusNode?(n=e.createRng(),n.setStart(t.anchorNode,t.anchorOffset),n.collapse(!0),r=e.createRng(),r.setStart(t.focusNode,t.focusOffset),r.collapse(!0),n.compareBoundaryPoints(n.START_TO_START,r)<=0):!0},normalize:function(){var e=this,t=e.getRng();return a.range&&new i(e.dom).normalize(t)&&e.setRng(t,e.isForward()),t},selectorChanged:function(e,t){var n=this,r;return n.selectorChangedData||(n.selectorChangedData={},r={},n.editor.on("NodeChange",function(e){var t=e.element,i=n.dom,o=i.getParents(t,null,i.getRoot()),a={};c(n.selectorChangedData,function(e,t){c(o,function(n){return i.is(n,t)?(r[t]||(c(e,function(e){e(!0,{node:n,selector:t,parents:o})}),r[t]=e),a[t]=e,!1):void 0})}),c(r,function(e,n){a[n]||(delete r[n],c(e,function(e){e(!1,{node:t,selector:n,parents:o})}))})})),n.selectorChangedData[e]||(n.selectorChangedData[e]=[]),n.selectorChangedData[e].push(t),n},getScrollContainer:function(){for(var e,t=this.dom.getRoot();t&&"BODY"!=t.nodeName;){if(t.scrollHeight>t.clientHeight){e=t;break}t=t.parentNode}return e},scrollIntoView:function(e){function t(e){for(var t=0,n=0,r=e;r&&r.nodeType;)t+=r.offsetLeft||0,n+=r.offsetTop||0,r=r.offsetParent;return{x:t,y:n}}var n,r,i=this,o=i.dom,a=o.getRoot(),s,l;if("BODY"!=a.nodeName){var c=i.getScrollContainer();if(c)return n=t(e).y-t(c).y,l=c.clientHeight,s=c.scrollTop,void((s>n||n+25>s+l)&&(c.scrollTop=s>n?n:n-l+25))}r=o.getViewPort(i.editor.getWin()),n=o.getPos(e).y,s=r.y,l=r.h,(n<r.y||n+25>s+l)&&i.editor.getWin().scrollTo(0,s>n?n:n-l+25)},placeCaretAt:function(e,t){var n=this.editor.getDoc(),r,i;if(n.caretPositionFromPoint)i=n.caretPositionFromPoint(e,t),r=n.createRange(),r.setStart(i.offsetNode,i.offset),r.collapse(!0);else if(n.caretRangeFromPoint)r=n.caretRangeFromPoint(e,t);else if(n.body.createTextRange){r=n.body.createTextRange();try{r.moveToPoint(e,t),r.collapse(!0)}catch(o){r.collapse(t<n.body.clientHeight)}}this.setRng(r)},_moveEndPoint:function(t,n,r){var i=n,o=new e(n,i),s=this.dom.schema.getNonEmptyElements();do{if(3==n.nodeType&&0!==u(n.nodeValue).length)return void(r?t.setStart(n,0):t.setEnd(n,n.nodeValue.length));if(s[n.nodeName]&&!/^(TD|TH)$/.test(n.nodeName))return void(r?t.setStartBefore(n):"BR"==n.nodeName?t.setEndBefore(n):t.setEndAfter(n));if(a.ie&&a.ie<11&&this.dom.isBlock(n)&&this.dom.isEmpty(n))return void(r?t.setStart(n,0):t.setEnd(n,0))}while(n=r?o.next():o.prev());"BODY"==i.nodeName&&(r?t.setStart(i,0):t.setEnd(i,i.childNodes.length))},destroy:function(){this.win=null,this.controlSelection.destroy()}},l}),r(H,[L,d],function(e,t){function n(t){this.compare=function(n,i){function o(e){var n={};return r(t.getAttribs(e),function(r){var i=r.nodeName.toLowerCase();0!==i.indexOf("_")&&"style"!==i&&"data-mce-style"!==i&&(n[i]=t.getAttrib(e,i))}),n}function a(e,t){var n,r;for(r in e)if(e.hasOwnProperty(r)){if(n=t[r],"undefined"==typeof n)return!1;if(e[r]!=n)return!1;delete t[r]}for(r in t)if(t.hasOwnProperty(r))return!1;return!0}return n.nodeName!=i.nodeName?!1:a(o(n),o(i))&&a(t.parseStyle(t.getAttrib(n,"style")),t.parseStyle(t.getAttrib(i,"style")))?!e.isBookmarkNode(n)&&!e.isBookmarkNode(i):!1}}var r=t.each;return n}),r(P,[d],function(e){function t(e,t){function r(e){return e.replace(/%(\w+)/g,"")}var i,o,a=e.dom,s="",l,c;if(c=e.settings.preview_styles,c===!1)return"";if(c||(c="font-family font-size font-weight font-style text-decoration text-transform color background-color border border-radius outline text-shadow"),"string"==typeof t){if(t=e.formatter.get(t),!t)return;
t=t[0]}return i=t.block||t.inline||"span",o=a.create(i),n(t.styles,function(e,t){e=r(e),e&&a.setStyle(o,t,e)}),n(t.attributes,function(e,t){e=r(e),e&&a.setAttrib(o,t,e)}),n(t.classes,function(e){e=r(e),a.hasClass(o,e)||a.addClass(o,e)}),e.fire("PreviewFormats"),a.setStyles(o,{position:"absolute",left:-65535}),e.getBody().appendChild(o),l=a.getStyle(e.getBody(),"fontSize",!0),l=/px$/.test(l)?parseInt(l,10):0,n(c.split(" "),function(t){var n=a.getStyle(o,t,!0);if(!("background-color"==t&&/transparent|rgba\s*\([^)]+,\s*0\)/.test(n)&&(n=a.getStyle(e.getBody(),t,!0),"#ffffff"==a.toHex(n).toLowerCase())||"color"==t&&"#000000"==a.toHex(n).toLowerCase())){if("font-size"==t&&/em|%$/.test(n)){if(0===l)return;n=parseFloat(n,10)/(/%$/.test(n)?100:1),n=n*l+"px"}"border"==t&&n&&(s+="padding:0 2px;"),s+=t+":"+n+";"}}),e.fire("AfterPreviewFormats"),a.remove(o),s}var n=e.each;return{getCssText:t}}),r(O,[h,x,L,H,d,P],function(e,t,n,r,i,o){return function(a){function s(e){return e.nodeType&&(e=e.nodeName),!!a.schema.getTextBlockElements()[e.toLowerCase()]}function l(e,t){return U.getParents(e,t,U.getRoot())}function c(e){return 1===e.nodeType&&"_mce_caret"===e.id}function u(){p({valigntop:[{selector:"td,th",styles:{verticalAlign:"top"}}],valignmiddle:[{selector:"td,th",styles:{verticalAlign:"middle"}}],valignbottom:[{selector:"td,th",styles:{verticalAlign:"bottom"}}],alignleft:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"left"},defaultBlock:"div"},{selector:"img,table",collapsed:!1,styles:{"float":"left"}}],aligncenter:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"center"},defaultBlock:"div"},{selector:"img",collapsed:!1,styles:{display:"block",marginLeft:"auto",marginRight:"auto"}},{selector:"table",collapsed:!1,styles:{marginLeft:"auto",marginRight:"auto"}}],alignright:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"right"},defaultBlock:"div"},{selector:"img,table",collapsed:!1,styles:{"float":"right"}}],alignjustify:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"justify"},defaultBlock:"div"}],bold:[{inline:"strong",remove:"all"},{inline:"span",styles:{fontWeight:"bold"}},{inline:"b",remove:"all"}],italic:[{inline:"em",remove:"all"},{inline:"span",styles:{fontStyle:"italic"}},{inline:"i",remove:"all"}],underline:[{inline:"span",styles:{textDecoration:"underline"},exact:!0},{inline:"u",remove:"all"}],strikethrough:[{inline:"span",styles:{textDecoration:"line-through"},exact:!0},{inline:"strike",remove:"all"}],forecolor:{inline:"span",styles:{color:"%value"},links:!0,remove_similar:!0},hilitecolor:{inline:"span",styles:{backgroundColor:"%value"},links:!0,remove_similar:!0},fontname:{inline:"span",styles:{fontFamily:"%value"}},fontsize:{inline:"span",styles:{fontSize:"%value"}},fontsize_class:{inline:"span",attributes:{"class":"%value"}},blockquote:{block:"blockquote",wrapper:1,remove:"all"},subscript:{inline:"sub"},superscript:{inline:"sup"},code:{inline:"code"},link:{inline:"a",selector:"a",remove:"all",split:!0,deep:!0,onmatch:function(){return!0},onformat:function(e,t,n){at(n,function(t,n){U.setAttrib(e,n,t)})}},removeformat:[{selector:"b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins",remove:"all",split:!0,expand:!1,block_expand:!0,deep:!0},{selector:"span",attributes:["style","class"],remove:"empty",split:!0,expand:!1,deep:!0},{selector:"*",attributes:["style","class"],split:!1,expand:!1,deep:!0}]}),at("p h1 h2 h3 h4 h5 h6 div address pre div dt dd samp".split(/\s/),function(e){p(e,{block:e,remove:"all"})}),p(a.settings.formats)}function d(){a.addShortcut("meta+b","bold_desc","Bold"),a.addShortcut("meta+i","italic_desc","Italic"),a.addShortcut("meta+u","underline_desc","Underline");for(var e=1;6>=e;e++)a.addShortcut("meta+shift+"+e,"",["FormatBlock",!1,"h"+e]);a.addShortcut("meta+shift+7","",["FormatBlock",!1,"p"]),a.addShortcut("meta+shift+8","",["FormatBlock",!1,"div"]),a.addShortcut("meta+shift+9","",["FormatBlock",!1,"address"])}function f(e){return e?V[e]:V}function p(e,t){e&&("string"!=typeof e?at(e,function(e,t){p(t,e)}):(t=t.length?t:[t],at(t,function(e){e.deep===tt&&(e.deep=!e.selector),e.split===tt&&(e.split=!e.selector||e.inline),e.remove===tt&&e.selector&&!e.inline&&(e.remove="none"),e.selector&&e.inline&&(e.mixed=!0,e.block_expand=!0),"string"==typeof e.classes&&(e.classes=e.classes.split(/\s+/))}),V[e]=t))}function h(e){return e&&V[e]&&delete V[e],V}function m(e){var t;return a.dom.getParent(e,function(e){return t=a.dom.getStyle(e,"text-decoration"),t&&"none"!==t}),t}function g(e){var t;1===e.nodeType&&e.parentNode&&1===e.parentNode.nodeType&&(t=m(e.parentNode),a.dom.getStyle(e,"color")&&t?a.dom.setStyle(e,"text-decoration",t):a.dom.getStyle(e,"text-decoration")===t&&a.dom.setStyle(e,"text-decoration",null))}function v(t,n,r){function i(e,t){if(t=t||d,e){if(t.onformat&&t.onformat(e,t,n,r),at(t.styles,function(t,r){U.setStyle(e,r,A(t,n))}),t.styles){var i=U.getAttrib(e,"style");i&&e.setAttribute("data-mce-style",i)}at(t.attributes,function(t,r){U.setAttrib(e,r,A(t,n))}),at(t.classes,function(t){t=A(t,n),U.hasClass(e,t)||U.addClass(e,t)})}}function o(){function t(t,n){var i=new e(n);for(r=i.current();r;r=i.prev())if(r.childNodes.length>1||r==t||"BR"==r.tagName)return r}var n=a.selection.getRng(),i=n.startContainer,o=n.endContainer;if(i!=o&&0===n.endOffset){var s=t(i,o),l=3==s.nodeType?s.length:s.childNodes.length;n.setEnd(s,l)}return n}function l(e,r,o){var a=[],l,f,p=!0;l=d.inline||d.block,f=U.create(l),i(f),q.walk(e,function(e){function r(e){var g,v,y,b,x;return x=p,g=e.nodeName.toLowerCase(),v=e.parentNode.nodeName.toLowerCase(),1===e.nodeType&&nt(e)&&(x=p,p="true"===nt(e),b=!0),S(g,"br")?(h=0,void(d.block&&U.remove(e))):d.wrapper&&C(e,t,n)?void(h=0):p&&!b&&d.block&&!d.wrapper&&s(g)&&j(v,l)?(e=U.rename(e,l),i(e),a.push(e),void(h=0)):d.selector&&(at(u,function(t){"collapsed"in t&&t.collapsed!==m||U.is(e,t.selector)&&!c(e)&&(i(e,t),y=!0)}),!d.inline||y)?void(h=0):void(!p||b||!j(l,g)||!j(v,l)||!o&&3===e.nodeType&&1===e.nodeValue.length&&65279===e.nodeValue.charCodeAt(0)||c(e)||d.inline&&Y(e)?(h=0,at(st(e.childNodes),r),b&&(p=x),h=0):(h||(h=U.clone(f,Q),e.parentNode.insertBefore(h,e),a.push(h)),h.appendChild(e)))}var h;at(e,r)}),d.links===!0&&at(a,function(e){function t(e){"A"===e.nodeName&&i(e,d),at(st(e.childNodes),t)}t(e)}),at(a,function(e){function r(e){var t=0;return at(e.childNodes,function(e){B(e)||ot(e)||t++}),t}function o(e){var t,n;return at(e.childNodes,function(e){return 1!=e.nodeType||ot(e)||c(e)?void 0:(t=e,Q)}),t&&!ot(t)&&k(t,d)&&(n=U.clone(t,Q),i(n),U.replace(n,e,Z),U.remove(t,1)),n||e}var s;if(s=r(e),(a.length>1||!Y(e))&&0===s)return void U.remove(e,1);if(d.inline||d.wrapper){if(d.exact||1!==s||(e=o(e)),at(u,function(t){at(U.select(t.inline,e),function(e){ot(e)||H(t,n,e,t.exact?e:null)})}),C(e.parentNode,t,n))return U.remove(e,1),e=0,Z;d.merge_with_parents&&U.getParent(e.parentNode,function(r){return C(r,t,n)?(U.remove(e,1),e=0,Z):void 0}),e&&d.merge_siblings!==!1&&(e=I(O(e),e),e=I(e,O(e,Z)))}})}var u=f(t),d=u[0],p,h,m=!r&&$.isCollapsed();if(d)if(r)r.nodeType?(h=U.createRng(),h.setStartBefore(r),h.setEndAfter(r),l(L(h,u),null,!0)):l(r,null,!0);else if(m&&d.inline&&!U.select("td.mce-item-selected,th.mce-item-selected").length)z("apply",t,n);else{var y=a.selection.getNode();K||!u[0].defaultBlock||U.getParent(y,U.isBlock)||v(u[0].defaultBlock),a.selection.setRng(o()),p=$.getBookmark(),l(L($.getRng(Z),u),p),d.styles&&(d.styles.color||d.styles.textDecoration)&&(lt(y,g,"childNodes"),g(y)),$.moveToBookmark(p),W($.getRng(Z)),a.nodeChanged()}}function y(e,t,n,r){function i(e){var n,r,o,a,s;if(1===e.nodeType&&nt(e)&&(a=y,y="true"===nt(e),s=!0),n=st(e.childNodes),y&&!s)for(r=0,o=p.length;o>r&&!H(p[r],t,e,e);r++);if(h.deep&&n.length){for(r=0,o=n.length;o>r;r++)i(n[r]);s&&(y=a)}}function o(n){var i;return at(l(n.parentNode).reverse(),function(n){var o;i||"_start"==n.id||"_end"==n.id||(o=C(n,e,t,r),o&&o.split!==!1&&(i=n))}),i}function s(e,n,r,i){var o,a,s,l,c,u;if(e){for(u=e.parentNode,o=n.parentNode;o&&o!=u;o=o.parentNode){for(a=U.clone(o,Q),c=0;c<p.length;c++)if(H(p[c],t,a,a)){a=0;break}a&&(s&&a.appendChild(s),l||(l=a),s=a)}!i||h.mixed&&Y(e)||(n=U.split(e,n)),s&&(r.parentNode.insertBefore(s,r),l.appendChild(r))}return n}function c(e){return s(o(e),e,e,!0)}function u(e){var t=U.get(e?"_start":"_end"),n=t[e?"firstChild":"lastChild"];return ot(n)&&(n=n[e?"firstChild":"lastChild"]),3==n.nodeType&&0===n.data.length&&(n=e?t.previousSibling||t.nextSibling:t.nextSibling||t.previousSibling),U.remove(t,!0),n}function d(e){var t,n,r=e.commonAncestorContainer;e=L(e,p,Z),h.split&&(t=F(e,Z),n=F(e),t!=n?(/^(TR|TH|TD)$/.test(t.nodeName)&&t.firstChild&&(t="TR"==t.nodeName?t.firstChild.firstChild||t:t.firstChild||t),r&&/^T(HEAD|BODY|FOOT|R)$/.test(r.nodeName)&&/^(TH|TD)$/.test(n.nodeName)&&n.firstChild&&(n=n.firstChild||n),t=D(t,"span",{id:"_start","data-mce-type":"bookmark"}),n=D(n,"span",{id:"_end","data-mce-type":"bookmark"}),c(t),c(n),t=u(Z),n=u()):t=n=c(t),e.startContainer=t.parentNode?t.parentNode:t,e.startOffset=G(t),e.endContainer=n.parentNode?n.parentNode:n,e.endOffset=G(n)+1),q.walk(e,function(e){at(e,function(e){i(e),1===e.nodeType&&"underline"===a.dom.getStyle(e,"text-decoration")&&e.parentNode&&"underline"===m(e.parentNode)&&H({deep:!1,exact:!0,inline:"span",styles:{textDecoration:"underline"}},null,e)})})}var p=f(e),h=p[0],g,v,y=!0;return n?void(n.nodeType?(v=U.createRng(),v.setStartBefore(n),v.setEndAfter(n),d(v)):d(n)):void($.isCollapsed()&&h.inline&&!U.select("td.mce-item-selected,th.mce-item-selected").length?z("remove",e,t,r):(g=$.getBookmark(),d($.getRng(Z)),$.moveToBookmark(g),h.inline&&x(e,t,$.getStart())&&W($.getRng(!0)),a.nodeChanged()))}function b(e,t,n){var r=f(e);!x(e,t,n)||"toggle"in r[0]&&!r[0].toggle?v(e,t,n):y(e,t,n)}function C(e,t,n,r){function i(e,t,i){var o,a,s=t[i],l;if(t.onmatch)return t.onmatch(e,t,i);if(s)if(s.length===tt){for(o in s)if(s.hasOwnProperty(o)){if(a="attributes"===i?U.getAttrib(e,o):T(e,o),r&&!a&&!t.exact)return;if((!r||t.exact)&&!S(a,R(A(s[o],n),o)))return}}else for(l=0;l<s.length;l++)if("attributes"===i?U.getAttrib(e,s[l]):T(e,s[l]))return t;return t}var o=f(t),a,s,l;if(o&&e)for(s=0;s<o.length;s++)if(a=o[s],k(e,a)&&i(e,a,"attributes")&&i(e,a,"styles")){if(l=a.classes)for(s=0;s<l.length;s++)if(!U.hasClass(e,l[s]))return;return a}}function x(e,t,n){function r(n){var r=U.getRoot();return n===r?!1:(n=U.getParent(n,function(n){return n.parentNode===r||!!C(n,e,t,!0)}),C(n,e,t))}var i;return n?r(n):(n=$.getNode(),r(n)?Z:(i=$.getStart(),i!=n&&r(i)?Z:Q))}function w(e,t){var n,r=[],i={};return n=$.getStart(),U.getParent(n,function(n){var o,a;for(o=0;o<e.length;o++)a=e[o],!i[a]&&C(n,a,t)&&(i[a]=!0,r.push(a))},U.getRoot()),r}function _(e){var t=f(e),n,r,i,o,a;if(t)for(n=$.getStart(),r=l(n),o=t.length-1;o>=0;o--){if(a=t[o].selector,!a||t[o].defaultBlock)return Z;for(i=r.length-1;i>=0;i--)if(U.is(r[i],a))return Z}return Q}function E(e,t,n){var r;return et||(et={},r={},a.on("NodeChange",function(e){var t=l(e.element),n={};t=i.grep(t,function(e){return 1==e.nodeType&&!e.getAttribute("data-mce-bogus")}),at(et,function(e,i){at(t,function(o){return C(o,i,{},e.similar)?(r[i]||(at(e,function(e){e(!0,{node:o,format:i,parents:t})}),r[i]=e),n[i]=e,!1):void 0})}),at(r,function(i,o){n[o]||(delete r[o],at(i,function(n){n(!1,{node:e.element,format:o,parents:t})}))})})),at(e.split(","),function(e){et[e]||(et[e]=[],et[e].similar=n),et[e].push(t)}),this}function N(e){return o.getCssText(a,e)}function k(e,t){return S(e,t.inline)?Z:S(e,t.block)?Z:t.selector?1==e.nodeType&&U.is(e,t.selector):void 0}function S(e,t){return e=e||"",t=t||"",e=""+(e.nodeName||e),t=""+(t.nodeName||t),e.toLowerCase()==t.toLowerCase()}function T(e,t){return R(U.getStyle(e,t),t)}function R(e,t){return("color"==t||"backgroundColor"==t)&&(e=U.toHex(e)),"fontWeight"==t&&700==e&&(e="bold"),"fontFamily"==t&&(e=e.replace(/[\'\"]/g,"").replace(/,\s+/g,",")),""+e}function A(e,t){return"string"!=typeof e?e=e(t):t&&(e=e.replace(/%(\w+)/g,function(e,n){return t[n]||e})),e}function B(e){return e&&3===e.nodeType&&/^([\t \r\n]+|)$/.test(e.nodeValue)}function D(e,t,n){var r=U.create(t,n);return e.parentNode.insertBefore(r,e),r.appendChild(e),r}function L(t,n,r){function i(e){function t(e){return"BR"==e.nodeName&&e.getAttribute("data-mce-bogus")&&!e.nextSibling}var r,i,o,a,s;if(r=i=e?g:y,a=e?"previousSibling":"nextSibling",s=U.getRoot(),3==r.nodeType&&!B(r)&&(e?v>0:b<r.nodeValue.length))return r;for(;;){if(!n[0].block_expand&&Y(i))return i;for(o=i[a];o;o=o[a])if(!ot(o)&&!B(o)&&!t(o))return i;if(i.parentNode==s){r=i;break}i=i.parentNode}return r}function o(e,t){for(t===tt&&(t=3===e.nodeType?e.length:e.childNodes.length);e&&e.hasChildNodes();)e=e.childNodes[t],e&&(t=3===e.nodeType?e.length:e.childNodes.length);return{node:e,offset:t}}function c(e){for(var t=e;t;){if(1===t.nodeType&&nt(t))return"false"===nt(t)?t:e;t=t.parentNode}return e}function u(t,n,i){function o(e,t){var n,o,a=e.nodeValue;return"undefined"==typeof t&&(t=i?a.length:0),i?(n=a.lastIndexOf(" ",t),o=a.lastIndexOf("\xa0",t),n=n>o?n:o,-1===n||r||n++):(n=a.indexOf(" ",t),o=a.indexOf("\xa0",t),n=-1!==n&&(-1===o||o>n)?n:o),n}var s,l,c,u;if(3===t.nodeType){if(c=o(t,n),-1!==c)return{container:t,offset:c};u=t}for(s=new e(t,U.getParent(t,Y)||a.getBody());l=s[i?"prev":"next"]();)if(3===l.nodeType){if(u=l,c=o(l),-1!==c)return{container:l,offset:c}}else if(Y(l))break;return u?(n=i?0:u.length,{container:u,offset:n}):void 0}function d(e,r){var i,o,a,s;for(3==e.nodeType&&0===e.nodeValue.length&&e[r]&&(e=e[r]),i=l(e),o=0;o<i.length;o++)for(a=0;a<n.length;a++)if(s=n[a],!("collapsed"in s&&s.collapsed!==t.collapsed)&&U.is(i[o],s.selector))return i[o];return e}function f(e,t){var r,i=U.getRoot();if(n[0].wrapper||(r=U.getParent(e,n[0].block,i)),r||(r=U.getParent(3==e.nodeType?e.parentNode:e,function(e){return e!=i&&s(e)})),r&&n[0].wrapper&&(r=l(r,"ul,ol").reverse()[0]||r),!r)for(r=e;r[t]&&!Y(r[t])&&(r=r[t],!S(r,"br")););return r||e}var p,h,m,g=t.startContainer,v=t.startOffset,y=t.endContainer,b=t.endOffset;if(1==g.nodeType&&g.hasChildNodes()&&(p=g.childNodes.length-1,g=g.childNodes[v>p?p:v],3==g.nodeType&&(v=0)),1==y.nodeType&&y.hasChildNodes()&&(p=y.childNodes.length-1,y=y.childNodes[b>p?p:b-1],3==y.nodeType&&(b=y.nodeValue.length)),g=c(g),y=c(y),(ot(g.parentNode)||ot(g))&&(g=ot(g)?g:g.parentNode,g=g.nextSibling||g,3==g.nodeType&&(v=0)),(ot(y.parentNode)||ot(y))&&(y=ot(y)?y:y.parentNode,y=y.previousSibling||y,3==y.nodeType&&(b=y.length)),n[0].inline&&(t.collapsed&&(m=u(g,v,!0),m&&(g=m.container,v=m.offset),m=u(y,b),m&&(y=m.container,b=m.offset)),h=o(y,b),h.node)){for(;h.node&&0===h.offset&&h.node.previousSibling;)h=o(h.node.previousSibling);h.node&&h.offset>0&&3===h.node.nodeType&&" "===h.node.nodeValue.charAt(h.offset-1)&&h.offset>1&&(y=h.node,y.splitText(h.offset-1))}return(n[0].inline||n[0].block_expand)&&(n[0].inline&&3==g.nodeType&&0!==v||(g=i(!0)),n[0].inline&&3==y.nodeType&&b!==y.nodeValue.length||(y=i())),n[0].selector&&n[0].expand!==Q&&!n[0].inline&&(g=d(g,"previousSibling"),y=d(y,"nextSibling")),(n[0].block||n[0].selector)&&(g=f(g,"previousSibling"),y=f(y,"nextSibling"),n[0].block&&(Y(g)||(g=i(!0)),Y(y)||(y=i()))),1==g.nodeType&&(v=G(g),g=g.parentNode),1==y.nodeType&&(b=G(y)+1,y=y.parentNode),{startContainer:g,startOffset:v,endContainer:y,endOffset:b}}function M(e,t){return t.links&&"A"==e.tagName}function H(e,t,n,r){var i,o,a;if(!k(n,e)&&!M(n,e))return Q;if("all"!=e.remove)for(at(e.styles,function(i,o){i=R(A(i,t),o),"number"==typeof o&&(o=i,r=0),(e.remove_similar||!r||S(T(r,o),i))&&U.setStyle(n,o,""),a=1}),a&&""===U.getAttrib(n,"style")&&(n.removeAttribute("style"),n.removeAttribute("data-mce-style")),at(e.attributes,function(e,i){var o;if(e=A(e,t),"number"==typeof i&&(i=e,r=0),!r||S(U.getAttrib(r,i),e)){if("class"==i&&(e=U.getAttrib(n,i),e&&(o="",at(e.split(/\s+/),function(e){/mce\-\w+/.test(e)&&(o+=(o?" ":"")+e)}),o)))return void U.setAttrib(n,i,o);"class"==i&&n.removeAttribute("className"),J.test(i)&&n.removeAttribute("data-mce-"+i),n.removeAttribute(i)}}),at(e.classes,function(e){e=A(e,t),(!r||U.hasClass(r,e))&&U.removeClass(n,e)}),o=U.getAttribs(n),i=0;i<o.length;i++)if(0!==o[i].nodeName.indexOf("_"))return Q;return"none"!=e.remove?(P(n,e),Z):void 0}function P(e,t){function n(e,t,n){return e=O(e,t,n),!e||"BR"==e.nodeName||Y(e)}var r=e.parentNode,i;t.block&&(K?r==U.getRoot()&&(t.list_block&&S(e,t.list_block)||at(st(e.childNodes),function(e){j(K,e.nodeName.toLowerCase())?i?i.appendChild(e):(i=D(e,K),U.setAttribs(i,a.settings.forced_root_block_attrs)):i=0})):Y(e)&&!Y(r)&&(n(e,Q)||n(e.firstChild,Z,1)||e.insertBefore(U.create("br"),e.firstChild),n(e,Z)||n(e.lastChild,Q,1)||e.appendChild(U.create("br")))),t.selector&&t.inline&&!S(t.inline,e)||U.remove(e,1)}function O(e,t,n){if(e)for(t=t?"nextSibling":"previousSibling",e=n?e:e[t];e;e=e[t])if(1==e.nodeType||!B(e))return e}function I(e,t){function n(e,t){for(i=e;i;i=i[t]){if(3==i.nodeType&&0!==i.nodeValue.length)return e;if(1==i.nodeType&&!ot(i))return i}return e}var i,o,a=new r(U);if(e&&t&&(e=n(e,"previousSibling"),t=n(t,"nextSibling"),a.compare(e,t))){for(i=e.nextSibling;i&&i!=t;)o=i,i=i.nextSibling,e.appendChild(o);return U.remove(t),at(st(t.childNodes),function(t){e.appendChild(t)}),e}return t}function F(t,n){var r,i,o;return r=t[n?"startContainer":"endContainer"],i=t[n?"startOffset":"endOffset"],1==r.nodeType&&(o=r.childNodes.length-1,!n&&i&&i--,r=r.childNodes[i>o?o:i]),3===r.nodeType&&n&&i>=r.nodeValue.length&&(r=new e(r,a.getBody()).next()||r),3!==r.nodeType||n||0!==i||(r=new e(r,a.getBody()).prev()||r),r}function z(t,n,r,i){function o(e){var t=U.create("span",{id:g,"data-mce-bogus":!0,style:b?"color:red":""});return e&&t.appendChild(a.getDoc().createTextNode(X)),t}function l(e,t){for(;e;){if(3===e.nodeType&&e.nodeValue!==X||e.childNodes.length>1)return!1;t&&1===e.nodeType&&t.push(e),e=e.firstChild}return!0}function c(e){for(;e;){if(e.id===g)return e;e=e.parentNode}}function u(t){var n;if(t)for(n=new e(t,t),t=n.current();t;t=n.next())if(3===t.nodeType)return t}function d(e,t){var n,r;if(e)r=$.getRng(!0),l(e)?(t!==!1&&(r.setStartBefore(e),r.setEndBefore(e)),U.remove(e)):(n=u(e),n.nodeValue.charAt(0)===X&&(n.deleteData(0,1),r.startContainer==n&&r.startOffset>0&&r.setStart(n,r.startOffset-1),r.endContainer==n&&r.endOffset>0&&r.setEnd(n,r.endOffset-1)),U.remove(e,1)),$.setRng(r);else if(e=c($.getStart()),!e)for(;e=U.get(g);)d(e,!1)}function p(){var e,t,i,a,s,l,d;e=$.getRng(!0),a=e.startOffset,l=e.startContainer,d=l.nodeValue,t=c($.getStart()),t&&(i=u(t)),d&&a>0&&a<d.length&&/\w/.test(d.charAt(a))&&/\w/.test(d.charAt(a-1))?(s=$.getBookmark(),e.collapse(!0),e=L(e,f(n)),e=q.split(e),v(n,r,e),$.moveToBookmark(s)):(t&&i.nodeValue===X?v(n,r,t):(t=o(!0),i=t.firstChild,e.insertNode(t),a=1,v(n,r,t)),$.setCursorLocation(i,a))}function h(){var e=$.getRng(!0),t,a,l,c,u,d,p=[],h,m;for(t=e.startContainer,a=e.startOffset,u=t,3==t.nodeType&&(a!=t.nodeValue.length&&(c=!0),u=u.parentNode);u;){if(C(u,n,r,i)){d=u;break}u.nextSibling&&(c=!0),p.push(u),u=u.parentNode}if(d)if(c)l=$.getBookmark(),e.collapse(!0),e=L(e,f(n),!0),e=q.split(e),y(n,r,e),$.moveToBookmark(l);else{for(m=o(),u=m,h=p.length-1;h>=0;h--)u.appendChild(U.clone(p[h],!1)),u=u.firstChild;u.appendChild(U.doc.createTextNode(X)),u=u.firstChild;var g=U.getParent(d,s);g&&U.isEmpty(g)?d.parentNode.replaceChild(m,d):U.insertAfter(m,d),$.setCursorLocation(u,1),U.isEmpty(d)&&U.remove(d)}}function m(){var e;e=c($.getStart()),e&&!U.isEmpty(e)&&lt(e,function(e){1!=e.nodeType||e.id===g||U.isEmpty(e)||U.setAttrib(e,"data-mce-bogus",null)},"childNodes")}var g="_mce_caret",b=a.settings.caret_debug;a._hasCaretEvents||(it=function(){var e=[],t;if(l(c($.getStart()),e))for(t=e.length;t--;)U.setAttrib(e[t],"data-mce-bogus","1")},rt=function(e){var t=e.keyCode;d(),(8==t&&$.isCollapsed()||37==t||39==t)&&d(c($.getStart())),m()},a.on("SetContent",function(e){e.selection&&m()}),a._hasCaretEvents=!0),"apply"==t?p():h()}function W(t){var n=t.startContainer,r=t.startOffset,i,o,a,s,l;if(3==n.nodeType&&r>=n.nodeValue.length&&(r=G(n),n=n.parentNode,i=!0),1==n.nodeType)for(s=n.childNodes,n=s[Math.min(r,s.length-1)],o=new e(n,U.getParent(n,U.isBlock)),(r>s.length-1||i)&&o.next(),a=o.current();a;a=o.next())if(3==a.nodeType&&!B(a))return l=U.create("a",{"data-mce-bogus":"all"},X),a.parentNode.insertBefore(l,a),t.setStart(a,0),$.setRng(t),void U.remove(l)}var V={},U=a.dom,$=a.selection,q=new t(U),j=a.schema.isValidChild,Y=U.isBlock,K=a.settings.forced_root_block,G=U.nodeIndex,X="\ufeff",J=/^(src|href|style)$/,Q=!1,Z=!0,et,tt,nt=U.getContentEditable,rt,it,ot=n.isBookmarkNode,at=i.each,st=i.grep,lt=i.walk,ct=i.extend;ct(this,{get:f,register:p,unregister:h,apply:v,remove:y,toggle:b,match:x,matchAll:w,matchNode:C,canApply:_,formatChanged:E,getCssText:N}),u(),d(),a.on("BeforeGetContent",function(e){it&&"raw"!=e.format&&it()}),a.on("mouseup keydown",function(e){rt&&rt(e)})}}),r(I,[B,u,d,N],function(e,t,n,r){var i=n.trim,o;return o=new RegExp(["<span[^>]+data-mce-bogus[^>]+>[\u200b\ufeff]+<\\/span>",'\\s?data-mce-selected="[^"]+"'].join("|"),"gi"),function(n){function a(){var e=n.getContent({format:"raw",no_events:1}),t=/<(\w+) [^>]*data-mce-bogus="all"[^>]*>/g,a,s,l,c,u,d=n.schema;for(e=e.replace(o,""),u=d.getShortEndedElements();c=t.exec(e);)s=t.lastIndex,l=c[0].length,a=u[c[1]]?s:r.findEndTag(d,e,s),e=e.substring(0,s-l)+e.substring(a),t.lastIndex=s-l;return i(e)}function s(e){l.typing=!1,l.add({},e)}var l=this,c=0,u=[],d,f,p=0;return n.on("init",function(){l.add()}),n.on("BeforeExecCommand",function(e){var t=e.command;"Undo"!=t&&"Redo"!=t&&"mceRepaint"!=t&&l.beforeChange()}),n.on("ExecCommand",function(e){var t=e.command;"Undo"!=t&&"Redo"!=t&&"mceRepaint"!=t&&s(e)}),n.on("ObjectResizeStart",function(){l.beforeChange()}),n.on("SaveContent ObjectResized blur",s),n.on("DragEnd",s),n.on("KeyUp",function(e){var r=e.keyCode;(r>=33&&36>=r||r>=37&&40>=r||45==r||13==r||e.ctrlKey)&&(s(),n.nodeChanged()),(46==r||8==r||t.mac&&(91==r||93==r))&&n.nodeChanged(),f&&l.typing&&(n.isDirty()||(n.isNotDirty=!u[0]||a()==u[0].content,n.isNotDirty||n.fire("change",{level:u[0],lastLevel:null})),n.fire("TypingUndo"),f=!1,n.nodeChanged())}),n.on("KeyDown",function(t){var n=t.keyCode;if(n>=33&&36>=n||n>=37&&40>=n||45==n)return void(l.typing&&s(t));var r=e.modifierPressed(t);!(16>n||n>20)||224==n||91==n||l.typing||r||(l.beforeChange(),l.typing=!0,l.add({},t),f=!0)}),n.on("MouseDown",function(e){l.typing&&s(e)}),n.addShortcut("meta+z","","Undo"),n.addShortcut("meta+y,meta+shift+z","","Redo"),n.on("AddUndo Undo Redo ClearUndos",function(e){e.isDefaultPrevented()||n.nodeChanged()}),l={data:u,typing:!1,beforeChange:function(){p||(d=n.selection.getBookmark(2,!0))},add:function(e,t){var r,i=n.settings,o;if(e=e||{},e.content=a(),p||n.removed)return null;if(o=u[c],n.fire("BeforeAddUndo",{level:e,lastLevel:o,originalEvent:t}).isDefaultPrevented())return null;if(o&&o.content==e.content)return null;if(u[c]&&(u[c].beforeBookmark=d),i.custom_undo_redo_levels&&u.length>i.custom_undo_redo_levels){for(r=0;r<u.length-1;r++)u[r]=u[r+1];u.length--,c=u.length}e.bookmark=n.selection.getBookmark(2,!0),c<u.length-1&&(u.length=c+1),u.push(e),c=u.length-1;var s={level:e,lastLevel:o,originalEvent:t};return n.fire("AddUndo",s),c>0&&(n.isNotDirty=!1,n.fire("change",s)),e},undo:function(){var e;return l.typing&&(l.add(),l.typing=!1),c>0&&(e=u[--c],0===c&&(n.isNotDirty=!0),n.setContent(e.content,{format:"raw"}),n.selection.moveToBookmark(e.beforeBookmark),n.fire("undo",{level:e})),e},redo:function(){var e;return c<u.length-1&&(e=u[++c],n.setContent(e.content,{format:"raw"}),n.selection.moveToBookmark(e.bookmark),n.fire("redo",{level:e})),e},clear:function(){u=[],c=0,l.typing=!1,n.fire("ClearUndos")},hasUndo:function(){return c>0||l.typing&&u[0]&&a()!=u[0].content},hasRedo:function(){return c<u.length-1&&!this.typing},transact:function(e){l.beforeChange();try{p++,e()}finally{p--}l.add()}}}}),r(F,[h,x,u],function(e,t,n){var r=n.ie&&n.ie<11;return function(i){function o(o){function p(e){return e&&a.isBlock(e)&&!/^(TD|TH|CAPTION|FORM)$/.test(e.nodeName)&&!/^(fixed|absolute)/i.test(e.style.position)&&"true"!==a.getContentEditable(e)}function h(e){var t;a.isBlock(e)&&(t=s.getRng(),e.appendChild(a.create("span",null,"\xa0")),s.select(e),e.lastChild.outerHTML="",s.setRng(t))}function m(e){var t=e,n=[],r;if(t){for(;t=t.firstChild;){if(a.isBlock(t))return;1!=t.nodeType||d[t.nodeName.toLowerCase()]||n.push(t)}for(r=n.length;r--;)t=n[r],!t.hasChildNodes()||t.firstChild==t.lastChild&&""===t.firstChild.nodeValue?a.remove(t):"A"==t.nodeName&&" "===(t.innerText||t.textContent)&&a.remove(t)}}function g(t){function r(e){for(;e;){if(1==e.nodeType||3==e.nodeType&&e.data&&/[\r\n\s]/.test(e.data))return e;e=e.nextSibling}}var i,o,l,c=t,u;if(t){if(n.ie&&n.ie<9&&B&&B.firstChild&&B.firstChild==B.lastChild&&"BR"==B.firstChild.tagName&&a.remove(B.firstChild),/^(LI|DT|DD)$/.test(t.nodeName)){var d=r(t.firstChild);d&&/^(UL|OL|DL)$/.test(d.nodeName)&&t.insertBefore(a.doc.createTextNode("\xa0"),t.firstChild)}if(l=a.createRng(),n.ie||t.normalize(),t.hasChildNodes()){for(i=new e(t,t);o=i.current();){if(3==o.nodeType){l.setStart(o,0),l.setEnd(o,0);break}if(f[o.nodeName.toLowerCase()]){l.setStartBefore(o),l.setEndBefore(o);break}c=o,o=i.next()}o||(l.setStart(c,0),l.setEnd(c,0))}else"BR"==t.nodeName?t.nextSibling&&a.isBlock(t.nextSibling)?((!D||9>D)&&(u=a.create("br"),t.parentNode.insertBefore(u,t)),l.setStartBefore(t),l.setEndBefore(t)):(l.setStartAfter(t),l.setEndAfter(t)):(l.setStart(t,0),l.setEnd(t,0));s.setRng(l),a.remove(u),s.scrollIntoView(t)}}function v(e){var t=l.forced_root_block;t&&t.toLowerCase()===e.tagName.toLowerCase()&&a.setAttribs(e,l.forced_root_block_attrs)}function y(e){var t=R,n,i,o,s=u.getTextInlineElements();if(e||"TABLE"==O?(n=a.create(e||F),v(n)):n=B.cloneNode(!1),o=n,l.keep_styles!==!1)do if(s[t.nodeName]){if("_mce_caret"==t.id)continue;i=t.cloneNode(!1),a.setAttrib(i,"id",""),n.hasChildNodes()?(i.appendChild(n.firstChild),n.appendChild(i)):(o=i,n.appendChild(i))}while(t=t.parentNode);return r||(o.innerHTML='<br data-mce-bogus="1">'),n}function b(t){var n,r,i;if(3==R.nodeType&&(t?A>0:A<R.nodeValue.length))return!1;if(R.parentNode==B&&z&&!t)return!0;if(t&&1==R.nodeType&&R==B.firstChild)return!0;if("TABLE"===R.nodeName||R.previousSibling&&"TABLE"==R.previousSibling.nodeName)return z&&!t||!z&&t;for(n=new e(R,B),3==R.nodeType&&(t&&0===A?n.prev():t||A!=R.nodeValue.length||n.next());r=n.current();){if(1===r.nodeType){if(!r.getAttribute("data-mce-bogus")&&(i=r.nodeName.toLowerCase(),d[i]&&"br"!==i))return!1}else if(3===r.nodeType&&!/^[ \t\r\n]*$/.test(r.nodeValue))return!1;t?n.prev():n.next()}return!0}function C(e,t){var n,r,o,s,l,c,d=F||"P";if(r=a.getParent(e,a.isBlock),c=i.getBody().nodeName.toLowerCase(),!r||!p(r)){if(r=r||T,!r.hasChildNodes())return n=a.create(d),v(n),r.appendChild(n),k.setStart(n,0),k.setEnd(n,0),n;for(s=e;s.parentNode!=r;)s=s.parentNode;for(;s&&!a.isBlock(s);)o=s,s=s.previousSibling;if(o&&u.isValidChild(c,d.toLowerCase())){for(n=a.create(d),v(n),o.parentNode.insertBefore(n,o),s=o;s&&!a.isBlock(s);)l=s.nextSibling,n.appendChild(s),s=l;k.setStart(e,t),k.setEnd(e,t)}}return e}function x(){function e(e){for(var t=P[e?"firstChild":"lastChild"];t&&1!=t.nodeType;)t=t[e?"nextSibling":"previousSibling"];return t===B}function t(){var e=P.parentNode;return/^(LI|DT|DD)$/.test(e.nodeName)?e:P}var n=P.parentNode.nodeName;/^(OL|UL|LI)$/.test(n)&&(F="LI"),M=F?y(F):a.create("BR"),e(!0)&&e()?"LI"==n?a.insertAfter(M,t()):a.replace(M,P):e(!0)?"LI"==n?(a.insertAfter(M,t()),M.appendChild(a.doc.createTextNode(" ")),M.appendChild(P)):P.parentNode.insertBefore(M,P):e()?(a.insertAfter(M,t()),h(M)):(P=t(),S=k.cloneRange(),S.setStartAfter(B),S.setEndAfter(P),H=S.extractContents(),"LI"==F&&"LI"==H.firstChild.nodeName?(M=H.firstChild,a.insertAfter(H,P)):(a.insertAfter(H,P),a.insertAfter(M,P))),a.remove(B),g(M),c.add()}function w(){i.execCommand("InsertLineBreak",!1,o)}function _(e){do 3===e.nodeType&&(e.nodeValue=e.nodeValue.replace(/^[\r\n]+/,"")),e=e.firstChild;while(e)}function E(e){var t=a.getRoot(),n,r;for(n=e;n!==t&&"false"!==a.getContentEditable(n);)"true"===a.getContentEditable(n)&&(r=n),n=n.parentNode;return n!==t?r:t}function N(e){var t;r||(e.normalize(),t=e.lastChild,(!t||/^(left|right)$/gi.test(a.getStyle(t,"float",!0)))&&a.add(e,"br"))}var k,S,T,R,A,B,D,L,M,H,P,O,I,F,z;if(k=s.getRng(!0),!o.isDefaultPrevented()){if(!k.collapsed)return void i.execCommand("Delete");if(new t(a).normalize(k),R=k.startContainer,A=k.startOffset,F=(l.force_p_newlines?"p":"")||l.forced_root_block,F=F?F.toUpperCase():"",D=a.doc.documentMode,L=o.shiftKey,1==R.nodeType&&R.hasChildNodes()&&(z=A>R.childNodes.length-1,R=R.childNodes[Math.min(A,R.childNodes.length-1)]||R,A=z&&3==R.nodeType?R.nodeValue.length:0),T=E(R)){if(c.beforeChange(),!a.isBlock(T)&&T!=a.getRoot())return void((!F||L)&&w());if((F&&!L||!F&&L)&&(R=C(R,A)),B=a.getParent(R,a.isBlock),P=B?a.getParent(B.parentNode,a.isBlock):null,O=B?B.nodeName.toUpperCase():"",I=P?P.nodeName.toUpperCase():"","LI"!=I||o.ctrlKey||(B=P,O=I),/^(LI|DT|DD)$/.test(O)){if(!F&&L)return void w();if(a.isEmpty(B))return void x()}if("PRE"==O&&l.br_in_pre!==!1){if(!L)return void w()}else if(!F&&!L&&"LI"!=O||F&&L)return void w();F&&B===i.getBody()||(F=F||"P",b()?(M=/^(H[1-6]|PRE|FIGURE)$/.test(O)&&"HGROUP"!=I?y(F):y(),l.end_container_on_empty_block&&p(P)&&a.isEmpty(B)?M=a.split(P,B):a.insertAfter(M,B),g(M)):b(!0)?(M=B.parentNode.insertBefore(y(),B),h(M),g(B)):(S=k.cloneRange(),S.setEndAfter(B),H=S.extractContents(),_(H),M=H.firstChild,a.insertAfter(H,B),m(M),N(B),g(M)),a.setAttrib(M,"id",""),i.fire("NewBlock",{newBlock:M}),c.add())}}}var a=i.dom,s=i.selection,l=i.settings,c=i.undoManager,u=i.schema,d=u.getNonEmptyElements(),f=u.getMoveCaretBeforeOnEnterElements();i.on("keydown",function(e){13==e.keyCode&&o(e)!==!1&&e.preventDefault()})}}),r(z,[],function(){return function(e){function t(){var t=i.getStart(),s=e.getBody(),l,c,u,d,f,p,h,m=-16777215,g,v,y,b,C;if(C=n.forced_root_block,t&&1===t.nodeType&&C){for(;t&&t!=s;){if(a[t.nodeName])return;t=t.parentNode}if(l=i.getRng(),l.setStart){c=l.startContainer,u=l.startOffset,d=l.endContainer,f=l.endOffset;try{v=e.getDoc().activeElement===s}catch(x){}}else l.item&&(t=l.item(0),l=e.getDoc().body.createTextRange(),l.moveToElementText(t)),v=l.parentElement().ownerDocument===e.getDoc(),y=l.duplicate(),y.collapse(!0),u=-1*y.move("character",m),y.collapsed||(y=l.duplicate(),y.collapse(!1),f=-1*y.move("character",m)-u);for(t=s.firstChild,b=s.nodeName.toLowerCase();t;)if((3===t.nodeType||1==t.nodeType&&!a[t.nodeName])&&o.isValidChild(b,C.toLowerCase())){if(3===t.nodeType&&0===t.nodeValue.length){h=t,t=t.nextSibling,r.remove(h);continue}p||(p=r.create(C,e.settings.forced_root_block_attrs),t.parentNode.insertBefore(p,t),g=!0),h=t,t=t.nextSibling,p.appendChild(h)}else p=null,t=t.nextSibling;if(g&&v){if(l.setStart)l.setStart(c,u),l.setEnd(d,f),i.setRng(l);else try{l=e.getDoc().body.createTextRange(),l.moveToElementText(s),l.collapse(!0),l.moveStart("character",u),f>0&&l.moveEnd("character",f),l.select()}catch(x){}e.nodeChanged()}}}var n=e.settings,r=e.dom,i=e.selection,o=e.schema,a=o.getBlockElements();n.forced_root_block&&e.on("NodeChange",t)}}),r(W,[T,u,d,H,x,h],function(e,n,r,i,o,a){var s=r.each,l=r.extend,c=r.map,u=r.inArray,d=r.explode,f=n.gecko,p=n.ie,h=n.ie&&n.ie<11,m=!0,g=!1;return function(r){function v(e,t,n,i){var o,a,c=0;if(/^(mceAddUndoLevel|mceEndUndoLevel|mceBeginUndoLevel|mceRepaint)$/.test(e)||i&&i.skip_focus||r.focus(),i=l({},i),i=r.fire("BeforeExecCommand",{command:e,ui:t,value:n}),i.isDefaultPrevented())return!1;if(a=e.toLowerCase(),o=M.exec[a])return o(a,t,n),r.fire("ExecCommand",{command:e,ui:t,value:n}),!0;if(s(r.plugins,function(i){return i.execCommand&&i.execCommand(e,t,n)?(r.fire("ExecCommand",{command:e,ui:t,value:n}),c=!0,!1):void 0}),c)return c;if(r.theme&&r.theme.execCommand&&r.theme.execCommand(e,t,n))return r.fire("ExecCommand",{command:e,ui:t,value:n}),!0;
try{c=r.getDoc().execCommand(e,t,n)}catch(u){}return c?(r.fire("ExecCommand",{command:e,ui:t,value:n}),!0):!1}function y(e){var t;if(!r._isHidden()){if(e=e.toLowerCase(),t=M.state[e])return t(e);try{return r.getDoc().queryCommandState(e)}catch(n){}return!1}}function b(e){var t;if(!r._isHidden()){if(e=e.toLowerCase(),t=M.value[e])return t(e);try{return r.getDoc().queryCommandValue(e)}catch(n){}}}function C(e,t){t=t||"exec",s(e,function(e,n){s(n.toLowerCase().split(","),function(n){M[t][n]=e})})}function x(e,t,n){e=e.toLowerCase(),M.exec[e]=function(e,i,o,a){return t.call(n||r,i,o,a)}}function w(e){if(e=e.toLowerCase(),M.exec[e])return!0;try{return r.getDoc().queryCommandSupported(e)}catch(t){}return!1}function _(e,t,n){e=e.toLowerCase(),M.state[e]=function(){return t.call(n||r)}}function E(e,t,n){e=e.toLowerCase(),M.value[e]=function(){return t.call(n||r)}}function N(e){return e=e.toLowerCase(),!!M.exec[e]}function k(e,n,i){return n===t&&(n=g),i===t&&(i=null),r.getDoc().execCommand(e,n,i)}function S(e){return L.match(e)}function T(e,n){L.toggle(e,n?{value:n}:t),r.nodeChanged()}function R(e){P=D.getBookmark(e)}function A(){D.moveToBookmark(P)}var B,D,L,M={state:{},exec:{},value:{}},H=r.settings,P;r.on("PreInit",function(){B=r.dom,D=r.selection,H=r.settings,L=r.formatter}),l(this,{execCommand:v,queryCommandState:y,queryCommandValue:b,queryCommandSupported:w,addCommands:C,addCommand:x,addQueryStateHandler:_,addQueryValueHandler:E,hasCustomCommand:N}),C({"mceResetDesignMode,mceBeginUndoLevel":function(){},"mceEndUndoLevel,mceAddUndoLevel":function(){r.undoManager.add()},"Cut,Copy,Paste":function(e){var t=r.getDoc(),i;try{k(e)}catch(o){i=m}if(i||!t.queryCommandSupported(e)){var a=r.translate("Your browser doesn't support direct access to the clipboard. Please use the Ctrl+X/C/V keyboard shortcuts instead.");n.mac&&(a=a.replace(/Ctrl\+/g,"\u2318+")),r.windowManager.alert(a)}},unlink:function(){if(D.isCollapsed()){var e=D.getNode();return void("A"==e.tagName&&r.dom.remove(e,!0))}L.remove("link")},"JustifyLeft,JustifyCenter,JustifyRight,JustifyFull":function(e){var t=e.substring(7);"full"==t&&(t="justify"),s("left,center,right,justify".split(","),function(e){t!=e&&L.remove("align"+e)}),T("align"+t),v("mceRepaint")},"InsertUnorderedList,InsertOrderedList":function(e){var t,n;k(e),t=B.getParent(D.getNode(),"ol,ul"),t&&(n=t.parentNode,/^(H[1-6]|P|ADDRESS|PRE)$/.test(n.nodeName)&&(R(),B.split(n,t),A()))},"Bold,Italic,Underline,Strikethrough,Superscript,Subscript":function(e){T(e)},"ForeColor,HiliteColor,FontName":function(e,t,n){T(e,n)},FontSize:function(e,t,n){var r,i;n>=1&&7>=n&&(i=d(H.font_size_style_values),r=d(H.font_size_classes),n=r?r[n-1]||n:i[n-1]||n),T(e,n)},RemoveFormat:function(e){L.remove(e)},mceBlockQuote:function(){T("blockquote")},FormatBlock:function(e,t,n){return T(n||"p")},mceCleanup:function(){var e=D.getBookmark();r.setContent(r.getContent({cleanup:m}),{cleanup:m}),D.moveToBookmark(e)},mceRemoveNode:function(e,t,n){var i=n||D.getNode();i!=r.getBody()&&(R(),r.dom.remove(i,m),A())},mceSelectNodeDepth:function(e,t,n){var i=0;B.getParent(D.getNode(),function(e){return 1==e.nodeType&&i++==n?(D.select(e),g):void 0},r.getBody())},mceSelectNode:function(e,t,n){D.select(n)},mceInsertContent:function(t,n,o){function a(e){function t(e){return r[e]&&3==r[e].nodeType}var n,r,i;return n=D.getRng(!0),r=n.startContainer,i=n.startOffset,3==r.nodeType&&(i>0?e=e.replace(/^&nbsp;/," "):t("previousSibling")||(e=e.replace(/^ /,"&nbsp;")),i<r.length?e=e.replace(/&nbsp;(<br>|)$/," "):t("nextSibling")||(e=e.replace(/(&nbsp;| )(<br>|)$/,"&nbsp;"))),e}function l(){var e,t,n;e=D.getRng(!0),t=e.startContainer,n=e.startOffset,3==t.nodeType&&e.collapsed&&("\xa0"===t.data[n]?(t.deleteData(n,1),/[\u00a0| ]$/.test(o)||(o+=" ")):"\xa0"===t.data[n-1]&&(t.deleteData(n-1,1),/[\u00a0| ]$/.test(o)||(o=" "+o)))}function c(e){if(_)for(C=e.firstChild;C;C=C.walk(!0))E[C.name]&&C.attr("data-mce-new","true")}function u(){if(_){var e=r.getBody(),t=new i(B);s(B.select("*[data-mce-new]"),function(n){n.removeAttribute("data-mce-new");for(var r=n.parentNode;r&&r!=e;r=r.parentNode)t.compare(r,n)&&B.remove(n,!0)})}}var d,f,h,m,g,v,y,b,C,x,w,_,E=r.schema.getTextInlineElements();"string"!=typeof o&&(_=o.merge,o=o.content),/^ | $/.test(o)&&(o=a(o)),d=r.parser,f=new e({},r.schema),w='<span id="mce_marker" data-mce-type="bookmark">&#xFEFF;&#x200B;</span>',v={content:o,format:"html",selection:!0},r.fire("BeforeSetContent",v),o=v.content,-1==o.indexOf("{$caret}")&&(o+="{$caret}"),o=o.replace(/\{\$caret\}/,w),b=D.getRng();var N=b.startContainer||(b.parentElement?b.parentElement():null),k=r.getBody();N===k&&D.isCollapsed()&&B.isBlock(k.firstChild)&&B.isEmpty(k.firstChild)&&(b=B.createRng(),b.setStart(k.firstChild,0),b.setEnd(k.firstChild,0),D.setRng(b)),D.isCollapsed()||(r.getDoc().execCommand("Delete",!1,null),l()),h=D.getNode();var S={context:h.nodeName.toLowerCase()};if(g=d.parse(o,S),c(g),C=g.lastChild,"mce_marker"==C.attr("id"))for(y=C,C=C.prev;C;C=C.walk(!0))if(3==C.type||!B.isBlock(C.name)){r.schema.isValidChild(C.parent.name,"span")&&C.parent.insert(y,C,"br"===C.name);break}if(S.invalid){for(D.setContent(w),h=D.getNode(),m=r.getBody(),9==h.nodeType?h=C=m:C=h;C!==m;)h=C,C=C.parentNode;o=h==m?m.innerHTML:B.getOuterHTML(h),o=f.serialize(d.parse(o.replace(/<span (id="mce_marker"|id=mce_marker).+?<\/span>/i,function(){return f.serialize(g)}))),h==m?B.setHTML(m,o):B.setOuterHTML(h,o)}else o=f.serialize(g),C=h.firstChild,x=h.lastChild,!C||C===x&&"BR"===C.nodeName?B.setHTML(h,o):D.setContent(o);u(),y=B.get("mce_marker"),D.scrollIntoView(y),b=B.createRng(),C=y.previousSibling,C&&3==C.nodeType?(b.setStart(C,C.nodeValue.length),p||(x=y.nextSibling,x&&3==x.nodeType&&(C.appendData(x.data),x.parentNode.removeChild(x)))):(b.setStartBefore(y),b.setEndBefore(y)),B.remove(y),D.setRng(b),r.fire("SetContent",v),r.addVisual()},mceInsertRawHTML:function(e,t,n){D.setContent("tiny_mce_marker"),r.setContent(r.getContent().replace(/tiny_mce_marker/g,function(){return n}))},mceToggleFormat:function(e,t,n){T(n)},mceSetContent:function(e,t,n){r.setContent(n)},"Indent,Outdent":function(e){var t,n,i;t=H.indentation,n=/[a-z%]+$/i.exec(t),t=parseInt(t,10),y("InsertUnorderedList")||y("InsertOrderedList")?k(e):(H.forced_root_block||B.getParent(D.getNode(),B.isBlock)||L.apply("div"),s(D.getSelectedBlocks(),function(o){if("LI"!=o.nodeName){var a=r.getParam("indent_use_margin",!1)?"margin":"padding";a+="rtl"==B.getStyle(o,"direction",!0)?"Right":"Left","outdent"==e?(i=Math.max(0,parseInt(o.style[a]||0,10)-t),B.setStyle(o,a,i?i+n:"")):(i=parseInt(o.style[a]||0,10)+t+n,B.setStyle(o,a,i))}}))},mceRepaint:function(){if(f)try{R(m),D.getSel()&&D.getSel().selectAllChildren(r.getBody()),D.collapse(m),A()}catch(e){}},InsertHorizontalRule:function(){r.execCommand("mceInsertContent",!1,"<hr />")},mceToggleVisualAid:function(){r.hasVisual=!r.hasVisual,r.addVisual()},mceReplaceContent:function(e,t,n){r.execCommand("mceInsertContent",!1,n.replace(/\{\$selection\}/g,D.getContent({format:"text"})))},mceInsertLink:function(e,t,n){var r;"string"==typeof n&&(n={href:n}),r=B.getParent(D.getNode(),"a"),n.href=n.href.replace(" ","%20"),r&&n.href||L.remove("link"),n.href&&L.apply("link",n,r)},selectAll:function(){var e=B.getRoot(),t;D.getRng().setStart?(t=B.createRng(),t.setStart(e,0),t.setEnd(e,e.childNodes.length),D.setRng(t)):(t=D.getRng(),t.item||(t.moveToElementText(e),t.select()))},"delete":function(){k("Delete");var e=r.getBody();B.isEmpty(e)&&(r.setContent(""),e.firstChild&&B.isBlock(e.firstChild)?r.selection.setCursorLocation(e.firstChild,0):r.selection.setCursorLocation(e,0))},mceNewDocument:function(){r.setContent("")},InsertLineBreak:function(e,t,n){function i(){for(var e=new a(p,v),t,n=r.schema.getNonEmptyElements();t=e.next();)if(n[t.nodeName.toLowerCase()]||t.length>0)return!0}var s=n,l,c,u,d=D.getRng(!0);new o(B).normalize(d);var f=d.startOffset,p=d.startContainer;if(1==p.nodeType&&p.hasChildNodes()){var g=f>p.childNodes.length-1;p=p.childNodes[Math.min(f,p.childNodes.length-1)]||p,f=g&&3==p.nodeType?p.nodeValue.length:0}var v=B.getParent(p,B.isBlock),y=v?v.nodeName.toUpperCase():"",b=v?B.getParent(v.parentNode,B.isBlock):null,C=b?b.nodeName.toUpperCase():"",x=s&&s.ctrlKey;"LI"!=C||x||(v=b,y=C),p&&3==p.nodeType&&f>=p.nodeValue.length&&(h||i()||(l=B.create("br"),d.insertNode(l),d.setStartAfter(l),d.setEndAfter(l),c=!0)),l=B.create("br"),d.insertNode(l);var w=B.doc.documentMode;return h&&"PRE"==y&&(!w||8>w)&&l.parentNode.insertBefore(B.doc.createTextNode("\r"),l),u=B.create("span",{},"&nbsp;"),l.parentNode.insertBefore(u,l),D.scrollIntoView(u),B.remove(u),c?(d.setStartBefore(l),d.setEndBefore(l)):(d.setStartAfter(l),d.setEndAfter(l)),D.setRng(d),r.undoManager.add(),m}}),C({"JustifyLeft,JustifyCenter,JustifyRight,JustifyFull":function(e){var t="align"+e.substring(7),n=D.isCollapsed()?[B.getParent(D.getNode(),B.isBlock)]:D.getSelectedBlocks(),r=c(n,function(e){return!!L.matchNode(e,t)});return-1!==u(r,m)},"Bold,Italic,Underline,Strikethrough,Superscript,Subscript":function(e){return S(e)},mceBlockQuote:function(){return S("blockquote")},Outdent:function(){var e;if(H.inline_styles){if((e=B.getParent(D.getStart(),B.isBlock))&&parseInt(e.style.paddingLeft,10)>0)return m;if((e=B.getParent(D.getEnd(),B.isBlock))&&parseInt(e.style.paddingLeft,10)>0)return m}return y("InsertUnorderedList")||y("InsertOrderedList")||!H.inline_styles&&!!B.getParent(D.getNode(),"BLOCKQUOTE")},"InsertUnorderedList,InsertOrderedList":function(e){var t=B.getParent(D.getNode(),"ul,ol");return t&&("insertunorderedlist"===e&&"UL"===t.tagName||"insertorderedlist"===e&&"OL"===t.tagName)}},"state"),C({"FontSize,FontName":function(e){var t=0,n;return(n=B.getParent(D.getNode(),"span"))&&(t="fontsize"==e?n.style.fontSize:n.style.fontFamily.replace(/, /g,",").replace(/[\'\"]/g,"").toLowerCase()),t}},"value"),C({Undo:function(){r.undoManager.undo()},Redo:function(){r.undoManager.redo()}})}}),r(V,[d],function(e){function t(e,o){var a=this,s,l;if(e=r(e),o=a.settings=o||{},s=o.base_uri,/^([\w\-]+):([^\/]{2})/i.test(e)||/^\s*#/.test(e))return void(a.source=e);var c=0===e.indexOf("//");0!==e.indexOf("/")||c||(e=(s?s.protocol||"http":"http")+"://mce_host"+e),/^[\w\-]*:?\/\//.test(e)||(l=o.base_uri?o.base_uri.path:new t(location.href).directory,""===o.base_uri.protocol?e="//mce_host"+a.toAbsPath(l,e):(e=/([^#?]*)([#?]?.*)/.exec(e),e=(s&&s.protocol||"http")+"://mce_host"+a.toAbsPath(l,e[1])+e[2])),e=e.replace(/@@/g,"(mce_at)"),e=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(e),n(i,function(t,n){var r=e[n];r&&(r=r.replace(/\(mce_at\)/g,"@@")),a[t]=r}),s&&(a.protocol||(a.protocol=s.protocol),a.userInfo||(a.userInfo=s.userInfo),a.port||"mce_host"!==a.host||(a.port=s.port),a.host&&"mce_host"!==a.host||(a.host=s.host),a.source=""),c&&(a.protocol="")}var n=e.each,r=e.trim,i="source protocol authority userInfo user password host port relative path directory file query anchor".split(" "),o={ftp:21,http:80,https:443,mailto:25};return t.prototype={setPath:function(e){var t=this;e=/^(.*?)\/?(\w+)?$/.exec(e),t.path=e[0],t.directory=e[1],t.file=e[2],t.source="",t.getURI()},toRelative:function(e){var n=this,r;if("./"===e)return e;if(e=new t(e,{base_uri:n}),"mce_host"!=e.host&&n.host!=e.host&&e.host||n.port!=e.port||n.protocol!=e.protocol&&""!==e.protocol)return e.getURI();var i=n.getURI(),o=e.getURI();return i==o||"/"==i.charAt(i.length-1)&&i.substr(0,i.length-1)==o?i:(r=n.toRelPath(n.path,e.path),e.query&&(r+="?"+e.query),e.anchor&&(r+="#"+e.anchor),r)},toAbsolute:function(e,n){return e=new t(e,{base_uri:this}),e.getURI(n&&this.isSameOrigin(e))},isSameOrigin:function(e){if(this.host==e.host&&this.protocol==e.protocol){if(this.port==e.port)return!0;var t=o[this.protocol];if(t&&(this.port||t)==(e.port||t))return!0}return!1},toRelPath:function(e,t){var n,r=0,i="",o,a;if(e=e.substring(0,e.lastIndexOf("/")),e=e.split("/"),n=t.split("/"),e.length>=n.length)for(o=0,a=e.length;a>o;o++)if(o>=n.length||e[o]!=n[o]){r=o+1;break}if(e.length<n.length)for(o=0,a=n.length;a>o;o++)if(o>=e.length||e[o]!=n[o]){r=o+1;break}if(1===r)return t;for(o=0,a=e.length-(r-1);a>o;o++)i+="../";for(o=r-1,a=n.length;a>o;o++)i+=o!=r-1?"/"+n[o]:n[o];return i},toAbsPath:function(e,t){var r,i=0,o=[],a,s;for(a=/\/$/.test(t)?"/":"",e=e.split("/"),t=t.split("/"),n(e,function(e){e&&o.push(e)}),e=o,r=t.length-1,o=[];r>=0;r--)0!==t[r].length&&"."!==t[r]&&(".."!==t[r]?i>0?i--:o.push(t[r]):i++);return r=e.length-i,s=0>=r?o.reverse().join("/"):e.slice(0,r).join("/")+"/"+o.reverse().join("/"),0!==s.indexOf("/")&&(s="/"+s),a&&s.lastIndexOf("/")!==s.length-1&&(s+=a),s},getURI:function(e){var t,n=this;return(!n.source||e)&&(t="",e||(t+=n.protocol?n.protocol+"://":"//",n.userInfo&&(t+=n.userInfo+"@"),n.host&&(t+=n.host),n.port&&(t+=":"+n.port)),n.path&&(t+=n.path),n.query&&(t+="?"+n.query),n.anchor&&(t+="#"+n.anchor),n.source=t),n.source}},t}),r(U,[d],function(e){function t(){}var n=e.each,r=e.extend,i,o;return t.extend=i=function(e){function t(){var e,t,n,r=this;if(!o&&(r.init&&r.init.apply(r,arguments),t=r.Mixins))for(e=t.length;e--;)n=t[e],n.init&&n.init.apply(r,arguments)}function a(){return this}function s(e,t){return function(){var n=this,r=n._super,i;return n._super=c[e],i=t.apply(n,arguments),n._super=r,i}}var l=this,c=l.prototype,u,d,f;o=!0,u=new l,o=!1,e.Mixins&&(n(e.Mixins,function(t){t=t;for(var n in t)"init"!==n&&(e[n]=t[n])}),c.Mixins&&(e.Mixins=c.Mixins.concat(e.Mixins))),e.Methods&&n(e.Methods.split(","),function(t){e[t]=a}),e.Properties&&n(e.Properties.split(","),function(t){var n="_"+t;e[t]=function(e){var t=this,r;return e!==r?(t[n]=e,t):t[n]}}),e.Statics&&n(e.Statics,function(e,n){t[n]=e}),e.Defaults&&c.Defaults&&(e.Defaults=r({},c.Defaults,e.Defaults));for(d in e)f=e[d],u[d]="function"==typeof f&&c[d]?s(d,f):f;return t.prototype=u,t.constructor=t,t.extend=i,t},t}),r($,[d],function(e){function t(t){function n(){return!1}function r(){return!0}function i(e,i){var o,s,l,c;if(e=e.toLowerCase(),i=i||{},i.type=e,i.target||(i.target=u),i.preventDefault||(i.preventDefault=function(){i.isDefaultPrevented=r},i.stopPropagation=function(){i.isPropagationStopped=r},i.stopImmediatePropagation=function(){i.isImmediatePropagationStopped=r},i.isDefaultPrevented=n,i.isPropagationStopped=n,i.isImmediatePropagationStopped=n),t.beforeFire&&t.beforeFire(i),o=d[e])for(s=0,l=o.length;l>s;s++){if(c=o[s],c.once&&a(e,c.func),i.isImmediatePropagationStopped())return i.stopPropagation(),i;if(c.func.call(u,i)===!1)return i.preventDefault(),i}return i}function o(t,r,i,o){var a,s,l;if(r===!1&&(r=n),r)for(r={func:r},o&&e.extend(r,o),s=t.toLowerCase().split(" "),l=s.length;l--;)t=s[l],a=d[t],a||(a=d[t]=[],f(t,!0)),i?a.unshift(r):a.push(r);return c}function a(e,t){var n,r,i,o,a;if(e)for(o=e.toLowerCase().split(" "),n=o.length;n--;){if(e=o[n],r=d[e],!e){for(i in d)f(i,!1),delete d[i];return c}if(r){if(t)for(a=r.length;a--;)r[a].func===t&&(r=r.slice(0,a).concat(r.slice(a+1)),d[e]=r);else r.length=0;r.length||(f(e,!1),delete d[e])}}else{for(e in d)f(e,!1);d={}}return c}function s(e,t,n){return o(e,t,n,{once:!0})}function l(e){return e=e.toLowerCase(),!(!d[e]||0===d[e].length)}var c=this,u,d={},f;t=t||{},u=t.scope||c,f=t.toggleEvent||n,c.fire=i,c.on=o,c.off=a,c.once=s,c.has=l}var n=e.makeMap("focus blur focusin focusout click dblclick mousedown mouseup mousemove mouseover beforepaste paste cut copy selectionchange mouseout mouseenter mouseleave wheel keydown keypress keyup input contextmenu dragstart dragend dragover draggesture dragdrop drop drag submit compositionstart compositionend compositionupdate touchstart touchend"," ");return t.isNative=function(e){return!!n[e.toLowerCase()]},t}),r(q,[U],function(e){function t(e){for(var t=[],n=e.length,r;n--;)r=e[n],r.__checked||(t.push(r),r.__checked=1);for(n=t.length;n--;)delete t[n].__checked;return t}var n=/^([\w\\*]+)?(?:#([\w\\]+))?(?:\.([\w\\\.]+))?(?:\[\@?([\w\\]+)([\^\$\*!~]?=)([\w\\]+)\])?(?:\:(.+))?/i,r=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,i=/^\s*|\s*$/g,o,a=e.extend({init:function(e){function t(e){return e?(e=e.toLowerCase(),function(t){return"*"===e||t.type===e}):void 0}function o(e){return e?function(t){return t._name===e}:void 0}function a(e){return e?(e=e.split("."),function(t){for(var n=e.length;n--;)if(!t.hasClass(e[n]))return!1;return!0}):void 0}function s(e,t,n){return e?function(r){var i=r[e]?r[e]():"";return t?"="===t?i===n:"*="===t?i.indexOf(n)>=0:"~="===t?(" "+i+" ").indexOf(" "+n+" ")>=0:"!="===t?i!=n:"^="===t?0===i.indexOf(n):"$="===t?i.substr(i.length-n.length)===n:!1:!!n}:void 0}function l(e){var t;return e?(e=/(?:not\((.+)\))|(.+)/i.exec(e),e[1]?(t=u(e[1],[]),function(e){return!d(e,t)}):(e=e[2],function(t,n,r){return"first"===e?0===n:"last"===e?n===r-1:"even"===e?n%2===0:"odd"===e?n%2===1:t[e]?t[e]():!1})):void 0}function c(e,r,c){function u(e){e&&r.push(e)}var d;return d=n.exec(e.replace(i,"")),u(t(d[1])),u(o(d[2])),u(a(d[3])),u(s(d[4],d[5],d[6])),u(l(d[7])),r.psuedo=!!d[7],r.direct=c,r}function u(e,t){var n=[],i,o,a;do if(r.exec(""),o=r.exec(e),o&&(e=o[3],n.push(o[1]),o[2])){i=o[3];break}while(o);for(i&&u(i,t),e=[],a=0;a<n.length;a++)">"!=n[a]&&e.push(c(n[a],[],">"===n[a-1]));return t.push(e),t}var d=this.match;this._selectors=u(e,[])},match:function(e,t){var n,r,i,o,a,s,l,c,u,d,f,p,h;for(t=t||this._selectors,n=0,r=t.length;r>n;n++){for(a=t[n],o=a.length,h=e,p=0,i=o-1;i>=0;i--)for(c=a[i];h;){if(c.psuedo)for(f=h.parent().items(),u=d=f.length;u--&&f[u]!==h;);for(s=0,l=c.length;l>s;s++)if(!c[s](h,u,d)){s=l+1;break}if(s===l){p++;break}if(i===o-1)break;h=h.parent()}if(p===o)return!0}return!1},find:function(e){function n(e,t,i){var o,a,s,l,c,u=t[i];for(o=0,a=e.length;a>o;o++){for(c=e[o],s=0,l=u.length;l>s;s++)if(!u[s](c,o,a)){s=l+1;break}if(s===l)i==t.length-1?r.push(c):c.items&&n(c.items(),t,i+1);else if(u.direct)return;c.items&&n(c.items(),t,i)}}var r=[],i,s,l=this._selectors;if(e.items){for(i=0,s=l.length;s>i;i++)n(e.items(),l[i],0);s>1&&(r=t(r))}return o||(o=a.Collection),new o(r)}});return a}),r(j,[d,q,U],function(e,t,n){var r,i,o=Array.prototype.push,a=Array.prototype.slice;return i={length:0,init:function(e){e&&this.add(e)},add:function(t){var n=this;return e.isArray(t)?o.apply(n,t):t instanceof r?n.add(t.toArray()):o.call(n,t),n},set:function(e){var t=this,n=t.length,r;for(t.length=0,t.add(e),r=t.length;n>r;r++)delete t[r];return t},filter:function(e){var n=this,i,o,a=[],s,l;for("string"==typeof e?(e=new t(e),l=function(t){return e.match(t)}):l=e,i=0,o=n.length;o>i;i++)s=n[i],l(s)&&a.push(s);return new r(a)},slice:function(){return new r(a.apply(this,arguments))},eq:function(e){return-1===e?this.slice(e):this.slice(e,+e+1)},each:function(t){return e.each(this,t),this},toArray:function(){return e.toArray(this)},indexOf:function(e){for(var t=this,n=t.length;n--&&t[n]!==e;);return n},reverse:function(){return new r(e.toArray(this).reverse())},hasClass:function(e){return this[0]?this[0].hasClass(e):!1},prop:function(e,t){var n=this,r,i;return t!==r?(n.each(function(n){n[e]&&n[e](t)}),n):(i=n[0],i&&i[e]?i[e]():void 0)},exec:function(t){var n=this,r=e.toArray(arguments).slice(1);return n.each(function(e){e[t]&&e[t].apply(e,r)}),n},remove:function(){for(var e=this.length;e--;)this[e].remove();return this}},e.each("fire on off show hide addClass removeClass append prepend before after reflow".split(" "),function(t){i[t]=function(){var n=e.toArray(arguments);return this.each(function(e){t in e&&e[t].apply(e,n)}),this}}),e.each("text name disabled active selected checked visible parent value data".split(" "),function(e){i[e]=function(t){return this.prop(e,t)}}),r=n.extend(i),t.Collection=r,r}),r(Y,[d,y],function(e,t){var n=0;return{id:function(){return"mceu_"+n++},createFragment:function(e){return t.DOM.createFragment(e)},getWindowSize:function(){return t.DOM.getViewPort()},getSize:function(e){var t,n;if(e.getBoundingClientRect){var r=e.getBoundingClientRect();t=Math.max(r.width||r.right-r.left,e.offsetWidth),n=Math.max(r.height||r.bottom-r.bottom,e.offsetHeight)}else t=e.offsetWidth,n=e.offsetHeight;return{width:t,height:n}},getPos:function(e,n){return t.DOM.getPos(e,n)},getViewPort:function(e){return t.DOM.getViewPort(e)},get:function(e){return document.getElementById(e)},addClass:function(e,n){return t.DOM.addClass(e,n)},removeClass:function(e,n){return t.DOM.removeClass(e,n)},hasClass:function(e,n){return t.DOM.hasClass(e,n)},toggleClass:function(e,n,r){return t.DOM.toggleClass(e,n,r)},css:function(e,n,r){return t.DOM.setStyle(e,n,r)},getRuntimeStyle:function(e,n){return t.DOM.getStyle(e,n,!0)},on:function(e,n,r,i){return t.DOM.bind(e,n,r,i)},off:function(e,n,r){return t.DOM.unbind(e,n,r)},fire:function(e,n,r){return t.DOM.fire(e,n,r)},innerHtml:function(e,n){t.DOM.setHTML(e,n)}}}),r(K,[U,d,$,j,Y],function(e,t,n,r,i){function o(e){return e._eventDispatcher||(e._eventDispatcher=new n({scope:e,toggleEvent:function(t,r){r&&n.isNative(t)&&(e._nativeEvents||(e._nativeEvents={}),e._nativeEvents[t]=!0,e._rendered&&e.bindPendingEvents())}})),e._eventDispatcher}var a="onmousewheel"in document,s=!1,l="mce-",c=e.extend({Statics:{classPrefix:l},isRtl:function(){return c.rtl},classPrefix:l,init:function(e){var n=this,r,o;if(n.settings=e=t.extend({},n.Defaults,e),n._id=e.id||i.id(),n._text=n._name="",n._width=n._height=0,n._aria={role:e.role},this._elmCache={},r=e.classes)for(r=r.split(" "),r.map={},o=r.length;o--;)r.map[r[o]]=!0;n._classes=r||[],n.visible(!0),t.each("title text width height name classes visible disabled active value".split(" "),function(t){var r=e[t],i;r!==i?n[t](r):n["_"+t]===i&&(n["_"+t]=!1)}),n.on("click",function(){return n.disabled()?!1:void 0}),e.classes&&t.each(e.classes.split(" "),function(e){n.addClass(e)}),n.settings=e,n._borderBox=n.parseBox(e.border),n._paddingBox=n.parseBox(e.padding),n._marginBox=n.parseBox(e.margin),e.hidden&&n.hide()},Properties:"parent,title,text,width,height,disabled,active,name,value",Methods:"renderHtml",getContainerElm:function(){return document.body},getParentCtrl:function(e){for(var t,n=this.getRoot().controlIdLookup;e&&n&&!(t=n[e.id]);)e=e.parentNode;return t},parseBox:function(e){var t,n=10;if(e)return"number"==typeof e?(e=e||0,{top:e,left:e,bottom:e,right:e}):(e=e.split(" "),t=e.length,1===t?e[1]=e[2]=e[3]=e[0]:2===t?(e[2]=e[0],e[3]=e[1]):3===t&&(e[3]=e[1]),{top:parseInt(e[0],n)||0,right:parseInt(e[1],n)||0,bottom:parseInt(e[2],n)||0,left:parseInt(e[3],n)||0})},borderBox:function(){return this._borderBox},paddingBox:function(){return this._paddingBox},marginBox:function(){return this._marginBox},measureBox:function(e,t){function n(t){var n=document.defaultView;return n?(t=t.replace(/[A-Z]/g,function(e){return"-"+e}),n.getComputedStyle(e,null).getPropertyValue(t)):e.currentStyle[t]}function r(e){var t=parseFloat(n(e),10);return isNaN(t)?0:t}return{top:r(t+"TopWidth"),right:r(t+"RightWidth"),bottom:r(t+"BottomWidth"),left:r(t+"LeftWidth")}},initLayoutRect:function(){var e=this,t=e.settings,n,r,o=e.getEl(),a,s,l,c,u,d,f,p;n=e._borderBox=e._borderBox||e.measureBox(o,"border"),e._paddingBox=e._paddingBox||e.measureBox(o,"padding"),e._marginBox=e._marginBox||e.measureBox(o,"margin"),p=i.getSize(o),d=t.minWidth,f=t.minHeight,l=d||p.width,c=f||p.height,a=t.width,s=t.height,u=t.autoResize,u="undefined"!=typeof u?u:!a&&!s,a=a||l,s=s||c;var h=n.left+n.right,m=n.top+n.bottom,g=t.maxWidth||65535,v=t.maxHeight||65535;return e._layoutRect=r={x:t.x||0,y:t.y||0,w:a,h:s,deltaW:h,deltaH:m,contentW:a-h,contentH:s-m,innerW:a-h,innerH:s-m,startMinWidth:d||0,startMinHeight:f||0,minW:Math.min(l,g),minH:Math.min(c,v),maxW:g,maxH:v,autoResize:u,scrollW:0},e._lastLayoutRect={},r},layoutRect:function(e){var t=this,n=t._layoutRect,r,i,o,a,s,l;return n||(n=t.initLayoutRect()),e?(o=n.deltaW,a=n.deltaH,e.x!==s&&(n.x=e.x),e.y!==s&&(n.y=e.y),e.minW!==s&&(n.minW=e.minW),e.minH!==s&&(n.minH=e.minH),i=e.w,i!==s&&(i=i<n.minW?n.minW:i,i=i>n.maxW?n.maxW:i,n.w=i,n.innerW=i-o),i=e.h,i!==s&&(i=i<n.minH?n.minH:i,i=i>n.maxH?n.maxH:i,n.h=i,n.innerH=i-a),i=e.innerW,i!==s&&(i=i<n.minW-o?n.minW-o:i,i=i>n.maxW-o?n.maxW-o:i,n.innerW=i,n.w=i+o),i=e.innerH,i!==s&&(i=i<n.minH-a?n.minH-a:i,i=i>n.maxH-a?n.maxH-a:i,n.innerH=i,n.h=i+a),e.contentW!==s&&(n.contentW=e.contentW),e.contentH!==s&&(n.contentH=e.contentH),r=t._lastLayoutRect,(r.x!==n.x||r.y!==n.y||r.w!==n.w||r.h!==n.h)&&(l=c.repaintControls,l&&l.map&&!l.map[t._id]&&(l.push(t),l.map[t._id]=!0),r.x=n.x,r.y=n.y,r.w=n.w,r.h=n.h),t):n},repaint:function(){var e=this,t,n,r,i,o=0,a=0,s,l;l=document.createRange?function(e){return e}:Math.round,t=e.getEl().style,r=e._layoutRect,s=e._lastRepaintRect||{},i=e._borderBox,o=i.left+i.right,a=i.top+i.bottom,r.x!==s.x&&(t.left=l(r.x)+"px",s.x=r.x),r.y!==s.y&&(t.top=l(r.y)+"px",s.y=r.y),r.w!==s.w&&(t.width=l(r.w-o)+"px",s.w=r.w),r.h!==s.h&&(t.height=l(r.h-a)+"px",s.h=r.h),e._hasBody&&r.innerW!==s.innerW&&(n=e.getEl("body").style,n.width=l(r.innerW)+"px",s.innerW=r.innerW),e._hasBody&&r.innerH!==s.innerH&&(n=n||e.getEl("body").style,n.height=l(r.innerH)+"px",s.innerH=r.innerH),e._lastRepaintRect=s,e.fire("repaint",{},!1)},on:function(e,t){function n(e){var t,n;return"string"!=typeof e?e:function(i){return t||r.parentsAndSelf().each(function(r){var i=r.settings.callbacks;return i&&(t=i[e])?(n=r,!1):void 0}),t.call(n,i)}}var r=this;return o(r).on(e,n(t)),r},off:function(e,t){return o(this).off(e,t),this},fire:function(e,t,n){var r=this;if(t=t||{},t.control||(t.control=r),t=o(r).fire(e,t),n!==!1&&r.parent)for(var i=r.parent();i&&!t.isPropagationStopped();)i.fire(e,t,!1),i=i.parent();return t},hasEventListeners:function(e){return o(this).has(e)},parents:function(e){var t=this,n,i=new r;for(n=t.parent();n;n=n.parent())i.add(n);return e&&(i=i.filter(e)),i},parentsAndSelf:function(e){return new r(this).add(this.parents(e))},next:function(){var e=this.parent().items();return e[e.indexOf(this)+1]},prev:function(){var e=this.parent().items();return e[e.indexOf(this)-1]},findCommonAncestor:function(e,t){for(var n;e;){for(n=t;n&&e!=n;)n=n.parent();if(e==n)break;e=e.parent()}return e},hasClass:function(e,t){var n=this._classes[t||"control"];return e=this.classPrefix+e,n&&!!n.map[e]},addClass:function(e,t){var n=this,r,i;return e=this.classPrefix+e,r=n._classes[t||"control"],r||(r=[],r.map={},n._classes[t||"control"]=r),r.map[e]||(r.map[e]=e,r.push(e),n._rendered&&(i=n.getEl(t),i&&(i.className=r.join(" ")))),n},removeClass:function(e,t){var n=this,r,i,o;if(e=this.classPrefix+e,r=n._classes[t||"control"],r&&r.map[e])for(delete r.map[e],i=r.length;i--;)r[i]===e&&r.splice(i,1);return n._rendered&&(o=n.getEl(t),o&&(o.className=r.join(" "))),n},toggleClass:function(e,t,n){var r=this;return t?r.addClass(e,n):r.removeClass(e,n),r},classes:function(e){var t=this._classes[e||"control"];return t?t.join(" "):""},innerHtml:function(e){return i.innerHtml(this.getEl(),e),this},getEl:function(e){var t=e?this._id+"-"+e:this._id;return this._elmCache[t]||(this._elmCache[t]=i.get(t)),this._elmCache[t]},visible:function(e){var t=this,n;return"undefined"!=typeof e?(t._visible!==e&&(t._rendered&&(t.getEl().style.display=e?"":"none"),t._visible=e,n=t.parent(),n&&(n._lastRect=null),t.fire(e?"show":"hide")),t):t._visible},show:function(){return this.visible(!0)},hide:function(){return this.visible(!1)},focus:function(){try{this.getEl().focus()}catch(e){}return this},blur:function(){return this.getEl().blur(),this},aria:function(e,t){var n=this,r=n.getEl(n.ariaTarget);return"undefined"==typeof t?n._aria[e]:(n._aria[e]=t,n._rendered&&r.setAttribute("role"==e?e:"aria-"+e,t),n)},encode:function(e,t){return t!==!1&&(e=this.translate(e)),(e||"").replace(/[&<>"]/g,function(e){return"&#"+e.charCodeAt(0)+";"})},translate:function(e){return c.translate?c.translate(e):e},before:function(e){var t=this,n=t.parent();return n&&n.insert(e,n.items().indexOf(t),!0),t},after:function(e){var t=this,n=t.parent();return n&&n.insert(e,n.items().indexOf(t)),t},remove:function(){var e=this,t=e.getEl(),n=e.parent(),r,o;if(e.items){var a=e.items().toArray();for(o=a.length;o--;)a[o].remove()}n&&n.items&&(r=[],n.items().each(function(t){t!==e&&r.push(t)}),n.items().set(r),n._lastRect=null),e._eventsRoot&&e._eventsRoot==e&&i.off(t);var s=e.getRoot().controlIdLookup;return s&&delete s[e._id],t&&t.parentNode&&t.parentNode.removeChild(t),e._rendered=!1,e},renderBefore:function(e){var t=this;return e.parentNode.insertBefore(i.createFragment(t.renderHtml()),e),t.postRender(),t},renderTo:function(e){var t=this;return e=e||t.getContainerElm(),e.appendChild(i.createFragment(t.renderHtml())),t.postRender(),t},postRender:function(){var e=this,t=e.settings,n,r,o,a,s;for(a in t)0===a.indexOf("on")&&e.on(a.substr(2),t[a]);if(e._eventsRoot){for(o=e.parent();!s&&o;o=o.parent())s=o._eventsRoot;if(s)for(a in s._nativeEvents)e._nativeEvents[a]=!0}e.bindPendingEvents(),t.style&&(n=e.getEl(),n&&(n.setAttribute("style",t.style),n.style.cssText=t.style)),e._visible||i.css(e.getEl(),"display","none"),e.settings.border&&(r=e.borderBox(),i.css(e.getEl(),{"border-top-width":r.top,"border-right-width":r.right,"border-bottom-width":r.bottom,"border-left-width":r.left}));var l=e.getRoot();l.controlIdLookup||(l.controlIdLookup={}),l.controlIdLookup[e._id]=e;for(var c in e._aria)e.aria(c,e._aria[c]);e.fire("postrender",{},!1)},scrollIntoView:function(e){function t(e,t){var n,r,i=e;for(n=r=0;i&&i!=t&&i.nodeType;)n+=i.offsetLeft||0,r+=i.offsetTop||0,i=i.offsetParent;return{x:n,y:r}}var n=this.getEl(),r=n.parentNode,i,o,a,s,l,c,u=t(n,r);return i=u.x,o=u.y,a=n.offsetWidth,s=n.offsetHeight,l=r.clientWidth,c=r.clientHeight,"end"==e?(i-=l-a,o-=c-s):"center"==e&&(i-=l/2-a/2,o-=c/2-s/2),r.scrollLeft=i,r.scrollTop=o,this},bindPendingEvents:function(){function e(e){var t=o.getParentCtrl(e.target);t&&t.fire(e.type,e)}function t(){var e=d._lastHoverCtrl;e&&(e.fire("mouseleave",{target:e.getEl()}),e.parents().each(function(e){e.fire("mouseleave",{target:e.getEl()})}),d._lastHoverCtrl=null)}function n(e){var t=o.getParentCtrl(e.target),n=d._lastHoverCtrl,r=0,i,a,s;if(t!==n){if(d._lastHoverCtrl=t,a=t.parents().toArray().reverse(),a.push(t),n){for(s=n.parents().toArray().reverse(),s.push(n),r=0;r<s.length&&a[r]===s[r];r++);for(i=s.length-1;i>=r;i--)n=s[i],n.fire("mouseleave",{target:n.getEl()})}for(i=r;i<a.length;i++)t=a[i],t.fire("mouseenter",{target:t.getEl()})}}function r(e){e.preventDefault(),"mousewheel"==e.type?(e.deltaY=-1/40*e.wheelDelta,e.wheelDeltaX&&(e.deltaX=-1/40*e.wheelDeltaX)):(e.deltaX=0,e.deltaY=e.detail),e=o.fire("wheel",e)}var o=this,l,c,u,d,f,p;if(o._rendered=!0,f=o._nativeEvents){for(u=o.parents().toArray(),u.unshift(o),l=0,c=u.length;!d&&c>l;l++)d=u[l]._eventsRoot;for(d||(d=u[u.length-1]||o),o._eventsRoot=d,c=l,l=0;c>l;l++)u[l]._eventsRoot=d;var h=d._delegates;h||(h=d._delegates={});for(p in f){if(!f)return!1;"wheel"!==p||s?("mouseenter"===p||"mouseleave"===p?d._hasMouseEnter||(i.on(d.getEl(),"mouseleave",t),i.on(d.getEl(),"mouseover",n),d._hasMouseEnter=1):h[p]||(i.on(d.getEl(),p,e),h[p]=!0),f[p]=!1):a?i.on(o.getEl(),"mousewheel",r):i.on(o.getEl(),"DOMMouseScroll",r)}}},getRoot:function(){for(var e=this,t,n=[];e;){if(e.rootControl){t=e.rootControl;break}n.push(e),t=e,e=e.parent()}t||(t=this);for(var r=n.length;r--;)n[r].rootControl=t;return t},reflow:function(){return this.repaint(),this}});return c}),r(G,[],function(){var e={},t;return{add:function(t,n){e[t.toLowerCase()]=n},has:function(t){return!!e[t.toLowerCase()]},create:function(n,r){var i,o,a;if(!t){a=tinymce.ui;for(o in a)e[o.toLowerCase()]=a[o];t=!0}if("string"==typeof n?(r=r||{},r.type=n):(r=n,n=r.type),n=n.toLowerCase(),i=e[n],!i)throw new Error("Could not find control by type: "+n);return i=new i(r),i.type=n,i}}}),r(X,[],function(){return function(e){function t(e){return e=e||b,e&&e.getAttribute("role")}function n(e){for(var n,r=e||b;r=r.parentNode;)if(n=t(r))return n
}function r(e){var t=b;return t?t.getAttribute("aria-"+e):void 0}function i(e){var t=e.tagName.toUpperCase();return"INPUT"==t||"TEXTAREA"==t}function o(e){return i(e)&&!e.hidden?!0:/^(button|menuitem|checkbox|tab|menuitemcheckbox|option|gridcell)$/.test(t(e))?!0:!1}function a(e){function t(e){if(1==e.nodeType&&"none"!=e.style.display){o(e)&&n.push(e);for(var r=0;r<e.childNodes.length;r++)t(e.childNodes[r])}}var n=[];return t(e||y.getEl()),n}function s(e){var t,n;e=e||C,n=e.parents().toArray(),n.unshift(e);for(var r=0;r<n.length&&(t=n[r],!t.settings.ariaRoot);r++);return t}function l(e){var t=s(e),n=a(t.getEl());t.settings.ariaRemember&&"lastAriaIndex"in t?c(t.lastAriaIndex,n):c(0,n)}function c(e,t){return 0>e?e=t.length-1:e>=t.length&&(e=0),t[e]&&t[e].focus(),e}function u(e,t){var n=-1,r=s();t=t||a(r.getEl());for(var i=0;i<t.length;i++)t[i]===b&&(n=i);n+=e,r.lastAriaIndex=c(n,t)}function d(){var e=n();"tablist"==e?u(-1,a(b.parentNode)):C.parent().submenu?g():u(-1)}function f(){var e=t(),i=n();"tablist"==i?u(1,a(b.parentNode)):"menuitem"==e&&"menu"==i&&r("haspopup")?v():u(1)}function p(){u(-1)}function h(){var e=t(),i=n();"menuitem"==e&&"menubar"==i?v():"button"==e&&r("haspopup")?v({key:"down"}):u(1)}function m(e){var t=n();if("tablist"==t){var r=a(C.getEl("body"))[0];r&&r.focus()}else u(e.shiftKey?-1:1)}function g(){C.fire("cancel")}function v(e){e=e||{},C.fire("click",{target:b,aria:e})}var y=e.root,b,C;try{b=document.activeElement}catch(x){b=document.body}return C=y.getParentCtrl(b),y.on("keydown",function(e){function t(e,t){i(b)||t(e)!==!1&&e.preventDefault()}if(!e.isDefaultPrevented())switch(e.keyCode){case 37:t(e,d);break;case 39:t(e,f);break;case 38:t(e,p);break;case 40:t(e,h);break;case 27:g();break;case 14:case 13:case 32:t(e,v);break;case 9:m(e)!==!1&&e.preventDefault()}}),y.on("focusin",function(e){b=e.target,C=e.control}),{focusFirst:l}}}),r(J,[K,j,q,G,X,d,Y],function(e,t,n,r,i,o,a){var s={};return e.extend({layout:"",innerClass:"container-inner",init:function(e){var n=this;n._super(e),e=n.settings,n._fixed=e.fixed,n._items=new t,n.isRtl()&&n.addClass("rtl"),n.addClass("container"),n.addClass("container-body","body"),e.containerCls&&n.addClass(e.containerCls),n._layout=r.create((e.layout||n.layout)+"layout"),n.settings.items&&n.add(n.settings.items),n._hasBody=!0},items:function(){return this._items},find:function(e){return e=s[e]=s[e]||new n(e),e.find(this)},add:function(e){var t=this;return t.items().add(t.create(e)).parent(t),t},focus:function(e){var t=this,n,r,i;return e&&(r=t.keyboardNav||t.parents().eq(-1)[0].keyboardNav)?void r.focusFirst(t):(i=t.find("*"),t.statusbar&&i.add(t.statusbar.items()),i.each(function(e){return e.settings.autofocus?(n=null,!1):void(e.canFocus&&(n=n||e))}),n&&n.focus(),t)},replace:function(e,t){for(var n,r=this.items(),i=r.length;i--;)if(r[i]===e){r[i]=t;break}i>=0&&(n=t.getEl(),n&&n.parentNode.removeChild(n),n=e.getEl(),n&&n.parentNode.removeChild(n)),t.parent(this)},create:function(t){var n=this,i,a=[];return o.isArray(t)||(t=[t]),o.each(t,function(t){t&&(t instanceof e||("string"==typeof t&&(t={type:t}),i=o.extend({},n.settings.defaults,t),t.type=i.type=i.type||t.type||n.settings.defaultType||(i.defaults?i.defaults.type:null),t=r.create(i)),a.push(t))}),a},renderNew:function(){var e=this;return e.items().each(function(t,n){var r,i;t.parent(e),t._rendered||(r=e.getEl("body"),i=a.createFragment(t.renderHtml()),r.hasChildNodes()&&n<=r.childNodes.length-1?r.insertBefore(i,r.childNodes[n]):r.appendChild(i),t.postRender())}),e._layout.applyClasses(e),e._lastRect=null,e},append:function(e){return this.add(e).renderNew()},prepend:function(e){var t=this;return t.items().set(t.create(e).concat(t.items().toArray())),t.renderNew()},insert:function(e,t,n){var r=this,i,o,a;return e=r.create(e),i=r.items(),!n&&t<i.length-1&&(t+=1),t>=0&&t<i.length&&(o=i.slice(0,t).toArray(),a=i.slice(t).toArray(),i.set(o.concat(e,a))),r.renderNew()},fromJSON:function(e){var t=this;for(var n in e)t.find("#"+n).value(e[n]);return t},toJSON:function(){var e=this,t={};return e.find("*").each(function(e){var n=e.name(),r=e.value();n&&"undefined"!=typeof r&&(t[n]=r)}),t},preRender:function(){},renderHtml:function(){var e=this,t=e._layout,n=this.settings.role;return e.preRender(),t.preRender(e),'<div id="'+e._id+'" class="'+e.classes()+'"'+(n?' role="'+this.settings.role+'"':"")+'><div id="'+e._id+'-body" class="'+e.classes("body")+'">'+(e.settings.html||"")+t.renderHtml(e)+"</div></div>"},postRender:function(){var e=this,t;return e.items().exec("postRender"),e._super(),e._layout.postRender(e),e._rendered=!0,e.settings.style&&a.css(e.getEl(),e.settings.style),e.settings.border&&(t=e.borderBox(),a.css(e.getEl(),{"border-top-width":t.top,"border-right-width":t.right,"border-bottom-width":t.bottom,"border-left-width":t.left})),e.parent()||(e.keyboardNav=new i({root:e})),e},initLayoutRect:function(){var e=this,t=e._super();return e._layout.recalc(e),t},recalc:function(){var e=this,t=e._layoutRect,n=e._lastRect;return n&&n.w==t.w&&n.h==t.h?void 0:(e._layout.recalc(e),t=e.layoutRect(),e._lastRect={x:t.x,y:t.y,w:t.w,h:t.h},!0)},reflow:function(){var t;if(this.visible()){for(e.repaintControls=[],e.repaintControls.map={},this.recalc(),t=e.repaintControls.length;t--;)e.repaintControls[t].repaint();"flow"!==this.settings.layout&&"stack"!==this.settings.layout&&this.repaint(),e.repaintControls=[]}return this}})}),r(Q,[Y],function(e){function t(){var e=document,t,n,r,i,o,a,s,l,c=Math.max;return t=e.documentElement,n=e.body,r=c(t.scrollWidth,n.scrollWidth),i=c(t.clientWidth,n.clientWidth),o=c(t.offsetWidth,n.offsetWidth),a=c(t.scrollHeight,n.scrollHeight),s=c(t.clientHeight,n.clientHeight),l=c(t.offsetHeight,n.offsetHeight),{width:o>r?i:r,height:l>a?s:a}}return function(n,r){function i(){return a.getElementById(r.handle||n)}var o,a=document,s,l,c,u,d,f;r=r||{},l=function(n){var l=t(),p,h;n.preventDefault(),s=n.button,p=i(),d=n.screenX,f=n.screenY,h=window.getComputedStyle?window.getComputedStyle(p,null).getPropertyValue("cursor"):p.runtimeStyle.cursor,o=a.createElement("div"),e.css(o,{position:"absolute",top:0,left:0,width:l.width,height:l.height,zIndex:2147483647,opacity:1e-4,cursor:h}),a.body.appendChild(o),e.on(a,"mousemove",u),e.on(a,"mouseup",c),r.start(n)},u=function(e){return e.button!==s?c(e):(e.deltaX=e.screenX-d,e.deltaY=e.screenY-f,e.preventDefault(),void r.drag(e))},c=function(t){e.off(a,"mousemove",u),e.off(a,"mouseup",c),o.parentNode.removeChild(o),r.stop&&r.stop(t)},this.destroy=function(){e.off(i())},e.on(i(),"mousedown",l)}}),r(Z,[Y,Q],function(e,t){return{init:function(){var e=this;e.on("repaint",e.renderScroll)},renderScroll:function(){function n(){function t(t,a,s,l,c,u){var d,f,p,h,m,g,v,y,b;if(f=i.getEl("scroll"+t)){if(y=a.toLowerCase(),b=s.toLowerCase(),i.getEl("absend")&&e.css(i.getEl("absend"),y,i.layoutRect()[l]-1),!c)return void e.css(f,"display","none");e.css(f,"display","block"),d=i.getEl("body"),p=i.getEl("scroll"+t+"t"),h=d["client"+s]-2*o,h-=n&&r?f["client"+u]:0,m=d["scroll"+s],g=h/m,v={},v[y]=d["offset"+a]+o,v[b]=h,e.css(f,v),v={},v[y]=d["scroll"+a]*g,v[b]=h*g,e.css(p,v)}}var n,r,a;a=i.getEl("body"),n=a.scrollWidth>a.clientWidth,r=a.scrollHeight>a.clientHeight,t("h","Left","Width","contentW",n,"Height"),t("v","Top","Height","contentH",r,"Width")}function r(){function n(n,r,a,s,l){var c,u=i._id+"-scroll"+n,d=i.classPrefix;i.getEl().appendChild(e.createFragment('<div id="'+u+'" class="'+d+"scrollbar "+d+"scrollbar-"+n+'"><div id="'+u+'t" class="'+d+'scrollbar-thumb"></div></div>')),i.draghelper=new t(u+"t",{start:function(){c=i.getEl("body")["scroll"+r],e.addClass(e.get(u),d+"active")},drag:function(e){var t,u,d,f,p=i.layoutRect();u=p.contentW>p.innerW,d=p.contentH>p.innerH,f=i.getEl("body")["client"+a]-2*o,f-=u&&d?i.getEl("scroll"+n)["client"+l]:0,t=f/i.getEl("body")["scroll"+a],i.getEl("body")["scroll"+r]=c+e["delta"+s]/t},stop:function(){e.removeClass(e.get(u),d+"active")}})}i.addClass("scroll"),n("v","Top","Height","Y","Width"),n("h","Left","Width","X","Height")}var i=this,o=2;i.settings.autoScroll&&(i._hasScroll||(i._hasScroll=!0,r(),i.on("wheel",function(e){var t=i.getEl("body");t.scrollLeft+=10*(e.deltaX||0),t.scrollTop+=10*e.deltaY,n()}),e.on(i.getEl("body"),"scroll",n)),n())}}}),r(et,[J,Z],function(e,t){return e.extend({Defaults:{layout:"fit",containerCls:"panel"},Mixins:[t],renderHtml:function(){var e=this,t=e._layout,n=e.settings.html;return e.preRender(),t.preRender(e),"undefined"==typeof n?n='<div id="'+e._id+'-body" class="'+e.classes("body")+'">'+t.renderHtml(e)+"</div>":("function"==typeof n&&(n=n.call(e)),e._hasBody=!1),'<div id="'+e._id+'" class="'+e.classes()+'" hidefocus="1" tabindex="-1" role="group">'+(e._preBodyHtml||"")+n+"</div>"}})}),r(tt,[Y],function(e){function t(t,n,r){var i,o,a,s,l,c,u,d,f,p;return f=e.getViewPort(),o=e.getPos(n),a=o.x,s=o.y,t._fixed&&"static"==e.getRuntimeStyle(document.body,"position")&&(a-=f.x,s-=f.y),i=t.getEl(),p=e.getSize(i),l=p.width,c=p.height,p=e.getSize(n),u=p.width,d=p.height,r=(r||"").split(""),"b"===r[0]&&(s+=d),"r"===r[1]&&(a+=u),"c"===r[0]&&(s+=Math.round(d/2)),"c"===r[1]&&(a+=Math.round(u/2)),"b"===r[3]&&(s-=c),"r"===r[4]&&(a-=l),"c"===r[3]&&(s-=Math.round(c/2)),"c"===r[4]&&(a-=Math.round(l/2)),{x:a,y:s,w:l,h:c}}return{testMoveRel:function(n,r){for(var i=e.getViewPort(),o=0;o<r.length;o++){var a=t(this,n,r[o]);if(this._fixed){if(a.x>0&&a.x+a.w<i.w&&a.y>0&&a.y+a.h<i.h)return r[o]}else if(a.x>i.x&&a.x+a.w<i.w+i.x&&a.y>i.y&&a.y+a.h<i.h+i.y)return r[o]}return r[0]},moveRel:function(e,n){"string"!=typeof n&&(n=this.testMoveRel(e,n));var r=t(this,e,n);return this.moveTo(r.x,r.y)},moveBy:function(e,t){var n=this,r=n.layoutRect();return n.moveTo(r.x+e,r.y+t),n},moveTo:function(t,n){function r(e,t,n){return 0>e?0:e+n>t?(e=t-n,0>e?0:e):e}var i=this;if(i.settings.constrainToViewport){var o=e.getViewPort(window),a=i.layoutRect();t=r(t,o.w+o.x,a.w),n=r(n,o.h+o.y,a.h)}return i._rendered?i.layoutRect({x:t,y:n}).repaint():(i.settings.x=t,i.settings.y=n),i.fire("move",{x:t,y:n}),i}}}),r(nt,[Y],function(e){return{resizeToContent:function(){this._layoutRect.autoResize=!0,this._lastRect=null,this.reflow()},resizeTo:function(t,n){if(1>=t||1>=n){var r=e.getWindowSize();t=1>=t?t*r.w:t,n=1>=n?n*r.h:n}return this._layoutRect.autoResize=!1,this.layoutRect({minW:t,minH:n,w:t,h:n}).reflow()},resizeBy:function(e,t){var n=this,r=n.layoutRect();return n.resizeTo(r.w+e,r.h+t)}}}),r(rt,[et,tt,nt,Y],function(e,t,n,r){function i(){function e(e,t){for(;e;){if(e==t)return!0;e=e.parent()}}u||(u=function(t){if(2!=t.button)for(var n=p.length;n--;){var r=p[n],i=r.getParentCtrl(t.target);if(r.settings.autohide){if(i&&(e(i,r)||r.parent()===i))continue;t=r.fire("autohide",{target:t.target}),t.isDefaultPrevented()||r.hide()}}},r.on(document,"click",u))}function o(){d||(d=function(){var e;for(e=p.length;e--;)s(p[e])},r.on(window,"scroll",d))}function a(){if(!f){var e=document.documentElement,t=e.clientWidth,n=e.clientHeight;f=function(){document.all&&t==e.clientWidth&&n==e.clientHeight||(t=e.clientWidth,n=e.clientHeight,g.hideAll())},r.on(window,"resize",f)}}function s(e){function t(t,n){for(var r,i=0;i<p.length;i++)if(p[i]!=e)for(r=p[i].parent();r&&(r=r.parent());)r==e&&p[i].fixed(t).moveBy(0,n).repaint()}var n=r.getViewPort().y;e.settings.autofix&&(e._fixed?e._autoFixY>n&&(e.fixed(!1).layoutRect({y:e._autoFixY}).repaint(),t(!1,e._autoFixY-n)):(e._autoFixY=e.layoutRect().y,e._autoFixY<n&&(e.fixed(!0).layoutRect({y:0}).repaint(),t(!0,n-e._autoFixY))))}function l(e,t){var n,i=g.zIndex||65535,o;if(e)h.push(t);else for(n=h.length;n--;)h[n]===t&&h.splice(n,1);if(h.length)for(n=0;n<h.length;n++)h[n].modal&&(i++,o=h[n]),h[n].getEl().style.zIndex=i,h[n].zIndex=i,i++;var a=document.getElementById(t.classPrefix+"modal-block");o?r.css(a,"z-index",o.zIndex-1):a&&(a.parentNode.removeChild(a),m=!1),g.currentZIndex=i}function c(e){var t;for(t=p.length;t--;)p[t]===e&&p.splice(t,1);for(t=h.length;t--;)h[t]===e&&h.splice(t,1)}var u,d,f,p=[],h=[],m,g=e.extend({Mixins:[t,n],init:function(e){var t=this;t._super(e),t._eventsRoot=t,t.addClass("floatpanel"),e.autohide&&(i(),a(),p.push(t)),e.autofix&&(o(),t.on("move",function(){s(this)})),t.on("postrender show",function(e){if(e.control==t){var n,i=t.classPrefix;t.modal&&!m&&(n=r.createFragment('<div id="'+i+'modal-block" class="'+i+"reset "+i+'fade"></div>'),n=n.firstChild,t.getContainerElm().appendChild(n),setTimeout(function(){r.addClass(n,i+"in"),r.addClass(t.getEl(),i+"in")},0),m=!0),l(!0,t)}}),t.on("show",function(){t.parents().each(function(e){return e._fixed?(t.fixed(!0),!1):void 0})}),e.popover&&(t._preBodyHtml='<div class="'+t.classPrefix+'arrow"></div>',t.addClass("popover").addClass("bottom").addClass(t.isRtl()?"end":"start"))},fixed:function(e){var t=this;if(t._fixed!=e){if(t._rendered){var n=r.getViewPort();e?t.layoutRect().y-=n.y:t.layoutRect().y+=n.y}t.toggleClass("fixed",e),t._fixed=e}return t},show:function(){var e=this,t,n=e._super();for(t=p.length;t--&&p[t]!==e;);return-1===t&&p.push(e),n},hide:function(){return c(this),l(!1,this),this._super()},hideAll:function(){g.hideAll()},close:function(){var e=this;return e.fire("close").isDefaultPrevented()||(e.remove(),l(!1,e)),e},remove:function(){c(this),this._super()},postRender:function(){var e=this;return e.settings.bodyRole&&this.getEl("body").setAttribute("role",e.settings.bodyRole),e._super()}});return g.hideAll=function(){for(var e=p.length;e--;){var t=p[e];t&&t.settings.autohide&&(t.hide(),p.splice(e,1))}},g}),r(it,[rt,et,Y,Q],function(e,t,n,r){var i=e.extend({modal:!0,Defaults:{border:1,layout:"flex",containerCls:"panel",role:"dialog",callbacks:{submit:function(){this.fire("submit",{data:this.toJSON()})},close:function(){this.close()}}},init:function(e){var n=this;n._super(e),n.isRtl()&&n.addClass("rtl"),n.addClass("window"),n._fixed=!0,e.buttons&&(n.statusbar=new t({layout:"flex",border:"1 0 0 0",spacing:3,padding:10,align:"center",pack:n.isRtl()?"start":"end",defaults:{type:"button"},items:e.buttons}),n.statusbar.addClass("foot"),n.statusbar.parent(n)),n.on("click",function(e){-1!=e.target.className.indexOf(n.classPrefix+"close")&&n.close()}),n.on("cancel",function(){n.close()}),n.aria("describedby",n.describedBy||n._id+"-none"),n.aria("label",e.title),n._fullscreen=!1},recalc:function(){var e=this,t=e.statusbar,r,i,o,a;e._fullscreen&&(e.layoutRect(n.getWindowSize()),e.layoutRect().contentH=e.layoutRect().innerH),e._super(),r=e.layoutRect(),e.settings.title&&!e._fullscreen&&(i=r.headerW,i>r.w&&(o=r.x-Math.max(0,i/2),e.layoutRect({w:i,x:o}),a=!0)),t&&(t.layoutRect({w:e.layoutRect().innerW}).recalc(),i=t.layoutRect().minW+r.deltaW,i>r.w&&(o=r.x-Math.max(0,i-r.w),e.layoutRect({w:i,x:o}),a=!0)),a&&e.recalc()},initLayoutRect:function(){var e=this,t=e._super(),r=0,i;if(e.settings.title&&!e._fullscreen){i=e.getEl("head");var o=n.getSize(i);t.headerW=o.width,t.headerH=o.height,r+=t.headerH}e.statusbar&&(r+=e.statusbar.layoutRect().h),t.deltaH+=r,t.minH+=r,t.h+=r;var a=n.getWindowSize();return t.x=Math.max(0,a.w/2-t.w/2),t.y=Math.max(0,a.h/2-t.h/2),t},renderHtml:function(){var e=this,t=e._layout,n=e._id,r=e.classPrefix,i=e.settings,o="",a="",s=i.html;return e.preRender(),t.preRender(e),i.title&&(o='<div id="'+n+'-head" class="'+r+'window-head"><div id="'+n+'-title" class="'+r+'title">'+e.encode(i.title)+'</div><button type="button" class="'+r+'close" aria-hidden="true">\xd7</button><div id="'+n+'-dragh" class="'+r+'dragh"></div></div>'),i.url&&(s='<iframe src="'+i.url+'" tabindex="-1"></iframe>'),"undefined"==typeof s&&(s=t.renderHtml(e)),e.statusbar&&(a=e.statusbar.renderHtml()),'<div id="'+n+'" class="'+e.classes()+'" hidefocus="1"><div class="'+e.classPrefix+'reset" role="application">'+o+'<div id="'+n+'-body" class="'+e.classes("body")+'">'+s+"</div>"+a+"</div></div>"},fullscreen:function(e){var t=this,r=document.documentElement,i,o=t.classPrefix,a;if(e!=t._fullscreen)if(n.on(window,"resize",function(){var e;if(t._fullscreen)if(i)t._timer||(t._timer=setTimeout(function(){var e=n.getWindowSize();t.moveTo(0,0).resizeTo(e.w,e.h),t._timer=0},50));else{e=(new Date).getTime();var r=n.getWindowSize();t.moveTo(0,0).resizeTo(r.w,r.h),(new Date).getTime()-e>50&&(i=!0)}}),a=t.layoutRect(),t._fullscreen=e,e){t._initial={x:a.x,y:a.y,w:a.w,h:a.h},t._borderBox=t.parseBox("0"),t.getEl("head").style.display="none",a.deltaH-=a.headerH+2,n.addClass(r,o+"fullscreen"),n.addClass(document.body,o+"fullscreen"),t.addClass("fullscreen");var s=n.getWindowSize();t.moveTo(0,0).resizeTo(s.w,s.h)}else t._borderBox=t.parseBox(t.settings.border),t.getEl("head").style.display="",a.deltaH+=a.headerH,n.removeClass(r,o+"fullscreen"),n.removeClass(document.body,o+"fullscreen"),t.removeClass("fullscreen"),t.moveTo(t._initial.x,t._initial.y).resizeTo(t._initial.w,t._initial.h);return t.reflow()},postRender:function(){var e=this,t;setTimeout(function(){e.addClass("in")},0),e._super(),e.statusbar&&e.statusbar.postRender(),e.focus(),this.dragHelper=new r(e._id+"-dragh",{start:function(){t={x:e.layoutRect().x,y:e.layoutRect().y}},drag:function(n){e.moveTo(t.x+n.deltaX,t.y+n.deltaY)}}),e.on("submit",function(t){t.isDefaultPrevented()||e.close()})},submit:function(){return this.fire("submit",{data:this.toJSON()})},remove:function(){var e=this,t=e.classPrefix;e.dragHelper.destroy(),e._super(),e.statusbar&&this.statusbar.remove(),e._fullscreen&&(n.removeClass(document.documentElement,t+"fullscreen"),n.removeClass(document.body,t+"fullscreen"))},getContentWindow:function(){var e=this.getEl().getElementsByTagName("iframe")[0];return e?e.contentWindow:null}});return i}),r(ot,[it],function(e){var t=e.extend({init:function(e){e={border:1,padding:20,layout:"flex",pack:"center",align:"center",containerCls:"panel",autoScroll:!0,buttons:{type:"button",text:"Ok",action:"ok"},items:{type:"label",multiline:!0,maxWidth:500,maxHeight:200}},this._super(e)},Statics:{OK:1,OK_CANCEL:2,YES_NO:3,YES_NO_CANCEL:4,msgBox:function(n){function r(e,t,n){return{type:"button",text:e,subtype:n?"primary":"",onClick:function(e){e.control.parents()[1].close(),o(t)}}}var i,o=n.callback||function(){};switch(n.buttons){case t.OK_CANCEL:i=[r("Ok",!0,!0),r("Cancel",!1)];break;case t.YES_NO:case t.YES_NO_CANCEL:i=[r("Yes",1,!0),r("No",0)],n.buttons==t.YES_NO_CANCEL&&i.push(r("Cancel",-1));break;default:i=[r("Ok",!0,!0)]}return new e({padding:20,x:n.x,y:n.y,minWidth:300,minHeight:100,layout:"flex",pack:"center",align:"center",buttons:i,title:n.title,role:"alertdialog",items:{type:"label",multiline:!0,maxWidth:500,maxHeight:200,text:n.text},onPostRender:function(){this.aria("describedby",this.items()[0]._id)},onClose:n.onClose,onCancel:function(){o(!1)}}).renderTo(document.body).reflow()},alert:function(e,n){return"string"==typeof e&&(e={text:e}),e.callback=n,t.msgBox(e)},confirm:function(e,n){return"string"==typeof e&&(e={text:e}),e.callback=n,e.buttons=t.OK_CANCEL,t.msgBox(e)}}});return t}),r(at,[it,ot],function(e,t){return function(n){function r(){return o.length?o[o.length-1]:void 0}var i=this,o=[];i.windows=o,n.on("remove",function(){for(var e=o.length;e--;)o[e].close()}),i.open=function(t,r){var i;return n.editorManager.setActive(n),t.title=t.title||" ",t.url=t.url||t.file,t.url&&(t.width=parseInt(t.width||320,10),t.height=parseInt(t.height||240,10)),t.body&&(t.items={defaults:t.defaults,type:t.bodyType||"form",items:t.body}),t.url||t.buttons||(t.buttons=[{text:"Ok",subtype:"primary",onclick:function(){i.find("form")[0].submit()}},{text:"Cancel",onclick:function(){i.close()}}]),i=new e(t),o.push(i),i.on("close",function(){for(var e=o.length;e--;)o[e]===i&&o.splice(e,1);o.length||n.focus()}),t.data&&i.on("postRender",function(){this.find("*").each(function(e){var n=e.name();n in t.data&&e.value(t.data[n])})}),i.features=t||{},i.params=r||{},1===o.length&&n.nodeChanged(),i.renderTo().reflow()},i.alert=function(e,r,i){t.alert(e,function(){r?r.call(i||this):n.focus()})},i.confirm=function(e,n,r){t.confirm(e,function(e){n.call(r||this,e)})},i.close=function(){r()&&r().close()},i.getParams=function(){return r()?r().params:null},i.setParams=function(e){r()&&(r().params=e)},i.getWindows=function(){return o}}}),r(st,[B,x,h,_,g,u,d],function(e,t,n,r,i,o,a){return function(s){function l(e,t){try{s.getDoc().execCommand(e,!1,t)}catch(n){}}function c(){var e=s.getDoc().documentMode;return e?e:6}function u(e){return e.isDefaultPrevented()}function d(e){var t;e.dataTransfer&&(s.selection.isCollapsed()&&"IMG"==e.target.tagName&&Q.select(e.target),t=s.selection.getContent(),t.length>0&&e.dataTransfer.setData(at,ot+escape(t)))}function f(e){var t,n;return e.dataTransfer&&(t=e.dataTransfer.getData(at),t&&t.indexOf(ot)>=0&&(n=unescape(t.substr(ot.length)))),n}function p(e){s.queryCommandSupported("mceInsertClipboardContent")?s.execCommand("mceInsertClipboardContent",!1,{content:e}):s.execCommand("mceInsertContent",!1,e)}function h(){function r(e){var t=g.schema.getBlockElements(),n=s.getBody();if("BR"!=e.nodeName)return!1;for(e=e;e!=n&&!t[e.nodeName];e=e.parentNode)if(e.nextSibling)return!1;return!0}function i(e,t,i){var o,a,s;for(s=g.schema.getNonEmptyElements(),o=new n(i||e,e);a=o[t?"next":"prev"]();){if(s[a.nodeName]&&!r(a))return a;if(3==a.nodeType&&a.data.length>0)return a}}function o(e){var n,r,o,a,l;if(!e.collapsed&&(n=g.getParent(t.getNode(e.startContainer,e.startOffset),g.isBlock),r=g.getParent(t.getNode(e.endContainer,e.endOffset),g.isBlock),l=s.schema.getTextBlockElements(),n!=r&&l[n.nodeName]&&l[r.nodeName]&&"false"!==g.getContentEditable(n)&&"false"!==g.getContentEditable(r)))return e.deleteContents(),o=i(n,!1),a=i(r,!0),g.isEmpty(r)||K(n).append(r.childNodes),K(r).remove(),o?1==o.nodeType?"BR"==o.nodeName?(e.setStartBefore(o),e.setEndBefore(o)):(e.setStartAfter(o),e.setEndAfter(o)):(e.setStart(o,o.data.length),e.setEnd(o,o.data.length)):a&&(1==a.nodeType?(e.setStartBefore(a),e.setEndBefore(a)):(e.setStart(a,0),e.setEnd(a,0))),v.setRng(e),!0}function l(e,n){var r,o,a,l,c,u;if(!e.collapsed)return e;if(c=e.startContainer,u=e.startOffset,3==c.nodeType)if(n){if(u<c.data.length)return e}else if(u>0)return e;return r=t.getNode(e.startContainer,e.startOffset),a=g.getParent(r,g.isBlock),o=i(s.getBody(),n,r),l=g.getParent(o,g.isBlock),r&&o?(a!=l&&(n?(1==r.nodeType?"BR"==r.nodeName?e.setStartBefore(r):e.setStartAfter(r):e.setStart(r,r.data.length),1==o.nodeType?e.setEnd(o,0):e.setEndBefore(o)):(1==o.nodeType?"BR"==o.nodeName?e.setStartBefore(o):e.setStartAfter(o):e.setStart(o,o.data.length),1==r.nodeType?e.setEnd(r,0):e.setEndBefore(r))),e):e}function c(e){var t=v.getRng();return t=l(t,e),o(t)?!0:void 0}function h(e){var t,n,r;c(e)||(a.each(s.getBody().getElementsByTagName("*"),function(e){"SPAN"==e.tagName&&e.setAttribute("mce-data-marked",1),!e.hasAttribute("data-mce-style")&&e.hasAttribute("style")&&s.dom.setAttrib(e,"style",s.dom.getAttrib(e,"style"))}),t=new y(function(){}),t.observe(s.getDoc(),{childList:!0,attributes:!0,subtree:!0,attributeFilter:["style"]}),s.getDoc().execCommand(e?"ForwardDelete":"Delete",!1,null),n=s.selection.getRng(),r=n.startContainer.parentNode,a.each(t.takeRecords(),function(e){if(g.isChildOf(e.target,s.getBody())){if("style"==e.attributeName){var t=e.target.getAttribute("data-mce-style");t?e.target.setAttribute("style",t):e.target.removeAttribute("style")}a.each(e.addedNodes,function(e){if("SPAN"==e.nodeName&&!e.getAttribute("mce-data-marked")){var t,i;e==r&&(t=n.startOffset,i=e.firstChild),g.remove(e,!0),i&&(n.setStart(i,t),n.setEnd(i,t),s.selection.setRng(n))}})}}),t.disconnect(),a.each(s.dom.select("span[mce-data-marked]"),function(e){e.removeAttribute("mce-data-marked")}))}var m=s.getDoc(),g=s.dom,v=s.selection,y=window.MutationObserver,b,C;y||(b=!0,y=function(){function e(e){var t=e.relatedNode||e.target;n.push({target:t,addedNodes:[t]})}function t(e){var t=e.relatedNode||e.target;n.push({target:t,attributeName:e.attrName})}var n=[],r;this.observe=function(n){r=n,r.addEventListener("DOMSubtreeModified",e,!1),r.addEventListener("DOMNodeInsertedIntoDocument",e,!1),r.addEventListener("DOMNodeInserted",e,!1),r.addEventListener("DOMAttrModified",t,!1)},this.disconnect=function(){r.removeEventListener("DOMSubtreeModified",e,!1),r.removeEventListener("DOMNodeInsertedIntoDocument",e,!1),r.removeEventListener("DOMNodeInserted",e,!1),r.removeEventListener("DOMAttrModified",t,!1)},this.takeRecords=function(){return n}}),s.on("keydown",function(e){var t=e.keyCode==X,n=e.ctrlKey||e.metaKey;if(!u(e)&&(t||e.keyCode==G)){var r=s.selection.getRng(),i=r.startContainer,o=r.startOffset;if(!n&&r.collapsed&&3==i.nodeType&&(t?o<i.data.length:o>0))return;e.preventDefault(),n&&s.selection.getSel().modify("extend",t?"forward":"backward",e.metaKey?"lineboundary":"word"),h(t)}}),s.on("keypress",function(t){if(!u(t)&&!v.isCollapsed()&&t.charCode&&!e.metaKeyPressed(t)){var n,r,i,o,a,l;n=s.selection.getRng(),l=String.fromCharCode(t.charCode),t.preventDefault(),r=K(n.startContainer).parents().filter(function(e,t){return!!s.schema.getTextInlineElements()[t.nodeName]}),h(!0),r=r.filter(function(e,t){return!K.contains(s.getBody(),t)}),r.length?(i=g.createFragment(),r.each(function(e,t){t=t.cloneNode(!1),i.hasChildNodes()?(t.appendChild(i.firstChild),i.appendChild(t)):(a=t,i.appendChild(t)),i.appendChild(t)}),a.appendChild(s.getDoc().createTextNode(l)),o=g.getParent(n.startContainer,g.isBlock),g.isEmpty(o)?K(o).empty().append(i):n.insertNode(i),n.setStart(a.firstChild,1),n.setEnd(a.firstChild,1),s.selection.setRng(n)):s.selection.setContent(l)}}),s.addCommand("Delete",function(){h()}),s.addCommand("ForwardDelete",function(){h(!0)}),b||(s.on("dragstart",function(e){C=v.getRng(),d(e)}),s.on("drop",function(e){if(!u(e)){var n=f(e);n&&(e.preventDefault(),window.setTimeout(function(){var r=t.getCaretRangeFromPoint(e.x,e.y,m);C&&(v.setRng(C),C=null),h(),v.setRng(r),p(n)},0))}}),s.on("cut",function(e){!u(e)&&e.clipboardData&&(e.preventDefault(),e.clipboardData.clearData(),e.clipboardData.setData("text/html",s.selection.getContent()),e.clipboardData.setData("text/plain",s.selection.getContent({format:"text"})),h(!0))}))}function m(){function e(e){var t=J.create("body"),n=e.cloneContents();return t.appendChild(n),Q.serializer.serialize(t,{format:"html"})}function n(n){if(!n.setStart){if(n.item)return!1;var r=n.duplicate();return r.moveToElementText(s.getBody()),t.compareRanges(n,r)}var i=e(n),o=J.createRng();o.selectNode(s.getBody());var a=e(o);return i===a}s.on("keydown",function(e){var t=e.keyCode,r,i;if(!u(e)&&(t==X||t==G)){if(r=s.selection.isCollapsed(),i=s.getBody(),r&&!J.isEmpty(i))return;if(!r&&!n(s.selection.getRng()))return;e.preventDefault(),s.setContent(""),i.firstChild&&J.isBlock(i.firstChild)?s.selection.setCursorLocation(i.firstChild,0):s.selection.setCursorLocation(i,0),s.nodeChanged()}})}function g(){s.shortcuts.add("meta+a",null,"SelectAll")}function v(){s.settings.content_editable||(J.bind(s.getDoc(),"focusin",function(){Q.setRng(Q.getRng())}),J.bind(s.getDoc(),"mousedown mouseup",function(e){e.target==s.getDoc().documentElement&&(s.getBody().focus(),"mousedown"==e.type?Q.placeCaretAt(e.clientX,e.clientY):Q.setRng(Q.getRng()))}))}function y(){s.on("keydown",function(e){if(!u(e)&&e.keyCode===G){if(!s.getBody().getElementsByTagName("hr").length)return;if(Q.isCollapsed()&&0===Q.getRng(!0).startOffset){var t=Q.getNode(),n=t.previousSibling;if("HR"==t.nodeName)return J.remove(t),void e.preventDefault();n&&n.nodeName&&"hr"===n.nodeName.toLowerCase()&&(J.remove(n),e.preventDefault())}}})}function b(){window.Range.prototype.getClientRects||s.on("mousedown",function(e){if(!u(e)&&"HTML"===e.target.nodeName){var t=s.getBody();t.blur(),setTimeout(function(){t.focus()},0)}})}function C(){s.on("click",function(e){var t=e.target;/^(IMG|HR)$/.test(t.nodeName)&&(e.preventDefault(),Q.getSel().setBaseAndExtent(t,0,t,1),s.nodeChanged()),"A"==t.nodeName&&J.hasClass(t,"mce-item-anchor")&&(e.preventDefault(),Q.select(t))})}function x(){function e(){var e=J.getAttribs(Q.getStart().cloneNode(!1));return function(){var t=Q.getStart();t!==s.getBody()&&(J.setAttrib(t,"style",null),Y(e,function(e){t.setAttributeNode(e.cloneNode(!0))}))}}function t(){return!Q.isCollapsed()&&J.getParent(Q.getStart(),J.isBlock)!=J.getParent(Q.getEnd(),J.isBlock)}s.on("keypress",function(n){var r;return u(n)||8!=n.keyCode&&46!=n.keyCode||!t()?void 0:(r=e(),s.getDoc().execCommand("delete",!1,null),r(),n.preventDefault(),!1)}),J.bind(s.getDoc(),"cut",function(n){var r;!u(n)&&t()&&(r=e(),setTimeout(function(){r()},0))})}function w(){document.body.setAttribute("role","application")}function _(){s.on("keydown",function(e){if(!u(e)&&e.keyCode===G&&Q.isCollapsed()&&0===Q.getRng(!0).startOffset){var t=Q.getNode().previousSibling;if(t&&t.nodeName&&"table"===t.nodeName.toLowerCase())return e.preventDefault(),!1}})}function E(){c()>7||(l("RespectVisibilityInDesign",!0),s.contentStyles.push(".mceHideBrInPre pre br {display: none}"),J.addClass(s.getBody(),"mceHideBrInPre"),et.addNodeFilter("pre",function(e){for(var t=e.length,n,i,o,a;t--;)for(n=e[t].getAll("br"),i=n.length;i--;)o=n[i],a=o.prev,a&&3===a.type&&"\n"!=a.value.charAt(a.value-1)?a.value+="\n":o.parent.insert(new r("#text",3),o,!0).value="\n"}),tt.addNodeFilter("pre",function(e){for(var t=e.length,n,r,i,o;t--;)for(n=e[t].getAll("br"),r=n.length;r--;)i=n[r],o=i.prev,o&&3==o.type&&(o.value=o.value.replace(/\r?\n$/,""))}))}function N(){J.bind(s.getBody(),"mouseup",function(){var e,t=Q.getNode();"IMG"==t.nodeName&&((e=J.getStyle(t,"width"))&&(J.setAttrib(t,"width",e.replace(/[^0-9%]+/g,"")),J.setStyle(t,"width","")),(e=J.getStyle(t,"height"))&&(J.setAttrib(t,"height",e.replace(/[^0-9%]+/g,"")),J.setStyle(t,"height","")))})}function k(){s.on("keydown",function(t){var n,r,i,o,a;if(!u(t)&&t.keyCode==e.BACKSPACE&&(n=Q.getRng(),r=n.startContainer,i=n.startOffset,o=J.getRoot(),a=r,n.collapsed&&0===i)){for(;a&&a.parentNode&&a.parentNode.firstChild==a&&a.parentNode!=o;)a=a.parentNode;"BLOCKQUOTE"===a.tagName&&(s.formatter.toggle("blockquote",null,a),n=J.createRng(),n.setStart(r,0),n.setEnd(r,0),Q.setRng(n))}})}function S(){function e(){s._refreshContentEditable(),l("StyleWithCSS",!1),l("enableInlineTableEditing",!1),Z.object_resizing||l("enableObjectResizing",!1)}Z.readonly||s.on("BeforeExecCommand MouseDown",e)}function T(){function e(){Y(J.select("a"),function(e){var t=e.parentNode,n=J.getRoot();if(t.lastChild===e){for(;t&&!J.isBlock(t);){if(t.parentNode.lastChild!==t||t===n)return;t=t.parentNode}J.add(t,"br",{"data-mce-bogus":1})}})}s.on("SetContent ExecCommand",function(t){("setcontent"==t.type||"mceInsertLink"===t.command)&&e()})}function R(){Z.forced_root_block&&s.on("init",function(){l("DefaultParagraphSeparator",Z.forced_root_block)})}function A(){s.on("Undo Redo SetContent",function(e){e.initial||s.execCommand("mceRepaint")})}function B(){s.on("keydown",function(e){var t;u(e)||e.keyCode!=G||(t=s.getDoc().selection.createRange(),t&&t.item&&(e.preventDefault(),s.undoManager.beforeChange(),J.remove(t.item(0)),s.undoManager.add()))})}function D(){var e;c()>=10&&(e="",Y("p div h1 h2 h3 h4 h5 h6".split(" "),function(t,n){e+=(n>0?",":"")+t+":empty"}),s.contentStyles.push(e+"{padding-right: 1px !important}"))}function L(){c()<9&&(et.addNodeFilter("noscript",function(e){for(var t=e.length,n,r;t--;)n=e[t],r=n.firstChild,r&&n.attr("data-mce-innertext",r.value)}),tt.addNodeFilter("noscript",function(e){for(var t=e.length,n,o,a;t--;)n=e[t],o=e[t].firstChild,o?o.value=i.decode(o.value):(a=n.attributes.map["data-mce-innertext"],a&&(n.attr("data-mce-innertext",null),o=new r("#text",3),o.value=a,o.raw=!0,n.append(o)))}))}function M(){function e(e,t){var n=i.createTextRange();try{n.moveToPoint(e,t)}catch(r){n=null}return n}function t(t){var r;t.button?(r=e(t.x,t.y),r&&(r.compareEndPoints("StartToStart",a)>0?r.setEndPoint("StartToStart",a):r.setEndPoint("EndToEnd",a),r.select())):n()}function n(){var e=r.selection.createRange();a&&!e.item&&0===e.compareEndPoints("StartToEnd",e)&&a.select(),J.unbind(r,"mouseup",n),J.unbind(r,"mousemove",t),a=o=0}var r=J.doc,i=r.body,o,a,s;
r.documentElement.unselectable=!0,J.bind(r,"mousedown contextmenu",function(i){if("HTML"===i.target.nodeName){if(o&&n(),s=r.documentElement,s.scrollHeight>s.clientHeight)return;o=1,a=e(i.x,i.y),a&&(J.bind(r,"mouseup",n),J.bind(r,"mousemove",t),J.getRoot().focus(),a.select())}})}function H(){s.on("keyup focusin mouseup",function(t){65==t.keyCode&&e.metaKeyPressed(t)||Q.normalize()},!0)}function P(){s.contentStyles.push("img:-moz-broken {-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}")}function O(){s.inline||s.on("keydown",function(){document.activeElement==document.body&&s.getWin().focus()})}function I(){s.inline||(s.contentStyles.push("body {min-height: 150px}"),s.on("click",function(e){if("HTML"==e.target.nodeName){var t;t=s.selection.getRng(),s.getBody().focus(),s.selection.setRng(t),s.selection.normalize(),s.nodeChanged()}}))}function F(){o.mac&&s.on("keydown",function(t){!e.metaKeyPressed(t)||37!=t.keyCode&&39!=t.keyCode||(t.preventDefault(),s.selection.getSel().modify("move",37==t.keyCode?"backward":"forward","word"))})}function z(){l("AutoUrlDetect",!1)}function W(){s.inline||s.on("focus blur beforegetcontent",function(){var e=s.dom.create("br");s.getBody().appendChild(e),e.parentNode.removeChild(e)},!0)}function V(){s.on("click",function(e){var t=e.target;do if("A"===t.tagName)return void e.preventDefault();while(t=t.parentNode)}),s.contentStyles.push(".mce-content-body {-webkit-touch-callout: none}")}function U(){s.on("touchstart",function(e){var t,n,r,i;t=e.target,n=(new Date).getTime(),i=e.changedTouches,!i||i.length>1||(r=i[0],s.once("touchend",function(e){var i=e.changedTouches[0],o;(new Date).getTime()-n>500||Math.abs(r.clientX-i.clientX)>5||Math.abs(r.clientY-i.clientY)>5||(o={target:t},Y("pageX pageY clientX clientY screenX screenY".split(" "),function(e){o[e]=i[e]}),o=s.fire("click",o),o.isDefaultPrevented()||(s.selection.placeCaretAt(i.clientX,i.clientY),s.nodeChanged()))}))})}function $(){s.on("init",function(){s.dom.bind(s.getBody(),"submit",function(e){e.preventDefault()})})}function q(){et.addNodeFilter("br",function(e){for(var t=e.length;t--;)"Apple-interchange-newline"==e[t].attr("class")&&e[t].remove()})}function j(){s.on("dragstart",function(e){d(e)}),s.on("drop",function(e){if(!u(e)){var n=f(e);if(n){e.preventDefault();var r=t.getCaretRangeFromPoint(e.x,e.y,s.getDoc());Q.setRng(r),p(n)}}})}var Y=a.each,K=s.$,G=e.BACKSPACE,X=e.DELETE,J=s.dom,Q=s.selection,Z=s.settings,et=s.parser,tt=s.serializer,nt=o.gecko,rt=o.ie,it=o.webkit,ot="data:text/mce-internal,",at=rt?"Text":"URL";k(),m(),H(),it&&(h(),v(),C(),R(),$(),_(),q(),U(),o.iOS?(O(),I(),V()):g()),rt&&o.ie<11&&(y(),w(),E(),N(),B(),D(),L(),M()),o.ie>=11&&(I(),W(),_()),o.ie&&(g(),z(),j()),nt&&(y(),b(),x(),S(),T(),A(),P(),F(),_())}}),r(lt,[$],function(e){function t(t){return t._eventDispatcher||(t._eventDispatcher=new e({scope:t,toggleEvent:function(n,r){e.isNative(n)&&t.toggleNativeEvent&&t.toggleNativeEvent(n,r)}})),t._eventDispatcher}return{fire:function(e,n,r){var i=this;if(i.removed&&"remove"!==e)return n;if(n=t(i).fire(e,n,r),r!==!1&&i.parent)for(var o=i.parent();o&&!n.isPropagationStopped();)o.fire(e,n,!1),o=o.parent();return n},on:function(e,n,r){return t(this).on(e,n,r)},off:function(e,n){return t(this).off(e,n)},once:function(e,n){return t(this).once(e,n)},hasEventListeners:function(e){return t(this).has(e)}}}),r(ct,[lt,y,d],function(e,t,n){function r(e,t){return"selectionchange"==t?e.getDoc():!e.inline&&/^mouse|click|contextmenu|drop|dragover|dragend/.test(t)?e.getDoc().documentElement:e.settings.event_root?(e.eventRoot||(e.eventRoot=o.select(e.settings.event_root)[0]),e.eventRoot):e.getBody()}function i(e,t){var n=r(e,t),i;if(e.delegates||(e.delegates={}),!e.delegates[t])if(e.settings.event_root){if(a||(a={},e.editorManager.on("removeEditor",function(){var t;if(!e.editorManager.activeEditor&&a){for(t in a)e.dom.unbind(r(e,t));a=null}})),a[t])return;i=function(n){for(var r=n.target,i=e.editorManager.editors,a=i.length;a--;){var s=i[a].getBody();(s===r||o.isChildOf(r,s))&&(i[a].hidden||i[a].fire(t,n))}},a[t]=i,o.bind(n,t,i)}else i=function(n){e.hidden||e.fire(t,n)},o.bind(n,t,i),e.delegates[t]=i}var o=t.DOM,a,s={bindPendingEventDelegates:function(){var e=this;n.each(e._pendingNativeEvents,function(t){i(e,t)})},toggleNativeEvent:function(e,t){var n=this;n.settings.readonly||"focus"!=e&&"blur"!=e&&(t?n.initialized?i(n,e):n._pendingNativeEvents?n._pendingNativeEvents.push(e):n._pendingNativeEvents=[e]:n.initialized&&(n.dom.unbind(r(n,e),e,n.delegates[e]),delete n.delegates[e]))},unbindAllNativeEvents:function(){var e=this,t;if(e.delegates){for(t in e.delegates)e.dom.unbind(r(e,t),t,e.delegates[t]);delete e.delegates}e.inline||(e.getBody().onload=null,e.dom.unbind(e.getWin()),e.dom.unbind(e.getDoc())),e.dom.unbind(e.getBody()),e.dom.unbind(e.getContainer())}};return s=n.extend({},e,s)}),r(ut,[d,u],function(e,t){var n=e.each,r=e.explode,i={f9:120,f10:121,f11:122},o=e.makeMap("alt,ctrl,shift,meta,access");return function(a){function s(e,s,l,c){var u,d,f;f={func:l,scope:c||a,desc:a.translate(s)},n(r(e,"+"),function(e){e in o?f[e]=!0:/^[0-9]{2,}$/.test(e)?f.keyCode=parseInt(e,10):(f.charCode=e.charCodeAt(0),f.keyCode=i[e]||e.toUpperCase().charCodeAt(0))}),u=[f.keyCode];for(d in o)f[d]?u.push(d):f[d]=!1;return f.id=u.join(","),f.access&&(f.alt=!0,t.mac?f.ctrl=!0:f.shift=!0),f.meta&&(t.mac?f.meta=!0:(f.ctrl=!0,f.meta=!1)),f}var l=this,c={};a.on("keyup keypress keydown",function(e){(e.altKey||e.ctrlKey||e.metaKey)&&!e.isDefaultPrevented()&&n(c,function(t){return t.ctrl==e.ctrlKey&&t.meta==e.metaKey&&t.alt==e.altKey&&t.shift==e.shiftKey&&(e.keyCode==t.keyCode||e.charCode&&e.charCode==t.charCode)?(e.preventDefault(),"keydown"==e.type&&t.func.call(t.scope),!0):void 0})}),l.add=function(t,i,o,l){var u;return u=o,"string"==typeof o?o=function(){a.execCommand(u,!1,null)}:e.isArray(u)&&(o=function(){a.execCommand(u[0],u[1],u[2])}),n(r(t.toLowerCase()),function(e){var t=s(e,i,o,l);c[t.id]=t}),!0},l.remove=function(e){var t=s(e);return c[t.id]?(delete c[t.id],!0):!1}}}),r(dt,[y,f,C,w,_,R,T,M,O,I,F,z,W,V,b,l,at,E,k,st,u,d,ct,ut],function(e,n,r,i,o,a,s,l,c,u,d,f,p,h,m,g,v,y,b,C,x,w,_,E){function N(e,t,i){var o=this,a,s;a=o.documentBaseUrl=i.documentBaseURL,s=i.baseURI,o.settings=t=R({id:e,theme:"modern",delta_width:0,delta_height:0,popup_css:"",plugins:"",document_base_url:a,add_form_submit_trigger:!0,submit_patch:!0,add_unload_trigger:!0,convert_urls:!0,relative_urls:!0,remove_script_host:!0,object_resizing:!0,doctype:"<!DOCTYPE html>",visual:!0,font_size_style_values:"xx-small,x-small,small,medium,large,x-large,xx-large",font_size_legacy_values:"xx-small,small,medium,large,x-large,xx-large,300%",forced_root_block:"p",hidden_input:!0,padd_empty_editor:!0,render_ui:!0,indentation:"30px",inline_styles:!0,convert_fonts_to_spans:!0,indent:"simple",indent_before:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,option,optgroup,datalist",indent_after:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,option,optgroup,datalist",validate:!0,entity_encoding:"named",url_converter:o.convertURL,url_converter_scope:o,ie7_compat:!0},t),r.language=t.language||"en",r.languageLoad=t.language_load,r.baseURL=i.baseURL,o.id=t.id=e,o.isNotDirty=!0,o.plugins={},o.documentBaseURI=new h(t.document_base_url||a,{base_uri:s}),o.baseURI=s,o.contentCSS=[],o.contentStyles=[],o.shortcuts=new E(o),o.loadedCSS={},o.editorCommands=new p(o),t.target&&(o.targetElm=t.target),o.suffix=i.suffix,o.editorManager=i,o.inline=t.inline,t.cache_suffix&&(x.cacheSuffix=t.cache_suffix.replace(/^[\?\&]+/,"")),i.fire("SetupEditor",o),o.execCallback("setup",o),o.$=n.overrideDefaults(function(){return{context:o.inline?o.getBody():o.getDoc(),element:o.getBody()}})}var k=e.DOM,S=r.ThemeManager,T=r.PluginManager,R=w.extend,A=w.each,B=w.explode,D=w.inArray,L=w.trim,M=w.resolve,H=g.Event,P=x.gecko,O=x.ie;return N.prototype={render:function(){function e(){k.unbind(window,"ready",e),n.render()}function t(){var e=m.ScriptLoader;if(r.language&&"en"!=r.language&&!r.language_url&&(r.language_url=n.editorManager.baseURL+"/langs/"+r.language+".js"),r.language_url&&e.add(r.language_url),r.theme&&"function"!=typeof r.theme&&"-"!=r.theme.charAt(0)&&!S.urls[r.theme]){var t=r.theme_url;t=t?n.documentBaseURI.toAbsolute(t):"themes/"+r.theme+"/theme"+o+".js",S.load(r.theme,t)}w.isArray(r.plugins)&&(r.plugins=r.plugins.join(" ")),A(r.external_plugins,function(e,t){T.load(t,e),r.plugins+=" "+t}),A(r.plugins.split(/[ ,]/),function(e){if(e=L(e),e&&!T.urls[e])if("-"==e.charAt(0)){e=e.substr(1,e.length);var t=T.dependencies(e);A(t,function(e){var t={prefix:"plugins/",resource:e,suffix:"/plugin"+o+".js"};e=T.createUrl(t,e),T.load(e.resource,e)})}else T.load(e,{prefix:"plugins/",resource:e,suffix:"/plugin"+o+".js"})}),e.loadQueue(function(){n.removed||n.init()})}var n=this,r=n.settings,i=n.id,o=n.suffix;if(!H.domLoaded)return void k.bind(window,"ready",e);if(n.getElement()&&x.contentEditable){r.inline?n.inline=!0:(n.orgVisibility=n.getElement().style.visibility,n.getElement().style.visibility="hidden");var a=n.getElement().form||k.getParent(i,"form");a&&(n.formElement=a,r.hidden_input&&!/TEXTAREA|INPUT/i.test(n.getElement().nodeName)&&(k.insertAfter(k.create("input",{type:"hidden",name:i}),i),n.hasHiddenInput=!0),n.formEventDelegate=function(e){n.fire(e.type,e)},k.bind(a,"submit reset",n.formEventDelegate),n.on("reset",function(){n.setContent(n.startContent,{format:"raw"})}),!r.submit_patch||a.submit.nodeType||a.submit.length||a._mceOldSubmit||(a._mceOldSubmit=a.submit,a.submit=function(){return n.editorManager.triggerSave(),n.isNotDirty=!0,a._mceOldSubmit(a)})),n.windowManager=new v(n),"xml"==r.encoding&&n.on("GetContent",function(e){e.save&&(e.content=k.encode(e.content))}),r.add_form_submit_trigger&&n.on("submit",function(){n.initialized&&n.save()}),r.add_unload_trigger&&(n._beforeUnload=function(){!n.initialized||n.destroyed||n.isHidden()||n.save({format:"raw",no_events:!0,set_dirty:!1})},n.editorManager.on("BeforeUnload",n._beforeUnload)),t()}},init:function(){function e(n){var r=T.get(n),i,o;i=T.urls[n]||t.documentBaseUrl.replace(/\/$/,""),n=L(n),r&&-1===D(m,n)&&(A(T.dependencies(n),function(t){e(t)}),o=new r(t,i,t.$),t.plugins[n]=o,o.init&&(o.init(t,i),m.push(n)))}var t=this,n=t.settings,r=t.getElement(),i,o,a,s,l,c,u,d,f,p,h,m=[];if(this.editorManager.i18n.setCode(n.language),t.rtl=this.editorManager.i18n.rtl,t.editorManager.add(t),n.aria_label=n.aria_label||k.getAttrib(r,"aria-label",t.getLang("aria.rich_text_area")),n.theme&&("function"!=typeof n.theme?(n.theme=n.theme.replace(/-/,""),c=S.get(n.theme),t.theme=new c(t,S.urls[n.theme]),t.theme.init&&t.theme.init(t,S.urls[n.theme]||t.documentBaseUrl.replace(/\/$/,""),t.$)):t.theme=n.theme),A(n.plugins.replace(/\-/g,"").split(/[ ,]/),e),n.render_ui&&t.theme&&(t.orgDisplay=r.style.display,"function"!=typeof n.theme?(i=n.width||r.style.width||r.offsetWidth,o=n.height||r.style.height||r.offsetHeight,a=n.min_height||100,p=/^[0-9\.]+(|px)$/i,p.test(""+i)&&(i=Math.max(parseInt(i,10),100)),p.test(""+o)&&(o=Math.max(parseInt(o,10),a)),l=t.theme.renderUI({targetNode:r,width:i,height:o,deltaWidth:n.delta_width,deltaHeight:n.delta_height}),n.content_editable||(o=(l.iframeHeight||o)+("number"==typeof o?l.deltaHeight||0:""),a>o&&(o=a))):(l=n.theme(t,r),l.editorContainer.nodeType&&(l.editorContainer=l.editorContainer.id=l.editorContainer.id||t.id+"_parent"),l.iframeContainer.nodeType&&(l.iframeContainer=l.iframeContainer.id=l.iframeContainer.id||t.id+"_iframecontainer"),o=l.iframeHeight||r.offsetHeight),t.editorContainer=l.editorContainer),n.content_css&&A(B(n.content_css),function(e){t.contentCSS.push(t.documentBaseURI.toAbsolute(e))}),n.content_style&&t.contentStyles.push(n.content_style),n.content_editable)return r=s=l=null,t.initContentBody();for(t.iframeHTML=n.doctype+"<html><head>",n.document_base_url!=t.documentBaseUrl&&(t.iframeHTML+='<base href="'+t.documentBaseURI.getURI()+'" />'),!x.caretAfter&&n.ie7_compat&&(t.iframeHTML+='<meta http-equiv="X-UA-Compatible" content="IE=7" />'),t.iframeHTML+='<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />',h=0;h<t.contentCSS.length;h++){var g=t.contentCSS[h];t.iframeHTML+='<link type="text/css" rel="stylesheet" href="'+w._addCacheSuffix(g)+'" />',t.loadedCSS[g]=!0}d=n.body_id||"tinymce",-1!=d.indexOf("=")&&(d=t.getParam("body_id","","hash"),d=d[t.id]||d),f=n.body_class||"",-1!=f.indexOf("=")&&(f=t.getParam("body_class","","hash"),f=f[t.id]||""),n.content_security_policy&&(t.iframeHTML+='<meta http-equiv="Content-Security-Policy" content="'+n.content_security_policy+'" />'),t.iframeHTML+='</head><body id="'+d+'" class="mce-content-body '+f+'" data-id="'+t.id+'"><br></body></html>';var v='javascript:(function(){document.open();document.domain="'+document.domain+'";var ed = window.parent.tinymce.get("'+t.id+'");document.write(ed.iframeHTML);document.close();ed.initContentBody(true);})()';document.domain!=location.hostname&&(u=v);var y=k.create("iframe",{id:t.id+"_ifr",frameBorder:"0",allowTransparency:"true",title:t.editorManager.translate("Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"),style:{width:"100%",height:o,display:"block"}});if(y.onload=function(){y.onload=null,t.fire("load")},k.setAttrib(y,"src",u||'javascript:""'),t.contentAreaContainer=l.iframeContainer,t.iframeElement=y,s=k.add(l.iframeContainer,y),O)try{t.getDoc()}catch(b){s.src=u=v}l.editorContainer&&(k.get(l.editorContainer).style.display=t.orgDisplay,t.hidden=k.isHidden(l.editorContainer)),t.getElement().style.display="none",k.setAttrib(t.id,"aria-hidden",!0),u||t.initContentBody(),r=s=l=null},initContentBody:function(t){var n=this,r=n.settings,s=n.getElement(),p=n.getDoc(),h,m;r.inline||(n.getElement().style.visibility=n.orgVisibility),t||r.content_editable||(p.open(),p.write(n.iframeHTML),p.close()),r.content_editable&&(n.on("remove",function(){var e=this.getBody();k.removeClass(e,"mce-content-body"),k.removeClass(e,"mce-edit-focus"),k.setAttrib(e,"contentEditable",null)}),k.addClass(s,"mce-content-body"),n.contentDocument=p=r.content_document||document,n.contentWindow=r.content_window||window,n.bodyElement=s,r.content_document=r.content_window=null,r.root_name=s.nodeName.toLowerCase()),h=n.getBody(),h.disabled=!0,r.readonly||(n.inline&&"static"==k.getStyle(h,"position",!0)&&(h.style.position="relative"),h.contentEditable=n.getParam("content_editable_state",!0)),h.disabled=!1,n.schema=new y(r),n.dom=new e(p,{keep_values:!0,url_converter:n.convertURL,url_converter_scope:n,hex_colors:r.force_hex_style_colors,class_filter:r.class_filter,update_styles:!0,root_element:n.inline?n.getBody():null,collect:r.content_editable,schema:n.schema,onSetAttrib:function(e){n.fire("SetAttrib",e)}}),n.parser=new b(r,n.schema),n.parser.addAttributeFilter("src,href,style,tabindex",function(e,t){for(var r=e.length,i,o=n.dom,a,s;r--;)i=e[r],a=i.attr(t),s="data-mce-"+t,i.attributes.map[s]||("style"===t?(a=o.serializeStyle(o.parseStyle(a),i.name),a.length||(a=null),i.attr(s,a),i.attr(t,a)):"tabindex"===t?(i.attr(s,a),i.attr(t,null)):i.attr(s,n.convertURL(a,t,i.name)))}),n.parser.addNodeFilter("script",function(e){for(var t=e.length,n;t--;)n=e[t],n.attr("type","mce-"+(n.attr("type")||"no/type"))}),n.parser.addNodeFilter("#cdata",function(e){for(var t=e.length,n;t--;)n=e[t],n.type=8,n.name="#comment",n.value="[CDATA["+n.value+"]]"}),n.parser.addNodeFilter("p,h1,h2,h3,h4,h5,h6,div",function(e){for(var t=e.length,r,i=n.schema.getNonEmptyElements();t--;)r=e[t],r.isEmpty(i)&&(r.append(new o("br",1)).shortEnded=!0)}),n.serializer=new a(r,n),n.selection=new l(n.dom,n.getWin(),n.serializer,n),n.formatter=new c(n),n.undoManager=new u(n),n.forceBlocks=new f(n),n.enterKey=new d(n),n._nodeChangeDispatcher=new i(n),n.fire("PreInit"),r.browser_spellcheck||r.gecko_spellcheck||(p.body.spellcheck=!1,k.setAttrib(h,"spellcheck","false")),n.fire("PostRender"),n.quirks=new C(n),r.directionality&&(h.dir=r.directionality),r.nowrap&&(h.style.whiteSpace="nowrap"),r.protect&&n.on("BeforeSetContent",function(e){A(r.protect,function(t){e.content=e.content.replace(t,function(e){return"<!--mce:protected "+escape(e)+"-->"})})}),n.on("SetContent",function(){n.addVisual(n.getBody())}),r.padd_empty_editor&&n.on("PostProcess",function(e){e.content=e.content.replace(/^(<p[^>]*>(&nbsp;|&#160;|\s|\u00a0|)<\/p>[\r\n]*|<br \/>[\r\n]*)$/,"")}),n.load({initial:!0,format:"html"}),n.startContent=n.getContent({format:"raw"}),n.initialized=!0,n.bindPendingEventDelegates(),n.fire("init"),n.focus(!0),n.nodeChanged({initial:!0}),n.execCallback("init_instance_callback",n),n.contentStyles.length>0&&(m="",A(n.contentStyles,function(e){m+=e+"\r\n"}),n.dom.addStyle(m)),A(n.contentCSS,function(e){n.loadedCSS[e]||(n.dom.loadCSS(e),n.loadedCSS[e]=!0)}),r.auto_focus&&setTimeout(function(){var e;e=r.auto_focus===!0?n:n.editorManager.get(r.auto_focus),e.focus()},100),s=p=h=null},focus:function(e){var t=this,n=t.selection,r=t.settings.content_editable,i,o,a=t.getDoc(),s;if(!e){if(i=n.getRng(),i.item&&(o=i.item(0)),t._refreshContentEditable(),r||(x.opera||t.getBody().focus(),t.getWin().focus()),P||r){if(s=t.getBody(),s.setActive)try{s.setActive()}catch(l){s.focus()}else s.focus();r&&n.normalize()}o&&o.ownerDocument==a&&(i=a.body.createControlRange(),i.addElement(o),i.select())}t.editorManager.setActive(t)},execCallback:function(e){var t=this,n=t.settings[e],r;if(n)return t.callbackLookup&&(r=t.callbackLookup[e])&&(n=r.func,r=r.scope),"string"==typeof n&&(r=n.replace(/\.\w+$/,""),r=r?M(r):0,n=M(n),t.callbackLookup=t.callbackLookup||{},t.callbackLookup[e]={func:n,scope:r}),n.apply(r||t,Array.prototype.slice.call(arguments,1))},translate:function(e){var t=this.settings.language||"en",n=this.editorManager.i18n;return e?n.data[t+"."+e]||e.replace(/\{\#([^\}]+)\}/g,function(e,r){return n.data[t+"."+r]||"{#"+r+"}"}):""},getLang:function(e,n){return this.editorManager.i18n.data[(this.settings.language||"en")+"."+e]||(n!==t?n:"{#"+e+"}")},getParam:function(e,t,n){var r=e in this.settings?this.settings[e]:t,i;return"hash"===n?(i={},"string"==typeof r?A(r.split(r.indexOf("=")>0?/[;,](?![^=;,]*(?:[;,]|$))/:","),function(e){e=e.split("="),i[L(e[0])]=L(e.length>1?e[1]:e)}):i=r,i):r},nodeChanged:function(e){this._nodeChangeDispatcher.nodeChanged(e)},addButton:function(e,t){var n=this;t.cmd&&(t.onclick=function(){n.execCommand(t.cmd)}),t.text||t.icon||(t.icon=e),n.buttons=n.buttons||{},t.tooltip=t.tooltip||t.title,n.buttons[e]=t},addMenuItem:function(e,t){var n=this;t.cmd&&(t.onclick=function(){n.execCommand(t.cmd)}),n.menuItems=n.menuItems||{},n.menuItems[e]=t},addCommand:function(e,t,n){this.editorCommands.addCommand(e,t,n)},addQueryStateHandler:function(e,t,n){this.editorCommands.addQueryStateHandler(e,t,n)},addQueryValueHandler:function(e,t,n){this.editorCommands.addQueryValueHandler(e,t,n)},addShortcut:function(e,t,n,r){this.shortcuts.add(e,t,n,r)},execCommand:function(e,t,n,r){return this.editorCommands.execCommand(e,t,n,r)},queryCommandState:function(e){return this.editorCommands.queryCommandState(e)},queryCommandValue:function(e){return this.editorCommands.queryCommandValue(e)},queryCommandSupported:function(e){return this.editorCommands.queryCommandSupported(e)},show:function(){var e=this;e.hidden&&(e.hidden=!1,e.inline?e.getBody().contentEditable=!0:(k.show(e.getContainer()),k.hide(e.id)),e.load(),e.fire("show"))},hide:function(){var e=this,t=e.getDoc();e.hidden||(O&&t&&!e.inline&&t.execCommand("SelectAll"),e.save(),e.inline?(e.getBody().contentEditable=!1,e==e.editorManager.focusedEditor&&(e.editorManager.focusedEditor=null)):(k.hide(e.getContainer()),k.setStyle(e.id,"display",e.orgDisplay)),e.hidden=!0,e.fire("hide"))},isHidden:function(){return!!this.hidden},setProgressState:function(e,t){this.fire("ProgressState",{state:e,time:t})},load:function(e){var n=this,r=n.getElement(),i;return r?(e=e||{},e.load=!0,i=n.setContent(r.value!==t?r.value:r.innerHTML,e),e.element=r,e.no_events||n.fire("LoadContent",e),e.element=r=null,i):void 0},save:function(e){var t=this,n=t.getElement(),r,i;if(n&&t.initialized)return e=e||{},e.save=!0,e.element=n,r=e.content=t.getContent(e),e.no_events||t.fire("SaveContent",e),r=e.content,/TEXTAREA|INPUT/i.test(n.nodeName)?n.value=r:(t.inline||(n.innerHTML=r),(i=k.getParent(t.id,"form"))&&A(i.elements,function(e){return e.name==t.id?(e.value=r,!1):void 0})),e.element=n=null,e.set_dirty!==!1&&(t.isNotDirty=!0),r},setContent:function(e,t){var n=this,r=n.getBody(),i;return t=t||{},t.format=t.format||"html",t.set=!0,t.content=e,t.no_events||n.fire("BeforeSetContent",t),e=t.content,0===e.length||/^\s+$/.test(e)?(i=n.settings.forced_root_block,i&&n.schema.isValidChild(r.nodeName.toLowerCase(),i.toLowerCase())?(e=O&&11>O?"":'<br data-mce-bogus="1">',e=n.dom.createHTML(i,n.settings.forced_root_block_attrs,e)):O||(e='<br data-mce-bogus="1">'),n.dom.setHTML(r,e),n.fire("SetContent",t)):("raw"!==t.format&&(e=new s({},n.schema).serialize(n.parser.parse(e,{isRootContent:!0}))),t.content=L(e),n.dom.setHTML(r,t.content),t.no_events||n.fire("SetContent",t)),t.content},getContent:function(e){var t=this,n,r=t.getBody();return e=e||{},e.format=e.format||"html",e.get=!0,e.getInner=!0,e.no_events||t.fire("BeforeGetContent",e),n="raw"==e.format?r.innerHTML:"text"==e.format?r.innerText||r.textContent:t.serializer.serialize(r,e),e.content="text"!=e.format?L(n):n,e.no_events||t.fire("GetContent",e),e.content},insertContent:function(e,t){t&&(e=R({content:e},t)),this.execCommand("mceInsertContent",!1,e)},isDirty:function(){return!this.isNotDirty},getContainer:function(){var e=this;return e.container||(e.container=k.get(e.editorContainer||e.id+"_parent")),e.container},getContentAreaContainer:function(){return this.contentAreaContainer},getElement:function(){return this.targetElm||(this.targetElm=k.get(this.id)),this.targetElm},getWin:function(){var e=this,t;return e.contentWindow||(t=e.iframeElement,t&&(e.contentWindow=t.contentWindow)),e.contentWindow},getDoc:function(){var e=this,t;return e.contentDocument||(t=e.getWin(),t&&(e.contentDocument=t.document)),e.contentDocument},getBody:function(){return this.bodyElement||this.getDoc().body},convertURL:function(e,t,n){var r=this,i=r.settings;return i.urlconverter_callback?r.execCallback("urlconverter_callback",e,n,!0,t):!i.convert_urls||n&&"LINK"==n.nodeName||0===e.indexOf("file:")||0===e.length?e:i.relative_urls?r.documentBaseURI.toRelative(e):e=r.documentBaseURI.toAbsolute(e,i.remove_script_host)},addVisual:function(e){var n=this,r=n.settings,i=n.dom,o;e=e||n.getBody(),n.hasVisual===t&&(n.hasVisual=r.visual),A(i.select("table,a",e),function(e){var t;switch(e.nodeName){case"TABLE":return o=r.visual_table_class||"mce-item-table",t=i.getAttrib(e,"border"),void(t&&"0"!=t||!n.hasVisual?i.removeClass(e,o):i.addClass(e,o));case"A":return void(i.getAttrib(e,"href",!1)||(t=i.getAttrib(e,"name")||e.id,o=r.visual_anchor_class||"mce-item-anchor",t&&n.hasVisual?i.addClass(e,o):i.removeClass(e,o)))}}),n.fire("VisualAid",{element:e,hasVisual:n.hasVisual})},remove:function(){var e=this;e.removed||(e.save(),e.removed=1,e.unbindAllNativeEvents(),e.hasHiddenInput&&k.remove(e.getElement().nextSibling),e.inline||(O&&10>O&&e.getDoc().execCommand("SelectAll",!1,null),k.setStyle(e.id,"display",e.orgDisplay),e.getBody().onload=null),e.fire("remove"),e.editorManager.remove(e),k.remove(e.getContainer()),e.destroy())},destroy:function(e){var t=this,n;if(!t.destroyed){if(!e&&!t.removed)return void t.remove();e||(t.editorManager.off("beforeunload",t._beforeUnload),t.theme&&t.theme.destroy&&t.theme.destroy(),t.selection.destroy(),t.dom.destroy()),n=t.formElement,n&&(n._mceOldSubmit&&(n.submit=n._mceOldSubmit,n._mceOldSubmit=null),k.unbind(n,"submit reset",t.formEventDelegate)),t.contentAreaContainer=t.formElement=t.container=t.editorContainer=null,t.bodyElement=t.contentDocument=t.contentWindow=null,t.iframeElement=t.targetElm=null,t.selection&&(t.selection=t.selection.win=t.selection.dom=t.selection.dom.doc=null),t.destroyed=1}},_refreshContentEditable:function(){var e=this,t,n;e._isHidden()&&(t=e.getBody(),n=t.parentNode,n.removeChild(t),n.appendChild(t),t.focus())},_isHidden:function(){var e;return P?(e=this.selection.getSel(),!e||!e.rangeCount||0===e.rangeCount):0}},R(N.prototype,_),N}),r(ft,[],function(){var e={},t="en";return{setCode:function(e){e&&(t=e,this.rtl=this.data[e]?"rtl"===this.data[e]._dir:!1)},getCode:function(){return t},rtl:!1,add:function(t,n){var r=e[t];r||(e[t]=r={});for(var i in n)r[i]=n[i];this.setCode(t)},translate:function(n){var r;if(r=e[t],r||(r={}),"undefined"==typeof n)return n;if("string"!=typeof n&&n.raw)return n.raw;if(n.push){var i=n.slice(1);n=(r[n[0]]||n[0]).replace(/\{([0-9]+)\}/g,function(e,t){return i[t]})}return(r[n]||n).replace(/{context:\w+}$/,"")},data:e}}),r(pt,[y,u],function(e,t){function n(e){function s(){try{return document.activeElement}catch(e){return document.body}}function l(e,t){if(t&&t.startContainer){if(!e.isChildOf(t.startContainer,e.getRoot())||!e.isChildOf(t.endContainer,e.getRoot()))return;return{startContainer:t.startContainer,startOffset:t.startOffset,endContainer:t.endContainer,endOffset:t.endOffset}}return t}function c(e,t){var n;return t.startContainer?(n=e.getDoc().createRange(),n.setStart(t.startContainer,t.startOffset),n.setEnd(t.endContainer,t.endOffset)):n=t,n}function u(e){return!!a.getParent(e,n.isEditorUIElement)}function d(n){var d=n.editor;d.on("init",function(){(d.inline||t.ie)&&("onbeforedeactivate"in document&&t.ie<9?d.dom.bind(d.getBody(),"beforedeactivate",function(e){if(e.target==d.getBody())try{d.lastRng=d.selection.getRng()}catch(t){}}):d.on("nodechange mouseup keyup",function(e){var t=s();"nodechange"==e.type&&e.selectionChange||(t&&t.id==d.id+"_ifr"&&(t=d.getBody()),d.dom.isChildOf(t,d.getBody())&&(d.lastRng=d.selection.getRng()))}),t.webkit&&!r&&(r=function(){var t=e.activeEditor;if(t&&t.selection){var n=t.selection.getRng();n&&!n.collapsed&&(d.lastRng=n)}},a.bind(document,"selectionchange",r)))}),d.on("setcontent",function(){d.lastRng=null}),d.on("mousedown",function(){d.selection.lastFocusBookmark=null}),d.on("focusin",function(){var t=e.focusedEditor;d.selection.lastFocusBookmark&&(d.selection.setRng(c(d,d.selection.lastFocusBookmark)),d.selection.lastFocusBookmark=null),t!=d&&(t&&t.fire("blur",{focusedEditor:d}),e.setActive(d),e.focusedEditor=d,d.fire("focus",{blurredEditor:t}),d.focus(!0)),d.lastRng=null}),d.on("focusout",function(){window.setTimeout(function(){var t=e.focusedEditor;u(s())||t!=d||(d.fire("blur",{focusedEditor:null}),e.focusedEditor=null,d.selection&&(d.selection.lastFocusBookmark=null))},0)}),i||(i=function(t){var n=e.activeEditor;n&&t.target.ownerDocument==document&&(n.selection&&t.target!=n.getBody()&&(n.selection.lastFocusBookmark=l(n.dom,n.lastRng)),t.target==document.body||u(t.target)||e.focusedEditor!=n||(n.fire("blur",{focusedEditor:null}),e.focusedEditor=null))},a.bind(document,"focusin",i)),d.inline&&!o&&(o=function(t){var n=e.activeEditor;if(n.inline&&!n.dom.isChildOf(t.target,n.getBody())){var r=n.selection.getRng();r.collapsed||(n.lastRng=r)}},a.bind(document,"mouseup",o))}function f(t){e.focusedEditor==t.editor&&(e.focusedEditor=null),e.activeEditor||(a.unbind(document,"selectionchange",r),a.unbind(document,"focusin",i),a.unbind(document,"mouseup",o),r=i=o=null)}e.on("AddEditor",d),e.on("RemoveEditor",f)}var r,i,o,a=e.DOM;return n.isEditorUIElement=function(e){return-1!==e.className.toString().indexOf("mce-")},n}),r(ht,[dt,f,y,V,u,d,lt,ft,pt],function(e,t,n,r,i,o,a,s,l){function c(e){var t=v.editors,n;delete t[e.id];for(var r=0;r<t.length;r++)if(t[r]==e){t.splice(r,1),n=!0;break}return v.activeEditor==e&&(v.activeEditor=t[0]),v.focusedEditor==e&&(v.focusedEditor=null),n}function u(e){return e&&!(e.getContainer()||e.getBody()).parentNode&&(c(e),e.unbindAllNativeEvents(),e.destroy(!0),e=null),e}var d=n.DOM,f=o.explode,p=o.each,h=o.extend,m=0,g,v;return v={$:t,majorVersion:"4",minorVersion:"1.9",releaseDate:"2015-03-10",editors:[],i18n:s,activeEditor:null,setup:function(){var e=this,t,n,i="",o,a;if(n=document.location.href,/^[^:]+:\/\/\/?[^\/]+\//.test(n)&&(n=n.replace(/[\?#].*$/,"").replace(/[\/\\][^\/]+$/,""),/[\/\\]$/.test(n)||(n+="/")),o=window.tinymce||window.tinyMCEPreInit)t=o.base||o.baseURL,i=o.suffix;else{for(var s=document.getElementsByTagName("script"),c=0;c<s.length;c++)if(a=s[c].src,/tinymce(\.full|\.jquery|)(\.min|\.dev|)\.js/.test(a)){-1!=a.indexOf(".min")&&(i=".min"),t=a.substring(0,a.lastIndexOf("/"));break}!t&&document.currentScript&&(a=document.currentScript.src,-1!=a.indexOf(".min")&&(i=".min"),t=a.substring(0,a.lastIndexOf("/")))}e.baseURL=new r(n).toAbsolute(t),e.documentBaseURL=n,e.baseURI=new r(e.baseURL),e.suffix=i,e.focusManager=new l(e)},init:function(t){function n(e){var t=e.id;return t||(t=e.name,t=t&&!d.get(t)?e.name:d.uniqueId(),e.setAttribute("id",t)),t}function r(t,n,r){if(!u(s.get(t))){var i=new e(t,n,s);i.targetElm=i.targetElm||r,l.push(i),i.render()}}function i(e){var n=t[e];if(n)return n.apply(s,Array.prototype.slice.call(arguments,2))}function o(e,t){return t.constructor===RegExp?t.test(e.className):d.hasClass(e,t)}function a(){var e,s;if(d.unbind(window,"ready",a),i("onpageload"),t.types)return void p(t.types,function(e){p(d.select(e.selector),function(i){r(n(i),h({},t,e),i)})});if(t.selector)return void p(d.select(t.selector),function(e){r(n(e),t,e)});switch(t.target&&r(n(t.target),t),t.mode){case"exact":e=t.elements||"",e.length>0&&p(f(e),function(e){var n;(n=d.get(e))?r(e,t,n):p(document.forms,function(n){p(n.elements,function(n){n.name===e&&(e="mce_editor_"+m++,d.setAttrib(n,"id",e),r(e,t,n))})})});break;case"textareas":case"specific_textareas":p(d.select("textarea"),function(e){t.editor_deselector&&o(e,t.editor_deselector)||(!t.editor_selector||o(e,t.editor_selector))&&r(n(e),t,e)})}t.oninit&&(e=s=0,p(l,function(t){s++,t.initialized?e++:t.on("init",function(){e++,e==s&&i("oninit")}),e==s&&i("oninit")}))}var s=this,l=[];s.settings=t,d.bind(window,"ready",a)},get:function(e){return arguments.length?e in this.editors?this.editors[e]:null:this.editors},add:function(e){var t=this,n=t.editors;return n[e.id]=e,n.push(e),t.activeEditor=e,t.fire("AddEditor",{editor:e}),g||(g=function(){t.fire("BeforeUnload")},d.bind(window,"beforeunload",g)),e},createEditor:function(t,n){return this.add(new e(t,n,this))},remove:function(e){var t=this,n,r=t.editors,i;{if(e)return"string"==typeof e?(e=e.selector||e,void p(d.select(e),function(e){i=r[e.id],i&&t.remove(i)})):(i=e,r[i.id]?(c(i)&&t.fire("RemoveEditor",{editor:i}),r.length||d.unbind(window,"beforeunload",g),i.remove(),i):null);for(n=r.length-1;n>=0;n--)t.remove(r[n])}},execCommand:function(t,n,r){var i=this,o=i.get(r);switch(t){case"mceAddEditor":return i.get(r)||new e(r,i.settings,i).render(),!0;case"mceRemoveEditor":return o&&o.remove(),!0;case"mceToggleEditor":return o?(o.isHidden()?o.show():o.hide(),!0):(i.execCommand("mceAddEditor",0,r),!0)}return i.activeEditor?i.activeEditor.execCommand(t,n,r):!1},triggerSave:function(){p(this.editors,function(e){e.save()})},addI18n:function(e,t){s.add(e,t)},translate:function(e){return s.translate(e)},setActive:function(e){var t=this.activeEditor;this.activeEditor!=e&&(t&&t.fire("deactivate",{relatedTarget:e}),e.fire("activate",{relatedTarget:t})),this.activeEditor=e}},h(v,a),v.setup(),window.tinymce=window.tinyMCE=v,v}),r(mt,[ht,d],function(e,t){var n=t.each,r=t.explode;e.on("AddEditor",function(e){var t=e.editor;t.on("preInit",function(){function e(e,t){n(t,function(t,n){t&&s.setStyle(e,n,t)}),s.rename(e,"span")}function i(e){s=t.dom,l.convert_fonts_to_spans&&n(s.select("font,u,strike",e.node),function(e){o[e.nodeName.toLowerCase()](s,e)})}var o,a,s,l=t.settings;l.inline_styles&&(a=r(l.font_size_legacy_values),o={font:function(t,n){e(n,{backgroundColor:n.style.backgroundColor,color:n.color,fontFamily:n.face,fontSize:a[parseInt(n.size,10)-1]})
},u:function(n,r){"html4"===t.settings.schema&&e(r,{textDecoration:"underline"})},strike:function(t,n){e(n,{textDecoration:"line-through"})}},t.on("PreProcess SetContent",i))})})}),r(gt,[lt,d],function(e,t){var n={send:function(e){function t(){!e.async||4==r.readyState||i++>1e4?(e.success&&1e4>i&&200==r.status?e.success.call(e.success_scope,""+r.responseText,r,e):e.error&&e.error.call(e.error_scope,i>1e4?"TIMED_OUT":"GENERAL",r,e),r=null):setTimeout(t,10)}var r,i=0;if(e.scope=e.scope||this,e.success_scope=e.success_scope||e.scope,e.error_scope=e.error_scope||e.scope,e.async=e.async===!1?!1:!0,e.data=e.data||"",r=new XMLHttpRequest){if(r.overrideMimeType&&r.overrideMimeType(e.content_type),r.open(e.type||(e.data?"POST":"GET"),e.url,e.async),e.crossDomain&&(r.withCredentials=!0),e.content_type&&r.setRequestHeader("Content-Type",e.content_type),r.setRequestHeader("X-Requested-With","XMLHttpRequest"),r=n.fire("beforeSend",{xhr:r,settings:e}).xhr,r.send(e.data),!e.async)return t();setTimeout(t,10)}}};return t.extend(n,e),n}),r(vt,[],function(){function e(t,n){var r,i,o,a;if(n=n||'"',null===t)return"null";if(o=typeof t,"string"==o)return i="\bb	t\nn\ff\rr\"\"''\\\\",n+t.replace(/([\u0080-\uFFFF\x00-\x1f\"\'\\])/g,function(e,t){return'"'===n&&"'"===e?e:(r=i.indexOf(t),r+1?"\\"+i.charAt(r+1):(e=t.charCodeAt().toString(16),"\\u"+"0000".substring(e.length)+e))})+n;if("object"==o){if(t.hasOwnProperty&&"[object Array]"===Object.prototype.toString.call(t)){for(r=0,i="[";r<t.length;r++)i+=(r>0?",":"")+e(t[r],n);return i+"]"}i="{";for(a in t)t.hasOwnProperty(a)&&(i+="function"!=typeof t[a]?(i.length>1?","+n:n)+a+n+":"+e(t[a],n):"");return i+"}"}return""+t}return{serialize:e,parse:function(e){try{return window[String.fromCharCode(101)+"val"]("("+e+")")}catch(t){}}}}),r(yt,[vt,gt,d],function(e,t,n){function r(e){this.settings=i({},e),this.count=0}var i=n.extend;return r.sendRPC=function(e){return(new r).send(e)},r.prototype={send:function(n){var r=n.error,o=n.success;n=i(this.settings,n),n.success=function(t,i){t=e.parse(t),"undefined"==typeof t&&(t={error:"JSON Parse error."}),t.error?r.call(n.error_scope||n.scope,t.error,i):o.call(n.success_scope||n.scope,t.result)},n.error=function(e,t){r&&r.call(n.error_scope||n.scope,e,t)},n.data=e.serialize({id:n.id||"c"+this.count++,method:n.method,params:n.params}),n.content_type="application/json",t.send(n)}},r}),r(bt,[y],function(e){return{callbacks:{},count:0,send:function(n){var r=this,i=e.DOM,o=n.count!==t?n.count:r.count,a="tinymce_jsonp_"+o;r.callbacks[o]=function(e){i.remove(a),delete r.callbacks[o],n.callback(e)},i.add(i.doc.body,"script",{id:a,src:n.url,type:"text/javascript"}),r.count++}}}),r(Ct,[],function(){function e(){s=[];for(var e in a)s.push(e);i.length=s.length}function n(){function n(e){var n,r;return r=e!==t?u+e:i.indexOf(",",u),-1===r||r>i.length?null:(n=i.substring(u,r),u=r+1,n)}var r,i,s,u=0;if(a={},c){o.load(l),i=o.getAttribute(l)||"";do{var d=n();if(null===d)break;if(r=n(parseInt(d,32)||0),null!==r){if(d=n(),null===d)break;s=n(parseInt(d,32)||0),r&&(a[r]=s)}}while(null!==r);e()}}function r(){var t,n="";if(c){for(var r in a)t=a[r],n+=(n?",":"")+r.length.toString(32)+","+r+","+t.length.toString(32)+","+t;o.setAttribute(l,n);try{o.save(l)}catch(i){}e()}}var i,o,a,s,l,c;try{if(window.localStorage)return localStorage}catch(u){}return l="tinymce",o=document.documentElement,c=!!o.addBehavior,c&&o.addBehavior("#default#userData"),i={key:function(e){return s[e]},getItem:function(e){return e in a?a[e]:null},setItem:function(e,t){a[e]=""+t,r()},removeItem:function(e){delete a[e],r()},clear:function(){a={},r()}},n(),i}),r(xt,[y,l,b,C,d,u],function(e,t,n,r,i,o){var a=window.tinymce;return a.DOM=e.DOM,a.ScriptLoader=n.ScriptLoader,a.PluginManager=r.PluginManager,a.ThemeManager=r.ThemeManager,a.dom=a.dom||{},a.dom.Event=t.Event,i.each(i,function(e,t){a[t]=e}),i.each("isOpera isWebKit isIE isGecko isMac".split(" "),function(e){a[e]=o[e.substr(2).toLowerCase()]}),{}}),r(wt,[U,d],function(e,t){return e.extend({Defaults:{firstControlClass:"first",lastControlClass:"last"},init:function(e){this.settings=t.extend({},this.Defaults,e)},preRender:function(e){e.addClass(this.settings.containerClass,"body")},applyClasses:function(e){var t=this,n=t.settings,r,i,o;r=e.items().filter(":visible"),i=n.firstControlClass,o=n.lastControlClass,r.each(function(e){e.removeClass(i).removeClass(o),n.controlClass&&e.addClass(n.controlClass)}),r.eq(0).addClass(i),r.eq(-1).addClass(o)},renderHtml:function(e){var t=this,n=t.settings,r,i="";return r=e.items(),r.eq(0).addClass(n.firstControlClass),r.eq(-1).addClass(n.lastControlClass),r.each(function(e){n.controlClass&&e.addClass(n.controlClass),i+=e.renderHtml()}),i},recalc:function(){},postRender:function(){}})}),r(_t,[wt],function(e){return e.extend({Defaults:{containerClass:"abs-layout",controlClass:"abs-layout-item"},recalc:function(e){e.items().filter(":visible").each(function(e){var t=e.settings;e.layoutRect({x:t.x,y:t.y,w:t.w,h:t.h}),e.recalc&&e.recalc()})},renderHtml:function(e){return'<div id="'+e._id+'-absend" class="'+e.classPrefix+'abs-end"></div>'+this._super(e)}})}),r(Et,[K,tt],function(e,t){return e.extend({Mixins:[t],Defaults:{classes:"widget tooltip tooltip-n"},text:function(e){var t=this;return"undefined"!=typeof e?(t._value=e,t._rendered&&(t.getEl().lastChild.innerHTML=t.encode(e)),t):t._value},renderHtml:function(){var e=this,t=e.classPrefix;return'<div id="'+e._id+'" class="'+e.classes()+'" role="presentation"><div class="'+t+'tooltip-arrow"></div><div class="'+t+'tooltip-inner">'+e.encode(e._text)+"</div></div>"},repaint:function(){var e=this,t,n;t=e.getEl().style,n=e._layoutRect,t.left=n.x+"px",t.top=n.y+"px",t.zIndex=131070}})}),r(Nt,[K,Et],function(e,t){var n,r=e.extend({init:function(e){var t=this;t._super(e),e=t.settings,t.canFocus=!0,e.tooltip&&r.tooltips!==!1&&(t.on("mouseenter",function(n){var r=t.tooltip().moveTo(-65535);if(n.control==t){var i=r.text(e.tooltip).show().testMoveRel(t.getEl(),["bc-tc","bc-tl","bc-tr"]);r.toggleClass("tooltip-n","bc-tc"==i),r.toggleClass("tooltip-nw","bc-tl"==i),r.toggleClass("tooltip-ne","bc-tr"==i),r.moveRel(t.getEl(),i)}else r.hide()}),t.on("mouseleave mousedown click",function(){t.tooltip().hide()})),t.aria("label",e.ariaLabel||e.tooltip)},tooltip:function(){return n||(n=new t({type:"tooltip"}),n.renderTo()),n},active:function(e){var t=this,n;return e!==n&&(t.aria("pressed",e),t.toggleClass("active",e)),t._super(e)},disabled:function(e){var t=this,n;return e!==n&&(t.aria("disabled",e),t.toggleClass("disabled",e)),t._super(e)},postRender:function(){var e=this,t=e.settings;e._rendered=!0,e._super(),e.parent()||!t.width&&!t.height||(e.initLayoutRect(),e.repaint()),t.autofocus&&e.focus()},remove:function(){this._super(),n&&(n.remove(),n=null)}});return r}),r(kt,[Nt],function(e){return e.extend({Defaults:{classes:"widget btn",role:"button"},init:function(e){var t=this,n;t.on("click mousedown",function(e){e.preventDefault()}),t._super(e),n=e.size,e.subtype&&t.addClass(e.subtype),n&&t.addClass("btn-"+n)},icon:function(e){var t=this,n=t.classPrefix;if("undefined"==typeof e)return t.settings.icon;if(t.settings.icon=e,e=e?n+"ico "+n+"i-"+t.settings.icon:"",t._rendered){var r=t.getEl().firstChild,i=r.getElementsByTagName("i")[0];e?(i&&i==r.firstChild||(i=document.createElement("i"),r.insertBefore(i,r.firstChild)),i.className=e):i&&r.removeChild(i),t.text(t._text)}return t},repaint:function(){var e=this.getEl().firstChild.style;e.width=e.height="100%",this._super()},text:function(e){var t=this;if(t._rendered){var n=t.getEl().lastChild.lastChild;n&&(n.data=t.translate(e))}return t._super(e)},renderHtml:function(){var e=this,t=e._id,n=e.classPrefix,r=e.settings.icon,i;return i=e.settings.image,i?(r="none","string"!=typeof i&&(i=window.getSelection?i[0]:i[1]),i=" style=\"background-image: url('"+i+"')\""):i="",r=e.settings.icon?n+"ico "+n+"i-"+r:"",'<div id="'+t+'" class="'+e.classes()+'" tabindex="-1" aria-labelledby="'+t+'"><button role="presentation" type="button" tabindex="-1">'+(r?'<i class="'+r+'"'+i+"></i>":"")+(e._text?(r?"\xa0":"")+e.encode(e._text):"")+"</button></div>"}})}),r(St,[J],function(e){return e.extend({Defaults:{defaultType:"button",role:"group"},renderHtml:function(){var e=this,t=e._layout;return e.addClass("btn-group"),e.preRender(),t.preRender(e),'<div id="'+e._id+'" class="'+e.classes()+'"><div id="'+e._id+'-body">'+(e.settings.html||"")+t.renderHtml(e)+"</div></div>"}})}),r(Tt,[Nt],function(e){return e.extend({Defaults:{classes:"checkbox",role:"checkbox",checked:!1},init:function(e){var t=this;t._super(e),t.on("click mousedown",function(e){e.preventDefault()}),t.on("click",function(e){e.preventDefault(),t.disabled()||t.checked(!t.checked())}),t.checked(t.settings.checked)},checked:function(e){var t=this;return"undefined"!=typeof e?(e?t.addClass("checked"):t.removeClass("checked"),t._checked=e,t.aria("checked",e),t):t._checked},value:function(e){return this.checked(e)},renderHtml:function(){var e=this,t=e._id,n=e.classPrefix;return'<div id="'+t+'" class="'+e.classes()+'" unselectable="on" aria-labelledby="'+t+'-al" tabindex="-1"><i class="'+n+"ico "+n+'i-checkbox"></i><span id="'+t+'-al" class="'+n+'label">'+e.encode(e._text)+"</span></div>"}})}),r(Rt,[Nt,G,Y],function(e,t,n){return e.extend({init:function(e){var t=this;t._super(e),t.addClass("combobox"),t.subinput=!0,t.ariaTarget="inp",e=t.settings,e.menu=e.menu||e.values,e.menu&&(e.icon="caret"),t.on("click",function(n){for(var r=n.target,i=t.getEl();r&&r!=i;)r.id&&-1!=r.id.indexOf("-open")&&(t.fire("action"),e.menu&&(t.showMenu(),n.aria&&t.menu.items()[0].focus())),r=r.parentNode}),t.on("keydown",function(e){"INPUT"==e.target.nodeName&&13==e.keyCode&&t.parents().reverse().each(function(n){return e.preventDefault(),t.fire("change"),n.hasEventListeners("submit")&&n.toJSON?(n.fire("submit",{data:n.toJSON()}),!1):void 0})}),e.placeholder&&(t.addClass("placeholder"),t.on("focusin",function(){t._hasOnChange||(n.on(t.getEl("inp"),"change",function(){t.fire("change")}),t._hasOnChange=!0),t.hasClass("placeholder")&&(t.getEl("inp").value="",t.removeClass("placeholder"))}),t.on("focusout",function(){0===t.value().length&&(t.getEl("inp").value=e.placeholder,t.addClass("placeholder"))}))},showMenu:function(){var e=this,n=e.settings,r;e.menu||(r=n.menu||[],r.length?r={type:"menu",items:r}:r.type=r.type||"menu",e.menu=t.create(r).parent(e).renderTo(e.getContainerElm()),e.fire("createmenu"),e.menu.reflow(),e.menu.on("cancel",function(t){t.control===e.menu&&e.focus()}),e.menu.on("show hide",function(t){t.control.items().each(function(t){t.active(t.value()==e.value())})}).fire("show"),e.menu.on("select",function(t){e.value(t.control.value())}),e.on("focusin",function(t){"INPUT"==t.target.tagName.toUpperCase()&&e.menu.hide()}),e.aria("expanded",!0)),e.menu.show(),e.menu.layoutRect({w:e.layoutRect().w}),e.menu.moveRel(e.getEl(),e.isRtl()?["br-tr","tr-br"]:["bl-tl","tl-bl"])},value:function(e){var t=this;return"undefined"!=typeof e?(t._value=e,t.removeClass("placeholder"),t._rendered&&(t.getEl("inp").value=e),t):t._rendered?(e=t.getEl("inp").value,e!=t.settings.placeholder?e:""):t._value},disabled:function(e){var t=this;return t._rendered&&"undefined"!=typeof e&&(t.getEl("inp").disabled=e),t._super(e)},focus:function(){this.getEl("inp").focus()},repaint:function(){var e=this,t=e.getEl(),r=e.getEl("open"),i=e.layoutRect(),o,a;o=r?i.w-n.getSize(r).width-10:i.w-10;var s=document;return s.all&&(!s.documentMode||s.documentMode<=8)&&(a=e.layoutRect().h-2+"px"),n.css(t.firstChild,{width:o,lineHeight:a}),e._super(),e},postRender:function(){var e=this;return n.on(this.getEl("inp"),"change",function(){e.fire("change")}),e._super()},remove:function(){n.off(this.getEl("inp")),this._super()},renderHtml:function(){var e=this,t=e._id,n=e.settings,r=e.classPrefix,i=n.value||n.placeholder||"",o,a,s="",l="";return"spellcheck"in n&&(l+=' spellcheck="'+n.spellcheck+'"'),n.maxLength&&(l+=' maxlength="'+n.maxLength+'"'),n.size&&(l+=' size="'+n.size+'"'),n.subtype&&(l+=' type="'+n.subtype+'"'),e.disabled()&&(l+=' disabled="disabled"'),o=n.icon,o&&"caret"!=o&&(o=r+"ico "+r+"i-"+n.icon),a=e._text,(o||a)&&(s='<div id="'+t+'-open" class="'+r+"btn "+r+'open" tabIndex="-1" role="button"><button id="'+t+'-action" type="button" hidefocus="1" tabindex="-1">'+("caret"!=o?'<i class="'+o+'"></i>':'<i class="'+r+'caret"></i>')+(a?(o?" ":"")+a:"")+"</button></div>",e.addClass("has-open")),'<div id="'+t+'" class="'+e.classes()+'"><input id="'+t+'-inp" class="'+r+"textbox "+r+'placeholder" value="'+i+'" hidefocus="1"'+l+" />"+s+"</div>"}})}),r(At,[Rt],function(e){return e.extend({init:function(e){var t=this;e.spellcheck=!1,e.onaction&&(e.icon="none"),t._super(e),t.addClass("colorbox"),t.on("change keyup postrender",function(){t.repaintColor(t.value())})},repaintColor:function(e){var t=this.getEl().getElementsByTagName("i")[0];if(t)try{t.style.background=e}catch(n){}},value:function(e){var t=this;return"undefined"!=typeof e&&t._rendered&&t.repaintColor(e),t._super(e)}})}),r(Bt,[kt,rt],function(e,t){return e.extend({showPanel:function(){var e=this,n=e.settings;if(e.active(!0),e.panel)e.panel.show();else{var r=n.panel;r.type&&(r={layout:"grid",items:r}),r.role=r.role||"dialog",r.popover=!0,r.autohide=!0,r.ariaRoot=!0,e.panel=new t(r).on("hide",function(){e.active(!1)}).on("cancel",function(t){t.stopPropagation(),e.focus(),e.hidePanel()}).parent(e).renderTo(e.getContainerElm()),e.panel.fire("show"),e.panel.reflow()}e.panel.moveRel(e.getEl(),n.popoverAlign||(e.isRtl()?["bc-tr","bc-tc"]:["bc-tl","bc-tc"]))},hidePanel:function(){var e=this;e.panel&&e.panel.hide()},postRender:function(){var e=this;return e.aria("haspopup",!0),e.on("click",function(t){t.control===e&&(e.panel&&e.panel.visible()?e.hidePanel():(e.showPanel(),e.panel.focus(!!t.aria)))}),e._super()},remove:function(){return this.panel&&(this.panel.remove(),this.panel=null),this._super()}})}),r(Dt,[Bt,y],function(e,t){var n=t.DOM;return e.extend({init:function(e){this._super(e),this.addClass("colorbutton")},color:function(e){return e?(this._color=e,this.getEl("preview").style.backgroundColor=e,this):this._color},resetColor:function(){return this._color=null,this.getEl("preview").style.backgroundColor=null,this},renderHtml:function(){var e=this,t=e._id,n=e.classPrefix,r=e.settings.icon?n+"ico "+n+"i-"+e.settings.icon:"",i=e.settings.image?" style=\"background-image: url('"+e.settings.image+"')\"":"";return'<div id="'+t+'" class="'+e.classes()+'" role="button" tabindex="-1" aria-haspopup="true"><button role="presentation" hidefocus="1" type="button" tabindex="-1">'+(r?'<i class="'+r+'"'+i+"></i>":"")+'<span id="'+t+'-preview" class="'+n+'preview"></span>'+(e._text?(r?" ":"")+e._text:"")+'</button><button type="button" class="'+n+'open" hidefocus="1" tabindex="-1"> <i class="'+n+'caret"></i></button></div>'},postRender:function(){var e=this,t=e.settings.onclick;return e.on("click",function(r){r.aria&&"down"==r.aria.key||r.control!=e||n.getParent(r.target,"."+e.classPrefix+"open")||(r.stopImmediatePropagation(),t.call(e,r))}),delete e.settings.onclick,e._super()}})}),r(Lt,[],function(){function e(e){function i(e,i,o){var a,s,l,c,u,d;return a=0,s=0,l=0,e/=255,i/=255,o/=255,u=t(e,t(i,o)),d=n(e,n(i,o)),u==d?(l=u,{h:0,s:0,v:100*l}):(c=e==u?i-o:o==u?e-i:o-e,a=e==u?3:o==u?1:5,a=60*(a-c/(d-u)),s=(d-u)/d,l=d,{h:r(a),s:r(100*s),v:r(100*l)})}function o(e,i,o){var a,s,l,c;if(e=(parseInt(e,10)||0)%360,i=parseInt(i,10)/100,o=parseInt(o,10)/100,i=n(0,t(i,1)),o=n(0,t(o,1)),0===i)return void(d=f=p=r(255*o));switch(a=e/60,s=o*i,l=s*(1-Math.abs(a%2-1)),c=o-s,Math.floor(a)){case 0:d=s,f=l,p=0;break;case 1:d=l,f=s,p=0;break;case 2:d=0,f=s,p=l;break;case 3:d=0,f=l,p=s;break;case 4:d=l,f=0,p=s;break;case 5:d=s,f=0,p=l;break;default:d=f=p=0}d=r(255*(d+c)),f=r(255*(f+c)),p=r(255*(p+c))}function a(){function e(e){return e=parseInt(e,10).toString(16),e.length>1?e:"0"+e}return"#"+e(d)+e(f)+e(p)}function s(){return{r:d,g:f,b:p}}function l(){return i(d,f,p)}function c(e){var t;return"object"==typeof e?"r"in e?(d=e.r,f=e.g,p=e.b):"v"in e&&o(e.h,e.s,e.v):(t=/rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)[^\)]*\)/gi.exec(e))?(d=parseInt(t[1],10),f=parseInt(t[2],10),p=parseInt(t[3],10)):(t=/#([0-F]{2})([0-F]{2})([0-F]{2})/gi.exec(e))?(d=parseInt(t[1],16),f=parseInt(t[2],16),p=parseInt(t[3],16)):(t=/#([0-F])([0-F])([0-F])/gi.exec(e))&&(d=parseInt(t[1]+t[1],16),f=parseInt(t[2]+t[2],16),p=parseInt(t[3]+t[3],16)),d=0>d?0:d>255?255:d,f=0>f?0:f>255?255:f,p=0>p?0:p>255?255:p,u}var u=this,d=0,f=0,p=0;e&&c(e),u.toRgb=s,u.toHsv=l,u.toHex=a,u.parse=c}var t=Math.min,n=Math.max,r=Math.round;return e}),r(Mt,[Nt,Q,Y,Lt],function(e,t,n,r){return e.extend({Defaults:{classes:"widget colorpicker"},init:function(e){this._super(e)},postRender:function(){function e(e,t){var r=n.getPos(e),i,o;return i=t.pageX-r.x,o=t.pageY-r.y,i=Math.max(0,Math.min(i/e.clientWidth,1)),o=Math.max(0,Math.min(o/e.clientHeight,1)),{x:i,y:o}}function i(e,t){var i=(360-e.h)/360;n.css(d,{top:100*i+"%"}),t||n.css(p,{left:e.s+"%",top:100-e.v+"%"}),f.style.background=new r({s:100,v:100,h:e.h}).toHex(),s.color().parse({s:e.s,v:e.v,h:e.h})}function o(t){var n;n=e(f,t),c.s=100*n.x,c.v=100*(1-n.y),i(c),s.fire("change")}function a(t){var n;n=e(u,t),c=l.toHsv(),c.h=360*(1-n.y),i(c,!0),s.fire("change")}var s=this,l=s.color(),c,u,d,f,p;u=s.getEl("h"),d=s.getEl("hp"),f=s.getEl("sv"),p=s.getEl("svp"),s._repaint=function(){c=l.toHsv(),i(c)},s._super(),s._svdraghelper=new t(s._id+"-sv",{start:o,drag:o}),s._hdraghelper=new t(s._id+"-h",{start:a,drag:a}),s._repaint()},rgb:function(){return this.color().toRgb()},value:function(e){var t=this;return arguments.length?(t.color().parse(e),void(t._rendered&&t._repaint())):t.color().toHex()},color:function(){return this._color||(this._color=new r),this._color},renderHtml:function(){function e(){var e,t,n="",i,a;for(i="filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=",a=o.split(","),e=0,t=a.length-1;t>e;e++)n+='<div class="'+r+'colorpicker-h-chunk" style="height:'+100/t+"%;"+i+a[e]+",endColorstr="+a[e+1]+");-ms-"+i+a[e]+",endColorstr="+a[e+1]+')"></div>';return n}var t=this,n=t._id,r=t.classPrefix,i,o="#ff0000,#ff0080,#ff00ff,#8000ff,#0000ff,#0080ff,#00ffff,#00ff80,#00ff00,#80ff00,#ffff00,#ff8000,#ff0000",a="background: -ms-linear-gradient(top,"+o+");background: linear-gradient(to bottom,"+o+");";return i='<div id="'+n+'-h" class="'+r+'colorpicker-h" style="'+a+'">'+e()+'<div id="'+n+'-hp" class="'+r+'colorpicker-h-marker"></div></div>','<div id="'+n+'" class="'+t.classes()+'"><div id="'+n+'-sv" class="'+r+'colorpicker-sv"><div class="'+r+'colorpicker-overlay1"><div class="'+r+'colorpicker-overlay2"><div id="'+n+'-svp" class="'+r+'colorpicker-selector1"><div class="'+r+'colorpicker-selector2"></div></div></div></div></div>'+i+"</div>"}})}),r(Ht,[Nt],function(e){return e.extend({init:function(e){var t=this;e.delimiter||(e.delimiter="\xbb"),t._super(e),t.addClass("path"),t.canFocus=!0,t.on("click",function(e){var n,r=e.target;(n=r.getAttribute("data-index"))&&t.fire("select",{value:t.data()[n],index:n})})},focus:function(){var e=this;return e.getEl().firstChild.focus(),e},data:function(e){var t=this;return"undefined"!=typeof e?(t._data=e,t.update(),t):t._data},update:function(){this.innerHtml(this._getPathHtml())},postRender:function(){var e=this;e._super(),e.data(e.settings.data)},renderHtml:function(){var e=this;return'<div id="'+e._id+'" class="'+e.classes()+'">'+e._getPathHtml()+"</div>"},_getPathHtml:function(){var e=this,t=e._data||[],n,r,i="",o=e.classPrefix;for(n=0,r=t.length;r>n;n++)i+=(n>0?'<div class="'+o+'divider" aria-hidden="true"> '+e.settings.delimiter+" </div>":"")+'<div role="button" class="'+o+"path-item"+(n==r-1?" "+o+"last":"")+'" data-index="'+n+'" tabindex="-1" id="'+e._id+"-"+n+'" aria-level="'+n+'">'+t[n].name+"</div>";return i||(i='<div class="'+o+'path-item">\xa0</div>'),i}})}),r(Pt,[Ht,ht],function(e,t){return e.extend({postRender:function(){function e(e){if(1===e.nodeType){if("BR"==e.nodeName||e.getAttribute("data-mce-bogus"))return!0;if("bookmark"===e.getAttribute("data-mce-type"))return!0}return!1}var n=this,r=t.activeEditor;return r.settings.elementpath!==!1&&(n.on("select",function(e){r.focus(),r.selection.select(this.data()[e.index].element),r.nodeChanged()}),r.on("nodeChange",function(t){for(var i=[],o=t.parents,a=o.length;a--;)if(1==o[a].nodeType&&!e(o[a])){var s=r.fire("ResolveName",{name:o[a].nodeName.toLowerCase(),target:o[a]});if(s.isDefaultPrevented()||i.push({name:s.name,element:o[a]}),s.isPropagationStopped())break}n.data(i)})),n._super()}})}),r(Ot,[J],function(e){return e.extend({Defaults:{layout:"flex",align:"center",defaults:{flex:1}},renderHtml:function(){var e=this,t=e._layout,n=e.classPrefix;return e.addClass("formitem"),t.preRender(e),'<div id="'+e._id+'" class="'+e.classes()+'" hidefocus="1" tabindex="-1">'+(e.settings.title?'<div id="'+e._id+'-title" class="'+n+'title">'+e.settings.title+"</div>":"")+'<div id="'+e._id+'-body" class="'+e.classes("body")+'">'+(e.settings.html||"")+t.renderHtml(e)+"</div></div>"}})}),r(It,[J,Ot,d],function(e,t,n){return e.extend({Defaults:{containerCls:"form",layout:"flex",direction:"column",align:"stretch",flex:1,padding:20,labelGap:30,spacing:10,callbacks:{submit:function(){this.submit()}}},preRender:function(){var e=this,r=e.items();e.settings.formItemDefaults||(e.settings.formItemDefaults={layout:"flex",autoResize:"overflow",defaults:{flex:1}}),r.each(function(r){var i,o=r.settings.label;o&&(i=new t(n.extend({items:{type:"label",id:r._id+"-l",text:o,flex:0,forId:r._id,disabled:r.disabled()}},e.settings.formItemDefaults)),i.type="formitem",r.aria("labelledby",r._id+"-l"),"undefined"==typeof r.settings.flex&&(r.settings.flex=1),e.replace(r,i),i.add(r))})},recalcLabels:function(){var e=this,t=0,n=[],r,i,o;if(e.settings.labelGapCalc!==!1)for(o="children"==e.settings.labelGapCalc?e.find("formitem"):e.items(),o.filter("formitem").each(function(e){var r=e.items()[0],i=r.getEl().clientWidth;t=i>t?i:t,n.push(r)}),i=e.settings.labelGap||0,r=n.length;r--;)n[r].settings.minWidth=t+i},visible:function(e){var t=this._super(e);return e===!0&&this._rendered&&this.recalcLabels(),t},submit:function(){return this.fire("submit",{data:this.toJSON()})},postRender:function(){var e=this;e._super(),e.recalcLabels(),e.fromJSON(e.settings.data)}})}),r(Ft,[It],function(e){return e.extend({Defaults:{containerCls:"fieldset",layout:"flex",direction:"column",align:"stretch",flex:1,padding:"25 15 5 15",labelGap:30,spacing:10,border:1},renderHtml:function(){var e=this,t=e._layout,n=e.classPrefix;return e.preRender(),t.preRender(e),'<fieldset id="'+e._id+'" class="'+e.classes()+'" hidefocus="1" tabindex="-1">'+(e.settings.title?'<legend id="'+e._id+'-title" class="'+n+'fieldset-title">'+e.settings.title+"</legend>":"")+'<div id="'+e._id+'-body" class="'+e.classes("body")+'">'+(e.settings.html||"")+t.renderHtml(e)+"</div></fieldset>"}})}),r(zt,[Rt,d],function(e,t){return e.extend({init:function(e){var n=this,r=tinymce.activeEditor,i=r.settings,o,a,s;e.spellcheck=!1,s=i.file_picker_types||i.file_browser_callback_types,s&&(s=t.makeMap(s,/[, ]/)),(!s||s[e.filetype])&&(a=i.file_picker_callback,!a||s&&!s[e.filetype]?(a=i.file_browser_callback,!a||s&&!s[e.filetype]||(o=function(){a(n.getEl("inp").id,n.value(),e.filetype,window)})):o=function(){var i=n.fire("beforecall").meta;i=t.extend({filetype:e.filetype},i),a.call(r,function(e,t){n.value(e).fire("change",{meta:t})},n.value(),i)}),o&&(e.icon="browse",e.onaction=o),n._super(e)}})}),r(Wt,[_t],function(e){return e.extend({recalc:function(e){var t=e.layoutRect(),n=e.paddingBox();e.items().filter(":visible").each(function(e){e.layoutRect({x:n.left,y:n.top,w:t.innerW-n.right-n.left,h:t.innerH-n.top-n.bottom}),e.recalc&&e.recalc()})}})}),r(Vt,[_t],function(e){return e.extend({recalc:function(e){var t,n,r,i,o,a,s,l,c,u,d,f,p,h,m,g,v=[],y,b,C,x,w,_,E,N,k,S,T,R,A,B,D,L,M,H,P,O,I,F,z=Math.max,W=Math.min;for(r=e.items().filter(":visible"),i=e.layoutRect(),o=e._paddingBox,a=e.settings,f=e.isRtl()?a.direction||"row-reversed":a.direction,s=a.align,l=e.isRtl()?a.pack||"end":a.pack,c=a.spacing||0,("row-reversed"==f||"column-reverse"==f)&&(r=r.set(r.toArray().reverse()),f=f.split("-")[0]),"column"==f?(k="y",E="h",N="minH",S="maxH",R="innerH",T="top",A="deltaH",B="contentH",P="left",M="w",D="x",L="innerW",H="minW",O="right",I="deltaW",F="contentW"):(k="x",E="w",N="minW",S="maxW",R="innerW",T="left",A="deltaW",B="contentW",P="top",M="h",D="y",L="innerH",H="minH",O="bottom",I="deltaH",F="contentH"),d=i[R]-o[T]-o[T],_=u=0,t=0,n=r.length;n>t;t++)p=r[t],h=p.layoutRect(),m=p.settings,g=m.flex,d-=n-1>t?c:0,g>0&&(u+=g,h[S]&&v.push(p),h.flex=g),d-=h[N],y=o[P]+h[H]+o[O],y>_&&(_=y);if(x={},x[N]=0>d?i[N]-d+i[A]:i[R]-d+i[A],x[H]=_+i[I],x[B]=i[R]-d,x[F]=_,x.minW=W(x.minW,i.maxW),x.minH=W(x.minH,i.maxH),x.minW=z(x.minW,i.startMinWidth),x.minH=z(x.minH,i.startMinHeight),!i.autoResize||x.minW==i.minW&&x.minH==i.minH){for(C=d/u,t=0,n=v.length;n>t;t++)p=v[t],h=p.layoutRect(),b=h[S],y=h[N]+h.flex*C,y>b?(d-=h[S]-h[N],u-=h.flex,h.flex=0,h.maxFlexSize=b):h.maxFlexSize=0;for(C=d/u,w=o[T],x={},0===u&&("end"==l?w=d+o[T]:"center"==l?(w=Math.round(i[R]/2-(i[R]-d)/2)+o[T],0>w&&(w=o[T])):"justify"==l&&(w=o[T],c=Math.floor(d/(r.length-1)))),x[D]=o[P],t=0,n=r.length;n>t;t++)p=r[t],h=p.layoutRect(),y=h.maxFlexSize||h[N],"center"===s?x[D]=Math.round(i[L]/2-h[M]/2):"stretch"===s?(x[M]=z(h[H]||0,i[L]-o[P]-o[O]),x[D]=o[P]):"end"===s&&(x[D]=i[L]-h[M]-o.top),h.flex>0&&(y+=h.flex*C),x[E]=y,x[k]=w,p.layoutRect(x),p.recalc&&p.recalc(),w+=y+c}else if(x.w=x.minW,x.h=x.minH,e.layoutRect(x),this.recalc(e),null===e._lastRect){var V=e.parent();V&&(V._lastRect=null,V.recalc())}}})}),r(Ut,[wt],function(e){return e.extend({Defaults:{containerClass:"flow-layout",controlClass:"flow-layout-item",endClass:"break"},recalc:function(e){e.items().filter(":visible").each(function(e){e.recalc&&e.recalc()})}})}),r($t,[K,Nt,rt,d,ht,u],function(e,t,n,r,i,o){function a(e){function t(t,n){return function(){var r=this;e.on("nodeChange",function(i){var o=e.formatter,a=null;s(i.parents,function(e){return s(t,function(t){return n?o.matchNode(e,n,{value:t.value})&&(a=t.value):o.matchNode(e,t.value)&&(a=t.value),a?!1:void 0}),a?!1:void 0}),r.value(a)})}}function r(e){e=e.replace(/;$/,"").split(";");for(var t=e.length;t--;)e[t]=e[t].split("=");return e}function i(){function t(e){var n=[];if(e)return s(e,function(e){var o={text:e.title,icon:e.icon};if(e.items)o.menu=t(e.items);else{var a=e.format||"custom"+r++;e.format||(e.name=a,i.push(e)),o.format=a,o.cmd=e.cmd}n.push(o)}),n}function n(){var n;return n=t(e.settings.style_formats_merge?e.settings.style_formats?o.concat(e.settings.style_formats):o:e.settings.style_formats||o)}var r=0,i=[],o=[{title:"Headings",items:[{title:"Heading 1",format:"h1"},{title:"Heading 2",format:"h2"},{title:"Heading 3",format:"h3"},{title:"Heading 4",format:"h4"},{title:"Heading 5",format:"h5"},{title:"Heading 6",format:"h6"}]},{title:"Inline",items:[{title:"Bold",icon:"bold",format:"bold"},{title:"Italic",icon:"italic",format:"italic"},{title:"Underline",icon:"underline",format:"underline"},{title:"Strikethrough",icon:"strikethrough",format:"strikethrough"},{title:"Superscript",icon:"superscript",format:"superscript"},{title:"Subscript",icon:"subscript",format:"subscript"},{title:"Code",icon:"code",format:"code"}]},{title:"Blocks",items:[{title:"Paragraph",format:"p"},{title:"Blockquote",format:"blockquote"},{title:"Div",format:"div"},{title:"Pre",format:"pre"}]},{title:"Alignment",items:[{title:"Left",icon:"alignleft",format:"alignleft"},{title:"Center",icon:"aligncenter",format:"aligncenter"},{title:"Right",icon:"alignright",format:"alignright"},{title:"Justify",icon:"alignjustify",format:"alignjustify"}]}];return e.on("init",function(){s(i,function(t){e.formatter.register(t.name,t)})}),{type:"menu",items:n(),onPostRender:function(t){e.fire("renderFormatsMenu",{control:t.control})},itemDefaults:{preview:!0,textStyle:function(){return this.settings.format?e.formatter.getCssText(this.settings.format):void 0},onPostRender:function(){var t=this;t.parent().on("show",function(){var n,r;n=t.settings.format,n&&(t.disabled(!e.formatter.canApply(n)),t.active(e.formatter.match(n))),r=t.settings.cmd,r&&t.active(e.queryCommandState(r))})},onclick:function(){this.settings.format&&l(this.settings.format),this.settings.cmd&&e.execCommand(this.settings.cmd)}}}}function o(t){return function(){function n(){return e.undoManager?e.undoManager[t]():!1}var r=this;t="redo"==t?"hasRedo":"hasUndo",r.disabled(!n()),e.on("Undo Redo AddUndo TypingUndo ClearUndos",function(){r.disabled(!n())})}}function a(){var t=this;e.on("VisualAid",function(e){t.active(e.hasVisual)}),t.active(e.hasVisual)}function l(t){t.control&&(t=t.control.value()),t&&e.execCommand("mceToggleFormat",!1,t)}var c;c=i(),s({bold:"Bold",italic:"Italic",underline:"Underline",strikethrough:"Strikethrough",subscript:"Subscript",superscript:"Superscript"},function(t,n){e.addButton(n,{tooltip:t,onPostRender:function(){var t=this;e.formatter?e.formatter.formatChanged(n,function(e){t.active(e)}):e.on("init",function(){e.formatter.formatChanged(n,function(e){t.active(e)})})},onclick:function(){l(n)}})}),s({outdent:["Decrease indent","Outdent"],indent:["Increase indent","Indent"],cut:["Cut","Cut"],copy:["Copy","Copy"],paste:["Paste","Paste"],help:["Help","mceHelp"],selectall:["Select all","SelectAll"],removeformat:["Clear formatting","RemoveFormat"],visualaid:["Visual aids","mceToggleVisualAid"],newdocument:["New document","mceNewDocument"]},function(t,n){e.addButton(n,{tooltip:t[0],cmd:t[1]})}),s({blockquote:["Blockquote","mceBlockQuote"],numlist:["Numbered list","InsertOrderedList"],bullist:["Bullet list","InsertUnorderedList"],subscript:["Subscript","Subscript"],superscript:["Superscript","Superscript"],alignleft:["Align left","JustifyLeft"],aligncenter:["Align center","JustifyCenter"],alignright:["Align right","JustifyRight"],alignjustify:["Justify","JustifyFull"]},function(t,n){e.addButton(n,{tooltip:t[0],cmd:t[1],onPostRender:function(){var t=this;e.formatter?e.formatter.formatChanged(n,function(e){t.active(e)}):e.on("init",function(){e.formatter.formatChanged(n,function(e){t.active(e)})})}})}),e.addButton("undo",{tooltip:"Undo",onPostRender:o("undo"),cmd:"undo"}),e.addButton("redo",{tooltip:"Redo",onPostRender:o("redo"),cmd:"redo"}),e.addMenuItem("newdocument",{text:"New document",icon:"newdocument",cmd:"mceNewDocument"}),e.addMenuItem("undo",{text:"Undo",icon:"undo",shortcut:"Meta+Z",onPostRender:o("undo"),cmd:"undo"}),e.addMenuItem("redo",{text:"Redo",icon:"redo",shortcut:"Meta+Y",onPostRender:o("redo"),cmd:"redo"}),e.addMenuItem("visualaid",{text:"Visual aids",selectable:!0,onPostRender:a,cmd:"mceToggleVisualAid"}),s({cut:["Cut","Cut","Meta+X"],copy:["Copy","Copy","Meta+C"],paste:["Paste","Paste","Meta+V"],selectall:["Select all","SelectAll","Meta+A"],bold:["Bold","Bold","Meta+B"],italic:["Italic","Italic","Meta+I"],underline:["Underline","Underline"],strikethrough:["Strikethrough","Strikethrough"],subscript:["Subscript","Subscript"],superscript:["Superscript","Superscript"],removeformat:["Clear formatting","RemoveFormat"]},function(t,n){e.addMenuItem(n,{text:t[0],icon:n,shortcut:t[2],cmd:t[1]})}),e.on("mousedown",function(){n.hideAll()}),e.addButton("styleselect",{type:"menubutton",text:"Formats",menu:c}),e.addButton("formatselect",function(){var n=[],i=r(e.settings.block_formats||"Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;Preformatted=pre");return s(i,function(t){n.push({text:t[0],value:t[1],textStyle:function(){return e.formatter.getCssText(t[1])}})}),{type:"listbox",text:i[0][0],values:n,fixedWidth:!0,onselect:l,onPostRender:t(n)}}),e.addButton("fontselect",function(){var n="Andale Mono=andale mono,monospace;Arial=arial,helvetica,sans-serif;Arial Black=arial black,sans-serif;Book Antiqua=book antiqua,palatino,serif;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier,monospace;Georgia=georgia,palatino,serif;Helvetica=helvetica,arial,sans-serif;Impact=impact,sans-serif;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco,monospace;Times New Roman=times new roman,times,serif;Trebuchet MS=trebuchet ms,geneva,sans-serif;Verdana=verdana,geneva,sans-serif;Webdings=webdings;Wingdings=wingdings,zapf dingbats",i=[],o=r(e.settings.font_formats||n);
return s(o,function(e){i.push({text:{raw:e[0]},value:e[1],textStyle:-1==e[1].indexOf("dings")?"font-family:"+e[1]:""})}),{type:"listbox",text:"Font Family",tooltip:"Font Family",values:i,fixedWidth:!0,onPostRender:t(i,"fontname"),onselect:function(t){t.control.settings.value&&e.execCommand("FontName",!1,t.control.settings.value)}}}),e.addButton("fontsizeselect",function(){var n=[],r="8pt 10pt 12pt 14pt 18pt 24pt 36pt",i=e.settings.fontsize_formats||r;return s(i.split(" "),function(e){var t=e,r=e,i=e.split("=");i.length>1&&(t=i[0],r=i[1]),n.push({text:t,value:r})}),{type:"listbox",text:"Font Sizes",tooltip:"Font Sizes",values:n,fixedWidth:!0,onPostRender:t(n,"fontsize"),onclick:function(t){t.control.settings.value&&e.execCommand("FontSize",!1,t.control.settings.value)}}}),e.addMenuItem("formats",{text:"Formats",menu:c})}var s=r.each;i.on("AddEditor",function(t){t.editor.rtl&&(e.rtl=!0),a(t.editor)}),e.translate=function(e){return i.translate(e)},t.tooltips=!o.iOS}),r(qt,[_t],function(e){return e.extend({recalc:function(e){var t=e.settings,n,r,i,o,a,s,l,c,u,d,f,p,h,m,g,v,y,b,C,x,w,_,E=[],N=[],k,S,T,R,A,B;t=e.settings,i=e.items().filter(":visible"),o=e.layoutRect(),r=t.columns||Math.ceil(Math.sqrt(i.length)),n=Math.ceil(i.length/r),y=t.spacingH||t.spacing||0,b=t.spacingV||t.spacing||0,C=t.alignH||t.align,x=t.alignV||t.align,g=e._paddingBox,A="reverseRows"in t?t.reverseRows:e.isRtl(),C&&"string"==typeof C&&(C=[C]),x&&"string"==typeof x&&(x=[x]);for(d=0;r>d;d++)E.push(0);for(f=0;n>f;f++)N.push(0);for(f=0;n>f;f++)for(d=0;r>d&&(u=i[f*r+d],u);d++)c=u.layoutRect(),k=c.minW,S=c.minH,E[d]=k>E[d]?k:E[d],N[f]=S>N[f]?S:N[f];for(T=o.innerW-g.left-g.right,w=0,d=0;r>d;d++)w+=E[d]+(d>0?y:0),T-=(d>0?y:0)+E[d];for(R=o.innerH-g.top-g.bottom,_=0,f=0;n>f;f++)_+=N[f]+(f>0?b:0),R-=(f>0?b:0)+N[f];if(w+=g.left+g.right,_+=g.top+g.bottom,l={},l.minW=w+(o.w-o.innerW),l.minH=_+(o.h-o.innerH),l.contentW=l.minW-o.deltaW,l.contentH=l.minH-o.deltaH,l.minW=Math.min(l.minW,o.maxW),l.minH=Math.min(l.minH,o.maxH),l.minW=Math.max(l.minW,o.startMinWidth),l.minH=Math.max(l.minH,o.startMinHeight),!o.autoResize||l.minW==o.minW&&l.minH==o.minH){o.autoResize&&(l=e.layoutRect(l),l.contentW=l.minW-o.deltaW,l.contentH=l.minH-o.deltaH);var D;D="start"==t.packV?0:R>0?Math.floor(R/n):0;var L=0,M=t.flexWidths;if(M)for(d=0;d<M.length;d++)L+=M[d];else L=r;var H=T/L;for(d=0;r>d;d++)E[d]+=M?M[d]*H:H;for(h=g.top,f=0;n>f;f++){for(p=g.left,s=N[f]+D,d=0;r>d&&(B=A?f*r+r-1-d:f*r+d,u=i[B],u);d++)m=u.settings,c=u.layoutRect(),a=Math.max(E[d],c.startMinWidth),c.x=p,c.y=h,v=m.alignH||(C?C[d]||C[0]:null),"center"==v?c.x=p+a/2-c.w/2:"right"==v?c.x=p+a-c.w:"stretch"==v&&(c.w=a),v=m.alignV||(x?x[d]||x[0]:null),"center"==v?c.y=h+s/2-c.h/2:"bottom"==v?c.y=h+s-c.h:"stretch"==v&&(c.h=s),u.layoutRect(c),p+=a+y,u.recalc&&u.recalc();h+=s+b}}else if(l.w=l.minW,l.h=l.minH,e.layoutRect(l),this.recalc(e),null===e._lastRect){var P=e.parent();P&&(P._lastRect=null,P.recalc())}}})}),r(jt,[Nt],function(e){return e.extend({renderHtml:function(){var e=this;return e.addClass("iframe"),e.canFocus=!1,'<iframe id="'+e._id+'" class="'+e.classes()+'" tabindex="-1" src="'+(e.settings.url||"javascript:''")+'" frameborder="0"></iframe>'},src:function(e){this.getEl().src=e},html:function(e,t){var n=this,r=this.getEl().contentWindow.document.body;return r?(r.innerHTML=e,t&&t()):setTimeout(function(){n.html(e)},0),this}})}),r(Yt,[Nt,Y],function(e,t){return e.extend({init:function(e){var t=this;t._super(e),t.addClass("widget"),t.addClass("label"),t.canFocus=!1,e.multiline&&t.addClass("autoscroll"),e.strong&&t.addClass("strong")},initLayoutRect:function(){var e=this,n=e._super();if(e.settings.multiline){var r=t.getSize(e.getEl());r.width>n.maxW&&(n.minW=n.maxW,e.addClass("multiline")),e.getEl().style.width=n.minW+"px",n.startMinH=n.h=n.minH=Math.min(n.maxH,t.getSize(e.getEl()).height)}return n},repaint:function(){var e=this;return e.settings.multiline||(e.getEl().style.lineHeight=e.layoutRect().h+"px"),e._super()},text:function(e){var t=this;return t._rendered&&e&&this.innerHtml(t.encode(e)),t._super(e)},renderHtml:function(){var e=this,t=e.settings.forId;return'<label id="'+e._id+'" class="'+e.classes()+'"'+(t?' for="'+t+'"':"")+">"+e.encode(e._text)+"</label>"}})}),r(Kt,[J],function(e){return e.extend({Defaults:{role:"toolbar",layout:"flow"},init:function(e){var t=this;t._super(e),t.addClass("toolbar")},postRender:function(){var e=this;return e.items().addClass("toolbar-item"),e._super()}})}),r(Gt,[Kt],function(e){return e.extend({Defaults:{role:"menubar",containerCls:"menubar",ariaRoot:!0,defaults:{type:"menubutton"}}})}),r(Xt,[kt,G,Gt],function(e,t,n){function r(e,t){for(;e;){if(t===e)return!0;e=e.parentNode}return!1}var i=e.extend({init:function(e){var t=this;t._renderOpen=!0,t._super(e),t.addClass("menubtn"),e.fixedWidth&&t.addClass("fixed-width"),t.aria("haspopup",!0),t.hasPopup=!0},showMenu:function(){var e=this,n=e.settings,r;return e.menu&&e.menu.visible()?e.hideMenu():(e.menu||(r=n.menu||[],r.length?r={type:"menu",items:r}:r.type=r.type||"menu",e.menu=t.create(r).parent(e).renderTo(),e.fire("createmenu"),e.menu.reflow(),e.menu.on("cancel",function(t){t.control.parent()===e.menu&&(t.stopPropagation(),e.focus(),e.hideMenu())}),e.menu.on("select",function(){e.focus()}),e.menu.on("show hide",function(t){t.control==e.menu&&e.activeMenu("show"==t.type),e.aria("expanded","show"==t.type)}).fire("show")),e.menu.show(),e.menu.layoutRect({w:e.layoutRect().w}),void e.menu.moveRel(e.getEl(),e.isRtl()?["br-tr","tr-br"]:["bl-tl","tl-bl"]))},hideMenu:function(){var e=this;e.menu&&(e.menu.items().each(function(e){e.hideMenu&&e.hideMenu()}),e.menu.hide())},activeMenu:function(e){this.toggleClass("active",e)},renderHtml:function(){var e=this,t=e._id,r=e.classPrefix,i=e.settings.icon,o;return o=e.settings.image,o?(i="none","string"!=typeof o&&(o=window.getSelection?o[0]:o[1]),o=" style=\"background-image: url('"+o+"')\""):o="",i=e.settings.icon?r+"ico "+r+"i-"+i:"",e.aria("role",e.parent()instanceof n?"menuitem":"button"),'<div id="'+t+'" class="'+e.classes()+'" tabindex="-1" aria-labelledby="'+t+'"><button id="'+t+'-open" role="presentation" type="button" tabindex="-1">'+(i?'<i class="'+i+'"'+o+"></i>":"")+"<span>"+(e._text?(i?"\xa0":"")+e.encode(e._text):"")+'</span> <i class="'+r+'caret"></i></button></div>'},postRender:function(){var e=this;return e.on("click",function(t){t.control===e&&r(t.target,e.getEl())&&(e.showMenu(),t.aria&&e.menu.items()[0].focus())}),e.on("mouseenter",function(t){var n=t.control,r=e.parent(),o;n&&r&&n instanceof i&&n.parent()==r&&(r.items().filter("MenuButton").each(function(e){e.hideMenu&&e!=n&&(e.menu&&e.menu.visible()&&(o=!0),e.hideMenu())}),o&&(n.focus(),n.showMenu()))}),e._super()},text:function(e){var t=this,n,r;if(t._rendered)for(r=t.getEl("open").getElementsByTagName("span"),n=0;n<r.length;n++)r[n].innerHTML=(t.settings.icon&&e?"\xa0":"")+t.encode(e);return this._super(e)},remove:function(){this._super(),this.menu&&this.menu.remove()}});return i}),r(Jt,[Xt],function(e){return e.extend({init:function(e){function t(r){for(var a=0;a<r.length;a++){if(i=r[a].selected||e.value===r[a].value){o=o||r[a].text,n._value=r[a].value;break}r[a].menu&&t(r[a].menu)}}var n=this,r,i,o,a;n._values=r=e.values,r&&(t(r),!i&&r.length>0&&(o=r[0].text,n._value=r[0].value),e.menu=r),e.text=e.text||o||r[0].text,n._super(e),n.addClass("listbox"),n.on("select",function(t){var r=t.control;a&&(t.lastControl=a),e.multiple?r.active(!r.active()):n.value(t.control.settings.value),a=r})},value:function(e){function t(e,n){e.items().each(function(e){i=e.value()===n,i&&(o=o||e.text()),e.active(i),e.menu&&t(e.menu,n)})}function n(t){for(var r=0;r<t.length;r++)i=t[r].value==e,i&&(o=o||t[r].text),t[r].active=i,t[r].menu&&n(t[r].menu)}var r=this,i,o,a;return"undefined"!=typeof e&&(r.menu?t(r.menu,e):(a=r.settings.menu,n(a)),r.text(o||this.settings.text)),r._super(e)}})}),r(Qt,[Nt,G,u],function(e,t,n){return e.extend({Defaults:{border:0,role:"menuitem"},init:function(e){var t=this;t.hasPopup=!0,t._super(e),e=t.settings,t.addClass("menu-item"),e.menu&&t.addClass("menu-item-expand"),e.preview&&t.addClass("menu-item-preview"),("-"===t._text||"|"===t._text)&&(t.addClass("menu-item-sep"),t.aria("role","separator"),t._text="-"),e.selectable&&(t.aria("role","menuitemcheckbox"),t.addClass("menu-item-checkbox"),e.icon="selected"),e.preview||e.selectable||t.addClass("menu-item-normal"),t.on("mousedown",function(e){e.preventDefault()}),e.menu&&!e.ariaHideMenu&&t.aria("haspopup",!0)},hasMenus:function(){return!!this.settings.menu},showMenu:function(){var e=this,n=e.settings,r,i=e.parent();if(i.items().each(function(t){t!==e&&t.hideMenu()}),n.menu){r=e.menu,r?r.show():(r=n.menu,r.length?r={type:"menu",items:r}:r.type=r.type||"menu",i.settings.itemDefaults&&(r.itemDefaults=i.settings.itemDefaults),r=e.menu=t.create(r).parent(e).renderTo(),r.reflow(),r.on("cancel",function(t){t.stopPropagation(),e.focus(),r.hide()}),r.on("show hide",function(e){e.control.items().each(function(e){e.active(e.settings.selected)})}).fire("show"),r.on("hide",function(t){t.control===r&&e.removeClass("selected")}),r.submenu=!0),r._parentMenu=i,r.addClass("menu-sub");var o=r.testMoveRel(e.getEl(),e.isRtl()?["tl-tr","bl-br","tr-tl","br-bl"]:["tr-tl","br-bl","tl-tr","bl-br"]);r.moveRel(e.getEl(),o),r.rel=o,o="menu-sub-"+o,r.removeClass(r._lastRel),r.addClass(o),r._lastRel=o,e.addClass("selected"),e.aria("expanded",!0)}},hideMenu:function(){var e=this;return e.menu&&(e.menu.items().each(function(e){e.hideMenu&&e.hideMenu()}),e.menu.hide(),e.aria("expanded",!1)),e},renderHtml:function(){function e(e){var t,r,i={};for(i=n.mac?{alt:"&#x2325;",ctrl:"&#x2318;",shift:"&#x21E7;",meta:"&#x2318;"}:{meta:"Ctrl"},e=e.split("+"),t=0;t<e.length;t++)r=i[e[t].toLowerCase()],r&&(e[t]=r);return e.join("+")}var t=this,r=t._id,i=t.settings,o=t.classPrefix,a=t.encode(t._text),s=t.settings.icon,l="",c=i.shortcut;return s&&t.parent().addClass("menu-has-icons"),i.image&&(s="none",l=" style=\"background-image: url('"+i.image+"')\""),c&&(c=e(c)),s=o+"ico "+o+"i-"+(t.settings.icon||"none"),'<div id="'+r+'" class="'+t.classes()+'" tabindex="-1">'+("-"!==a?'<i class="'+s+'"'+l+"></i>\xa0":"")+("-"!==a?'<span id="'+r+'-text" class="'+o+'text">'+a+"</span>":"")+(c?'<div id="'+r+'-shortcut" class="'+o+'menu-shortcut">'+c+"</div>":"")+(i.menu?'<div class="'+o+'caret"></div>':"")+"</div>"},postRender:function(){var e=this,t=e.settings,n=t.textStyle;if("function"==typeof n&&(n=n.call(this)),n){var r=e.getEl("text");r&&r.setAttribute("style",n)}return e.on("mouseenter click",function(n){n.control===e&&(t.menu||"click"!==n.type?(e.showMenu(),n.aria&&e.menu.focus(!0)):(e.fire("select"),e.parent().hideAll()))}),e._super(),e},active:function(e){return"undefined"!=typeof e&&this.aria("checked",e),this._super(e)},remove:function(){this._super(),this.menu&&this.menu.remove()}})}),r(Zt,[rt,Qt,d],function(e,t,n){var r=e.extend({Defaults:{defaultType:"menuitem",border:1,layout:"stack",role:"application",bodyRole:"menu",ariaRoot:!0},init:function(e){var t=this;if(e.autohide=!0,e.constrainToViewport=!0,e.itemDefaults)for(var r=e.items,i=r.length;i--;)r[i]=n.extend({},e.itemDefaults,r[i]);t._super(e),t.addClass("menu")},repaint:function(){return this.toggleClass("menu-align",!0),this._super(),this.getEl().style.height="",this.getEl("body").style.height="",this},cancel:function(){var e=this;e.hideAll(),e.fire("select")},hideAll:function(){var e=this;return this.find("menuitem").exec("hideMenu"),e._super()},preRender:function(){var e=this;return e.items().each(function(t){var n=t.settings;return n.icon||n.selectable?(e._hasIcons=!0,!1):void 0}),e._super()}});return r}),r(en,[Tt],function(e){return e.extend({Defaults:{classes:"radio",role:"radio"}})}),r(tn,[Nt,Q],function(e,t){return e.extend({renderHtml:function(){var e=this,t=e.classPrefix;return e.addClass("resizehandle"),"both"==e.settings.direction&&e.addClass("resizehandle-both"),e.canFocus=!1,'<div id="'+e._id+'" class="'+e.classes()+'"><i class="'+t+"ico "+t+'i-resize"></i></div>'},postRender:function(){var e=this;e._super(),e.resizeDragHelper=new t(this._id,{start:function(){e.fire("ResizeStart")},drag:function(t){"both"!=e.settings.direction&&(t.deltaX=0),e.fire("Resize",t)},stop:function(){e.fire("ResizeEnd")}})},remove:function(){return this.resizeDragHelper&&this.resizeDragHelper.destroy(),this._super()}})}),r(nn,[Nt],function(e){return e.extend({renderHtml:function(){var e=this;return e.addClass("spacer"),e.canFocus=!1,'<div id="'+e._id+'" class="'+e.classes()+'"></div>'}})}),r(rn,[Xt,Y],function(e,t){return e.extend({Defaults:{classes:"widget btn splitbtn",role:"button"},repaint:function(){var e=this,n=e.getEl(),r=e.layoutRect(),i,o;return e._super(),i=n.firstChild,o=n.lastChild,t.css(i,{width:r.w-t.getSize(o).width,height:r.h-2}),t.css(o,{height:r.h-2}),e},activeMenu:function(e){var n=this;t.toggleClass(n.getEl().lastChild,n.classPrefix+"active",e)},renderHtml:function(){var e=this,t=e._id,n=e.classPrefix,r,i=e.settings.icon;return r=e.settings.image,r?(i="none","string"!=typeof r&&(r=window.getSelection?r[0]:r[1]),r=" style=\"background-image: url('"+r+"')\""):r="",i=e.settings.icon?n+"ico "+n+"i-"+i:"",'<div id="'+t+'" class="'+e.classes()+'" role="button" tabindex="-1"><button type="button" hidefocus="1" tabindex="-1">'+(i?'<i class="'+i+'"'+r+"></i>":"")+(e._text?(i?" ":"")+e._text:"")+'</button><button type="button" class="'+n+'open" hidefocus="1" tabindex="-1">'+(e._menuBtnText?(i?"\xa0":"")+e._menuBtnText:"")+' <i class="'+n+'caret"></i></button></div>'},postRender:function(){var e=this,t=e.settings.onclick;return e.on("click",function(e){var n=e.target;if(e.control==this)for(;n;){if(e.aria&&"down"!=e.aria.key||"BUTTON"==n.nodeName&&-1==n.className.indexOf("open"))return e.stopImmediatePropagation(),void t.call(this,e);n=n.parentNode}}),delete e.settings.onclick,e._super()}})}),r(on,[Ut],function(e){return e.extend({Defaults:{containerClass:"stack-layout",controlClass:"stack-layout-item",endClass:"break"}})}),r(an,[et,Y],function(e,t){return e.extend({Defaults:{layout:"absolute",defaults:{type:"panel"}},activateTab:function(e){var n;this.activeTabId&&(n=this.getEl(this.activeTabId),t.removeClass(n,this.classPrefix+"active"),n.setAttribute("aria-selected","false")),this.activeTabId="t"+e,n=this.getEl("t"+e),n.setAttribute("aria-selected","true"),t.addClass(n,this.classPrefix+"active"),this.items()[e].show().fire("showtab"),this.reflow(),this.items().each(function(t,n){e!=n&&t.hide()})},renderHtml:function(){var e=this,t=e._layout,n="",r=e.classPrefix;return e.preRender(),t.preRender(e),e.items().each(function(t,i){var o=e._id+"-t"+i;t.aria("role","tabpanel"),t.aria("labelledby",o),n+='<div id="'+o+'" class="'+r+'tab" unselectable="on" role="tab" aria-controls="'+t._id+'" aria-selected="false" tabIndex="-1">'+e.encode(t.settings.title)+"</div>"}),'<div id="'+e._id+'" class="'+e.classes()+'" hidefocus="1" tabindex="-1"><div id="'+e._id+'-head" class="'+r+'tabs" role="tablist">'+n+'</div><div id="'+e._id+'-body" class="'+e.classes("body")+'">'+t.renderHtml(e)+"</div></div>"},postRender:function(){var e=this;e._super(),e.settings.activeTab=e.settings.activeTab||0,e.activateTab(e.settings.activeTab),this.on("click",function(t){var n=t.target.parentNode;if(t.target.parentNode.id==e._id+"-head")for(var r=n.childNodes.length;r--;)n.childNodes[r]==t.target&&e.activateTab(r)})},initLayoutRect:function(){var e=this,n,r,i;r=t.getSize(e.getEl("head")).width,r=0>r?0:r,i=0,e.items().each(function(e){r=Math.max(r,e.layoutRect().minW),i=Math.max(i,e.layoutRect().minH)}),e.items().each(function(e){e.settings.x=0,e.settings.y=0,e.settings.w=r,e.settings.h=i,e.layoutRect({x:0,y:0,w:r,h:i})});var o=t.getSize(e.getEl("head")).height;return e.settings.minWidth=r,e.settings.minHeight=i+o,n=e._super(),n.deltaH+=o,n.innerH=n.h-n.deltaH,n}})}),r(sn,[Nt,Y],function(e,t){return e.extend({init:function(e){var t=this;t._super(e),t._value=e.value||"",t.addClass("textbox"),e.multiline?t.addClass("multiline"):t.on("keydown",function(e){13==e.keyCode&&t.parents().reverse().each(function(t){return e.preventDefault(),t.hasEventListeners("submit")&&t.toJSON?(t.fire("submit",{data:t.toJSON()}),!1):void 0})})},disabled:function(e){var t=this;return t._rendered&&"undefined"!=typeof e&&(t.getEl().disabled=e),t._super(e)},value:function(e){var t=this;return"undefined"!=typeof e?(t._value=e,t._rendered&&(t.getEl().value=e),t):t._rendered?t.getEl().value:t._value},repaint:function(){var e=this,t,n,r,i=0,o=0,a;t=e.getEl().style,n=e._layoutRect,a=e._lastRepaintRect||{};var s=document;return!e.settings.multiline&&s.all&&(!s.documentMode||s.documentMode<=8)&&(t.lineHeight=n.h-o+"px"),r=e._borderBox,i=r.left+r.right+8,o=r.top+r.bottom+(e.settings.multiline?8:0),n.x!==a.x&&(t.left=n.x+"px",a.x=n.x),n.y!==a.y&&(t.top=n.y+"px",a.y=n.y),n.w!==a.w&&(t.width=n.w-i+"px",a.w=n.w),n.h!==a.h&&(t.height=n.h-o+"px",a.h=n.h),e._lastRepaintRect=a,e.fire("repaint",{},!1),e},renderHtml:function(){var e=this,t=e._id,n=e.settings,r=e.encode(e._value,!1),i="";return"spellcheck"in n&&(i+=' spellcheck="'+n.spellcheck+'"'),n.maxLength&&(i+=' maxlength="'+n.maxLength+'"'),n.size&&(i+=' size="'+n.size+'"'),n.subtype&&(i+=' type="'+n.subtype+'"'),e.disabled()&&(i+=' disabled="disabled"'),n.multiline?'<textarea id="'+t+'" class="'+e.classes()+'" '+(n.rows?' rows="'+n.rows+'"':"")+' hidefocus="1"'+i+">"+r+"</textarea>":'<input id="'+t+'" class="'+e.classes()+'" value="'+r+'" hidefocus="1"'+i+" />"},postRender:function(){var e=this;return t.on(e.getEl(),"change",function(t){e.fire("change",t)}),e._super()},remove:function(){t.off(this.getEl()),this._super()}})}),r(ln,[Y,K],function(e,t){return function(n,r){var i=this,o,a=t.classPrefix;i.show=function(t){return i.hide(),o=!0,window.setTimeout(function(){o&&n.appendChild(e.createFragment('<div class="'+a+"throbber"+(r?" "+a+"throbber-inline":"")+'"></div>'))},t||0),i},i.hide=function(){var e=n.lastChild;return e&&-1!=e.className.indexOf("throbber")&&e.parentNode.removeChild(e),o=!1,i}}}),a([l,c,u,d,f,p,h,m,g,y,b,C,x,_,E,N,k,S,T,R,A,B,D,L,M,H,O,I,F,z,W,V,U,$,q,j,Y,K,G,X,J,Q,Z,et,tt,nt,rt,it,ot,at,st,lt,ct,ut,dt,ft,pt,ht,mt,gt,vt,yt,bt,Ct,xt,wt,_t,Et,Nt,kt,St,Tt,Rt,At,Bt,Dt,Lt,Mt,Ht,Pt,Ot,It,Ft,zt,Wt,Vt,Ut,$t,qt,jt,Yt,Kt,Gt,Xt,Jt,Qt,Zt,en,tn,nn,rn,on,an,sn,ln])}(this);
//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      } else {
        func = null;
      }
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (typeof /./ !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));
