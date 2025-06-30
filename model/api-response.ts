import { APIResponse } from "@playwright/test";

export interface IAPIResponse<T> extends APIResponse {
  json(): Promise<T>;
}
