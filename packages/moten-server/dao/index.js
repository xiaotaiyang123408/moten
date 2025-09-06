import { PageDAO } from "./page.js";
import { UserDAO } from "./user.js";
import { PackageDAO } from "./package.js";
import { LogDAO } from "./log.js";
export const pageDao = new PageDAO()
export const userDao = new UserDAO()
export const packageDao = new PackageDAO()
export const logDao = new LogDAO()