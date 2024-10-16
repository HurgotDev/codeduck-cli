import path from "path";
import {exec} from "child_process";
import fs from "fs";

import yaml from "yaml";
import colors from "picocolors";
import inquirer from "inquirer";

import {getDirectories} from "@/utils/getDirectories";
import {expandBasePath} from "@/utils/expandBasePath";

import {getConfig} from "./config";

function getProjects() {
  const config = getConfig();
  const projectPath = config.basePath;

  return getDirectories(projectPath);
}

function getRepositories(projectName: string) {
  const config = getConfig();
  const projectPath = path.join(config.basePath, projectName);

  return getDirectories(projectPath);
}

export async function listProjects() {
  const projects = getProjects();
  const {selectedProject} = await inquirer.prompt([
    {
      type: "list",
      name: "selectedProject",
      message: "Select a project",
      choices: projects,
    },
  ]);

  await listRepositories(selectedProject);
}

function getDefaultRepositories(projectName: string): string[] {
  const config = getConfig();
  const projectPath = expandBasePath(path.join(config.basePath, projectName));

  if (!fs.existsSync(path.join(projectPath, "epr.yml"))) {
    return [];
  }

  const file = fs.readFileSync(path.join(projectPath, "epr.yml"), "utf8");
  const data = yaml.parse(file);

  return data.defaultRepositories || [];
}

export async function listRepositories(projectName: string) {
  const defaultRepositories = getDefaultRepositories(projectName);

  const repositories = getRepositories(projectName).map((repo) => ({
    name: repo,
    value: repo,
    checked: defaultRepositories.includes(repo),
  }));

  const {selectedRepos} = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selectedRepos",
      message: "Select the repositories to open:",
      choices: repositories,
    },
  ]);

  openRepositories(projectName, selectedRepos);
}

export function openRepositories(projectName: string, repositories: string[]) {
  const config = getConfig();
  const projectPath = path.join(config.basePath, projectName);
  const editorCommand = config.editor === "vscode" ? "code" : "cursor";

  repositories.forEach((repo) => {
    const repoPath = path.join(projectPath, repo);
    const expandedRepoPath = expandBasePath(repoPath);

    exec(`${editorCommand} "${expandedRepoPath}"`, (error: any) => {
      if (error) {
        console.error(`Error opening ${repo}: ${error}`);
      } else {
        console.log(colors.green(`${repo} opened in ${config.editor}`));
      }
    });
  });
}
