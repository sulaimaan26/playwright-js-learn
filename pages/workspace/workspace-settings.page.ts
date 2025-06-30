import { expect, Locator, Page } from "@playwright/test";
import { AlertNotification } from "../../component/alert-notification";
import { Dropdown } from "../../component/dropdown";
import { PeopleCount } from "../../enums/workspace/people-count";
import { HeaderSection } from "./sections/header.section";

export class WorkspaceSettings {
  public readonly header: HeaderSection;
  private secondDeleteWorkspace: Locator;
  private workSpaceNameField: Locator;
  private companySizeDropdown: Dropdown;
  private workSpaceURLField: Locator;
  private updateWorkSpaceButton: Locator;

  // For delete popup
  private deleteWorkspace: Locator;
  private deleteWorkspaceName: Locator;
  private deleteConfirmationField: Locator;
  private deleteConfirmButton: Locator;

  constructor(private page: Page) {
    this.header = new HeaderSection(page);
    this.workSpaceNameField = page.getByRole("textbox", {
      name: "Workspace name",
    });
    this.companySizeDropdown = new Dropdown(
      page.locator(
        "//h4[contains(text(),'Company size')]/following-sibling::div//button"
      ),
      page
    );
    this.workSpaceURLField = page.locator("#url");
    this.updateWorkSpaceButton = page.getByRole("button", {
      name: "Update workspace",
    });

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
    let companySize = await this.companySizeDropdown.getValue();
    let workspaceName = await this.workSpaceNameField.inputValue();
    let workspaceUrl = await this.workSpaceURLField.inputValue();
    return {
      workspaceName,
      companySize,
      workspaceUrl,
    };
  }

  async enterWorkspaceName(name: string) {
    await this.workSpaceNameField.fill(name);
  }

  async selectCompanySize(value: PeopleCount) {
    await this.companySizeDropdown.selectOption(value);
  }

  async isWorkspaceURLDisabled() {
    await expect(this.workSpaceURLField).toBeDisabled();
  }

  async updateWorkspace() {
    await this.updateWorkSpaceButton.click();
    return new AlertNotification(this.page);
  }
}
