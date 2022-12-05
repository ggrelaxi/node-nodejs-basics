import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import * as url from "node:url";
import path from "node:path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const calculateHash = async () => {
    const sourceFile = path.resolve(__dirname, "files", "fileToCalculateHashFor.txt");

    try {
        const content = await fs.readFile(sourceFile, "utf-8");
        const hash = createHash("sha256").update(content);
        console.log(hash.digest("hex"));
    } catch (e) {
        throw new Error(e);
    }
};

await calculateHash();
