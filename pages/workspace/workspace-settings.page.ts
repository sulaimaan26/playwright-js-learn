import { Locator, Page } from "@playwright/test";
import { AlertNotification } from "../../component/alert-notification";
import { Dropdown } from "../../component/dropdown";

export class WorkspaceSettings {
  private page: Page;
  private secondDeleteWorkspace: Locator;
  private workSpaceName: Locator;
  private companySizeDropdown: Dropdown;
  private workSpaceURL: Locator;

  // For delete popup
  private deleteWorkspace: Locator;
  private deleteWorkspaceName: Locator;
  private deleteConfirmationField: Locator;
  private deleteConfirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.workSpaceName = page.getByRole("textbox", { name: "Workspace name" });
    this.companySizeDropdown = new Dropdown(
      page.getByRole("button", { name: "Company size" }),
      page
    );
    this.workSpaceURL = page.locator("#url");

    this.deleteWorkspace = page.getByRole("button", {
      name: "Delete this workspace",
    });
    this.secondDeleteWorkspace = page.locator(
      `//button[contains(@class,'bg-red-500') and contains(text(),'Delete this workspace')]`
    );
    this.deleteWorkspaceName = page.locator("#workspaceName");
    this.deleteConfirmationField = page.locator("#confirmDelete");
    this.deleteConfirmButton = page.getByRole("button", { name: "Confirm" });
  }

  async clickDeleteWorkspace() {
    await this.deleteWorkspace.click();
  }

  async clickSecondDeleteWorkspace() {
    await this.secondDeleteWorkspace.click();
  }

  async handleDeleteWorkspace(
    workspaceName: string,
    confirmation = "delete my workspace"
  ) {
    await this.clickDeleteWorkspace();
    await this.clickSecondDeleteWorkspace();
    await this.deleteWorkspaceName.fill(workspaceName);
    await this.deleteConfirmationField.fill(confirmation);
    await this.deleteConfirmButton.click();
    return new AlertNotification(this.page);
  }

  async getWorkSpaceInfo() {
    // let companySize = await this.companySizeDropdown.getValue();
    let workspaceName = await this.workSpaceName.inputValue();
    let workspaceUrl = await this.workSpaceURL.inputValue();
    return {
      workspaceName,
      companySize: "",
      workspaceUrl,
    };
  }
}
