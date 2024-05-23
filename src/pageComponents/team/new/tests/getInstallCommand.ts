import { PackageManager } from "@/pageComponents/team/new/tests/constants";

export function getInstallCommand(
  packageManager: PackageManager,
  packageName: string,
  flags: { global?: boolean; development?: boolean } = {}
) {
  const { development = false, global = false } = flags;

  switch (packageManager) {
    case "npm": {
      const pieces: string[] = [packageManager, "install"];
      if (development) {
        pieces.push("--save-dev");
      }
      if (global) {
        pieces.push("--global");
      }
      pieces.push(packageName);
      return pieces.join(" ");
    }
    case "pnpm": {
      const pieces: string[] = [packageManager, "add"];
      if (development) {
        pieces.push("--save-dev");
      }
      if (global) {
        pieces.push("--global");
      }
      pieces.push(packageName);
      return pieces.join(" ");
    }
    case "yarn": {
      const pieces: string[] = [packageManager];
      if (global) {
        pieces.push("global");
      }
      pieces.push("add");
      if (development) {
        pieces.push("--dev");
      }
      pieces.push(packageName);
      return pieces.join(" ");
    }
  }
}
