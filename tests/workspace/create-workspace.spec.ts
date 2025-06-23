import { test } from "../../fixtures/home-page.fixture";

test("sdfsdf", async ({ workspaceHome, page }) => {
  let val = await page.title();
  console.log(val);
  await (await workspaceHome.clickMenu()).clickCreateWorkspace();
});
