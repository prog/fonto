#!/usr/bin/env node

import Main from "./commands/Main";



const main = new Main();
const args = process.argv.slice(2);
const result = main.exec(args);

process.exit(result);
