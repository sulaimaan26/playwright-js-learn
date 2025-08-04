import { expect, type FullConfig } from "@playwright/test";
import { AuthService } from "../services/auth.service";
import { InstancesService } from "../services/instances.service";
import { SignUpRequest } from "../model/admin/sign-up.request";
import { faker } from "@faker-js/faker";
import { getEnv, setEnv } from "../config/env.loader";
import { ENVKEY } from "../enums/env-key";
import { WorkSpaceService } from "../services/workspace/workspace.service";
import { UserService } from "../services/user.service";
import * as fs from "fs";

async function globalSetup(config: FullConfig) {
  if (getEnv(ENVKEY.RUN_GLOBAL_SETUP) == "false") return; //only for CI
  console.log("Alert! global setup running ");

  //Getting CSRF Token
  let authService = new AuthService();
  let authContext = await authService.getCSRFToken();
  await expect(authContext.response).toBeOK();
  let authRes = await authContext.response.json();
  let requestContext = authContext.requestContext;

  //Perform instance signup
  let instanceService = new InstancesService(authContext.requestContext);
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
  let res = await instanceService.signUp(data);
  await expect(res.status()).toBe(302);

  //Login with created user
  authContext = await authService.getCSRFToken();
  await expect(authContext.response).toBeOK();
  authRes = await authContext.response.json();
  requestContext = authContext.requestContext;

  let loginRes = await authService.signIn(
    requestContext,
    {
      csrfmiddlewaretoken: authRes.csrf_token,
      email: data.email,
      password: data.password,
    },
    0
  );
  await expect(loginRes.status()).toBe(302);
  const userService = new UserService(requestContext);
  console.log("Created Admin successfully");
  console.table(data);

  //Perform onboarding
  let profileRes = await userService.updateProfile({
    role: "Individual contributor",
    use_case: "Engineering",
  });
  await expect(profileRes).toBeOK();

  let updateMeProfileRes = await userService.updateMe({
    first_name: data.first_name,
    last_name: data.last_name,
  });
  await expect(updateMeProfileRes).toBeOK();

  profileRes = await userService.updateProfile({
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
  let name = getEnv(ENVKEY.DEFAULT_WORKSPACE_NAME);

  let workspaceRes = await workSpaceService.createWorkspace({
    name,
    organization_size: "",
    slug: name.toLowerCase(),
  });

  await expect(workspaceRes).toBeOK();

  //update tour status
  let tourRes = await userService.updateTourStatus();
  await expect(tourRes).toBeOK();

  console.log("Setting up env data: ");
  setEnv(ENVKEY.EMAIL, data.email);
  setEnv(ENVKEY.PASSWORD, data.password);
  setEnv(ENVKEY.USERNAME, data.first_name + " " + data.last_name);

  fs.writeFileSync(".tmp", JSON.stringify(data));
}

export default globalSetup;
