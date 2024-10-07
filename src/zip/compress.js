import { createReadStream, createWriteStream } from 'node:fs'
import { resolve } from 'node:path';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

const compress = async () => {
    // Write your code here 
    const input = createReadStream(resolve(import.meta.dirname, 'files', 'fileToCompress.txt'))
    const output = createWriteStream(resolve(import.meta.dirname, 'files', 'archive.gz'))
    const gzip = createGzip();

    try {
        await pipeline(input, gzip, output)
    } catch(e) {
        console.error(e);
    }

};

await compress();