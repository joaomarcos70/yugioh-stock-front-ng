import { forOwn } from 'lodash'

export class Card {
    id: number;
    name: String;
    type: String;
    desc: String;
    atk: number;
    def: number;
    level: number;
    race: String;
    attribute: String;
    card_images: any[];

    constructor(data?) {
        this.populate(data);
    }

    populate(data) {
        forOwn(data, (value, key) => {
            this[key] = value;
        });
    }
}
