import { IAPIResponse } from "../api-response";
import { EmailCheckResponse } from "./email-check.response";

export interface SignInRequest {
  csrfmiddlewaretoken: string;
  email: string;
  password: string;
}
