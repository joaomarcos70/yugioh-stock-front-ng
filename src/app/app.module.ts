import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { ConfigService } from './config/config.service';
import { LoginService } from './services/login.service';
import { LoginComponent } from './views/login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule
  ],
  providers: [
    ConfigService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
