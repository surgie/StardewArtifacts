function runPrediction(save) {
    let query = (name) => $(save).find(name).text();
    let queryAsNumber = (name) => parseInt(query(name), 10);

    const uniqueId = queryAsNumber('uniqueIDForThisGame');
    const lostbooksFound = queryAsNumber('lostBooksFound');
    const daysPlayed = queryAsNumber('daysPlayed');
    const currentSeason = query('currentSeason');

    const predictions = document.getElementById('predictions');
    predictions.innerHTML = `
        <ul>
            <li>Unique Id ${uniqueId}</li>
            <li>Lost Books Found: ${lostbooksFound}</li>
            <li>Days Played: ${daysPlayed}</li>
            <li>Current Season: ${currentSeason}</li>
        </ul>
    `;
}

function readSaveFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        if (typeof e.target.result === 'string') {
            const xmlDoc = $.parseXML(e.target.result);
            runPrediction(xmlDoc);            
        }
    }

    reader.readAsText(file);
}


function initialize() {
    document.getElementById('savefile').addEventListener('change', readSaveFile, false);
}

initialize();
