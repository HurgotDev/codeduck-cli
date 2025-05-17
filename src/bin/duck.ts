#!/usr/bin/env node

import {program} from "commander";

import {listProjects, listRepositories, openRepositories} from "../lib/projects";
import {configureSettings, listProfiles} from "../lib/config";
import {cloneRepository} from "../lib/repos";
import {createApp} from "../lib/app";
import {errorHandler} from "../utils/error";
import {withTelemetry} from "../lib/telemetry";
import pkg from "../../package.json";

program.version(pkg.version).description("CLI for opening projects and repositories");

program
  .command("config")
  .description("Configure EME settings")
  .option("--profile <profile>", "Set profile name", "default")
  .action((options) => {
    errorHandler(
      withTelemetry(() => configureSettings(options), {
        event: "cli_config_command",
        properties: options,
      }),
    );
  });

program
  .command("list-profiles")
  .description("List all profiles")
  .action(() => {
    errorHandler(
      withTelemetry(listProfiles, {
        event: "cli_list_profiles_command",
      }),
    );
  });

program
  .command("open [projectName]")
  .description("Open a project or repository")
  .option("--profile <profile>", "Open a project or repository with a specific profile")
  .action((projectName, options) => {
    console.log("[options]", options);
    errorHandler(
      withTelemetry(
        async () => {
          if (projectName) {
            await listRepositories(projectName, options);
          } else {
            await listProjects(options);
          }
        },
        {
          event: "cli_open_command",
          properties: {
            hasProjectName: Boolean(projectName),
          },
        },
      ),
    );
  });

program
  .command("open:repo [projectName] [repositoryName]")
  .description("Open a repository")
  .action((projectName, repositoryName) => {
    errorHandler(
      withTelemetry(
        () => {
          openRepositories(projectName, [repositoryName]);
        },
        {
          event: "cli_open_repo_command",
          properties: {
            hasProjectName: Boolean(projectName),
            hasRepositoryName: Boolean(repositoryName),
          },
        },
      ),
    );
  });

program
  .command("clone [repoUrl]")
  .description("Clone a repository")
  .action((repoUrl) => {
    errorHandler(
      withTelemetry(() => cloneRepository(repoUrl), {
        event: "cli_clone_command",
        properties: {
          hasRepoUrl: Boolean(repoUrl),
        },
      }),
    );
  });

program
  .command("create app")
  .description("Create a new app")
  .action(() => {
    errorHandler(
      withTelemetry(createApp, {
        event: "cli_create_app_command",
      }),
    );
  });

program.parse(process.argv);
