((window, c2) => {
    window["diabetes"] = {};
    window["diabetes"]["mode"] = "mode";


    let formForm = document.forms["diabetes_form"];
    const numberFields = ["birthday", "years_diabetes", "weight", "height", "body_mass", "cigarettes", "cigars", "pipes", "wines", "beers", "spirits", "systolic", "diastolic"];


    let modalDiv = document.getElementById("modal_window");
    let submitButton = document.getElementById("submit_button");

    let closeModalSpan = document.getElementsByClassName("close")[0];
    let modal_header_span = document.getElementById("modal_header_span");
    let modal_body1_span = document.getElementById("modal_body1_span");
    let modal_body2_span = document.getElementById("modal_body2_span");
    let modal_footer_span = document.getElementById("modal_footer_span");


    let pathologiesModalSetup = {
        header: "Atención",
        content: "Esta patología no permite asegurar ningún riesgo.",
        action: "",
        footer: "NacionalRe"
    }

    let birthdayModalSetup = {
        header: "Atención",
        content: "La fecha seleccionada no puede ser mayor que la fecha actual.",
        action: "Por favor, escoga una fecha de nuevo",
        footer: "NacionalRe"
    }

    let fieldsOffModalSetup = {
        header: "Atención",
        content: "Por favor, rellene correctamente los campos con mensajes en rojo.",
        action: "Existen campos erróneos o sin rellenar.",
        footer: "NacionalRe"
    }

    // global results
    let _age = '';
    let _gender = formForm.elements['gender'].value;
    let _diabetes = formForm.elements['diabetes'].value;
    let _yearsDiabetes = formForm.elements['years_diabetes'].value;
    let _weight = formForm.elements['weight'].value;
    let _height = formForm.elements['height'].value;
    let _body_mass = formForm.elements['body_mass'].value;
    let _cigarettes = formForm.elements['cigarettes'].value;
    let _cigars = formForm.elements['cigars'].value;
    let _pipes = formForm.elements['pipes'].value;
    let _wines = formForm.elements['wines'].value;
    let _beers = formForm.elements['beers'].value;
    let _spirits = formForm.elements['spirits'].value;
    let _systolic = formForm.elements['systolic'].value;
    let _diastolic = formForm.elements['diastolic'].value;
    let _insulin = formForm.elements['insulin'].value;
    let _hemoglobin = formForm.elements['hemoglobin'].value;
    let _cholesterol = formForm.elements['cholesterol'].value;


    // MODAL WINDOW FUNC
    function drawModalWindowInnerHTML(message) {
        modal_header_span.innerHTML = message.header;
        modal_body1_span.innerHTML = message.action;
        modal_body2_span.innerHTML = message.content;
        modal_footer_span.innerHTML = message.footer;
        modalDiv.style.display = "block";
    }

    function openModalWindow(event, message) {
        event.stopPropagation();
        if (event.currentTarget.name === 'cbox') {
            if (event.currentTarget.checked) {
                let pathology = event.currentTarget.nextSibling.data;
                message['action'] = pathology + "."
                drawModalWindowInnerHTML(message);
            }
        }
        if (event.currentTarget.name === 'birthday') {
            drawModalWindowInnerHTML(message);
        }
        if (event.currentTarget.name === 'diabetes_form') {
            drawModalWindowInnerHTML(message);
        }
    };


    // CHECK ALL FIELDS FUNCTIONS
    function fieldsOn() {
        let nodeList = formForm.querySelectorAll('input[type="number"], input[type="date"], input[type="checkbox"]');
        let wrongFields = [];
        let i = 0;
        for (i = 0; i < nodeList.length; i++) {
            if (nodeList[i].type === "checkbox" && nodeList[i].checked) {
                wrongFields.push(nodeList[i]);
            }
            if ((nodeList[i].type === "date" || nodeList[i].type === "number") && nodeList[i].value === "") {
                wrongFields.push(nodeList[i]);
            }
        }
        return wrongFields.length > 0 ? false : true;
    }

    function checkNodeFields(nodeList) {
        let i = 0;
        for (i = 0; i < nodeList.length; i++) {
            if (nodeList[i].type === "checkbox" && nodeList[i].checked) {
                document.getElementById(nodeList[i].name + "_msg").style.display = "block";
            }
            if ((nodeList[i].type === "date" || nodeList[i].type === "number") && nodeList[i].value === "") {
                document.getElementById(nodeList[i].name + "_msg").style.display = "block";
            }
        }
    }



    // Event listeners

    // Only numeric values on fields, no comma, no dot, no paste, no drop.
    function setNumericField() {
        let fields = formForm.querySelectorAll('input[type="number"]');
        this.c2.addEventListenerList(fields, "keypress", (e) => { this.c2.isNumberKey(e) });
        this.c2.addEventListenerList(fields, "paste", (e) => { e.preventDefault(); return false; });
        this.c2.addEventListenerList(fields, "drop", (e) => { e.preventDefault(); return false; });
        this.c2.addEventListenerList(fields, "change", (e) => { toggleMandatoryMsg(e) });
    }

    function toggleMandatoryMsg(e) {
        if ((e.currentTarget.type === 'date' || e.currentTarget.type === "number") && e.currentTarget.value !== "") {
            document.getElementById(e.currentTarget.name + "_msg").style.display = "none";
            return false;
        }
        if (e.currentTarget.type === 'checkbox' && !e.currentTarget.checked) {
            let boxes = document.getElementsByName(e.currentTarget.name);
            let checked = Array.prototype.slice.call(boxes).filter(d => d.checked);
            if (checked.length < 1) {
                document.getElementById(e.currentTarget.name + "_msg").style.display = "none";
                return false;
            }
        }
        document.getElementById(e.currentTarget.name + "_msg").style.display = "block";
        return false;
    }


    // INIT INPUTS 
    function initPathologies() {
        // 1. Pathologies
        let pathologyCheckBoxes = document.getElementsByName('cbox');
        this.c2.addEventListenerList(pathologyCheckBoxes, "click", (e) => { openModalWindow(e, pathologiesModalSetup) });
        this.c2.addEventListenerList(pathologyCheckBoxes, "change", (e) => { toggleMandatoryMsg(e) });

    }

    function initBirthday() {
        // 2. Birthday and age
        let birthdayInput = formForm.elements['birthday'];
        birthdayInput.onchange = (e) => {
            let date = new Date(e.currentTarget.value);
            if (!this.c2.yearIsHigher(date)) {
                _age = this.c2.calculate_age(new Date(e.currentTarget.value));
                document.getElementById("birthday_msg").style.display = "none";
            }
            else {
                openModalWindow(e, birthdayModalSetup);
                e.currentTarget.value = "";
                document.getElementById("birthday_msg").style.display = "block";
            }
        }
    }


    function initRadioButtons(name) {
        let input = formForm.elements[name];
        this.c2.addEventListenerList(input, "change", (e) => {
            switch (name) {
                case 'gender':
                    _gender = e.currentTarget.value; // male, female
                    break;
                case 'diabetes':
                    _diabetes = e.currentTarget.value; // t1, t2
                    break;
                case 'insulin':
                    _insulin = e.currentTarget.value; // ins1, ins2
                    break;
                case 'hemoglobin':
                    _hemoglobin = e.currentTarget.value; // hemo1, hemo2,...hemo6
                    break;
                case 'cholesterol':
                    _cholesterol = e.currentTarget.value; // cho1, cho2... cho5
                    break;
                default:
                    return "";
            }
        });
    }

    function setBodyMassField() {
        let input = formForm.elements['body_mass'];
        if (_weight !== "" && _height !== "") {
            let w = this.c2.cmToMeter(Number(_height));
            let imc = Number(_weight) / (Number(w) * Number(w));
            input.value = imc;
        }
        else {
            input.value = "";
        }
    }
    function initNumericField(name) {
        let input = formForm.elements[name];
        input.addEventListener("blur", (e) => {
            switch (name) {
                case 'years_diabetes':
                    _yearsDiabetes = e.currentTarget.value; // string 
                    break;
                case 'weight':
                    _weight = e.currentTarget.value; // string 
                    setBodyMassField();
                    break;
                case 'height':
                    _height = e.currentTarget.value; // string 
                    setBodyMassField();
                    break;
                case 'cigarettes':
                    _cigarettes = e.currentTarget.value; // string 
                    break;
                case 'cigars':
                    _cigars = e.currentTarget.value; // string 
                    break;
                case 'pipes':
                    _pipes = e.currentTarget.value; // string 
                    break;
                case 'wines':
                    _wines = e.currentTarget.value; // string 
                    break;
                case 'beers':
                    _beers = e.currentTarget.value; // string 
                    break;
                case 'spirits':
                    _spirits = e.currentTarget.value; // string 
                    break;
                case 'systolic':
                    _systolic = e.currentTarget.value; // string 
                    break;
                case 'diastolic':
                    _diastolic = e.currentTarget.value; // string 
                    break;
                default:
                    return "";

            }
        });
    }




    // MODAL WINDOW
    function initModalWindow() {
        closeModalSpan.onclick = function () {
            modalDiv.style.display = "none";
        }
    }

    function initForm() {
        setNumericField();
        initPathologies();
        initRadioButtons('gender');
        initRadioButtons('diabetes');
        initRadioButtons('insulin');
        initRadioButtons('hemoglobin');
        initRadioButtons('cholesterol');
        initBirthday();
        initNumericField("years_diabetes");
        initNumericField("weight");
        initNumericField("height");
        initNumericField("cigarettes");
        initNumericField("cigars");
        initNumericField("pipes");
        initNumericField("wines");
        initNumericField("beers");
        initNumericField("spirits");
        initNumericField("systolic");
        initNumericField("diastolic");
    }

    function initSubmit() {
        // submit
        formForm.onsubmit = (e) => {
            e.preventDefault();
            let numericFields = formForm.querySelectorAll('input[type="number"]');
            let pathologyFields = document.getElementsByName('cbox');
            let dateFields = formForm.querySelectorAll('input[type="date"]');
            let x = this.c2.defaultSeparation;
            checkNodeFields(pathologyFields);
            checkNodeFields(numericFields);
            checkNodeFields(dateFields);


            if (fieldsOn()) {

                let ok;
            } else {
                openModalWindow(e, fieldsOffModalSetup)
                return false;
            }
        }
    }


    let init = () => {
        initForm();
        initModalWindow();
        initSubmit();


    };

    init();



})(document, this.c2);