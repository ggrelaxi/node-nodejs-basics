import fs from "node:fs/promises";
import * as url from "node:url";
import path from "node:path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const read = async () => {
    const sourceFile = path.resolve(__dirname, "files", "fileToRead.txt");

    try {
        const content = await fs.readFile(sourceFile, { encoding: "utf8" });
        console.log(content);
    } catch (e) {
        throw new Error("FS operation failed");
    }
};

await read();
