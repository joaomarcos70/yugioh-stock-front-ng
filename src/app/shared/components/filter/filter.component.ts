import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { commonHelper } from '../../helpers/commonHelper'
import {
    cardCategories,
    cardLevels,
    racesOfMonster,
    racesOfSpell,
    racesOfTrap,
    typeCards
} from '../../helpers/card-attributes'
import { FilterContext } from 'src/app/services/filter.context'

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    @Output() dismissData: EventEmitter<any> = new EventEmitter()
    @Output() filteredData: EventEmitter<any> = new EventEmitter()
    filterCardsFb: FormGroup
    commonHelper = new commonHelper()
    typeCards = typeCards
    attributes = this.commonHelper.getAllCardAttribute()
    cardCategories = cardCategories
    cardRaces: { id: number; name: string; value: string }[] = []
    monsterRaces = racesOfMonster
    spellRaces = racesOfSpell
    trapRaces = racesOfTrap
    cardLevels = cardLevels

    constructor(private fb: FormBuilder, private filterContext: FilterContext) {}

    ngOnInit() {
        this.createFormBuilder()
        if (this.filterContext.getFilter()) {
            this.populateFormBuilder()
        }
        document.body.style.overflow = 'hidden'
    }

    createFormBuilder() {
        this.filterCardsFb = this.fb.group({
            descCard: [''],
            typeCard: [''],
            cardCategorie: [''],
            cardRace: [{ value: '', disabled: true }],
            attribute: [''],
            level: ['']
        })
    }

    populateFormBuilder() {
        this.filterCardsFb.patchValue({
            descCard: this.filterContext.getFilter().descCard,
            typeCard: this.filterContext.getFilter().typeCard,
            cardCategorie: this.filterContext.getFilter().cardCategorie,
            cardRace: this.filterContext.getFilter().cardRace,
            attribute: this.filterContext.getFilter().attribute,
            level: this.filterContext.getFilter().level
        })
        this.onCategoryChange()
    }

    onCategoryChange() {
        const cardCategorie = this.filterCardsFb.controls.cardCategorie.value
        if (cardCategorie.includes('Monster')) {
            this.cardRaces = this.monsterRaces
            this.filterCardsFb.get('cardRace').enable()
            return
        }

        if (cardCategorie.includes('Spell')) {
            this.cardRaces = this.spellRaces
            this.filterCardsFb.get('cardRace').enable()
            return
        }

        if (cardCategorie.includes('Trap')) {
            this.cardRaces = this.trapRaces
            this.filterCardsFb.get('cardRace').enable()
            return
        } else {
            this.filterCardsFb.get('cardRace').setValue('')
            this.filterCardsFb.get('cardRace').disable()
        }
    }

    redefine() {
        this.filterCardsFb.patchValue({
            descCard: '',
            typeCard: '',
            cardCategorie: '',
            cardRace: '',
            attribute: '',
            level: ''
        })
        this.filterCardsFb.get('cardRace').disable()
        this.filterContext.setFilter(null)
    }

    filter() {
        const filterData = this.filterCardsFb.value
        this.filterContext.setFilter(filterData)
        this.filteredData.emit(filterData)
        document.body.style.overflow = 'auto'
    }

    closeMenuFilter() {
        this.dismissData.emit()
        document.body.style.overflow = 'auto'
    }
}
