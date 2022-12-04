import fs from "node:fs/promises";
import * as url from "node:url";
import path from "node:path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const list = async () => {
    const destinationFolder = path.resolve(__dirname, "files");
    try {
        const files = await fs.readdir(destinationFolder);
        console.log(files);
    } catch (e) {
        throw new Error("FS operation failed");
    }
};

await list();
