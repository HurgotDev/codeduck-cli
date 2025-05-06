import {CURRENT_PROFILE_ENV_VAR} from "../lib/constants";

export function resolveProfileName(profileArg?: string) {
  return process.env[CURRENT_PROFILE_ENV_VAR] ?? profileArg ?? "default";
}
