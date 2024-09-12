import { ChangeDetectorRef, Directive, ElementRef, HostListener, Input, input } from '@angular/core'

@Directive({
    selector: '[appImageFallback]'
})
export class ImageFallbackDirective {
    @Input() srcImageFallback: string

    constructor(private el: ElementRef) {}

    @HostListener('error')
    loadFallback() {
        const element: HTMLImageElement = <HTMLImageElement>this.el.nativeElement
        element.src = this.srcImageFallback || '../../assets/images/card-default.webp'
    }
}
