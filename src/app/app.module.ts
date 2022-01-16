import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from '../app/views/app.component';
import { AppRoutes } from './app.routing';
import { ConfigService } from './config/config.service';
import { LoginService } from './services/login.service';
import { LoginComponent } from './views/login/login.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, pt_BR } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { HomeComponent } from './views/home/home.component';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    NgZorroAntdModule,
    BrowserAnimationsModule
  ],
  providers: [
    ConfigService,
    LoginService,
    { provide: NZ_I18N, useValue: pt_BR }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
