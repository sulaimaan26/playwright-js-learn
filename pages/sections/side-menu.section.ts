import { Page, Locator } from "@playwright/test";
import { ProjectHomePage } from "../projects/project-home.page";
import { MenuSection } from "./menu.section";

export class SideMenuSection {
  private readonly page: Page;
  private readonly projectMenu: Locator;
  private readonly menuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.projectMenu = page.getByRole("link", { name: "Projects" });
    this.menuButton = page
      .getByRole("button", { name: "Open workspace switcher" })
      .first();
  }

  async openMenu() {
    await this.menuButton.click();
    return new MenuSection(this.page);
  }

  async clickProjectMenu() {
    await this.projectMenu.click();
    return new ProjectHomePage(this.page);
  }
}
