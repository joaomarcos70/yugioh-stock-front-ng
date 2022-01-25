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
  params: CardInterface;
  card:  CardInterface[] = new Array<CardInterface>();
  cardId: number
  commonHelper: commonHelper = new commonHelper()
  rarityList: any[] = []


  constructor(private route: ActivatedRoute,
    private ygoService:YGOservice
    ) { }

  ngOnInit() {
    try {
      this.route.params.subscribe(params => this.params.id = params['id']);
      this.rarityList = this.commonHelper.getAllRarityCards();
      
      console.log("kk",this.params.id);
      this.ygoService.get(this.params).subscribe(res => {
        this.card = res.data
      })

    } catch (error) {
      console.log(error);
    }
  }

  incrementCountCard() {
    this.countCard += 1
  }

  decrementCountCard() {
    this.countCard -= 1
  }

}
