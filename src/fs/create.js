import { resolve } from 'node:path';
import { access, writeFile } from 'fs/promises';

const create = async () => {
    // Write your code here 
    const destinationFilename = resolve(import.meta.dirname, 'files', 'fresh.txt')

    let fileExists = await access(destinationFilename).then(() => true).catch(() => false);

    if (fileExists) {
        throw new Error('FS operation failed')
    }

    try {
        await writeFile(destinationFilename, 'I am fresh and young', { encoding: 'utf-8', flag: 'wx' })
    } catch(e) {
        throw new Error('FS operation failed')
    }
};

await create();