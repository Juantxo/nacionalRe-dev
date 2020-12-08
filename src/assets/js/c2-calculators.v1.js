
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = global || self, factory(global.c2 = global.c2 || {}));
}(this, function (exports) {
    'use strict';


    function defaultSeparation(a, b) {
        return a.parent === b.parent ? 1 : 2;
    }

    function calcDiabetesByYearsLife(type, years) {
        let result = 0;

        if (type === 't1') {
            if (years < 5) {
                result += 0;
            }
            if (years >= 5 && years <= 20) {
                result += 50;
            }

            if (years > 20) {
                result += 999;
            }
        }
        if (type === 't2') {
            if (years <= 10) {
                result += 0;
            }

            if (years > 10) {
                result += 50;
            }
        }
        return result;
    }

    function calcDiabetesByYearsTemp(type, years) {
        let result = 0;
        if (type === 't1') {

            if (years <= 10) {
                result += 25;
            }
            if (years > 11 && years <= 20) {
                result += 50;
            }
            if (years > 20 && years <= 25) {
                result += 75;
            }
            if (years > 25 && years <= 30) {
                result += 100;
            }
            if (years > 30 && years <= 35) {
                result += 150;
            }
            if (years > 35) {
                result += 999;
            }
        }

        if (type === 't2') {

            if (years <= 5) {
                result += 25;
            }
            if (years > 5 && years <= 10) {
                result += 50;
            }
            if (years > 10 && years <= 15) {
                result += 75;
            }
            if (years > 15) {
                result += 100;
            }
        }
        return result;
    }
    function calcDiabetesByYears(type, years) {
        let diabetesByYearLife = calcDiabetesByYearsLife(type, years);
        let diabetesByYearTemp = calcDiabetesByYearsTemp(type, years);
        return {
            life: diabetesByYearLife,
            disability: diabetesByYearLife,
            accident: diabetesByYearLife,
            temporary: diabetesByYearTemp
        }
    }

    function calcDiabetesByAgeLife(type, age) {
        let result = 0;
        if (type === 't1') {
            if (age <= 19) {
                result += 0;
            }
            if (age > 19 && age <= 24) {
                result += 250;
            }
            if (age > 24 && age <= 29) {
                result += 200;
            }
            if (age > 29 && age <= 40) {
                result += 150;
            }
            if (age > 40) {
                result += 100;
            }
        }
        if (type === 't2') {
            if (age <= 29) {
                result += 200;
            }
            if (age > 29 && age <= 39) {
                result += 150;
            }
            if (age > 39 && age <= 49) {
                result += 75;
            }
            if (age > 49) {
                result += 25;
            }
        }
        return result;

    }

    function calcDiabetesByAgeDis(type, age) {
        let result = 0;
        if (type === 't1') {
            result += 999;
        }
        if (type === 't2') {
            if (age <= 39) {
                result += 999;
            }
            if (age > 39 && age <= 49) {
                result += 100;
            }
            if (age > 49) {
                result += 25;
            }
        }
        return result;
    }
    function calcDiabetesByAgeTemp(type, age) {
        return 0;
    }

    function calcDiabetesByAge(type, age) {
        let diabetesByAgeLife = calcDiabetesByAgeLife(type, age);
        let diabetesByAgeDis = calcDiabetesByAgeDis(type, age);
        let diabetesByAgeTemp = calcDiabetesByAgeTemp(type, age);

        let x;
        return {
            life: diabetesByAgeLife,
            disability: diabetesByAgeDis,
            accident: diabetesByAgeDis,
            temporary: diabetesByAgeTemp
        }

    }



    exports.defaultSeparation = defaultSeparation;
    exports.calcDiabetesByYears = calcDiabetesByYears;
    exports.calcDiabetesByAge = calcDiabetesByAge;


    Object.defineProperty(exports, '__esModule', { value: true });

}));