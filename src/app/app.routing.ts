import { Routes } from '@angular/router'
import { AddCollectionComponent } from './views/add-collection/add-collection.component'
import { HomeComponent } from './views/home/home.component'
import { LoginComponent } from './views/login/login.component'
import { SearchCardComponent } from './views/search-card/search-card.component'
import { AuthGuard } from './guards/auth-guard'
import { LoginGuard } from './guards/login-guard'
import { CollectionComponent } from './views/collection/collection.component'

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'search-card',
        component: SearchCardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'add-collection/:id',
        component: AddCollectionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'collection',
        component: CollectionComponent,
        canActivate: [AuthGuard]
    },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
]
