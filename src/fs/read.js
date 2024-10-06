import { readFile } from 'fs/promises';
import { resolve } from 'node:path';

const read = async () => {
    // Write your code here 
    const sourcePath = resolve(import.meta.dirname, 'files', 'fileToRead.txt')

    try {
        const data = await readFile(sourcePath, { encoding: 'utf-8' })
        console.log(data)
    } catch(e) {
        throw new Error('FS operation failed')
    }
};

await read();