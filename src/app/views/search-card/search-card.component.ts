import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs'
import { CardInterface } from 'src/app/interfaces/cardSearch.interface'
import { cardSearch } from 'src/app/models/CardSearch.model'
import { YGOservice } from 'src/app/services/YGO.service'

@Component({
    selector: 'app-search-card',
    templateUrl: './search-card.component.html',
    styleUrls: ['./search-card.component.css']
})
export class SearchCardComponent implements OnInit {
    canView: boolean = false
    searchSubject = new Subject<CardInterface>()
    foundCards: number = 0
    txtFoundCards: string = ''
    itemsPerPage: number = 10
    totalItems: number = 0
    paginationText: string
    params: CardInterface = { offset: 0, num: 10 }
    metaPagination: {
        totalPages: number
        nextPage?: string
        prevPage?: string
        totalItems?: number
        missingPages?: number
    }

    cards: CardInterface[] = new Array<CardInterface>()
    cardSearchModel: cardSearch = new cardSearch()

    showSideMenu: boolean = false

    constructor(private YgoService: YGOservice, private router: Router, private location: Location) {
        this.searchSubject.pipe(debounceTime(500), distinctUntilChanged()).subscribe({
            next: data => {
                this.params = { fname: data.fname, offset: data.offset, num: data.num }
                this.searchCards()
            },
            error: error => {
                console.log(error)
            }
        })
    }

    ngOnInit() {
        this.searchCards()
    }

    ngOnDestroy(): void {
        this.searchSubject.unsubscribe()
    }

    previousPage() {
        this.location.back()
    }

    filterAction() {
        this.showSideMenu = !this.showSideMenu
    }

    updatePagination() {
        this.paginationText = `Página ${this.metaPagination.totalPages - this.metaPagination.missingPages + 1} de ${
            this.metaPagination.totalPages + 1
        }`
    }

    searchCards() {
        this.YgoService.get(this.params).subscribe(res => {
            this.cards = res.data
            this.foundCards = res.data.length

            this.metaPagination = {
                totalPages: res.meta.total_pages,
                nextPage: res.meta.next_page,
                prevPage: res.meta.previous_page,
                totalItems: res.meta.total_rows,
                missingPages: res.meta.pages_remaining
            }

            this.updatePagination()

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

    changeLimitPerPage() {
        this.searchSubject.next({
            fname: this.params.fname,
            num: this.itemsPerPage,
            offset: this.params.offset
        })
    }

    searchByName(event) {
        const name = event.target.value
        this.searchSubject.next({
            fname: name,
            num: this.itemsPerPage,
            offset: this.params.offset
        })
    }

    previous() {
        if (!this.metaPagination.prevPage) return

        this.YgoService.nextOrPrev(this.metaPagination.prevPage).subscribe({
            next: data => {
                this.cards = data.data
                this.metaPagination = {
                    totalPages: data.meta.total_pages,
                    nextPage: data.meta.next_page,
                    prevPage: data.meta.previous_page,
                    totalItems: data.meta.total_rows,
                    missingPages: data.meta.pages_remaining
                }
                this.updatePagination()
            },
            error: error => {
                console.log(error)
            }
        })
    }

    next() {
        if (!this.metaPagination.nextPage) return

        this.YgoService.nextOrPrev(this.metaPagination.nextPage).subscribe({
            next: data => {
                this.cards = data.data
                this.metaPagination = {
                    totalPages: data.meta.total_pages,
                    nextPage: data.meta.next_page,
                    prevPage: data.meta.previous_page,
                    totalItems: data.meta.total_rows,
                    missingPages: data.meta.pages_remaining
                }

                this.updatePagination()
            },
            error: error => {
                console.log(error)
            }
        })
    }
}
