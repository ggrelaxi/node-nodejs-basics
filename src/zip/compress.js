import { promisify } from "node:util";
import { pipeline } from "node:stream";
import { createGzip } from "node:zlib";
import * as url from "node:url";
import path from "node:path";
import { createReadStream, createWriteStream } from "node:fs";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const compress = async () => {
    const sourceFile = path.resolve(__dirname, "files", "fileToCompress.txt");
    const destinationFile = path.resolve(__dirname, "files", "archive.gz");

    const pipe = promisify(pipeline);

    const gzip = createGzip();
    const readStream = createReadStream(sourceFile);
    const writableStream = createWriteStream(destinationFile);

    try {
        await pipe(readStream, gzip, writableStream);
    } catch (e) {
        console.log(e);
    }
};

await compress();
