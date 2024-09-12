import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ClientService } from 'src/app/services/client.service'

export interface ICardCollection {
    cardId: string
    cardState: string
    idiom: string
    price: string
    quantity: number
    rarity: string
}

export interface IDataCollection {
    data: ICardCollection[]
}

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
    cards: ICardCollection[] = []

    constructor(private clientService: ClientService, private router: Router) {}

    ngOnInit(): void {
        this.getCollection()
    }

    getCollection() {
        this.clientService.getCollection().subscribe({
            next: (res: IDataCollection) => {
                this.cards = res.data
                console.log(res)
            },
            error: error => {
                console.log(error)
            }
        })
    }

    back() {
        this.router.navigate(['/home'])
    }
}
