import { expect, Locator, Page } from "@playwright/test";
import { SideMenuSection } from "../sections/side-menu.section";

export class WorkSpaceHomePage {
  private readonly page: Page;
  public readonly sideMenuSection: SideMenuSection;

  constructor(page: Page) {
    this.page = page;
    this.sideMenuSection = new SideMenuSection(page);
  }

  async isGreetingMessageDisplayed(message: string) {
    await expect(
      this.page.getByRole("heading", { name: message })
    ).toBeVisible();
  }
}
