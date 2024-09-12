import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { finalize } from 'rxjs'
import { ClientService } from 'src/app/services/client.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    collectionSize = 0
    wantsSize = 0
    constructor(private router: Router, private clientService: ClientService) {}

    ngOnInit(): void {
        this.getData()
    }

    getData() {
        this.clientService
            .getUserData()
            .pipe(finalize(() => console.log('finalize')))
            .subscribe({
                next: (response: any) => {
                    this.collectionSize = response.data.cardCollection.length
                    this.wantsSize = response.data.wants.length
                },
                error: error => {
                    console.log('error', error)
                }
            })
    }

    sendToSearch() {
        this.router.navigate(['search-card'])
    }

    collection() {
        this.router.navigate(['collection'])
    }
}
