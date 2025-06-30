import { expect, APIRequestContext } from "@playwright/test";
import { AuthService } from "../services/auth.service";
import { WorkSpaceService } from "../services/workspace/workspace.service";
import { getEnv } from "../config/env.loader";
import { ENVKEY } from "../enums/env-key";

export class AuthProvider {
  /**
   *
   * @param email required email
   * @param password required password
   * @returns request context with cookie
   */
  public static async getAuthRequest(
    email = getEnv(ENVKEY.EMAIL),
    password = getEnv(ENVKEY.PASSWORD)
  ): Promise<APIRequestContext> {
    //Getting CSRF token and request context with cookie
    let authService = new AuthService();
    let tokenRes = await authService.getCSRFToken();
    const requestContext = tokenRes.requestContext;
    let tokenResponse = await tokenRes.response.json();
    let res = await authService.emailCheck(requestContext, email);
    await expect(res, {
      message: "Failed Res: " + (await res.json()),
    }).toBeOK();

    //signing in
    let signInResPonse = await authService.signIn(requestContext, {
      csrfmiddlewaretoken: tokenResponse.csrf_token,
      email,
      password,
    });
    await expect(signInResPonse, {
      message: "Failed Res: " + (await res.body()),
    }).toBeOK();

    //Hitting Me API ensuring login successful
    const workSpaceService = new WorkSpaceService(requestContext);
    let meRes = await workSpaceService.getMe();

    await expect(meRes, {
      message: "Failed Res: " + (await meRes.json()),
    }).toBeOK();

    return requestContext;
  }
}
