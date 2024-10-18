import path from "path";
import {cp, readFile, writeFile} from "node:fs/promises";
import crypto from "node:crypto";

import color from "picocolors";
import {glob} from "glob";
import inquirer from "inquirer";

import {expandBasePath} from "../utils/expandBasePath";

import {getConfig} from "./config";

const TEMPLATES = [
  {
    name: "Next.js 14 + Eslint + Typescript + Shadcn/ui + TailwindCSS",
    value: "next-14",
  },
];

export async function createApp() {
  try {
    const config = getConfig();
    const app = await inquirer.prompt([
      {
        type: "input",
        name: "namespace",
        message: "What is the namespace of your app?",
        default: "eme",
        validate: (value) => {
          if (!value.match(/^[a-zA-Z0-9-_]+$/)) {
            return "The namespace only can contain letters, numbers, dashes and underscores";
          }

          return true;
        },
      },
      {
        type: "input",
        name: "projectName",
        message: "What is the name of your app?",
        default: "eme-app",
        validate: (value) => {
          if (!value.match(/^[a-zA-Z0-9-_]+$/)) {
            return "El nombre del proyecto solo puede contener letras, números, guiones y guiones bajos";
          }

          return true;
        },
      },
      {
        type: "input",
        name: "projectDescription",
        message: "What is the description of your app?",
      },
      {
        type: "input",
        name: "apiBaseUrl",
        message: "What is the base URL of your API?",
        default: "http://localhost:3030",
      },
      {
        type: "list",
        name: "template",
        message: "Which template do you want to use?",
        default: 0,
        choices: TEMPLATES,
      },
    ]);

    const template = path.join(__dirname, "..", "templates", app.template);
    const destination = path.join(expandBasePath(config.basePath), app.namespace, app.projectName);

    // Copy the template to the destination
    await cp(path.join(template, "project"), destination, {recursive: true});

    // Get all files from the destination folder
    const files = await glob("**/*", {nodir: true, cwd: destination, absolute: true});

    const sessionTokenName = crypto.randomBytes(16).toString("hex");

    // Replace the placeholder with the actual values
    for await (const file of files) {
      const data = await readFile(file, "utf8");
      const draft = data
        .replace(/{{projectName}}/g, app.projectName)
        .replace(/{{projectDescription}}/g, app.projectDescription)
        .replace(/{{namespace}}/g, app.namespace)
        .replace(/{{sessionTokenName}}/g, sessionTokenName)
        .replace(/{{apiBaseUrl}}/g, app.apiBaseUrl);

      await writeFile(file, draft, "utf8");
    }

    console.log("\n✨ App created ✨");
    console.log(`\n${color.yellow(`Next steps:`)}\n`);
    console.log(`${color.green(`epr`)} open:repo ${app.namespace} ${app.projectName}`);
    console.log(`${color.green(`pnpm`)} install`);
    console.log(`${color.green(`pnpm`)} dev`);
  } catch (error) {
    console.log(error);
    console.log("\nBye 👋\n");
    process.exit(0);
  }
}
