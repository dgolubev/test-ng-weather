import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {catchError, map} from 'rxjs/operators'
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";

import Forecast from "../model/Forecast";
import CityForecast from "../model/CityForecast";

import 'rxjs/add/observable/throw';

@Injectable()
export class WeatherService {
  public static readonly API_URL = 'http://api.openweathermap.org/data/2.5/forecast?' +
    'appid=3490e68b3b96961ce5d16f37ef5e8886&' +
    'units=metric';

  constructor(private http: HttpClient) {
  }

  public getByCity(city: string): Observable<CityForecast> {
    const queryParams: HttpParams = new HttpParams()
      .set('q', city);

    return this.http.get<CityForecast>(WeatherService.API_URL, {params: queryParams})
      .pipe(
        map((res: object): CityForecast => {
          const result = res as CityForecast;

          //  left only forecast for 24 hours
          const msInHour = 60 * 60 * 1000;

          const currDate = new Date();
          const currHour = currDate.getUTCHours();

          //  get timestamp of current date without time
          let lookTs = currDate.setUTCHours(0, 0, 0, 0);
          //  if current time after 6am then take nex day
          if (currHour > 6) {
            lookTs += 24 * msInHour;
          }

          result.list = result.list
            //  left forecast only for looking date
            .filter((item: Forecast) => {
              const itemTs = item.dt * 1000;

              return (
                itemTs >= lookTs
                && itemTs < lookTs + 24 * msInHour
              );
            })
            //  left forecast only for 12am, 6am, 12pm and 6pm
            .filter((item: Forecast) => {
              return (new Date(item.dt * 1000).getUTCHours() % 6 == 0);
            });

          return result;
        }),
        catchError((error: HttpErrorResponse) => {
          return Observable.throw(error);
        }),
      );
  }
}
