import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';

export const AppRoutes: Routes = [
    {
        path:"",
        component:LoginComponent
    },
    {
        path:"home",
        component:HomeComponent
    }
]