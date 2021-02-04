(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports)
    : typeof define === "function" && define.amd
      ? define(["exports"], factory)
      : ((global =
        typeof globalThis !== "undefined" ? globalThis : global || self),
        factory((global["c2"] = global.c2 || {})));
})(this, function (exports) {

  "use strict";
  var version = "1.0.0";



  function addEventListenerList(nodelist, event, fn) {
    let e = event || window.event;
    for (var i = 0, len = nodelist.length; i < len; i++) {
      nodelist[i].addEventListener(e, fn, false);
    }
  }

  function dateIsHigher(dob) {
    if (Date.now() - dob.getTime() < 0) {
      return true;
    }
    return false;
  }

  function subtractYearsToDate(date, years) {
    date.setFullYear(date.getFullYear() - years);
    return date;
  }

  function dateIsOnRange(range, check) {
    var dateMin = subtractYearsToDate(new Date(), range[0]);
    var dateMax = subtractYearsToDate(new Date(), range[1]);

    if (check > dateMax && check < dateMin) {
      return true;
    }
    return false;
  }
  function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    var age_dt_full = age_dt.getUTCFullYear();

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  function isNumberKey(evt) {
    let e = evt || window.event;
    let y = e.currentTarget.value;
    var charCode = (e.charCode) ? e.charCode : ((e.keyCode) ? e.keyCode :
      ((e.which) ? e.which : 0));
    // allow decimals
    if (charCode > 31 && ((charCode != 46 || charCode != 44) && (charCode < 48 || charCode > 57))) {
      e.preventDefault();
      return false;
    }
    return true;
  }

  function limitChars(evt) {
    let e = evt || window.event;
    let y = e.currentTarget.value;
    var max_chars = 2;

    if (y.length > max_chars) {
      e.currentTarget.value = y.substr(0, max_chars);
    }
    return false;
  }


  function cmToMeter(cm) {
    return Number(cm) / 100;
  }

  exports.addEventListenerList = addEventListenerList;
  exports.calculate_age = calculate_age;
  exports.dateIsHigher = dateIsHigher;
  exports.subtractYearsToDate = subtractYearsToDate;
  exports.dateIsOnRange = dateIsOnRange;
  exports.isNumberKey = isNumberKey;
  exports.limitChars = limitChars;

  exports.cmToMeter = cmToMeter;

  Object.defineProperty(exports, "__esModule", { value: true });
});
