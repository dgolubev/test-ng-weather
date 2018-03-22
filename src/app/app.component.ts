import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {select, Store} from "@ngrx/store";
import {distinctUntilChanged, filter, tap} from 'rxjs/operators';
import {sprintf} from 'sprintf-js';

import {WeatherService} from "./forecast/service/weather.service";
import CityForecast from "./forecast/model/CityForecast";
import * as ForecastReducer from "./forecast/reducer/reducer";
import * as ForecastAction from "./forecast/reducer/action";

@Component({
  selector: 'app-root',
  providers: [
    WeatherService,
  ],
  template: `
    <h1>24 hours weather forecast</h1>
    <div>
        <div id="errorCntr" *ngIf="(errors$ | async).length > 0">
            <h4>Errors: </h4>
            <ul>
                <li *ngFor="let error of errors$ |async">{{error.message}}</li>
            </ul>
        </div>

        <app-forecast-search-form (evnSearch)="processSearch($event)"></app-forecast-search-form>
        
        <table *ngIf="(items$ | async).size > 0">
            <thead>
                <tr>
                    <th>City</th>
                    <th>12am</th>
                    <th>6am</th>
                    <th>12pm</th>
                    <th>6pm</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let item of items$ | async">
                    <td>{{item.city.name}}</td>
                    
                    <td *ngFor="let forecast of item.list">{{forecast.main.temp}}</td>
                </tr>
            </tbody>
        </table>
        
        {{weatherSrv.message}}
    </div>
    <div *ngIf="isLoading$ | async" id="loadingOverlay"><p>Loading</p></div>
  `,
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  static readonly ERR_NOT_FOUND: string = `Error occurred in during getting forecast for "%s"`;

  private items$: Observable<Set<CityForecast>>;
  private errors$: Observable<Error[]>;
  private isLoading$: Observable<boolean> = new Observable<false>();

  constructor(
    private weatherSrv: WeatherService,
    private store: Store<ForecastReducer.ForecastState>
  ) {
    this.items$ = store.pipe(select(ForecastReducer.getForecastItems));
    this.errors$ = store.pipe(select(ForecastReducer.getForecastErrors));
    this.isLoading$ = store.pipe(select(ForecastReducer.isLoading));
  }

  public ngOnInit(): void {
    this.store.select(ForecastReducer.getSearchTerm)
      .pipe(
        filter((term: string) => term !== ''),
        distinctUntilChanged(),
        tap((term: string) => {
          this.store.dispatch(new ForecastAction.LoadForCityAction());

          return this.weatherSrv.getByCity(term)
            .subscribe(
              (forecast: CityForecast) => {
                this.store.dispatch(new ForecastAction.LoadForCitySuccessAction(forecast));
              },
              (err: HttpErrorResponse) => {
                let error: Error = err;
                if (err.status > 400) {
                  error = new Error(sprintf(AppComponent.ERR_NOT_FOUND, term));
                }
                this.store.dispatch(new ForecastAction.LoadForCityFailAction(error));
              },
            );
        }),
      )
      .subscribe();
  }
}
