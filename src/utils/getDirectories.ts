import fs from "fs";
import { expandBasePath } from "@/utils/expandBasePath";

export function getDirectories(path: string) {
  const expandedBasePath = expandBasePath(path);

  try {
    return fs
      .readdirSync(expandedBasePath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch (error: any) {
    console.error(`Error reading directory: ${expandedBasePath}`);
    console.error(`Error message: ${error.message}`);
    return [];
  }
}


