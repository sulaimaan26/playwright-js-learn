import { Locator, Page } from "@playwright/test";
import { CreateWorkspacePage } from "../create-workspace.page";
import { WorkspaceSettings } from "../workspace-settings.page";

export class MenuSection {
  readonly page: Page;
  readonly createWorkspace: Locator;
  readonly settingsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createWorkspace = page.getByRole("link", { name: "create workspace" });
    this.settingsButton = page.getByRole("link", {
      name: "Settings",
      exact: true,
    });
  }

  async clickCreateWorkspace() {
    await this.createWorkspace.click();
    return new CreateWorkspacePage(this.page);
  }

  async clickSettingsButton() {
    await this.settingsButton.click();
    return new WorkspaceSettings(this.page);
  }
}
