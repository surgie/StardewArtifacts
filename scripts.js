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
    constructor(save, objectInformation) {
        this.uniqueId = save.uniqueIDForThisGame;
        this.booksFound = save.lostBooksFound;
        this.daysPlayed = save.player.stats.DaysPlayed;
        this.currentSeason = save.currentSeason;

        this.locations = save.locations.GameLocation.filter(x => !!x.objects).map(x => new GameLocation(x));
        this.objectInformation = objectInformation;
    }

    get locationsWithArtifacts() {
        return this.locations.filter(location => location.hasArtifactSpots);
    }

    dig(locationName, xPos, yPos) {
        var objectIndex = -1;

        var rand = new CSRandom(xPos * 2000 + yPos + this.uniqueId / 2 + this.daysPlayed);

        for (var i = 0; i < this.objectInformation.length; i++) {
            var odds = this.objectInformation[i].OddsPerLocation[locationName];

            if (!odds) {
                continue;
            }

            if (rand.NextDouble() < odds) {
                objectIndex = this.objectInformation[i].ObjectId;
                break;
            }
        }

        if (rand.NextDouble() < 0.2 && locationName !== 'Farm') {
            objectIndex = 102;
        }

        if (objectIndex === 102 && this.booksFound >= 21) {
            objectIndex = 770;
        }

        if (objectIndex !== -1) {
            return objectIndex;
        } else if (this.currentSeason === 'winter' && rand.NextDouble() < 0.5 && locationName !== 'Desert') {
            if (rand.NextDouble() < 0.4) {
                return 416;
            } else {
                return 412;
            }
        } else {
            if (this.currentSeason === 'spring' && rand.NextDouble() < 1.0 / 16.0) {
                if (locationName !== 'Desert' && locationName !== 'Beach') {
                    // To determine amount of rice: random.Next(2, 6)
                    return 273;
                }
            }

            // TODO: continue from line 123 of Predictor.cs
        }
    }

    print() {
        this.locationsWithArtifacts.forEach(location => {
            location.print();
            location.artifactSpots.forEach(artifactSpot => artifactSpot.print());
            location.artifactSpots.forEach(artifactSpot => console.log('    ' + this.dig(location.name, artifactSpot.xPos, artifactSpot.yPos)));
        });
    }
}

function runPrediction(save, objectInformation) {
    const predictor = new Predictor(save, objectInformation);
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
            runPrediction(jsonObj.SaveGame, window.objectInformation);            
        }
    }

    reader.readAsText(file);
}


function initialize() {
    document.getElementById('savefile').addEventListener('change', readSaveFile, false);
}

initialize();
