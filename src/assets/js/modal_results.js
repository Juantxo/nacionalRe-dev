
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = global || self, factory(global.c2 = global.c2 || {}));
}(this, function (exports) {
    'use strict';


    let modalResult = self.document.getElementById("modal_result");
    let close_modal_result = self.document.getElementById("close_modal_result");



    function openModalResults(event, vars, result) {
        event.stopPropagation();
        let year = vars.today.getFullYear();
        let x;
    }



    exports.openModalResults = openModalResults;





    Object.defineProperty(exports, '__esModule', { value: true });

}));