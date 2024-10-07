import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path';
import { stdin } from 'node:process';

const write = async () => {
    // Write your code here 

    const stream = createWriteStream(resolve(import.meta.dirname, 'files', 'fileToWrite.txt'))
    stdin.pipe(stream);
};

await write();