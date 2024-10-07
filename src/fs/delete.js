import { rm } from 'fs/promises';
import { resolve } from 'node:path';

const remove = async () => {
    // Write your code here 

    const pathToRemove = resolve(import.meta.dirname, 'files', 'fileToRemove.txt')

    try {
        await rm(pathToRemove)
    } catch {
        throw new Error('FS operation failed')
    }
};

await remove();