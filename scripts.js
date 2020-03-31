function runPrediction(save) {
    let query = (name) => $(save).children('SaveGame').children(name)[0].text();
    let queryAsNumber = (name) => parseInt(query(name), 10);

    // TODO bah this is bad, redo it again?
    // changge to fastXmlParser? https://www.npmjs.com/package/fast-xml-parser
    // https://cdnjs.com/libraries/fast-xml-parser
    // can then drop jquery?

    // https://github.com/NaturalIntelligence/fast-xml-parser#readme (XML to JSON)
    // var result = parser.validate(xmlData);
    // if (result !== true) console.log(result.err);
    // var jsonObj = parser.parse(xmlData);

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
