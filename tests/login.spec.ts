import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login/login.page";
import { TestTags } from "../enums/test-tags";
import { getEnv } from "../config/env.loader";
import { ENVKEY } from "../enums/env-key";
import { InvalidEmailId } from "../data/login/login.data";

test.only(
  "Check login page is loaded",
  { tag: [TestTags.PRIORITY_HIGH, TestTags.PIPELINE_TEST] },
  async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Log in/);
  }
);

test(
  "Verify able to perform successful login",
  { tag: TestTags.PRIORITY_HIGH },
  async ({ page }) => {
    await page.goto("/");
    let loginPage = new LoginPage(page);
    let workSpaceHomePage = await loginPage.login(
      getEnv(ENVKEY.EMAIL),
      getEnv(ENVKEY.PASSWORD)
    );

    await workSpaceHomePage.isGreetingMessageDisplayed(getEnv(ENVKEY.USERNAME));
  }
);

InvalidEmailId.forEach((email) => {
  test(
    `Check Email Field validation message for invalid emailId ${email}`,
    { tag: [TestTags.NEGATIVE, TestTags.PRIORITY_LOW] },
    async ({ page }) => {
      await page.goto("/");
      let loginPage = new LoginPage(page);
      await loginPage.enterEmail(email);
      await loginPage.isContinueDisabled();
    }
  );
});
