import path from "path";
import {exec} from "child_process";

import colors from "picocolors";
import inquirer from "inquirer";

import {resolveProfileName} from "../utils/profile";
import {getDirectories} from "../utils/getDirectories";
import {expandBasePath} from "../utils/expandBasePath";

import {getConfig} from "./config";

function getProjects(profile: string) {
  const config = getConfig(profile);

  if (!config) {
    throw new Error(
      `Configuration for profile '${profile}' is not set, please run \`duck config --profile ${profile}\` to set it up`,
    );
  }

  const projectPath = config.basePath;

  return getDirectories(projectPath);
}

function getRepositories(projectName: string, profile: string) {
  const config = getConfig(profile);

  if (!config) {
    throw new Error(
      `Configuration for profile '${profile}' is not set, please run \`duck config --profile ${profile}\` to set it up`,
    );
  }

  const projectPath = path.join(config.basePath, projectName);

  return getDirectories(projectPath);
}

export async function listProjects() {
  const profile = resolveProfileName();
  const projects = getProjects(profile);

  if (projects.length === 0) {
    throw new Error(
      `No projects found for profile '${profile}', pelase clone a projects first with \`duck clone\` or create a new project with \`duck create app\``,
    );
  }

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

export async function listRepositories(projectName: string) {
  const profile = resolveProfileName();

  const repositories = getRepositories(projectName, profile).map((repo) => ({
    name: repo,
    value: repo,
  }));

  if (repositories.length === 0) {
    throw new Error(
      `No repositories found for project '${projectName}', please clone a repository first with \`duck clone\` or create a new repository with \`duck create repo\``,
    );
  }

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
  const profile = resolveProfileName();
  const config = getConfig(profile);

  if (!config) {
    throw new Error(
      `Configuration for profile '${profile}' is not set, please run \`duck config --profile ${profile}\` to set it up`,
    );
  }

  const projectPath = path.join(config.basePath, projectName);
  const editorCommands = {
    vscode: "code",
    cursor: "cursor",
    trae: "trae",
  };
  const editorCommand = editorCommands[config.editor];

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
