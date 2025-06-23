import { test as base } from "@playwright/test";
import { WorkSpaceHomePage } from "../pages/workspace/workspace-home.page";
import { LoginPage } from "../pages/login/login.page";
import { getEnv } from "../config/env.loader";
import { ENVKEY } from "../enums/env-key";

export const test = base.extend<{ workspaceHome: WorkSpaceHomePage }>({
  workspaceHome: async ({ page }, use) => {
    await page.goto("/");
    let loginPage = new LoginPage(page);
    let workSpaceHomePage = await loginPage.login(
      getEnv(ENVKEY.EMAIL),
      getEnv(ENVKEY.PASSWORD)
    );

    await workSpaceHomePage.isGreetingMessageDisplayed(getEnv(ENVKEY.USERNAME));
    await use(workSpaceHomePage);
  },
});

export { expect } from "@playwright/test";
