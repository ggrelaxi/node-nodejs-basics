import { resolve } from 'node:path'; 
import { readdir  } from 'fs/promises';

const list = async () => {
    // Write your code here 
    const sourcePath = resolve(import.meta.dirname, 'files')

    try {
        const files = await readdir(sourcePath)
        console.log(files)
    } catch(e) {
        throw new Error('FS operation failed')
    }
};

await list();