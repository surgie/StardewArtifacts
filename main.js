import { Predictor } from './predictor.js';

const parser = window.parser;

function runPrediction(save) {
    const predictor = new Predictor(save);
    predictor.print();

    const predictions = document.getElementById('predictions');
    predictions.innerHTML = `put predictions here`;
}

function readSaveFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        if (typeof e.target.result === 'string') {
            var result = parser.validate(e.target.result);
            if (result !== true) console.log(result.err);
            var jsonObj = parser.parse(e.target.result);

            console.log(jsonObj);

            runPrediction(jsonObj.SaveGame);            
        }
    }

    reader.readAsText(file);
}


function initialize() {
    document.getElementById('savefile').addEventListener('change', readSaveFile, false);
}

initialize();
