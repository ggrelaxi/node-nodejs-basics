import fs from 'fs/promises';
import { resolve } from 'node:path'

const rename = async () => {
    // Write your code here
    const pathFrom = resolve(import.meta.dirname, 'files', 'wrongFilename.txt')
    const pathTo = resolve(import.meta.dirname, 'files', 'properFilename.md')

    const pathFromExists = await fs.access(pathFrom).then(() => true).catch(() => false);

    if (!pathFromExists) throw new Error('FS operation failed')

    const pathToExists = await fs.access(pathTo).then(() => true).catch(() => false);

    if (pathToExists) throw new Error('FS operation failed')

    try {
        await fs.rename(pathFrom, pathTo)
    } catch(e) {
        throw new Error('FS operation failed')
    }
};

await rename();