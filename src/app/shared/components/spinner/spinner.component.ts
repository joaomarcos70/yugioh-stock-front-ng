import { Component, Inject, Input, OnDestroy, ViewEncapsulation } from '@angular/core'
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router'
import { DOCUMENT } from '@angular/common'
import { Spinkit } from './spinkits'

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: [
        './spinner.component.css',
        './spinkit-css/sk-double-bounce.css',
        './spinkit-css/sk-chasing-dots.css',
        './spinkit-css/sk-cube-grid.css',
        './spinkit-css/sk-rotating-plane.css',
        './spinkit-css/sk-spinner-pulse.css',
        './spinkit-css/sk-three-bounce.css',
        './spinkit-css/sk-wandering-cubes.css',
        './spinkit-css/sk-wave.css',
        './spinkit-css/sk-line-material.css'
    ]
})
export class SpinnerComponent implements OnDestroy {
    public isSpinnerVisible = true
    public Spinkit = Spinkit

    @Input() public backgroundColor = 'rgba(0, 115, 170, 0.69)'
    @Input() public spinner = Spinkit.skLine

    constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {
        this.router.events.subscribe({
            next: event => {
                if (event instanceof NavigationStart) {
                    this.isSpinnerVisible = true
                } else if (
                    event instanceof NavigationEnd ||
                    event instanceof NavigationCancel ||
                    event instanceof NavigationError
                ) {
                    this.isSpinnerVisible = false
                }
            }
        })
    }

    ngOnDestroy(): void {
        this.isSpinnerVisible = false
    }
}
