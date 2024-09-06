import { HttpClientModule } from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { CurrencyPipe, registerLocaleData } from '@angular/common'
import pt from '@angular/common/locales/pt'
import { LOCALE_ID } from '@angular/core'
import localePt from '@angular/common/locales/pt'

registerLocaleData(localePt)
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { AppComponent } from '../app/views/app.component'
import { AppRoutes } from './app.routing'
import { ConfigService } from './config/config.service'
import { LoginService } from './services/login.service'
import { YGOservice } from './services/YGO.service'
import { BaseComponent } from './shared/components/base/base.component'
import { HomeComponent } from './views/home/home.component'
import { LoginComponent } from './views/login/login.component'
import { SearchCardComponent } from './views/search-card/search-card.component'
import { SpinnerComponent } from './shared/components/spinner/spinner.component'
import { AddCollectionComponent } from './views/add-collection/add-collection.component'
import { FilterComponent } from './shared/components/filter/filter.component'
import { FilterContext } from './services/filter.context'

registerLocaleData(pt)

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        BaseComponent,
        SearchCardComponent,
        AddCollectionComponent,
        SpinnerComponent,
        FilterComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(AppRoutes),
        FormsModule,
        NzLayoutModule,
        NzMenuModule,
        NzIconModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
    ],
    providers: [
        ConfigService,
        LoginService,
        FilterContext,
        YGOservice,
        CurrencyPipe,
        { provide: NZ_I18N, useValue: pt_BR },
        { provide: LOCALE_ID, useValue: 'pt-BR' }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
