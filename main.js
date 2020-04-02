import { Predictor } from './predictor.js';

const parser = window.parser;

function runPrediction(save) {
    const archFound = save.player.archaeologyFound.item.map(x => x.key.int);

    const predictor = new Predictor(save);
    const predictions = predictor.getPredictions();

    const displayEl = document.getElementById('predictions');

    let items = '';
    Object.keys(predictions).forEach(key => {
        items += `<li>${key}<ul>`
        
        predictions[key].forEach(prediction => {
            if (prediction.isArtifact && !archFound.some(x => x === prediction.objectId)) {
                items += `<li><b>${prediction.name} (${prediction.quantity}) @ (${prediction.xPos}, ${prediction.yPos})</b></li>`;
            } else {
                items += `<li>${prediction.name} (${prediction.quantity}) @ (${prediction.xPos}, ${prediction.yPos})</li>`;
            }
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

            runPrediction(jsonObj.SaveGame);            
        }
    }

    reader.readAsText(file);
}


function initialize() {
    document.getElementById('savefile').addEventListener('change', readSaveFile, false);
}

initialize();
