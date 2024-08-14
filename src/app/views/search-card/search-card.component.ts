import { Component, OnInit } from '@angular/core'
import _ from 'lodash'
import { cardSearch } from 'src/app/models/CardSearch.model'
import { YGOservice } from 'src/app/services/YGO.service'
import { CardInterface } from 'src/app/interfaces/cardSearch.interface'
import { Router } from '@angular/router'
import { Location } from '@angular/common'

@Component({
    selector: 'app-search-card',
    templateUrl: './search-card.component.html',
    styleUrls: ['./search-card.component.css']
})
export class SearchCardComponent implements OnInit {
    canView: boolean = false
    params: CardInterface = { fname: 'witch' }
    nameOfCard: string
    foundCards: number = 0
    txtFoundCards: string = ''

    itemsPerPage: number[] = [10, 50, 100]
    totalItems: number = 0
    currentPage: number = 1

    cards: CardInterface[] = new Array<CardInterface>()
    cardSearchModel: cardSearch = new cardSearch()

    showSideMenu: boolean = false

    constructor(private YgoService: YGOservice, private router: Router, private location: Location) {}

    async ngOnInit() {
        this.searchCards()
    }

    previousPage() {
        this.location.back()
    }

    filterAction() {
        this.showSideMenu = !this.showSideMenu
    }

    searchCards() {
        this.YgoService.get(this.params).subscribe(res => {
            this.cards = res.data
            this.foundCards = res.data.length

            if (this.foundCards == 0) {
                this.txtFoundCards = 'Nenhuma carta encontrada'
            } else if (this.foundCards > 1) {
                this.txtFoundCards = this.foundCards + ' cartas encontradas'
            } else {
                this.txtFoundCards = this.foundCards + ' carta encontrada'
            }
        })
    }

    addCollection(cardId: number) {
        this.router.navigate([`/add-collection/${cardId}`])
    }

    show() {
        this.canView = !this.canView
    }
}
