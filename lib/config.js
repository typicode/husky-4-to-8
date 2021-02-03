"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyHooks = void 0;
const chalk_1 = __importDefault(require("chalk"));
const cosmiconfig_1 = require("cosmiconfig");
const add_1 = require("husky/lib/commands/add");
const log_1 = require("./log");
function searchResult() {
    const explorer = cosmiconfig_1.cosmiconfigSync('husky');
    const result = explorer.search();
    if (result === null) {
        throw new Error('no husky 4 config found');
    }
    const config = result === null || result === void 0 ? void 0 : result.config;
    return {
        hooks: (config === null || config === void 0 ? void 0 : config.hooks) || {},
        filepath: result === null || result === void 0 ? void 0 : result.filepath,
    };
}
function showManualUpdateMessage(hooks) {
    const names = [];
    const packageManagers = ['npm', 'npx', 'yarn', 'pnpm', 'pnpx'];
    const otherCriterias = ['HUSKY_GIT_PARAMS', '&&', '||'];
    if (hooks) {
        Object.entries(hooks).forEach(([name, script]) => {
            if (!packageManagers.some((s) => script.startsWith(s)) ||
                otherCriterias.some((s) => script.includes(s))) {
                names.push(name);
            }
        });
    }
    if (names.length > 0) {
        console.log(chalk_1.default `{yellow ⚠️ {bold ${names.join(', ')}} hook${names.length > 1 ? 's' : ''} may need to be manually updated to be run via package manager.

Examples:
  jest → npx --no-install jest
       → yarn jest

  jest && eslint → npx --no-install jest && npx --no-install eslint
                 → yarn jest && yarn eslint

  commitlint -E HUSKY_GIT_PARAMS → npx --no-install commitlint --edit $1
                                 → yarn commitlint --edit $1

See {underline https://typicode.github.io/husky/#/?id=migrate-from-v4-to-v5}
}`);
    }
}
function copyHooks() {
    const { hooks } = searchResult();
    Object.entries(hooks).forEach(([name, script]) => {
        const file = `.husky/${name}`;
        log_1.info(`$ husky add ${file} '${script}'`);
        add_1.add(file, script);
        console.log();
    });
    showManualUpdateMessage(hooks);
}
exports.copyHooks = copyHooks;
