import { CSRandom } from './cs-random.js';
import { GameLocation, PredictionResult } from './models.js';
import { objectInformation } from './data/objectInformation.js';
import { secondHalfOfDigging } from './data/locations.js';

export class Predictor {
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
        var objectIndex = new PredictionResult(-1, 1, xPos, yPos);

        var rand = new CSRandom(xPos * 2000 + yPos + this.uniqueId / 2 + this.daysPlayed);

        for (var i = 0; i < objectInformation.length; i++) {
            var odds = objectInformation[i].OddsPerLocation[locationName];

            if (!odds) {
                continue;
            }

            if (rand.NextDouble() < odds) {
                objectIndex.objectId = objectInformation[i].ObjectId;
                break;
            }
        }

        if (rand.NextDouble() < 0.2 && locationName !== 'Farm') {
            objectIndex.objectId = 102;
        }

        if (objectIndex.objectId === 102 && this.booksFound >= 21) {
            objectIndex.objectId = 770;
        }

        if (objectIndex.objectId !== -1) {
            return objectIndex;
        } else if (this.currentSeason === 'winter' && rand.NextDouble() < 0.5 && locationName !== 'Desert') {
            if (rand.NextDouble() < 0.4) {
                return new PredictionResult(416, 1, xPos, yPos);
            } else {
                return new PredictionResult(412, 1, xPos, yPos);
            }
        } else {
            if (this.currentSeason === 'spring' && rand.NextDouble() < 1.0 / 16.0) {
                if (locationName !== 'Desert' && locationName !== 'Beach') {
                    return new PredictionResult(273, rand.Next(2, 6), xPos, yPos);
                }
            }

            objectIndex = secondHalfOfDigging(locationName, rand, this.booksFound, xPos, yPos);

            if (objectIndex.objectId === -1) {
                objectIndex.objectId = 330;
            }

            return objectIndex;
        }
    }

    getPredictions() {
        var predictions = {};

        this.locationsWithArtifacts.forEach(location => {
            predictions[location.name] = [];

            location.artifactSpots.forEach(as => {
                const prediction = this.dig(location.name, as.xPos, as.yPos);
                predictions[location.name].push(prediction);
            });
        });

        return predictions;
    }

    print() {
        this.locationsWithArtifacts.forEach(location => {
            location.artifactSpots.forEach(as => {
                const prediction = this.dig(location.name, as.xPos, as.yPos);
                console.log(`    digging at ${location.name} ${as.xPos} ${as.yPos} - expecting ${prediction.object.DisplayName} (${prediction.quantity})`);
            })
        });
    }
}