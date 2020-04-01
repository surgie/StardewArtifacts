export { FarmObject, GameLocation, PredictionResult }
import { objectInformation } from './data/objectInformation.js';

class PredictionResult {
    constructor(objectId, quantity) {
        this.objectId = objectId;
        this.quantity = quantity;
    }

    get object() {
        return objectInformation.find(x => x.ObjectId === this.objectId);
    }
}

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
