import fs from "fs";
import path from "path";
import os from "os";

import colors from "picocolors";
import inquirer from "inquirer";

import {expandBasePath} from "../utils/expandBasePath";
import {Config} from "../types";

const configDir = path.join(os.homedir(), ".epr-cli");
const configPath = path.join(configDir, "config.json");

const defaultConfig = {
  basePath: path.join(os.homedir(), "projects"),
  editor: "vscode",
  setup: false,
} as Config;

export function getConfig(): Config {
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, "utf8")) as Config;
  }

  return defaultConfig;
}

function saveConfig(config: Config) {
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
  }

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

export async function configureSettings(options?: {reset: boolean}) {
  const config = getConfig();

  if (config.setup && !options?.reset) {
    return;
  }

  console.log(`\n${colors.green("Configure your settings")}\n`);

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "basePath",
      message: "Enter the base path for projects:",
      default: defaultConfig.basePath,
      validate: (value) => {
        if (!fs.existsSync(expandBasePath(value))) {
          return "The base path does not exist";
        }

        return true;
      },
    },
    {
      type: "list",
      name: "editor",
      message: "Select the code editor:",
      choices: ["vscode", "cursor"],
      default: defaultConfig.editor,
    },
  ]);

  saveConfig({
    ...answers,
    setup: true,
  });
  // eslint-disable-next-line no-console
  console.log(`\n${colors.green("Settings saved successfully")}\n`);
}
