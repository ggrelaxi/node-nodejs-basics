import fs from "node:fs";
import * as url from "node:url";
import path from "node:path";
import { stdout } from "node:process";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const read = async () => {
    const sourceFile = path.resolve(__dirname, "files", "fileToRead.txt");
    const readableStream = fs.createReadStream(sourceFile);

    readableStream.on("data", (chunk) => {
        stdout.write(chunk.toString());
    });
};

await read();
