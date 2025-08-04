import {
  APIRequestContext,
  request,
  defineConfig,
  expect,
} from "@playwright/test";
import config from "../playwright.config";
import { IAPIResponse } from "../model/api-response";
import { EmailCheckResponse } from "../model/auth/email-check.response";
import { CsrfTokenResponse } from "../model/auth/csrf-token.response";

export class AuthService {
  private readonly baseURL = config.use?.baseURL;

  constructor() {}

  /**
   * @returns requestContext for reusing the cookies
   * response actual API response with csrf toke
   */
  async getCSRFToken(): Promise<{
    requestContext: APIRequestContext;
    response: IAPIResponse<CsrfTokenResponse>;
  }> {
    const requestContext = await request.newContext({
      baseURL: this.baseURL,
    });

    let res = await requestContext.get("/auth/get-csrf-token/");
    await expect(res).toBeOK();

    return { requestContext, response: res };
  }

  async emailCheck(
    request: APIRequestContext,
    email: string
  ): Promise<IAPIResponse<EmailCheckResponse>> {
    return request.post(`/auth/email-check/`, { data: { email } });
  }

  async signIn(
    request: APIRequestContext,
    formData: { csrfmiddlewaretoken: string; email: string; password: string },
    maxRedirects = 20
  ): Promise<IAPIResponse<void>> {
    return request.post(`/auth/sign-in/`, { form: formData, maxRedirects });
  }
}
