/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global', 'sap/ui/unified/calendar/DatesRow', 'sap/ui/unified/calendar/CalendarUtils', 'sap/ui/unified/library'],
	function(jQuery, DatesRow, CalendarUtils, library) {
		"use strict";

	/**
	 * Constructor for a new <code>OneMonthDatesRow</code>.
	 *
	 * @param {string} [sID] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @class
	 * This control is a private and used internally for the purposes of the PlanningCalendar 1 month view. It supports
	 * the following rendering depending on the parent's container width:
	 * <ul>
	 * <li>a calendar like rows for S & M sizes </li>
	 * <li>a single row for all other sizes </li>
	 * </ul>
	 * Other usages are not supported.
	 *
	 * @extends sap.ui.core.Control
	 * @version 1.44.32
	 *
	 * @constructor
	 * @private
	 * @since 1.44
	 * @alias sap.ui.unified.calendar.OneMonthDatesRow
	 */
	var OneMonthDatesRow = DatesRow.extend("sap.ui.unified.calendar.OneMonthDatesRow", /** @lends sap.ui.unified.calendar.OneMonthDatesRow.prototype */ {
		metadata : {
			library : "sap.ui.unified"
		}
	});

	OneMonthDatesRow.prototype.init = function() {
		DatesRow.prototype.init.apply(this, arguments);
		this.iMode = 2; //default corresponds to size L
	};

	OneMonthDatesRow.prototype.setMode = function(iMode) {
		var oSelectedDates = this.getSelectedDates(),
			oStartDate,
			bChanged = this.iMode !== iMode;

		this.iMode = iMode;


		if (bChanged && oSelectedDates.length) {
			if (this.iMode < 2) {
				oStartDate = this.getStartDate();
			}

			//clear or set to first of the month
			oSelectedDates[0].setProperty('startDate', oStartDate, true);
		}

		return this;
	};

	/**
	 * Obtains the rendering mode.
	 * @returns {number|*} the mode - 0 - Tablet, 1 - Phone, 2 - Desktop
	 */
	OneMonthDatesRow.prototype.getMode = function () {
		return this.iMode;
	};

	OneMonthDatesRow.prototype.selectDate = function(oDate) {
		if (this.iMode < 2 && this.getSelectedDates().length) {
			this.getSelectedDates()[0].setStartDate(oDate);
		}
	};

	OneMonthDatesRow.prototype.setDate = function(oDate) {
		// check if in visible date range
		if (!this._bNoRangeCheck && !this.checkDateFocusable(oDate)) {
			return this;
		}

		DatesRow.prototype.setDate.apply(this, arguments);

		return this;
	};

	OneMonthDatesRow.prototype.displayDate = function(oDate){
		// check if in visible date range
		if (!this._bNoRangeCheck && !this.checkDateFocusable(oDate)) {
			return this;
		}

		DatesRow.prototype.displayDate.apply(this, arguments);

		return this;

	};

	/**
	 * Hanldes [HOME] key to focus the 1st day of the month regardless any dates from other months
	 * @param oEvent the event
	 */
	OneMonthDatesRow.prototype.onsaphome = function(oEvent) {
		var oUniversalStartDate = CalendarUtils._createUniversalUTCDate(this.getStartDate());

		//prevent item navigation to focus the 1st visible item, because this item may correspond to an item from other month
		interruptEvent(oEvent);

		this._setDate(oUniversalStartDate);//Can we reuse setDate (see checkDateFocusable that prevents setting the date).
		this._focusDate(oUniversalStartDate);

		this.fireFocus({date: this.getStartDate(), otherMonth: false});
	};

	/**
	 * Hanldes [END] key to focus the last day of the month regardless any dates from other months
	 * @param oEvent the event
	 */
	OneMonthDatesRow.prototype.onsapend = function (oEvent) {
		var oStartDate = this.getStartDate(),
			oLastDay = CalendarUtils._getLastDayInMonth(oStartDate),
			oUniversalLastDay = CalendarUtils._createUniversalUTCDate(oLastDay);

		//prevent item navigation to focus the last visible item, because this item may correspond to an item from other month
		interruptEvent(oEvent);

		this._setDate(oUniversalLastDay); //Can we reuse setDate (see checkDateFocusable that prevents setting the date).
		this._focusDate(oUniversalLastDay);

		this.fireFocus({date: oLastDay, otherMonth: false});
	};

	function interruptEvent(oEvent) {
		oEvent.stopPropagation();
		oEvent.preventDefault();
		oEvent.stopImmediatePropagation(true);
	}

	return OneMonthDatesRow;

}, /* bExport=  */ true);