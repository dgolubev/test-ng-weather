import {browser, by, element, ElementFinder} from 'protractor';
import {promise} from "selenium-webdriver";

export class AppPage {
  private searchTerm: ElementFinder = element(by.xpath(`//div[@id="searchForm"]/input`));
  private searchButton: ElementFinder = element(by.xpath(`//div[@id="searchForm"]/button`));
  private tableBody: ElementFinder = element(by.xpath(`//table/tbody`));
  private errorCntr: ElementFinder = element(by.xpath(`//div[@id="errorCntr"]`));

  public static navigateTo() {
    return browser.get('/');
  }

  public getTitleText(): promise.Promise<string> {
    return element(by.css('app-root h1')).getText();
  }

  public getSearchTerm(): promise.Promise<string> {
    return this.searchTerm.getAttribute('value');
  }

  public setSearchTerm(text:string): AppPage {
    this.searchTerm
      .clear()
      .sendKeys(text);

    return this;
  }

  public clickSearchButton(): AppPage {
    this.searchButton.click();
    return this;
  }

  public getTableBody(): ElementFinder {
    return this.tableBody;
  }

  public getErrorCntr(): ElementFinder {
    return this.errorCntr;
  }
}
