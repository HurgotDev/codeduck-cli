import {CURRENT_PROFILE_ENV_VAR} from "../lib/constants";

export function resolveProfileName(profileArg?: string) {
  if (profileArg) {
    return profileArg;
  }

  return process.env[CURRENT_PROFILE_ENV_VAR] ?? "default";
}
