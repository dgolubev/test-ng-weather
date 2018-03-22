import {browser, by, ElementArrayFinder, ElementFinder, protractor} from "protractor";
import {sprintf} from "sprintf-js";

import {AppComponent} from "../../src/app/app.component";
import {AppPage} from './app.po';

describe('test-ng-weather App', () => {
  let app: AppPage;

  const pec = protractor.ExpectedConditions;

  beforeEach(() => {
    app = new AppPage();
    AppPage.navigateTo();
  });

  it('should display title', () => {
    expect(app.getTitleText()).toEqual('24 hours weather forecast');
  });

  it('should have default term "London,uk"', () => {
    expect(app.getSearchTerm()).toBe('London,uk');
  });

  it('should have entered text "dummyExpect" in term ', () => {
    app.setSearchTerm('dummyExpect');
    expect(app.getSearchTerm()).toBe('dummyExpect');
  });

  it('should propely get data for city and display them', () => {
    const expectCity = 'Milan';
    app
      .setSearchTerm(expectCity)
      .clickSearchButton();

    const tableElm = app.getTableBody();

    browser.wait(pec.visibilityOf(tableElm), 5000);

    const cells: ElementArrayFinder = tableElm.all(by.xpath('//tr[1]/td'));

    //  check count of columns
    expect(cells.count()).toBe(5);

    //  check city name
    expect(cells.first().getText()).toBe(expectCity);

    //  check temperature values
    cells.map((cell: ElementFinder, idx: number) => {
      if (idx === 0) {
        return;
      }
      expect(cell.getText()).toMatch(/\d{1,}/);
    })
  });

  it('should display error if forecast not found', () => {
    const expectCity = 'DummyCity';

    app
      .setSearchTerm(expectCity)
      .clickSearchButton();

    const errorCntr = app.getErrorCntr();

    browser.wait(pec.visibilityOf(errorCntr), 5000);

    const errors: ElementArrayFinder = errorCntr.all(by.xpath('//ul/li'));

    expect(errors.count()).toBe(1);
    expect(errors.first().getText()).toBe(sprintf(AppComponent.ERR_NOT_FOUND, expectCity));
  });
});
