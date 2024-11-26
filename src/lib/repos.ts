import path from "path";
import {execSync} from "child_process";

import {expandBasePath} from "../utils/expandBasePath";

import {getConfig} from "./config";

export function cloneRepository(repoUrl: string) {
  const config = getConfig();

  const sanitizedRepoUrl = repoUrl.replace("git@github.com:", "").replace(".git", "");
  const [projectName, repositoryName] = sanitizedRepoUrl.split("/");

  const projectPath = `"${expandBasePath(path.join(config.basePath, projectName))}"`;
  const repositoryPath = path.join(projectPath, repositoryName);

  execSync(`git clone ${repoUrl} ${repositoryPath}`);
}
