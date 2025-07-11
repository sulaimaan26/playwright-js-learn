import { Locator, Page } from "@playwright/test";
import { MenuSection } from "./menu.section";

export class HeaderSection {
  private readonly menuButton: Locator;

  constructor(private page: Page) {
    this.menuButton = page.locator(
      "//button[contains(@class,'group/menu-button')]"
    );
  }

  async clickMenu() {
    await this.menuButton.click();
    return new MenuSection(this.page);
  }
}
