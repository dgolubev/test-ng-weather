import {Component} from '@angular/core';
import {Store} from "@ngrx/store";

import * as ForecastAction from "../../reducer/action";
import * as ForecastReducer from "../../reducer/reducer";

@Component({
  selector: 'app-forecast-search-form',
  template: `
    <div id="searchForm">
        <input type="text"
               placeholder="search for city" 
               [(ngModel)]="searchFor"
               (keypress)="onKeyPress($event)"
               >
        <button (click)="onClick()">Search</button>
    </div>
  `,
  styleUrls: ['search-form.component.css'],
})
export class SearchFormComponent {
  private searchFor: string = 'London,uk';

  constructor(private store: Store<ForecastReducer.ForecastState>) {
  }

  private onClick(): void {
    this.doSearch();
  }

  private onKeyPress(event: KeyboardEvent): void {
    if (event.charCode == 13) {
      this.doSearch();
    }
  }

  private doSearch(): void {
    this.store.dispatch(new ForecastAction.SearchAction(this.searchFor.trim()));
  }
}
