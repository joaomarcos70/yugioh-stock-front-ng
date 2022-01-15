import {forOwn} from 'lodash'

export class Login {
    email: String = '';
    password: String = '';

    constructor(data?) {
        this.populate(data);
    }
    
    populate(data) {
        forOwn(data, (value, key) => {
            this[key] = value;
        });
    }
}

