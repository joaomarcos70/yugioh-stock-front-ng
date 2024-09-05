import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { AttributeCard } from '../shared/enums/attributeCard.enum'

export interface IFilter {
    descCard: string
    typeCard: string
    cardCategorie: string
    cardRace: string
    attribute: AttributeCard
}

@Injectable({
    providedIn: 'root'
})
export class FilterContext {
    private _filter: BehaviorSubject<IFilter> = new BehaviorSubject<IFilter>(null)

    setFilter(filter: IFilter) {
        this._filter.next(filter)
    }

    getFilter(): IFilter {
        return this._filter.value
    }
}
