import { PackageManager } from "../helpers/get-pkg-manager";

export type TemplateType =
  | "app"
  | "app-empty"
  | "default"
  | "default-empty";

export interface GetTemplateFileArgs {
  template: TemplateType;
  file: string;
}

export interface InstallTemplateArgs {
  appName: string;
  root: string;
  packageManager: PackageManager;
  isOnline: boolean;
  template: TemplateType;
  eslint: boolean;
  srcDir: boolean;
  importAlias: string;
  skipInstall: boolean;
  turbo: boolean;
}
