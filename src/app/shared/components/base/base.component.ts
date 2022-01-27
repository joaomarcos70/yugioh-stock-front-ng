import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  
  @Input() middleInputHeader: any;
  @Input() leftIconClass: string = ''
  @Input() rightIconClass: string =''

  @Output() actionButton:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
