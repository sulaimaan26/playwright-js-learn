export interface SignUpRequest {
  csrfmiddlewaretoken: string;
  is_telemetry_enabled: "True" | "False";
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
  password: string;
  confirm_password: string;
}
