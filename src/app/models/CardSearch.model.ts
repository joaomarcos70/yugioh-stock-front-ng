import {forOwn} from "lodash"
import { Card } from "./Card.model";

export class cardSearch{
    skip: number = 0;
    totalItems: number = 0;
    limit: number = 10;

    data:Card[]

    constructor(data?) {
        this.populate(data);
    }
    
    populate(data) {
        forOwn(data, (value, key) => {
            this[key] = value;
        });
    }
}
