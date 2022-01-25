import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardInterface } from 'src/app/interfaces/cardSearch.interface';
import { YGOservice } from 'src/app/services/YGO.service';
import { commonHelper } from 'src/app/shared/helpers/commonHelper';

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.css']
})


export class AddCollectionComponent implements OnInit {

  countCard: number = 0;
  priceCard: number = 0
  params: CardInterface = {};
  card: CardInterface = { card_images: [{ image_url: '' }] };
  commonHelper: commonHelper = new commonHelper()

  rarityList: any[] = []
  languageList: any[] = []
  stateCardList: any[] = []

  selectedRarity: number = null
  selectedLanguage: number = null
  selectedStateCard: number = null

  constructor(private route: ActivatedRoute,
    private ygoService: YGOservice
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.params.id = params['id']);

    this.ygoService.get(this.params).subscribe(res => {
      this.card = res.data[0]
    })

    this.rarityList = this.commonHelper.getAllRarityCards();
    this.languageList = this.commonHelper.getAllLanguageCards();
    this.stateCardList = this.commonHelper.getAllCardState();


  }

  incrementCountCard() {
    this.countCard += 1
  }

  decrementCountCard() {
    this.countCard -= 1
  }

}
