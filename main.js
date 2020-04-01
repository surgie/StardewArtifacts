import { Predictor } from './predictor.js';

const parser = window.parser;

function runPrediction(save) {
    const predictor = new Predictor(save);
    const predictions = predictor.getPredictions();
    console.log(predictions);

    const displayEl = document.getElementById('predictions');

    let items = '';
    Object.keys(predictions).forEach(key => {
        items += `<li>${key}<ul>`
        
        predictions[key].forEach(prediction => {
            items += `<li>${prediction.name} (${prediction.quantity}) @ (${prediction.xPos}, ${prediction.yPos})`;
        })

        items += `</ul></li>`;
    });

    displayEl.innerHTML = '<ul>' + items + '</ul>';
    
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
