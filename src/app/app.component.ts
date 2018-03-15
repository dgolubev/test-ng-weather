import {Component, OnInit} from '@angular/core';
import {WeatherService} from "./forecast/service/weather.service";
import {SearchForType} from "./forecast/component/search-form/search-form.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import CityForecast from "./forecast/model/CityForecast";

@Component({
  selector: 'app-root',
  providers: [
    WeatherService,
  ],
  template: `
    <h1>24 hours weather forecast</h1>
    <div>
        <div id="errorCntr" *ngIf="errors.length > 0">
            <h4>Errors: </h4>
            <ul>
                <li *ngFor="let error of errors">{{error}}</li>
            </ul>
        </div>

        <app-forecast-search-form (evnSearch)="processSearch($event)"></app-forecast-search-form>
        
        <table>
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
                <tr *ngFor="let item of getItems | async">
                    <td>{{item.city.name}}</td>
                    
                    <td *ngFor="let forecast of item.list">{{forecast.main.temp}}</td>
                </tr>
            </tbody>
        </table>
        
        {{weatherSrv.message}}
    </div>
    <div *ngIf="isLoading" id="loadingOverlay"><p>Loading</p></div>
  `,
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  private isLoading = false;

  private searchTerm$: Subject<string> = new Subject<string>();
  private errors: string[] = [];

  private items$: BehaviorSubject<Set<CityForecast>> = new BehaviorSubject(new Set<CityForecast>());

  get getItems(): Observable<Set<CityForecast>> {
    return this.items$.asObservable();
  }

  constructor(
    private weatherSrv: WeatherService
  ) {
  }

  public ngOnInit(): void {
    this.searchTerm$
      .distinctUntilChanged()
      .do(() => {
        this.isLoading = true;
      })
      .subscribe((term: string) => {
        this.weatherSrv.getByCity(term)
          .subscribe(
            (forecast: CityForecast) => {
              this.items$.next(this.items$.getValue().add(forecast));
            },
            (err: HttpErrorResponse) => {
              this.isLoading = false;

              if (err.status == 404) {
                this.errors.push('Forecast not found');
              }
            },
            () => {
              this.isLoading = false;
            }
          );
      });
  }

  private processSearch(event: SearchForType): void {
    console.log('processSearch !!', event.searchFor);
    this.errors = [];

    this.searchTerm$.next(event.searchFor);
  }
}
