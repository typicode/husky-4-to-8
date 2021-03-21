#!/usr/bin/env node
import { run } from './'

const [, , arg] = process.argv

run(arg === '--remove-v4-config')
