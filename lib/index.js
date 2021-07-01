"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const chalk_1 = __importDefault(require("chalk"));
const cosmiconfig_1 = require("cosmiconfig");
const fs_1 = __importDefault(require("fs"));
const husky_1 = require("husky");
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
        console.log(chalk_1.default `
{red ⚠️ {bold ${names.join(', ')}} hook${names.length > 1 ? 's' : ''} may need to be manually updated to be run via package manager.}

{bold Examples:}
  jest → npx --no-install jest
       → yarn jest

  jest && eslint → npx --no-install jest && npx --no-install eslint
                 → yarn jest && yarn eslint

  commitlint -E HUSKY_GIT_PARAMS → npx --no-install commitlint --edit $1
                                 → yarn commitlint --edit $1

See {underline https://typicode.github.io/husky/#/?id=migrate-from-v4-to-v7}
`);
    }
}
function run(removeV4Config) {
    var _a;
    const { hooks, filepath } = searchResult();
    Object.entries(hooks).forEach(([name, script]) => {
        const file = `.husky/${name}`;
        husky_1.set(file, script);
    });
    if (removeV4Config && filepath) {
        if (filepath.endsWith('package.json')) {
            const str = fs_1.default.readFileSync('package.json', 'utf-8');
            const regex = /^[ ]+|\t+/m;
            const indent = (_a = regex.exec(str)) === null || _a === void 0 ? void 0 : _a[0];
            const pkg = JSON.parse(str);
            delete pkg.husky;
            fs_1.default.writeFileSync('package.json', `${JSON.stringify(pkg, null, indent)}\n`);
            console.log('husky - deleted husky field from package.json');
        }
        else {
            fs_1.default.unlinkSync(filepath);
            console.log(`husky - removed ${filepath}`);
        }
    }
    showManualUpdateMessage(hooks);
}
exports.run = run;
