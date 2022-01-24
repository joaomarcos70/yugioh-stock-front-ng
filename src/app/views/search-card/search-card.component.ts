import { Component, OnInit } from '@angular/core';
import _ from 'lodash'
import { cardSearch } from 'src/app/models/CardSearch.model';
import { YGOservice } from 'src/app/services/YGO.service';
import { CardInterface } from 'src/app/interfaces/cardSearch.interface';
@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.css']
})
export class SearchCardComponent implements OnInit {

  canView: boolean = false
  params: CardInterface = { fname: 'fluffal' };
  nameOfCard: string
  foundCards: number = 0

  itemsPerPage: number[] = [10, 50, 100];
  totalItems: number = 0;
  currentPage: number = 1;

  cards: CardInterface[] = new Array<CardInterface>()
  cardSearchModel: cardSearch = new cardSearch()



  constructor(private YgoService: YGOservice) { }

  async ngOnInit() {
    this.searchCards()
  }

  searchCards() {
    try {
      this.YgoService.get(this.params).subscribe(res => {
        this.cards = res.data
        this.foundCards = res.data.length
      })

    } catch (error) {
      console.log(error);
    }

  }

  show() {
    this.canView = !this.canView
  }
}
