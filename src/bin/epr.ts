#!/usr/bin/env node

import {program} from "commander";

import {listProjects, listRepositories, openRepositories} from "../lib/projects";
import {configureSettings} from "../lib/config";
import {cloneRepository} from "../lib/repos";
import {createApp} from "../lib/app";

program.version("1.3.1").description("CLI for opening projects and repositories");

program
  .command("config")
  .description("Configure EME settings")
  .option("--reset", "Reset configuration")
  .action((options) => configureSettings(options));

program
  .command("open [projectName]")
  .description("Open a project or repository")
  .action(async (projectName) => {
    await configureSettings();

    if (projectName) {
      await listRepositories(projectName);
    } else {
      await listProjects();
    }
  });

program
  .command("open:repo [projectName] [repositoryName]")
  .description("Open a repository")
  .action(async (projectName, repositoryName) => {
    await configureSettings();
    openRepositories(projectName, [repositoryName]);
  });

program
  .command("clone [repoUrl]")
  .description("Clone a repository")
  .action(async (repoUrl) => {
    await configureSettings();
    cloneRepository(repoUrl);
  });

program
  .command("create app")
  .description("Create a new app")
  .action(async () => {
    await configureSettings();
    createApp();
  });

program.parse(process.argv);
