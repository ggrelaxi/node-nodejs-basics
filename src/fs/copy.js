import { cp, access } from 'fs/promises';
import { resolve } from 'node:path'
 
const copy = async () => {
    // Write your code here

    const pathFrom = resolve(import.meta.dirname, 'files')
    const pathTo = resolve(import.meta.dirname, 'files_copy')

    const isFromDirectoryExists = await access(pathFrom).then(() => true).catch(() => false);

    if (!isFromDirectoryExists) throw new Error('FS operation failed')

    try {
        await cp(pathFrom, pathTo, { errorOnExist: true, recursive: true, force: false })
    } catch(e) {
        throw new Error('FS operation failed')
    }
};

await copy();