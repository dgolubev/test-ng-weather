import {
  ActionReducer,
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from "@ngrx/store";
import CityForecast from "../model/CityForecast";
import {IForecastAction, ForecastActionType} from "./action";

export interface ForecastState {
  searchTerm: string;
  forecasts: Set<CityForecast>;
  errors: Error[];
  isLoading: boolean;
}

const initialState: ForecastState = <ForecastState>{
  forecasts: new Set<CityForecast>(),
  searchTerm: '',
  errors: [],
  isLoading: false,
};

export const forecastReducer: ActionReducer<ForecastState, IForecastAction> =
  (state: ForecastState = initialState, action: IForecastAction) => {
    switch (action.type) {
      case ForecastActionType.SEARCH:
        return {
          ...state,
          searchTerm: action.payload,
        };

      case ForecastActionType.LOAD_FOR_CITY:
        return {
          ...state,
          errors: [],
          isLoading: true,
        };

      case ForecastActionType.LOAD_FOR_CITY_SUCCESS:
        return {
          ...state,
          forecasts: state.forecasts.add(action.payload),
          isLoading: false,
        };

      case ForecastActionType.LOAD_FOR_CITY_FAIL:
        return {
          ...state,
          errors: state.errors.concat(action.payload),
          isLoading: false,
        };

      default:
        return state;
    }
  };

//  --- Selectors --
export const getForecastState: MemoizedSelector<object, ForecastState> = createFeatureSelector<ForecastState>('forecastReducer');

export const getSearchTerm: MemoizedSelector<ForecastState, string> = createSelector(
  getForecastState,
  (state: ForecastState) => state.searchTerm
);

export const getForecastItems: MemoizedSelector<ForecastState, Set<CityForecast>> = createSelector(
  getForecastState,
  (state: ForecastState) => state.forecasts
);

export const isLoading: MemoizedSelector<ForecastState, boolean> = createSelector(
  getForecastState,
  (state: ForecastState) => state.isLoading
);

export const getForecastErrors: MemoizedSelector<ForecastState, Error[]> = createSelector(
  getForecastState,
  (state: ForecastState) => state.errors
);
