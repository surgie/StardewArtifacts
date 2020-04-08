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
            let output = prediction.quantity > 1 ?
                `${prediction.name} (${prediction.quantity}) @ (${prediction.xPos}, ${prediction.yPos})` :
                `${prediction.name} @ (${prediction.xPos}, ${prediction.yPos})`;            

            if (prediction.isArtifact && !archFound.some(x => x === prediction.objectId)) {
                output = `<b>${output}</b>`;
            } 
                
            items += `<li>${output}</li>`;
        })

        items += `</ul></li>`;
    });

    displayEl.innerHTML = '<ul>' + items + '</ul>';

    // Display Current Day
    const dateEl = document.getElementById('date');
    dateEl.innerText = `${save.currentSeason} ${save.dayOfMonth}, Year ${save.year}`   
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
