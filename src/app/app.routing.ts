import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { SearchCardComponent } from './views/search-card/search-card.component';

export const AppRoutes: Routes = [
    {
        path:"",
        component:LoginComponent
    },
    {
        path:"home",
        component:HomeComponent
    },
    {
        path:"search-card",
        component:SearchCardComponent
    }
]