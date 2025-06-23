import { expect, Locator, Page } from "@playwright/test";
import { MenuSection } from "./sections/menu.section";

export class WorkSpaceHomePage {
  readonly page: Page;
  readonly menuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator(
      "//button[contains(@class,'group/menu-button')]"
    );
  }

  async isGreetingMessageDisplayed(message: string) {
    await expect(
      this.page.getByRole("heading", { name: message })
    ).toBeVisible();
  }

  async clickMenu() {
    await this.menuButton.click();
    return new MenuSection(this.page);
  }
}
