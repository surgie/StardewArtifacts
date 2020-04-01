import { CSRandom } from './cs-random.js';
import { GameLocation } from './models.js';
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
        var objectIndex = -1;

        var rand = new CSRandom(xPos * 2000 + yPos + this.uniqueId / 2 + this.daysPlayed);

        for (var i = 0; i < objectInformation.length; i++) {
            var odds = objectInformation[i].OddsPerLocation[locationName];

            if (!odds) {
                continue;
            }

            if (rand.NextDouble() < odds) {
                objectIndex = objectInformation[i].ObjectId;
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

            objectIndex = secondHalfOfDigging(locationName, rand, this.booksFound);

            if (objectIndex === -1) {
                objectIndex = 330;
            }

            return objectIndex;
        }
    }

    print() {
        this.locationsWithArtifacts.forEach(location => {
            location.artifactSpots.forEach(as => {
                const objectIndex = this.dig(location.name, as.xPos, as.yPos);
                const object = objectInformation.find(x => x.ObjectId === objectIndex);
                console.log(`    digging at ${location.name} ${as.xPos} ${as.yPos} - expecting ${object.DisplayName}`);
            })
        });
    }
}