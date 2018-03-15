import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-forecast-search-form',
  template: `
    <div id="searchForm">
        <input #seachForInput type="text"
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

  @Output() private evnSearch: EventEmitter<SearchForType> = new EventEmitter();

  constructor() {
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
    this.evnSearch.emit({searchFor: this.searchFor.trim()});
  }
}

export interface SearchForType {
  searchFor: string;
}
