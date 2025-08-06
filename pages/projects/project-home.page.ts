import { Page } from "@playwright/test";

export class ProjectHomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToProject(name: string) {
    await this.page.getByRole("link", { name }).click();
  }
}
