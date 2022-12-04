import fs from "node:fs/promises";
import * as url from "node:url";
import path from "node:path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const remove = async () => {
    const fileName = path.resolve(__dirname, "files", "fileToRemove.txt");

    try {
        await fs.rm(fileName);
    } catch (e) {
        throw new Error("FS operation failed");
    }
};

await remove();
