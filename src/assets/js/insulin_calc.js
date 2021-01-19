
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = global || self, factory(global.c2 = global.c2 || {}));
}(this, function (exports) {
    'use strict';



    function calcInsulin(insulin) {
        let result = 0;

        if (insulin === 'ins2') {
            result += 25;
        }
        return result;
    }


    exports.calcInsulin = calcInsulin;


    Object.defineProperty(exports, '__esModule', { value: true });

}));