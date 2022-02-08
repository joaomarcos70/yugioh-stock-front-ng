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
import { BaseComponent } from './shared/components/base/base.component';
import { SearchCardComponent } from './views/search-card/search-card.component';
import { YGOservice } from './services/YGO.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddCollectionComponent } from './views/add-collection/add-collection.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { FilterComponent } from './shared/components/filter/filter.component';
import { FiltersBuildService } from './services/filtersBuild.service';


registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BaseComponent,
    SearchCardComponent,
    AddCollectionComponent,
    SpinnerComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    UiSwitchModule
  ],
  providers: [
    ConfigService,
    LoginService,
    YGOservice,
    FiltersBuildService,
    { provide: NZ_I18N, useValue: pt_BR }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
