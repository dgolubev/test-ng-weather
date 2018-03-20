import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";

import {AppComponent} from './app.component';
import {SearchFormComponent as ForecastSearchFormComponent} from './forecast/component/search-form/search-form.component';
import {forecastReducer} from "./forecast/reducer/reducer";

@NgModule({
  declarations: [
    AppComponent,
    ForecastSearchFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({forecastReducer: forecastReducer})
  ],
  providers: [
  ],
  bootstrap: [AppComponent]

})
export class AppModule {
}
