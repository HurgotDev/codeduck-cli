#!/usr/bin/env node

import {program} from "commander";

import {VERSION} from "../lib/constants";
import {listProjects, listRepositories, openRepositories} from "../lib/projects";
import {configureSettings, listProfiles} from "../lib/config";
import {cloneRepository} from "../lib/repos";
import {createApp} from "../lib/app";
import {errorHandler} from "../utils/error";

program.version(VERSION).description("CLI for opening projects and repositories");

program
  .command("config")
  .description("Configure EME settings")
  .option("--profile <profile>", "Set profile name", "default")
  .action((options) => errorHandler(() => configureSettings(options)));

program
  .command("list-profiles")
  .description("List all profiles")
  .action(() => errorHandler(listProfiles));

program
  .command("open [projectName]")
  .description("Open a project or repository")
  .action((projectName) => {
    errorHandler(async () => {
      if (projectName) {
        await listRepositories(projectName);
      } else {
        await listProjects();
      }
    });
  });

program
  .command("open:repo [projectName] [repositoryName]")
  .description("Open a repository")
  .action((projectName, repositoryName) => {
    errorHandler(() => {
      openRepositories(projectName, [repositoryName]);
    });
  });

program
  .command("clone [repoUrl]")
  .description("Clone a repository")
  .action((repoUrl) => {
    errorHandler(() => cloneRepository(repoUrl));
  });

program
  .command("create app")
  .description("Create a new app")
  .action(() => errorHandler(createApp));

program.parse(process.argv);
