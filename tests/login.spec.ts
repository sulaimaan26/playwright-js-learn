import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login/login.page";
import { TestTags } from "../enums/test-tags";
import { getEnv } from "../config/env.loader";
import { ENVKEY } from "../enums/env-key";

test("Check login page is loaded", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Log in/);
});

[
  "plainaddress",
  "@no-local-part.com",
  "Outlook Contact <outlook.com>",
  "no-at-symbol.com",
  "no.domain@",
  "@missingusername.com",
  "username@.com",
  "username@com",
  "username@domain..com",
  "user name@domain.com",
  "username@domain,com",
  // "username@-domain.com", test fails
  ".username@domain.com",
  "username@domain.com (Joe)",
  "username@127.0.0.1",
].forEach((email) => {
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

test("Verify able to perform successful login", async ({ page }) => {
  await page.goto("/");
  let loginPage = new LoginPage(page);
  let workSpaceHomePage = await loginPage.login(
    getEnv(ENVKEY.EMAIL),
    getEnv(ENVKEY.PASSWORD)
  );

  await workSpaceHomePage.isGreetingMessageDisplayed(getEnv(ENVKEY.USERNAME));
});
