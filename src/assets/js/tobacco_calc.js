
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = global || self, factory(global.c2 = global.c2 || {}));
}(this, function (exports) {
    'use strict';



    function calcTobacco(cigarretes, cigars, pipes) {
        let units = +cigarretes + (+cigars * 3) + (+pipes * 2);
        let result = 0;
        if (units <= 0) {
            result += 0;
        }
        if (units > 0 && units <= 10) {
            result += 25;
        }
        if (units > 10 && units <= 15) {
            result += 50;
        }
        if (units > 15 && units <= 20) {
            result += 75;
        }
        if (units > 20) {
            result += 999;
        }
        return result;
    }


    exports.calcTobacco = calcTobacco;


    Object.defineProperty(exports, '__esModule', { value: true });

}));