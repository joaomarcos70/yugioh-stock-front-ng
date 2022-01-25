import {forOwn} from 'lodash'
import { RarityCard } from '../shared/enums/rarityCard.enum';

export class cardInfo{

rarity: RarityCard

    constructor(data?) {
        this.populate(data);
    }

    populate(data) {
        forOwn(data, (value, key) => {
            this[key] = value;
        });
    }

}
