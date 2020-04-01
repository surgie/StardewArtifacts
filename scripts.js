class FarmObject {
    constructor(object) {
        this.location = location;
        this.xPos = object.key.Vector2.X;
        this.yPos = object.key.Vector2.Y;

        this.name = object.value.Object.name;
        this.category = object.value.Object.category;
        this.type = object.value.Object.type;
        this.parentSheetIndex = object.value.Object.parentSheetIndex;
    }

    get isArtifactSpot() {
        return this.name === 'Artifact Spot';
    }

    print() {
        console.log(`    ${this.name} ${this.xPos} ${this.yPos}`);
    }
}

class GameLocation {
    constructor(location) {
        this.name = location.name;

        let objects = Array.isArray(location.objects.item) ? location.objects.item : [location.objects.item];
        this.objects = objects.map(x => new FarmObject(x));
    }    

    get artifactSpots() {
        return this.objects.filter(x => x.isArtifactSpot);
    }

    get hasArtifactSpots() {
        return this.artifactSpots.length > 0;
    }

    print() {
        console.log(`-- ${this.name} --`);
    }
}

class Predictor {
    constructor(save) {
        this.uniqueId = save.uniqueIDForThisGame;
        this.booksFound = save.lostBooksFound;
        this.daysPlayed = save.player.stats.DaysPlayed;
        this.currentSeason = save.currentSeason;

        this.locations = save.locations.GameLocation.filter(x => !!x.objects).map(x => new GameLocation(x));
    }

    get locationsWithArtifacts() {
        return this.locations.filter(location => location.hasArtifactSpots);
    }

    dig(locationName, xPos, yPos) {

    }

    print() {
        this.locationsWithArtifacts.forEach(location => {
            location.print();
            location.artifactSpots.forEach(artifactSpot => artifactSpot.print());
        });
    }
}

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
            runPrediction(jsonObj.SaveGame);            
        }
    }

    reader.readAsText(file);
}


function initialize() {
    document.getElementById('savefile').addEventListener('change', readSaveFile, false);
}

initialize();
