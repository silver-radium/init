import { exec } from "child_process";
import path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function packageInstall(
  projectPath: string,
  packageManager: string,
): Promise<void> {
  const fullPath = path.resolve(process.cwd(), projectPath);
  const command = `${packageManager} install`;
  await execAsync(command, { cwd: fullPath });
}