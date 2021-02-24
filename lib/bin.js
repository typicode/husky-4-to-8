#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs/yargs"));
const helpers_1 = require("yargs/helpers");
const index_1 = require("./index");
const log_1 = require("./log");
const packageManagers = ['npm', 'yarn', 'pnpm'];
const argv = yargs_1.default(helpers_1.hideBin(process.argv)).option('package-manager', {
    alias: 'pm',
    describe: 'package manager to be used',
    choices: packageManagers,
    demandOption: true,
}).argv;
try {
    index_1.run(argv['package-manager']);
}
catch (e) {
    log_1.error(e.message);
    process.exit(1);
}
