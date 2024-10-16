import os from "os";

export function expandBasePath(basePath: string) {
  return basePath.replace(/^~(?=$|\/|\\)/, os.homedir());
}
