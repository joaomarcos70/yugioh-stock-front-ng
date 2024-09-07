import { forOwn } from 'lodash'

export class Login {
    email: string = ''
    password: string = ''

    constructor(data?) {
        this.populate(data)
    }

    populate(data) {
        forOwn(data, (value, key) => {
            this[key] = value
        })
    }
}
