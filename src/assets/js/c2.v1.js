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

  function sayHello(a, b) {
    return "This is the awesome c2 " + a + ' ' + b + "!";
  }

  function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
      list[i].addEventListener(event, fn, false);
    }
  }

  exports.sayHello = sayHello;
  exports.addEventListenerList = addEventListenerList;

  Object.defineProperty(exports, "__esModule", { value: true });
});
