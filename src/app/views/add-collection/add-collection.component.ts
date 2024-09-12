import { CurrencyPipe } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { CardInterface } from 'src/app/interfaces/cardSearch.interface'
import { ApiService } from 'src/app/services/api.service'
import { ClientService } from 'src/app/services/client.service'
import { commonHelper } from 'src/app/shared/helpers/commonHelper'

export interface ICardCollection {
    cardRarity: string
    cardLanguage: string
    cardState: string
    cardPrice: string
    cardCount: number
}

@Component({
    selector: 'app-add-collection',
    templateUrl: './add-collection.component.html',
    styleUrls: ['./add-collection.component.css']
})
export class AddCollectionComponent implements OnInit {
    countCard = 0
    priceCard = 0
    params: CardInterface = { num: 10, offset: 0 }
    card: Partial<CardInterface> = { name: '', card_images: [{ image_url: '' }] }
    commonHelper: commonHelper = new commonHelper()
    rarityList: any[] = []
    languageList: any[] = []
    stateCardList: any[] = []
    addCardForm: FormGroup
    selectedRarity: number = null
    selectedLanguage: number = null
    selectedStateCard: number = null

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private currencyPipe: CurrencyPipe,
        private clientService: ClientService,
        private apiService: ApiService
    ) {}

    ngOnInit() {
        this.createForm()
        this.route.params.subscribe(params => (this.params.id = params['id']))

        this.apiService.getCards(this.params).subscribe(res => {
            this.card = res.data[0]
        })

        this.rarityList = this.commonHelper.getAllRarityCards()
        this.languageList = this.commonHelper.getAllLanguageCards()
        this.stateCardList = this.commonHelper.getAllCardState()

        this.addCardForm.get('cardPrice').valueChanges.subscribe(value => {
            if (value) {
                let numericValue = value.replace(/\D/g, '').replace(/^0+/, '')

                if (numericValue) {
                    numericValue = (parseFloat(numericValue) / 100).toFixed(2)
                    const formattedValue = this.currencyPipe.transform(numericValue, 'BRL', 'symbol', '1.2-2')
                    this.addCardForm.get('cardPrice').setValue(formattedValue, { emitEvent: false })
                }
            }
        })
    }

    createForm() {
        this.addCardForm = this.fb.group({
            cardRarity: ['', [Validators.required]],
            cardLanguage: ['', [Validators.required]],
            cardState: ['', [Validators.required]],
            cardPrice: ['', [Validators.required]],
            cardCount: [1, [Validators.required, Validators.min(1)]]
        })
    }

    get cardPriceValue() {
        return this.addCardForm.get('cardPrice').value
    }
    get cardCountValue() {
        return this.addCardForm.get('cardCount').value
    }

    back() {
        this.router.navigate(['/search-card'])
    }

    incrementCountCard() {
        this.addCardForm.get('cardCount').setValue(this.cardCountValue + 1)
    }

    decrementCountCard() {
        if (this.cardCountValue === 1) return
        this.addCardForm.get('cardCount').setValue(this.cardCountValue - 1)
    }

    addCard() {
        if (this.addCardForm.invalid) {
            console.log('invalid form')
            this.addCardForm.markAllAsTouched()
            return
        }

        this.clientService
            .addCardCollection({
                id: this.params.id,
                ...(this.addCardForm.value as ICardCollection)
            })
            .subscribe({
                next: () => {
                    this.router.navigate(['/search-card'])
                },
                error: error => {
                    console.error(error)
                }
            })
    }
}
