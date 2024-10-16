import fs from "fs";
import path from "path";

import colors from "picocolors";
import inquirer from "inquirer";

import {Config} from "@/types";

const configPath = path.join(__dirname, "..", "..", "config.json");

export function getConfig(): Config {
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, "utf8")) as Config;
  }

  return {basePath: "", editor: "vscode", setup: false} as Config;
}

function saveConfig(config: Config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

export async function configureSettings() {
  const config = getConfig();

  if (config.setup) {
    return;
  }

  console.log(`\n${colors.green("Configure your settings")}\n`);

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "basePath",
      message: "Enter the base path for projects:",
      default: config.basePath,
    },
    {
      type: "list",
      name: "editor",
      message: "Select the code editor:",
      choices: ["vscode", "cursor"],
      default: config.editor,
    },
  ]);

  saveConfig({
    ...answers,
    setup: true,
  });
  // eslint-disable-next-line no-console
  console.log(`\n${colors.green("Settings saved successfully")}\n`);
}
