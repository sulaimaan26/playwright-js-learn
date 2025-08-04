import { Locator, Page } from "@playwright/test";
import { MenuSection } from "./menu.section";

export class HeaderSection {
  private readonly menuButton: Locator;

  constructor(private page: Page) {
    this.menuButton = page.getByRole('button', { name: 'Open workspace switcher' });
  }

  async clickMenu() {
    await this.menuButton.click();
    return new MenuSection(this.page);
  }
}
