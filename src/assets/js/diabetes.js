((window, c2) => {
    window["diabetes"] = {};
    window["diabetes"]["mode"] = "mode";

    let formForm = document.forms["diabetes_form"];
    let modalDiv = document.getElementById("modal_window");

    let closeModalSpan = document.getElementsByClassName("close")[0];
    let modal_header_span = document.getElementById("modal_header_span");
    let modal_body1_span = document.getElementById("modal_body1_span");
    let modal_body2_span = document.getElementById("modal_body2_span");
    let modal_footer_span = document.getElementById("modal_footer_span");


    let pathologiesModalSetup = {
        header: "Atención",
        content: "Esta patología no permite asegurar ningún riesgo.",
        pathology: "",
        footer: "NacionalRe"
    }

    function initModalWindow() {
        closeModalSpan.onclick = function () {
            modalDiv.style.display = "none";
        }
    }

    function openModalWindow(event, message) {
        event.stopPropagation();
        if (event.currentTarget.name === 'cbox') {
            if (event.currentTarget.checked) {
                let pathology = event.currentTarget.nextSibling.data;
                modal_header_span.innerHTML = message.header;
                modal_body1_span.innerHTML = pathology + ".";
                modal_body2_span.innerHTML = message.content;
                modal_footer_span.innerHTML = message.footer;
                modalDiv.style.display = "block";
            }
        }



    };

    function initPathologies() {
        // 1. Pathologies
        let pathologyCheckBoxes = document.getElementsByName('cbox');
        this.c2.addEventListenerList(pathologyCheckBoxes, "click", (e) => { openModalWindow(e, pathologiesModalSetup) });
    }

    let init = () => {
        initModalWindow();
        initPathologies();
    };

    init();



})(document, this.c2);


