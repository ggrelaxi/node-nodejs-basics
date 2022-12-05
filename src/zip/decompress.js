import { promisify } from "node:util";
import { pipeline } from "node:stream";
import { createUnzip } from "node:zlib";
import * as url from "node:url";
import path from "node:path";
import { createReadStream, createWriteStream } from "node:fs";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const decompress = async () => {
    const sourceFile = path.resolve(__dirname, "files", "archive.gz");
    const destinationFile = path.resolve(__dirname, "files", "fileToCompress.txt");

    const readStream = createReadStream(sourceFile);
    const writableStream = createWriteStream(destinationFile);
    const unzipStream = createUnzip();

    const pipe = promisify(pipeline);

    try {
        await pipe(readStream, unzipStream, writableStream);
    } catch (e) {
        console.log(e);
    }
};

await decompress();
