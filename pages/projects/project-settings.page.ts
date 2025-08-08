import { Locator, Page } from "@playwright/test";
import { AlertNotification } from "../../component/alert-notification";
import { Dropdown } from "../../component/dropdown";

export class ProjectSettings {
  private projectNameField: Locator;
  private descriptionField: Locator;
  private projectIDField: Locator;

  // For delete popup
  private deleteProject: Locator;
  private deleteWorkspaceName: Locator;
  private deleteConfirmationField: Locator;
  private deleteConfirmButton: Locator;
  private secondDeleteProject: Locator;
  private readonly backToWorkSpaceLink: Locator;

  constructor(private page: Page) {
    this.projectNameField = page.getByRole("textbox", { name: "Project name" });
    this.descriptionField = page.getByRole("textbox", { name: "Description" });
    this.projectIDField = page.getByRole("textbox", { name: "Project ID" });

    this.deleteProject = page.getByRole("button", {
      name: "Delete project",
    });
    this.secondDeleteProject = page.locator(
      `//button[contains(@class,'bg-red-500') and contains(text(),'Delete my project')]`
    );
    this.deleteWorkspaceName = page.locator("#projectName");
    this.deleteConfirmationField = page.locator("#confirmDelete");
    this.deleteConfirmButton = page.getByRole("button", {
      name: "Delete project",
    });
    this.backToWorkSpaceLink = page.getByRole("link", {
      name: "Back to workspace",
    });
  }

  async handleDeleteProject(
    workspaceName: string,
    confirmation = `delete my project`
  ) {
    await this.clickDeleteProject();
    await this.clickSecondDeleteProject();
    await this.deleteWorkspaceName.fill(workspaceName);
    await this.deleteConfirmationField.fill(confirmation);
    await this.deleteConfirmButton.click();
    return new AlertNotification(this.page);
  }

  async clickDeleteProject() {
    await this.deleteProject.click();
  }

  async clickSecondDeleteProject() {
    await this.secondDeleteProject.click();
  }

  async getProjectInfo() {
    let projectName = await this.projectNameField.inputValue();
    let description = await this.descriptionField.inputValue();
    let projectId = await this.projectIDField.inputValue();

    return {
      projectName,
      description,
      projectId,
    };
  }
}
