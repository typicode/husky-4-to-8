#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const [, , arg] = process.argv;
_1.run(arg === '--remove-v4-config');
