import { objectInformation } from './objectInformation.js';

const rawLocationData = {
    "Farm": "-1/-1/-1/-1/-1/-1/-1/-1/382 .05 770 .1 390 .25 330 1",
    "UndergroundMine": "-1/-1/-1/-1/153 -1 156 -1 157 -1/153 -1 156 -1 157 -1/153 -1 156 -1 157 -1/153 -1 156 -1 157 -1/107 .01",
    "Desert": "88 .5 90 .5/88 .5 90 .5/88 .5 90 .5/88 .5 90 .5/153 -1 164 -1 165 -1/153 -1 164 -1 165 -1/153 -1 164 -1 165 -1/153 -1 164 -1 165 -1/390 .25 330 1",
    "BusStop": "18 .9 20 .4 22 .7/396 .4 398 .4 402 .7/406 .6 408 .4/414 .33 418 .6 283 .5/-1/-1/-1/-1/584 .08 378 .15 102 .15 390 .25 330 1",
    "Forest": "16 .9 22 .9/396 .6 402 .9/404 .9 410 .9/418 .9 414 .9 283 .5/153 -1 145 0 143 0 137 1 132 0 706 0 702 0/153 -1 145 0 144 -1 138 0 132 0 706 0 704 0 702 0/143 0 153 -1 140 -1 139 0 137 1 132 0 706 0 702 0 699 0 269 1/699 0 143 0 153 -1 144 -1 141 -1 140 -1 132 0 707 0 702 0 269 1/378 .08 579 .1 588 .1 102 .15 390 .25 330 1",
    "Town": "18 .9/402 .9/410 .6/418 .7 414 .1 283 .5/137 -1 132 -1 143 -1 145 -1 153 -1 706 -1/138 -1 132 -1 144 -1 145 -1 153 -1 706 -1/139 -1 137 -1 132 -1 140 -1 143 -1 153 -1 706 -1 699 -1/132 -1 140 -1 141 -1 143 -1 144 -1 153 -1 707 -1 699 -1/378 .2 110 .2 583 .1 102 .2 390 .25 330 1",
    "Mountain": "20 .7 16 .5/396 .5 398 .8/404 .4 406 .4 408 .9/414 .85 418 .9 283 .5/136 -1 142 -1 153 -1 702 -1 700 -1/136 -1 142 -1 153 -1 138 -1 702 -1 700 -1 698 -1/136 -1 140 -1 142 -1 153 -1 702 -1 700 -1 269 -1/136 -1 140 -1 141 -1 153 -1 707 -1 702 -1 700 -1 698 -1 269 -1/382 .06 581 .1 378 .1 102 .15 390 .25 330 1",
    "Backwoods": "20 .7 16 .5/396 .5 398 .8/404 .4 406 .4 408 .9/414 .25 418 .4 283 .5/136 -1 142 -1 153 -1 702 -1 700 -1 163 -1/136 -1 142 -1 153 -1 138 -1 702 -1 700 -1 698 -1/136 -1 140 -1 142 -1 153 -1 702 -1 700 -1/136 -1 140 -1 141 -1 153 -1 707 -1 702 -1 700 -1 698 -1/382 .06 582 .1 378 .1 102 .15 390 .25 330 1",
    "Railroad": "18 .9 20 .4 22 .7/396 .4 398 .4 402 .7/406 .6 408 .4 410 .6/414 .8 418 .8/-1/-1/-1/-1/580 .1 378 .15 102 .19 390 .25 330 1",
    "Beach": "372 .9 718 .1 719 .3 723 .3/372 .9 394 .5 718 .1 719 .3 723 .3/372 .9 718 .1 719 .3 723 .3/372 .4 392 .8 718 .05 719 .2 723 .2/129 -1 131 -1 147 -1 148 -1 152 -1 708 -1 267 -1/128 -1 130 -1 146 -1 149 -1 150 -1 152 -1 155 -1 708 -1 701 -1 267 -1/129 -1 131 -1 148 -1 150 -1 152 -1 154 -1 155 -1 705 -1 701 -1/708 -1 130 -1 131 -1 146 -1 147 -1 150 -1 151 -1 152 -1 154 -1 705 -1/384 .08 589 .09 102 .15 390 .25 330 1",
    "Woods": "257 .5 404 .25 16 .8/259 .9 420 .25/281 .5 404 .6 420 .2/283 .9/734 -1 142 -1 143 -1/734 -1 142 -1 143 -1/734 -1 142 -1 143 -1/734 -1 142 -1 143 -1/390 .25 330 1",
    "Sewer": "-1/-1/-1/-1/142 -1 153 -1 157 -1/142 -1 153 -1 157 -1/142 -1 153 -1 157 -1/142 -1 153 -1 157 -1/-1",
    "BugLand": "-1/-1/-1/-1/796 -1 142 -1 153 -1 157 -1/796 -1 142 -1 153 -1 157 -1/796 -1 142 -1 153 -1 157 -1/796 -1 142 -1 153 -1 157 -1/-1",
    "WitchSwamp": "-1/-1/-1/-1/795 -1 153 -1 143 -1 157 -1/795 -1 153 -1 143 -1 157 -1/795 -1 153 -1 143 -1 157 -1/795 -1 153 -1 143 -1 157 -1/-1",
    "fishingGame": "-1/-1/-1/-1/153 -1 145 -1 143 -1 137 -1 132 -1 706 -1 702 -1/153 -1 145 -1 143 -1 137 -1 132 -1 706 -1 702 -1/153 -1 145 -1 143 -1 137 -1 132 -1 706 -1 702 -1/153 -1 145 -1 143 -1 137 -1 132 -1 706 -1 702 -1/378 .08 390 .25 330 1",
    "Temp": "16 .9 22 .9/396 .6/404 .9 410 .9/418 .5 414 .2/153 -1 145 -1 143 -1 137 -1 132 -1 706 -1 702 -1/153 -1 145 -1 143 -1 137 -1 132 -1 706 -1 702 -1/153 -1 145 -1 143 -1 137 -1 132 -1 706 -1 702 -1/153 -1 145 -1 143 -1 137 -1 132 -1 706 -1 702 -1/378 .08 390 .25 330 1"
};

export function secondHalfOfDigging(name, random, lostBooksFound) {
    if (!rawLocationData.hasOwnProperty(name)) {
        return -1;
    }

    const strArray = rawLocationData[name].split('/')[8].split(' ');

    if (strArray.length === 0  || strArray[0] === '-1') {
        return -1;
    }

    for (var index1 = 0; index1 < strArray.length; index1 += 2)
    {
        if (random.NextDouble() < parseFloat(strArray[index1 + 1]))
        {

            var index2 = parseInt(strArray[index1], 10);
            var object = objectInformation.find(x => x.ObjectId === index2);

            if (object.Type === 'Arch' || index2 === 102) {
                if (index2 === 102 && lostBooksFound >= 21) {
                    index2 = 770;
                }
                return index2;
            }
        }
    }

    return -1;
}


