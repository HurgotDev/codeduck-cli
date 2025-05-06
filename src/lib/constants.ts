import os from "os";
import path from "path";

export const VERSION = "2.0.5";

export const CONFIG_DIR = path.join(os.homedir(), ".codeduck-cli");

export const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

export const PROFILES_DIR = path.join(CONFIG_DIR, "profiles");

export const CURRENT_PROFILE_ENV_VAR = "CODEDUCK_PROFILE";
