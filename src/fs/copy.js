import fs from "node:fs/promises";
import path from "node:path";
import * as url from "node:url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const copy = async () => {
    const sourceFilepath = path.resolve(__dirname, "files");
    const destionationFilePath = path.resolve(__dirname, "files_copy");
    try {
        await fs.cp(sourceFilepath, destionationFilePath, { force: false, recursive: true, errorOnExist: true });
    } catch (e) {
        throw new Error("FS operation failed");
    }
};

await copy();
