import { fileURLToPath } from "node:url";
import { default as path } from "node:path";
import { default as fs } from "node:fs";

export async function checkURL(url: string) {
  const response = await fetch(url);
  if (response.status === 200) {
    return true;
  }
  return false;
}

export function getRepoInfo(url: string) {
  const [, , , owner, repo, tree, branch, ...subArr] = url
    .replace(".git", "")
    .split("/");
  /** Ingnore first 3 elemets such as https:// github .com/ */

  const sub = subArr.join("/") || ".";
  const finalBranch = tree === "tree" ? branch : "main";
  const repoUrl = url.split("/").slice(0, 5).join("/").replace(".git", "");

  return { owner, repo, sub, branch: finalBranch, repoUrl };
}

export function getPath(dir: string): string {
  const __filename = fileURLToPath(import.meta.url);
  const distPath = path.dirname(__filename);
  const pkgRoot = path.join(distPath, "../");
  const pkgPath = path.join(pkgRoot, dir);

  return pkgPath;
}

export function getVersion() {
  const pkgPath = getPath("package.json");

  const pkg = fs.readFileSync(pkgPath, "utf8").toString();
  const version = JSON.parse(pkg).version;
  return version;
}
