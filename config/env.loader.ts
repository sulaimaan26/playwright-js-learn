import { ENVKEY } from "../enums/env-key";

const getEnv = (key: ENVKEY): string => {
  let env = process.env[key];
  if (!env) {
    throw new Error(`No value present for key: ${key}`);
  }
  return env;
};

const setEnv = (key: ENVKEY, value: string) => {
  process.env[key] = value;
};

export { getEnv, setEnv };
