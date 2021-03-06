((window, c2) => {


    let formForm = document.forms["diabetes_form"];
    let diabetes_cal = document.getElementById('diabetes_cal');

    let numericFields = formForm.querySelectorAll('input[type="number"]');
    let genderField = formForm.elements['gender'];
    let pathologyFields = document.getElementsByName('cbox');
    let dateFields = formForm.querySelectorAll('input[type="date"]');
    let body_mass = formForm.elements['body_mass'];



    let pathologiesModalSetup = {
        header: "Patología excluyente",
        content: "Esta patología no permite asegurar ningún riesgo.",
        action: "",
        footer: "© NacionalRe. Todos los derechos reservados."
    }

    let birthdayModalSetup = {
        header: "Fecha incorrecta",
        content: "La fecha seleccionada no puede ser mayor que la fecha actual.",
        action: "Por favor, escoga una fecha de nuevo",
        footer: "© NacionalRe. Todos los derechos reservados."
    }

    let modalSetup = {
        header: "Atención",
        content: "",
        action: "",
        footer: "© NacionalRe. Todos los derechos reservados."
    }


    const dateRange = [13, 69];
    const minHeight = 120;
    const minWeight = 32;
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const systolicRange = [65, 145];
    const diastolicRange = [45, 95];



    let dateRangeModalSetup = {
        header: "Atención: Fecha fuera de rango",
        content: "Por favor, escoga una fecha en el rango (entre " + dateRange[0] + " y " + dateRange[1] + " años de edad).",
        action: "La fecha seleccionada debe estar entre el " + this.c2.subtractYearsToDate(new Date(), dateRange[1]).toLocaleDateString('es-ES', dateOptions) + " y el " + this.c2.subtractYearsToDate(new Date(), dateRange[0]).toLocaleDateString('es-ES', dateOptions) + ".",
        footer: "© NacionalRe"
    }

    let fieldsOffModalSetup = {
        header: "Atención:",
        content: "Por favor, rellene correctamente los campos con mensajes en rojo.",
        action: "Existen campos erróneos o sin rellenar.",
        footer: "© NacionalRe"
    }

    // global results
    let _today = new Date();
    let _age = '';
    let _date = formForm.elements['birthday'].value;
    let _gender = formForm.elements['gender'].value;
    let _diabetes = formForm.elements['diabetes'].value;
    let _yearsDiabetes = formForm.elements['years_diabetes'].value;
    let _weight = formForm.elements['weight'].value;
    let _height = formForm.elements['height'].value;
    let _imc = formForm.elements['body_mass'].value;
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
    let _vars = {};


    let $result = {
        diabetesByYears: {
            life: 0,
            disability: 0,
            accident: 0,
            ilt: 0
        },
        diabetesByAge: {
            life: 0,
            disability: 0,
            accident: 0,
            ilt: 0
        },
        imc: {
            life: 0,
            disability: 0,
            accident: 0,
            ilt: 0
        },
        tobacco: 0,
        alcohol: 0,
        hypertension: 0,
        insulin: 0,
        hemoglobin: 0,
        cholesterol: 0
    };

    function getVars() {
        return {
            date: _date,
            age: _age,
            gender: _gender,
            diabetes: _diabetes,
            yearsDiabetes: _yearsDiabetes,
            weight: _weight,
            height: _height,
            imc: _imc,
            cigarettes: _cigarettes,
            cigars: _cigars,
            pipes: _pipes,
            wines: _wines,
            beers: _beers,
            spirits: _spirits,
            systolic: _systolic,
            diastolic: _diastolic,
            insulin: _insulin,
            hemoglobin: _hemoglobin,
            cholesterol: _cholesterol,
            today: _today
        }
    }



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

    function resetNodeFields(nodeList) {

        let i = 0;
        for (i = 0; i < nodeList.length; i++) {
            document.getElementById(nodeList[i].name + "_msg").style.display = "none";
        }


    }
    function checkNodeFields(nodeList) {
        let i = 0;
        for (i = 0; i < nodeList.length; i++) {
            if (nodeList[i].type === "checkbox" && nodeList[i].checked) {
                document.getElementById(nodeList[i].name + "_msg").style.display = "block";
            }

            if (nodeList[i].type === "radio" && nodeList.value === "") {
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
        this.c2.addEventListenerList(fields, "keypress", (e) => {
            this.c2.isNumberKey(e)
            this.c2.limitChars(e)
        });
        this.c2.addEventListenerList(fields, "paste", (e) => { e.preventDefault(); return false; });
        this.c2.addEventListenerList(fields, "drop", (e) => { e.preventDefault(); return false; });
        this.c2.addEventListenerList(fields, "change", (e) => { toggleMandatoryMsg(e) });
    }

    function toggleMandatoryMsg(e) {
        if ((e.currentTarget.type === 'date' || e.currentTarget.type === "number" || e.currentTarget.type === 'radio') && e.currentTarget.value !== "") {
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
        this.c2.addEventListenerList(pathologyCheckBoxes, "click", (e) => {

            this.c2.openModalWindow(e, pathologiesModalSetup)
        });
        this.c2.addEventListenerList(pathologyCheckBoxes, "change", (e) => {

            toggleMandatoryMsg(e)
        });

    }


    function initBirthday() {
        // 2. Birthday and age
        let birthdayInput = formForm.elements['birthday'];
        birthdayInput.onblur = (e) => {
            _date = new Date(e.currentTarget.value);
            if (!this.c2.dateIsHigher(_date)) {
                if (this.c2.dateIsOnRange(dateRange, _date)) {
                    _age = this.c2.calculate_age(new Date(e.currentTarget.value));
                    document.getElementById("birthday_msg").style.display = "none";
                } else {
                    this.c2.openModalWindow(e, dateRangeModalSetup);
                    e.currentTarget.value = "";
                    document.getElementById("birthday_msg").style.display = "block";
                }
            }
            else {
                this.c2.openModalWindow(e, birthdayModalSetup);
                e.currentTarget.value = "";
                document.getElementById("birthday_msg").style.display = "block";
            }
        }
    }


    function initRadioButtons(name) {
        let input = formForm.elements[name];
        this.c2.addEventListenerList(input, "change", (e) => {
            toggleMandatoryMsg(e);
            switch (name) {
                case 'gender':
                    _gender = e.currentTarget.value; // male, female
                    break;
                case 'diabetes':
                    _diabetes = e.currentTarget.value; // t1, t2
                    // to move and delete from here
                    $result.diabetesByAge = this.c2.calcDiabetesByAge(_diabetes, Number(_age));


                    break;
                case 'insulin':
                    _insulin = e.currentTarget.value; // ins1, ins2
                    $result.insulin = this.c2.calcInsulin(_insulin);
                    let x;

                    break;
                case 'hemoglobin':
                    _hemoglobin = e.currentTarget.value; // hemo1, hemo2,...hemo6
                    // to move
                    $result.hemoglobin = this.c2.calcHemoglobin(_hemoglobin);
                    let y;
                    break;
                case 'cholesterol':
                    _cholesterol = e.currentTarget.value; // cho1, cho2... cho5
                    // to move

                    $result.cholesterol = this.c2.calcCholesterol(_cholesterol);
                    let w;
                    break;
                default:
                    return "";
            }

        });
    }



    function setBodyMassField() {

        if (_weight !== "" && _height !== "") {
            let w = this.c2.cmToMeter(Number(_height));
            _imc = (Number(_weight) / (Number(w) * Number(w))).toFixed(2);
            body_mass.value = _imc;
            this.c2.setImcColor(body_mass, _imc);
            // to move
            $result.imc = this.c2.calcImc(_imc, Number(_age));


        }
        else {
            body_mass.value = '';


        }
    }
    function initNumericField(name) {
        let input = formForm.elements[name];
        let parser;
        input.addEventListener("blur", (e) => {
            switch (name) {
                case 'years_diabetes':
                    _yearsDiabetes = e.currentTarget.value; // string 
                    // to move
                    $result.diabetesByYears = this.c2.calcDiabetesByYears(_diabetes, Number(_yearsDiabetes));
                    break;
                case 'weight':

                    _weight = e.currentTarget.value; // string 
                    parser = !!parseInt(_weight) ? parseInt(_weight) : 0;
                    if (parser <= minWeight) {
                        modalSetup.content = 'El peso introducido es muy bajo. Debe introducir un peso mayor de ' + minWeight + ' kilos.';
                        modalSetup.action = "Por favor, asegúrese de que la cifra es correcta."

                        if (_weight !== '') {
                            this.c2.openModalWindow(e, modalSetup);

                        }
                        _weight = '';
                        e.currentTarget.value = '';
                        body_mass.value = '';


                    } else {
                        if (_weight !== '' && _height !== '') {
                            setBodyMassField();
                        }

                    }

                    break;
                case 'height':
                    _height = e.currentTarget.value; // string d
                    parser = !!parseInt(_height) ? parseInt(_height) : 0;
                    if (parser <= minHeight) {
                        modalSetup.content = 'La altura introducida es muy baja. Debe introducir una altura mayor de ' + minHeight + ' centímetros.';
                        modalSetup.action = "Por favor, asegúrese de que la cifra es correcta."
                        _height = '';
                        e.currentTarget.value = '';
                        body_mass.value = '';
                        this.c2.openModalWindow(e, modalSetup);

                    } else {
                        if (_weight !== '' && _height !== '') {
                            setBodyMassField();
                        }
                    }

                    break;
                case 'cigarettes':
                    _cigarettes = e.currentTarget.value; // string 
                    break;
                case 'cigars':
                    _cigars = e.currentTarget.value; // string 
                    break;
                case 'pipes':
                    _pipes = e.currentTarget.value; // string 
                    // to move
                    $result.tobacco = this.c2.calcTobacco(Number(_cigarettes), Number(_cigars), Number(_pipes));

                    break;
                case 'wines':
                    _wines = e.currentTarget.value; // string 
                    break;
                case 'beers':
                    _beers = e.currentTarget.value; // string 
                    break;
                case 'spirits':
                    _spirits = e.currentTarget.value; // string
                    $result.alcohol = this.c2.calcAlcohol(Number(_wines), Number(_beers), Number(_spirits));

                    break;
                case 'systolic':


                    _systolic = e.currentTarget.value; // string 
                    if (parseInt(_systolic) > systolicRange[1]) {
                        modalSetup.content = 'La tensión sistólica es muy alta para asegurar el riesgo.';
                        modalSetup.action = "Por favor, asegúrese de que la cifra es correcta."
                        this.c2.openModalWindow(e, modalSetup);
                    }
                    if (parseInt(_systolic) < systolicRange[0]) {
                        modalSetup.content = 'La tensión sistólica es muy baja para asegurar el riesgo.';
                        modalSetup.action = "Por favor, asegúrese de que la cifra es correcta."
                        this.c2.openModalWindow(e, modalSetup);
                    }
                    this.c2.setSystolicColors(formForm.elements['systolic'], _systolic);
                    break;
                case 'diastolic':
                    _diastolic = e.currentTarget.value; // string 
                    if (parseInt(_diastolic) > diastolicRange[1]) {
                        modalSetup.content = 'La tensión diastólica es muy alta para asegurar el riesgo.';
                        modalSetup.action = "Por favor, asegúrese de que la cifra es correcta."
                        this.c2.openModalWindow(e, modalSetup);
                    }
                    if (parseInt(_diastolic) < diastolicRange[0]) {
                        modalSetup.content = 'La tensión diastólica es muy baja para asegurar el riesgo.';
                        modalSetup.action = "Por favor, asegúrese de que la cifra es correcta."
                        this.c2.openModalWindow(e, modalSetup);
                    }
                    this.c2.setDiastolicColors(formForm.elements['diastolic'], _diastolic);
                    // to move
                    $result.hypertension = this.c2.calcHypertension(Number(_systolic), Number(_diastolic));
                    let x;
                    break;
                default:
                    return "";

            }



        });
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

    function openResultContainer() {
        //resultContainer.classList.remove("hidden");

    }
    function initSubmit() {

        // submit
        formForm.onsubmit = (e) => {
            e.preventDefault();
            checkNodeFields(pathologyFields);
            checkNodeFields(formForm.elements['gender']);
            checkNodeFields(formForm.elements['diabetes']);
            checkNodeFields(formForm.elements['insulin']);
            checkNodeFields(formForm.elements['hemoglobin']);
            checkNodeFields(formForm.elements['cholesterol']);
            checkNodeFields(numericFields);
            checkNodeFields(dateFields);


            if (fieldsOn()) {

                // results
                $result.diabetesByYears = this.c2.calcDiabetesByYears(_diabetes, Number(_yearsDiabetes));
                $result.diabetesByAge = this.c2.calcDiabetesByAge(_diabetes, Number(_age));
                $result.imc = this.c2.calcImc(_imc, Number(_age));
                $result.tobacco = this.c2.calcTobacco(Number(_cigarettes), Number(_cigars), Number(_pipes));
                $result.alcohol = this.c2.calcAlcohol(Number(_wines), Number(_beers), Number(_spirits));
                $result.hypertension = this.c2.calcHypertension(Number(_systolic), Number(_diastolic));
                $result.insulin = this.c2.calcInsulin(parseInt(_insulin));
                $result.hemoglobin = this.c2.calcHemoglobin(_hemoglobin);
                $result.cholesterol = this.c2.calcCholesterol(_cholesterol);

                _vars = getVars();

                // OPEN results

                this.c2.openModalResults(e, _vars, $result);

                // we are here: THE CALCULATIONS

                let ok;
            } else {
                this.c2.openModalWindow(e, fieldsOffModalSetup)
                return false;
            }
        }
    }

    function initReset() {

        // submit
        formForm.onreset = (e) => {
            resetNodeFields(pathologyFields);
            resetNodeFields(formForm.elements['gender']);
            resetNodeFields(formForm.elements['diabetes']);
            resetNodeFields(formForm.elements['insulin']);
            resetNodeFields(formForm.elements['hemoglobin']);
            resetNodeFields(formForm.elements['cholesterol']);
            resetNodeFields(numericFields);
            resetNodeFields(dateFields);
        }
    }
    function disableEnter() {

        diabetes_cal.addEventListener('keydown', (e) => {
            if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13 || e.code == 'Enter' || e.which == 13) {
                if (e.target.nodeName == 'INPUT') {
                    e.preventDefault();
                    let form = e.target.form;
                    let index = Array.prototype.indexOf.call(form, e.target);
                    if (index < 37) {
                        form.elements[index + 1].focus();
                    }
                    return false;
                }
            }
        },
            true);
    }


    let init = () => {
        initForm();
        this.c2.initModalWindow();
        this.c2.initModalResults();
        initSubmit();
        initReset();
        disableEnter();



    };

    init();



})(document, this.c2);