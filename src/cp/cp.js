import { fork } from "node:child_process";
import * as url from "node:url";
import path from "node:path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const spawnChildProcess = async (args) => {
    const childDestination = path.resolve(__dirname, "files", "script.js");

    const child = fork(childDestination, args);
};

spawnChildProcess();
