#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const chalk_1 = __importDefault(require("chalk"));
const install_1 = require("husky/lib/commands/install");
const config_1 = require("./config");
const log_1 = require("./log");
const pkg_1 = require("./pkg");
function run(pm) {
    const pkg = pkg_1.readPkg();
    pkg_1.installDependencies(pm, pkg_1.isPublic(pkg));
    log_1.info('$ husky install');
    install_1.install();
    console.log();
    config_1.copyHooks();
    log_1.info('Updating package.json scripts');
    pkg_1.updateScripts();
    console.log(chalk_1.default `{green
✅ Husky have been upgraded to v5, you can delete your previous configuration.

🐺 {bold Happy coding, woof!}

👋 {bold If you're using husky 5 in a commercial project or just want to help, you can sponsor it here}:
- {underline https://github.com/sponsors/typicode}
- {underline https://opencollective.com/husky}

Thank you!
}`);
}
exports.run = run;
