import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.css']
})
export class BaseComponent {
    @Input() middleInputHeader: any
    @Input() leftIconClass: string = ''
    @Input() rightIconClass: string = ''
    @Input() isDisabledLeftBtn: boolean = false
    @Input() isDisabledRightBtn: boolean = false

    @Output() leftIconAction: EventEmitter<any> = new EventEmitter()
    @Output() rightIconAction: EventEmitter<any> = new EventEmitter()

    emitLeftBtn() {
        this.leftIconAction.emit()
    }

    emitRightBtn() {
        this.rightIconAction.emit()
    }
}
