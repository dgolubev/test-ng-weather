import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {WeatherService} from "./forecast/service/weather.service";
import {SearchFormComponent as ForecastSearchFormComponent} from './forecast/component/search-form/search-form.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ForecastSearchFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    // {provide: 'WeatherService', useClass: WeatherService},
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
