import path from "path";
import {execSync} from "child_process";

import {expandBasePath} from "../utils/expandBasePath";
import {resolveProfileName} from "../utils/profile";

import {getConfig} from "./config";

export function cloneRepository(repoUrl: string) {
  const profile = resolveProfileName();
  const config = getConfig(profile);

  if (!config) {
    throw new Error(
      `Configuration for profile '${profile}' is not set, please run \`duck config --profile ${profile}\` to set it up`,
    );
  }

  const sanitizedRepoUrl = repoUrl.replace("git@github.com:", "").replace(".git", "");
  const [projectName, repositoryName] = sanitizedRepoUrl.split("/");

  const projectPath = `"${expandBasePath(path.join(config.basePath, projectName))}"`;
  const repositoryPath = path.join(projectPath, repositoryName);

  execSync(`git clone ${repoUrl} ${repositoryPath}`);
}
