import { Routes } from '@angular/router'
import { AddCollectionComponent } from './views/add-collection/add-collection.component'
import { HomeComponent } from './views/home/home.component'
import { LoginComponent } from './views/login/login.component'
import { SearchCardComponent } from './views/search-card/search-card.component'
import { AuthGuard } from './guards/auth-guard'

export const AppRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'search-card',
        component: SearchCardComponent
    },
    {
        path: 'add-collection/:id',
        component: AddCollectionComponent
    },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
]
