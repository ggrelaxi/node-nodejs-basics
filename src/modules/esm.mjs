import path from "node:path";
// const path = require("path");
import { release, version } from "node:os";
// const { release, version } = require("os");
import { createServer as createServerHttp } from "node:http";
// const { createServer: createServerHttp } = require("http");
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const __filename = fileURLToPath(import.meta.url);

await import("./files/c.js");

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    unknownObject = require("./files/a.json");
} else {
    unknownObject = require("./files/b.json");
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log("To terminate it, use Ctrl+C combination");
});

export default {
    unknownObject,
    myServer,
};
