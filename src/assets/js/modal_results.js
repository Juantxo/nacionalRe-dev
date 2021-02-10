
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = global || self, factory(global.c2 = global.c2 || {}));
}(this, function (exports) {
    'use strict';
    let self = document;

    let modal_result = self.getElementById("modal_result");
    let close_modal_result = self.getElementById("close_modal_result");



    let dictionary = [{ "key": "date", "value": "fecha" },
    { "key": "age", "value": "edad" },
    { "key": "gender", "value": "género" },
    { "key": "male", "value": "Hombre" },
    { "key": "female", "value": "Mujer" },
    { "key": "diabetes", "value": "diabetes" },
    { "key": "t1", "value": "tipo 1" },
    { "key": "t2", "value": "tipo 2" },
    { "key": "yearsDiabetes", "value": "años de tratamiento de diabetes" },
    { "key": "weigth", "value": "peso" },
    { "key": "height", "value": "pltura" },
    { "key": "imc", "value": "índice de masa muscular" },
    { "key": "cigarettes", "value": "cigarrillo" },
    { "key": "cigars", "value": "puro" },
    { "key": "pipes", "value": "pipa" },
    { "key": "wines", "value": "vino" },
    { "key": "beers", "value": "cerveza" },
    { "key": "spirits", "value": "licor" },
    { "key": "systolic", "value": "sistólica" },
    { "key": "diastolic", "value": "diastólica" },
    { "key": "insulin", "value": "insulina" },
    { "key": "ins1", "value": "Hasta 25 unidades diarias de insulina" },
    { "key": "ins2", "value": "Más de 25 unidades diarias de insulina" },
    { "key": "hemoglobin", "value": "hemoglobina" },
    { "key": "hem1", "value": "Menos de 7,0" },
    { "key": "hem2", "value": "De 7,0 a 7,5" },
    { "key": "hem3", "value": "De 7,6 a 8,0" },
    { "key": "hem4", "value": "De 8,1 a 9,0" },
    { "key": "hem5", "value": "De 9,1 a 10" },
    { "key": "hem6", "value": "Más de 10" },
    { "key": "cholesterol", "value": "colesterol" },
    { "key": "cho1", "value": "Hasta 200" },
    { "key": "cho2", "value": "De 200 a 250" },
    { "key": "cho3", "value": "De 251 a 275" },
    { "key": "cho4", "value": "De 276 a 300" },
    { "key": "cho5", "value": "Más de 300" }];



    let result_today = self.getElementById('result_today');
    let result_year = self.getElementById('result_year');
    let result_vars_constitution = self.getElementById('result_vars_constitution');
    let result_vars_medical = self.getElementById('result_vars_medical');
    let result_vars_drugs = self.getElementById('result_vars_drugs');
    let result_total_life = self.getElementById('result_total_life');
    let result_total_disability = self.getElementById('result_total_disability');
    let result_total_accident = self.getElementById('result_total_accident');
    let result_total_ilt = self.getElementById('result_total_ilt');
    let result_table_life = self.getElementById('result_table_life');
    let result_table_disability = self.getElementById('result_table_disability');
    let result_table_accident = self.getElementById('result_table_accident');
    let result_table_ilt = self.getElementById('result_table_ilt');


    // functions
    // MODAL WINDOW
    function initModalResults() {
        close_modal_result.onclick = function () {
            modal_result.style.display = "none";
        }
    }



    function getDictionaryWord(key) {
        return dictionary.filter(d => d.key === key);
    }

    function getYearsDiabetes(num) {
        if (+num > 1) {
            return num + ' años';
        }
        if (+num === 1) {
            return num + ' año';
        }
        return 'Sin años de antigüedad';
    }


    function getAlcohol(beers, wines, spirits) {
        let result = '';
        if (beers === 0 && wines === 0 && spirits === 0) {
            result += 'No consume alcohol';
            return result;
        } else {
            if (beers === 0 || beers > 1) {
                result += beers + ' cervezas + | ';
            }
            if (beers === 1) {
                result += '1 cerveza | ';
            }
            if (wines === 0 || wines > 1) {
                result += wines + ' vinos + | ';
            }
            if (wines === 1) {
                result += '1 vino | ';
            }
            if (spirits === 0 || spirits > 1) {
                result += spirits + ' licores';
            }
            if (spirits === 1) {
                result += '1 licor';
            }
        }
        return result;
    };

    function getTobacco(cigarettes, cigars, pipes) {
        let result = '';
        if (cigarettes === 0 && cigars === 0 && pipes === 0) {
            result += 'No consume tabaco';
            return result;
        } else {
            if (cigarettes === 0 || cigarettes > 1) {
                result += cigarettes + ' cigarrillos | ';
            }
            if (cigarettes === 1) {
                result += '1 cigarrillo | ';
            }

            if (cigars === 0 || cigars > 1) {
                result += cigars + ' puros | ';
            }
            if (cigars === 1) {
                result += '1 puro | ';
            }

            if (pipes === 0 || pipes > 1) {
                result += pipes + ' pipas';
            }
            if (pipes === 1) {
                result += pipes + ' pipa';
            }

        }
        return result;
    };

    function getPartialResult(number) {
        if (number >= 999) {
            return '<span class="red">Rechazar</span>';
        }
        if (number === 0) {
            return '<span class="green">Normal</span>';
        }
        if (number > 0) {
            return '<span class="red"> +' + number + '%</span>';
        }

    }


    function getTotalResult(data, key) {
        let result = data.diabetesByYears[key] + data.diabetesByAge[key] + data.imc[key] + data.tobacco + data.alcohol + data.hypertension + data.insulin + data.hemoglobin + data.cholesterol
        return getPartialResult(+result);
    }

    function getTableResult(data, key) {
        let table = '';
        table += '<table class="result-table" style="width:100%">';
        table += '<tr><th </th><th></th></tr>';
        table += '<tr>';
        table += '<td>Antigüedad diabetes</td>';
        table += ' <td>' + getPartialResult(data.diabetesByYears[key]) + '</td>';
        table += ' </tr>';

        table += '<tr>';
        table += '<td>Edad candidato</td>';
        table += ' <td>' + getPartialResult(data.diabetesByAge[key]) + '</td>';
        table += ' </tr>';

        table += '<tr>';
        table += '<td>IMC</td>';
        table += ' <td>' + getPartialResult(data.imc[key]) + '</td>';
        table += ' </tr>';

        table += '<tr>';
        table += '<td>Tabaco</td>';
        table += ' <td>' + getPartialResult(data.tobacco) + '</td>';
        table += ' </tr>';

        table += '<tr>';
        table += '<td>Alcohol</td>';
        table += ' <td>' + getPartialResult(data.alcohol) + '</td>';
        table += ' </tr>';

        table += '<tr>';
        table += '<td>Tensión</td>';
        table += ' <td>' + getPartialResult(data.hypertension) + '</td>';
        table += ' </tr>';

        table += '<tr>';
        table += '<td>Hemoglobina</td>';
        table += ' <td>' + getPartialResult(data.hemoglobin) + '</td>';
        table += ' </tr>';

        table += '<tr>';
        table += '<td>Insulina</td>';
        table += ' <td>' + getPartialResult(data.insulin) + '</td>';
        table += ' </tr>';

        table += '<tr>';
        table += '<td>Colesterol</td>';
        table += ' <td>' + getPartialResult(data.cholesterol) + '</td>';
        table += ' </tr>';
        table += '</table>';

        return table;

    }



    function openModalResults(event, _vars, $results) {
        event.stopPropagation();
        //let year = _vars.today.getFullYear();


        // vars
        let newDate = new Date(_vars.today);
        let year = newDate.getFullYear();
        let today = newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear() + ' a las ' + newDate.getUTCHours() + ':' + newDate.getUTCMinutes() + 'h.';
        let gender = getDictionaryWord(_vars.gender)[0].value;
        let bornDate = new Date(_vars.date);
        let date = bornDate.getDate() + '/' + (bornDate.getMonth() + 1) + '/' + bornDate.getFullYear() + '';
        let age = _vars.age + ' años';
        let height = _vars.height + ' cm';
        let weight = _vars.weight + ' kg';
        let imc = _vars.imc + ' imc';
        let diabetes = 'Diabetes ' + getDictionaryWord(_vars.diabetes)[0].value;
        let systolic = _vars.systolic + ' sistólica';
        let diastolic = _vars.diastolic + ' diastólica';
        let insulin = getDictionaryWord(_vars.insulin)[0].value;
        let hemoglobin = getDictionaryWord(_vars.hemoglobin)[0].value + ' hemoglobina';
        let cholesterol = getDictionaryWord(_vars.cholesterol)[0].value + ' colesterol';
        let alcohol = getAlcohol(parseInt(_vars.beers), parseInt(_vars.wines), parseInt(_vars.spirits));
        let tobacco = getTobacco(parseInt(_vars.cigarettes), parseInt(_vars.cigars), parseInt(_vars.pipes));


        let constitution = gender + ' | ' + date + ' | ' + age + ' | ' + height + ' | ' + weight + ' | ' + imc + ' | ';
        let medical = diabetes + ': ' + getYearsDiabetes(_vars.yearsDiabetes) + ' | ' + systolic + ' | ' + diastolic + ' | ' + insulin + ' | ' + hemoglobin + ' | ' + cholesterol;
        let drugs = alcohol + ' | ' + tobacco;
        let total_life = getTotalResult($results, 'life');
        let total_disability = getTotalResult($results, 'disability');
        let total_accident = getTotalResult($results, 'accident');
        let total_ilt = getTotalResult($results, 'ilt');
        let table_life = getTableResult($results, 'life');
        let table_disability = getTableResult($results, 'disability');
        let table_accident = getTableResult($results, 'accident');
        let table_ilt = getTableResult($results, 'ilt');


        // print
        result_today.innerHTML = today;
        result_year.innerHTML = year;
        result_vars_constitution.innerHTML = constitution;
        result_vars_medical.innerHTML = medical;
        result_vars_drugs.innerHTML = drugs;
        result_total_life.innerHTML = total_life;
        result_total_disability.innerHTML = total_disability;
        result_total_accident.innerHTML = total_accident;
        result_total_ilt.innerHTML = total_ilt;
        result_table_life.innerHTML = table_life;
        result_table_disability.innerHTML = table_disability;
        result_table_accident.innerHTML = table_accident;
        result_table_ilt.innerHTML = table_ilt;

        modal_result.style.display = "block";
    }



    exports.openModalResults = openModalResults;
    exports.initModalResults = initModalResults;





    Object.defineProperty(exports, '__esModule', { value: true });

}));