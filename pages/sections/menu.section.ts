import { Locator, Page } from "@playwright/test";
import { CreateWorkspacePage } from "../workspace/create-workspace.page";
import { WorkspaceSettings } from "../workspace/workspace-settings.page";
import { WorkSpaceHomePage } from "../workspace/workspace-home.page";

export class MenuSection {
  private readonly page: Page;
  private readonly createWorkspace: Locator;
  private readonly settingsButton: Locator;

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

  async selectWorkSpace(name: string) {
    let locator = this.page.getByRole("link", { name });
    await locator.click();
    return new WorkSpaceHomePage(this.page);
  }
}
