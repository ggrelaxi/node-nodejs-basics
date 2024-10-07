import { fork } from "node:child_process";
import { resolve } from "node:path";

const spawnChildProcess = async (args) => {
    // Write your code here
    const child = fork(resolve(import.meta.dirname, 'files', 'script.js'), args)
};

spawnChildProcess();