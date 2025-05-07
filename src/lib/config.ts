import fs from "fs";
import path from "path";
import os from "os";

import colors from "picocolors";
import inquirer from "inquirer";

import {expandBasePath} from "../utils/expandBasePath";
import {Config} from "../types";

import {CONFIG_DIR, CONFIG_FILE, PROFILES_DIR} from "./constants";

export function getConfig(profile: string): Config | null {
  if (profile === "default") {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8")) as Config;
    }

    return null;
  }

  const profilePath = path.join(PROFILES_DIR, `${profile}.json`);

  if (fs.existsSync(profilePath)) {
    return JSON.parse(fs.readFileSync(profilePath, "utf8")) as Config;
  }

  return null;
}

function saveConfig(profile: string, config: Config) {
  const configDir = profile === "default" ? CONFIG_DIR : PROFILES_DIR;
  const configFile =
    profile === "default" ? CONFIG_FILE : path.join(PROFILES_DIR, `${profile}.json`);

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, {recursive: true});
  }

  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
}

export async function configureSettings(
  {profile = "default"}: {profile?: string} = {profile: "default"},
) {
  const config = getConfig(profile);

  console.log(`\n${colors.green("Configure your settings")}\n`);

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "basePath",
      message: "Enter the base path for projects:",
      default: config?.basePath ?? `${os.homedir()}/projects`,
      validate: (value) => {
        if (!fs.existsSync(expandBasePath(value))) {
          fs.mkdirSync(expandBasePath(value), {recursive: true});
        }

        return true;
      },
    },
    {
      type: "list",
      name: "editor",
      message: "Select the code editor:",
      choices: ["vscode", "cursor", "trae"],
      default: config?.editor ?? "vscode",
    },
  ]);

  saveConfig(profile, answers);
  // eslint-disable-next-line no-console
  console.log(`\n${colors.green("Settings saved successfully")}\n`);
}

export function listProfiles() {
  if (!fs.existsSync(PROFILES_DIR)) {
    console.log(`\n${colors.green("No profiles found")}\n`);

    return;
  }

  const profiles = fs.readdirSync(PROFILES_DIR);

  console.log(`\n${colors.green("Available profiles")}\n`);
  console.log(profiles.map((profile) => profile.replace(".json", "")).join("\n"));
}
