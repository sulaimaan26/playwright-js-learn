import { Locator, Page } from "@playwright/test";

export class MenuSection {
  readonly page: Page;
  readonly createWorkspace: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createWorkspace = page.getByRole("link", { name: "create workspace" });
  }

  async clickCreateWorkspace() {
    await this.createWorkspace.click();
  }
}
