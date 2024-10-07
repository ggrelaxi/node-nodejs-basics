import { createReadStream, createWriteStream } from 'node:fs'
import { resolve } from 'node:path';
import { createUnzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

const decompress = async () => {
    // Write your code here 
    const input = createReadStream(resolve(import.meta.dirname, 'files', 'archive.gz'))
    const output = createWriteStream(resolve(import.meta.dirname, 'files', 'fileToCompress.txt'))
    const unzip = createUnzip();

    try {
        await pipeline(input, unzip, output)
    } catch(e) {
        console.error(e)
    }
};

await decompress();