import { Locator, Page } from "@playwright/test";

export class Dropdown {
  private locator: Locator;
  private page: Page;

  constructor(locator: Locator, page: Page) {
    this.locator = locator;
    this.page = page;
  }

  async selectOption(option: string) {
    await this.locator.click();
    await this.page.locator(`//li[contains(text(),'${option}')]`).click();
  }

  async getValue() {
    let val = await this.locator.innerText();
    return val;
  }
}
