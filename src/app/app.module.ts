import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {LayoutModule} from '@angular/cdk/layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NavigationComponent} from './navigation/navigation.component';
import {ClientListComponent} from './client-management/client-list/client-list.component';
import {ClientDetailsComponent} from './client-management/client-details/client-details.component';
import {BidiModule} from '@angular/cdk/bidi';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavigationComponent,
    ClientListComponent,
    ClientDetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    SharedModule,
    BidiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
