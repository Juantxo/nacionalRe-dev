
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = global || self, factory(global.c2 = global.c2 || {}));
}(this, function (exports) {
    'use strict';



    function calcAlcohol(wines, beers, spirits) {
        let units = +wines + (+beers) + (+spirits * 2);
        let result = 0;
        if (units <= 1) {
            result += 0;
        }
        if (units > 1 && units <= 3) {
            result += 25;
        }
        if (units > 3) {
            result += 999;
        }
        return result;
    }


    exports.calcAlcohol = calcAlcohol;


    Object.defineProperty(exports, '__esModule', { value: true });

}));