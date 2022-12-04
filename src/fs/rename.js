import fs from "node:fs/promises";
import * as url from "node:url";
import path from "node:path";
import { existsSync } from "node:fs";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const rename = async () => {
    const odlFileName = path.resolve(__dirname, "files", "wrongFilename.txt");
    const newFileName = path.resolve(__dirname, "files", "properFilename.md");

    try {
        if (!existsSync(newFileName)) await fs.rename(odlFileName, newFileName);
        else {
            throw new Error("FS operation failed");
        }
    } catch (e) {
        throw new Error("FS operation failed");
    }
};

await rename();
