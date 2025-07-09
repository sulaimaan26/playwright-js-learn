import { chromium, expect, type FullConfig } from "@playwright/test";
import { AuthService } from "../services/auth.service";
import { AdminService } from "../services/admins.service";
import { SignUpRequest } from "../model/admin/sign-up.request";
import { faker } from "@faker-js/faker";
import { getEnv, setEnv } from "../config/env.loader";
import { ENVKEY } from "../enums/env-key";
import { WorkSpaceService } from "../services/workspace/workspace.service";
import { RandomData } from "../util/random-data.util";

async function globalSetup(config: FullConfig) {
  if (getEnv(ENVKEY.CI) == "false") return; //only for CI
  console.log("Alert! global setup running ");
  //Getting CSRF Token
  let authService = new AuthService();
  let authContext = await authService.getCSRFToken();
  await expect(authContext.response).toBeOK();
  let authRes = await authContext.response.json();
  let requestContext = authContext.requestContext;

  //Perform signup
  let adminService = new AdminService(authContext.requestContext);
  const password =
    faker.internet.password({ length: 12, memorable: true }) + "1@A";

  let data: SignUpRequest = {
    csrfmiddlewaretoken: authRes.csrf_token,
    is_telemetry_enabled: "True",
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    company_name: faker.company.name(),
    password,
    confirm_password: password,
  };
  console.log("Creating Admin....");
  let res = await adminService.signUpAdminUser(data);
  await expect(res.status()).toBe(302);

  //Login with created user
  let loginRes = await authService.signIn(requestContext, {
    csrfmiddlewaretoken: authRes.csrf_token,
    email: data.email,
    password: data.password,
  });
  await expect(loginRes).toBeOK();

  console.log("Created Admin successfully");
  console.table(data);

  let profileRes = await adminService.updateProfile({
    role: "Individual contributor",
    use_case: "Engineering",
  });
  await expect(profileRes).toBeOK();

  let updateMeProfileRes = await adminService.updateMe({
    first_name: data.first_name,
    last_name: data.last_name,
  });
  await expect(updateMeProfileRes).toBeOK();

  profileRes = await adminService.updateProfile({
    onboarding_step: {
      profile_complete: true,
      workspace_create: false,
      workspace_invite: false,
      workspace_join: false,
    },
  });
  await expect(profileRes).toBeOK();

  //creating workspace
  let workSpaceService = new WorkSpaceService(requestContext);
  let name = "Global" + RandomData.getRandomString();

  let workspaceRes = await workSpaceService.createWorkspace({
    name,
    organization_size: "",
    slug: name.toLowerCase(),
  });

  await expect(workspaceRes).toBeOK();

  //update tour status
  let tourRes = await adminService.updateTourStatus();
  await expect(tourRes).toBeOK();

  console.log("Setting up env data: ");
  setEnv(ENVKEY.EMAIL, data.email);
  setEnv(ENVKEY.PASSWORD, data.password);
  setEnv(ENVKEY.USERNAME, data.first_name + " " + data.last_name);
}

export default globalSetup;
