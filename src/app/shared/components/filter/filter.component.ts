import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() dismissData: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  closeMenuFilter(){
    this.dismissData.emit()
  }
}
