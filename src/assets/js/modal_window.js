
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = global || self, factory(global.c2 = global.c2 || {}));
}(this, function (exports) {
    'use strict';


    let modalDiv = self.document.getElementById("modal_window");
    let close_modal_span = self.document.getElementById("close_modal_info");
    let modal_header_span = self.document.getElementById("modal_header_span");
    let modal_body1_span = self.document.getElementById("modal_body1_span");
    let modal_body2_span = self.document.getElementById("modal_body2_span");
    let modal_footer_span = self.document.getElementById("modal_footer_span");
    // MODAL WINDOW
    function initModalWindow() {
        close_modal_span.onclick = function () {
            modalDiv.style.display = "none";
        }
    }

    // MODAL WINDOW FUNC
    function drawModalWindowInnerHTML(message) {
        modal_header_span.innerHTML = message.header;
        modal_body1_span.innerHTML = message.action;
        modal_body2_span.innerHTML = message.content;
        modal_footer_span.innerHTML = message.footer;
        modalDiv.style.display = "block";
    }

    function openModalWindow(event, message) {
        //event.stopPropagation();
        if (event.currentTarget.name === 'cbox') {
            if (event.currentTarget.checked) {
                let pathology = event.currentTarget.nextSibling.data;
                message['action'] = pathology + "."
                drawModalWindowInnerHTML(message);

            }
            return;
        }
        drawModalWindowInnerHTML(message);
        return;
    };

    function openModalResults(event, vars, result) {
        event.stopPropagation();
        let x
    }

    exports.openModalWindow = openModalWindow;
    exports.initModalWindow = initModalWindow;





    Object.defineProperty(exports, '__esModule', { value: true });

}));