import os from "os";
import path from "path";

export const CONFIG_DIR = path.join(os.homedir(), ".codeduck-cli");

export const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

export const PROFILES_DIR = path.join(CONFIG_DIR, "profiles");

export const CURRENT_PROFILE_ENV_VAR = "CODEDUCK_PROFILE";

export const TELEMETRY_API_KEY = "phc_caeEU64Xtim0sveBWZyBa7ayk0WrcoTxU3hYRDKa268";

export const TELEMETRY_HOST = "https://us.i.posthog.com";

export const TELEMETRY_ENABLED_ENV_VAR = "CODEDUCK_TELEMETRY";
