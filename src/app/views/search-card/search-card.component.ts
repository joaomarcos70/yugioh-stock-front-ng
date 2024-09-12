import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs'
import { CardInterface } from 'src/app/interfaces/cardSearch.interface'
import { cardSearch } from 'src/app/models/CardSearch.model'
import { ApiService } from 'src/app/services/api.service'
import { FilterContext, IFilter } from 'src/app/services/filter.context'

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
    params: CardInterface = { fname: '', offset: 0, num: 10 }
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

    constructor(private router: Router, private filterContext: FilterContext, private apiService: ApiService) {
        this.searchSubject.pipe(debounceTime(500), distinctUntilChanged()).subscribe({
            next: data => {
                this.params = { fname: data.fname, offset: data.offset, num: data.num, ...data }
                this.searchCards()
            },
            error: error => {
                alert({ message: 'Erro ao buscar cartas', error })
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
        this.router.navigate(['/home'])
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
        this.apiService.getCards(this.params).subscribe({
            next: res => {
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
            },
            error: error => {
                if (error.status === 400) {
                    this.cards = []
                    this.txtFoundCards = 'Nenhuma carta encontrada'
                    this.foundCards = 0
                    this.paginationText = 'Página 0 de 0'
                    this.metaPagination = {
                        totalPages: 0,
                        nextPage: '',
                        prevPage: '',
                        totalItems: 0,
                        missingPages: 0
                    }
                }
                console.log(error)
            }
        })
    }

    searchCardsWithFilter(filter: IFilter) {
        this.showSideMenu = false

        this.params = {
            fname: this.params.fname,
            offset: 0,
            num: this.itemsPerPage,
            desc: filter.descCard,
            type: filter.cardCategorie,
            race: filter.cardRace ? filter.cardRace : '',
            attribute: filter.attribute,
            level: filter.level
        }

        this.searchSubject.next(this.params)
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
            offset: this.params.offset,
            level: this.filterContext.getFilter()?.level,
            attribute: this.filterContext.getFilter()?.attribute,
            type: this.filterContext.getFilter()?.cardCategorie
        })
    }

    searchByName(event) {
        const name = event.target.value
        this.searchSubject.next({
            fname: name,
            num: this.itemsPerPage,
            offset: this.params.offset,
            level: this.filterContext.getFilter()?.level,
            attribute: this.filterContext.getFilter()?.attribute,
            type: this.filterContext.getFilter()?.cardCategorie
        })
    }

    previous() {
        if (!this.metaPagination.prevPage) return

        this.apiService.nextOrPrev(this.metaPagination.prevPage).subscribe({
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

        this.apiService.nextOrPrev(this.metaPagination.nextPage).subscribe({
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

    fallbackImage(event: Event) {
        const element = event.target as HTMLImageElement
        element.src = '../../../assets/images/card-default.webp'
    }
}
