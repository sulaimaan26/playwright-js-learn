import { expect, Locator, Page } from "@playwright/test";
import { MenuSection } from "./sections/menu.section";
import { HeaderSection } from "./sections/header.section";

export class WorkSpaceHomePage {
  readonly page: Page;
  public readonly header: HeaderSection;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderSection(page);
  }

  async isGreetingMessageDisplayed(message: string) {
    await expect(
      this.page.getByRole("heading", { name: message })
    ).toBeVisible();
  }
}
