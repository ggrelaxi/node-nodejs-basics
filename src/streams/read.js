import { stdout } from 'node:process';
import { resolve } from 'node:path';
import { createReadStream } from 'node:fs';

const read = async () => {
    // Write your code here 
    const stream = createReadStream(resolve(import.meta.dirname, 'files', 'fileToRead.txt'))

    stream.pipe(stdout)
};

await read();