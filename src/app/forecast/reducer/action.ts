import {Action} from "@ngrx/store";
import CityForecast from "../model/CityForecast";

export enum ForecastActionType {
  SEARCH = '[Forecast] Search',
  LOAD_FOR_CITY = '[Forecast] Request data for city',
  LOAD_FOR_CITY_SUCCESS = '[Forecast] Load data for city - Success',
  LOAD_FOR_CITY_FAIL = '[Forecast] Load data for city - Fail',
}

export interface IForecastAction extends Action {
  payload: any;
}

export class LoadForCityAction implements IForecastAction {
  public type: string = ForecastActionType.LOAD_FOR_CITY;
  public payload: any = null;
}

export class LoadForCitySuccessAction implements IForecastAction {
  public type: string = ForecastActionType.LOAD_FOR_CITY_SUCCESS;

  constructor(public payload: CityForecast) {
  }
}

export class LoadForCityFailAction implements IForecastAction {
  public type: string = ForecastActionType.LOAD_FOR_CITY_FAIL;

  constructor(public payload: Error) {
  }
}

export class SearchAction implements IForecastAction {
  public readonly type: string = ForecastActionType.SEARCH;

  constructor(public payload: string) {
  }
}