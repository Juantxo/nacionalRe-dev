
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = global || self, factory(global.c2 = global.c2 || {}));
}(this, function (exports) {
    'use strict';



    function calcHypertension(systolic, diastolic) {

        let result = 0;
        if ((systolic > 145) || (diastolic > 95)) {
            return result += 999;
        }
        if ((systolic > 139) || (diastolic > 89)) {
            return result += 75;
        }
        if ((systolic > 131) || (diastolic > 80)) {
            return result += 50;
        }
        return result;

    }

    function setSystolicColors(input, systolic) {

        input.classList.remove("blue", "green", "red");
        if (systolic > 145 || systolic < 65) {
            input.classList.add("red");
            return false;
        }

        if (systolic > 131) {
            input.classList.add("blue");
            return false;
        }

        input.classList.add("green");
        return false;

    }

    function setDiastolicColors(input, diastolic) {
        input.classList.remove("blue", "green", "red");
        if (diastolic > 95 || diastolic < 45) {
            input.classList.add("red");
            return false;
        }
        if (diastolic > 80) {
            input.classList.add("blue");
            return false;
        }
        input.classList.add("green");
        return false;

    }

    exports.calcHypertension = calcHypertension;
    exports.setSystolicColors = setSystolicColors;
    exports.setDiastolicColors = setDiastolicColors;


    Object.defineProperty(exports, '__esModule', { value: true });

}));