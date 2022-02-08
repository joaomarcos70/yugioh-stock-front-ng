import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FiltersBuildService } from 'src/app/services/filtersBuild.service'
import { listModel } from 'src/app/interfaces/listModel.interface'

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    @Output() dismissData: EventEmitter<any> = new EventEmitter()

    constructor(private filterdBuildService: FiltersBuildService) {}

    attributeCardList: listModel[] = new Array<listModel>()
    raceCardList: listModel[] = new Array<listModel>()
    typeCardList: listModel[] = new Array<listModel>()
    isExtra: boolean = true

    ngOnInit() {
      this.filterdBuildService.getAllTypes(this.isExtra).subscribe(res => {
        this.typeCardList = res.data
      })
        this.filterdBuildService.getAllAttributes().subscribe(res => {
            this.attributeCardList = res.data
        })

        this.changeTypeCard('anything')
    }

    closeMenuFilter() {
        this.dismissData.emit()
    }

    changeTypeCard(type) {
      console.log("lolll", type);
        if (this.isExtra) {
            this.filterdBuildService.getAllTypes(this.isExtra).subscribe(res => {
                this.typeCardList = res.data
            })
        }
        this.populateRaceList(type)
    }

    populateRaceList(type) {
      console.log(type);
        if (type && type.value == 'Spell Card') {
            this.filterdBuildService.getAllRaces(type.value).subscribe(res => {
                this.raceCardList = res.data
            })
        } else if (type && type.value == 'Trap Card') {
            this.filterdBuildService.getAllRaces(type.value).subscribe(res => {
                this.raceCardList = res.data
            })
        } else {
            this.filterdBuildService.getAllRaces(type.value).subscribe(res => {
                this.raceCardList = res.data
            })
        }
    }
}
