import fs from "node:fs/promises";
import * as url from "url";
import path from "node:path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const create = async () => {
    const filepath = path.resolve(__dirname, "files", "fresh.txt");

    try {
        await fs.writeFile(filepath, "I am fresh and young", { flag: "wx" });
    } catch (e) {
        throw new Error("FS operation failed");
    }
};

await create();
