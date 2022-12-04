import fs from "node:fs";
import * as url from "node:url";
import path from "node:path";
import { stdin } from "node:process";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const write = async () => {
    const destinationFile = path.resolve(__dirname, "files", "fileToWrite.txt");
    const writableStream = fs.createWriteStream(destinationFile);
    stdin.on("data", (chunk) => {
        writableStream.write(chunk.toString());
    });
};

await write();
