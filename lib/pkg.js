"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateScripts = exports.installDependencies = exports.isPublic = exports.readPkg = void 0;
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const write_json_file_1 = __importDefault(require("write-json-file"));
const log_1 = require("./log");
function readPkg() {
    return JSON.parse(fs_1.default.readFileSync('package.json', 'utf-8'));
}
exports.readPkg = readPkg;
function isPublic(pkg) {
    return pkg.private !== true;
}
exports.isPublic = isPublic;
function installDependencies(pm, isPublic) {
    let args = [];
    switch (pm) {
        case 'npm': {
            args = ['install', '--save-dev', '--quiet'];
            break;
        }
        case 'yarn': {
            args = ['add', '--dev'];
            break;
        }
    }
    args.push('husky@5');
    if (isPublic) {
        args.push('pinst');
    }
    log_1.info(`$ ${pm} ${args.join(' ')}`);
    child_process_1.default.spawnSync(pm, args, { stdio: 'inherit' });
}
exports.installDependencies = installDependencies;
function updateScript(pkg, name, script) {
    var _a;
    if (((_a = pkg.scripts) === null || _a === void 0 ? void 0 : _a[name]) === undefined) {
        console.log(chalk_1.default `{yellow ⚠️ {bold ${name}} script already set in package.json, please append {bold \`${script}\`} manually.}`);
        return;
    }
    pkg.scripts = { ...pkg.scripts, [name]: script };
}
function updateScripts() {
    const pkg = readPkg();
    updateScript(pkg, 'postinstall', 'husky install');
    if (isPublic(pkg)) {
        updateScript(pkg, 'prepublishOnly', 'pinst --disable');
        updateScript(pkg, 'postpublish', 'pinst --enable');
    }
    write_json_file_1.default.sync('package.json', pkg, { detectIndent: true });
}
exports.updateScripts = updateScripts;
