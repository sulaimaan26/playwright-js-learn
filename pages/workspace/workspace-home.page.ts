import { expect, Locator, Page } from "@playwright/test";

export class WorkSpaceHomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isGreetingMessageDisplayed(message: string) {
    await expect(
      this.page.getByRole("heading", { name: message })
    ).toBeVisible();
  }
}
