import fs from 'fs/promises';
import path from 'node:path';

const remove = async () => {
	// Write your code here
	const sourceFilepath = path.resolve(import.meta.dirname, 'files', 'fileToRemove.txt');

	const isSourceFileExists = await fs
		.access(sourceFilepath)
		.then(() => true)
		.catch(() => false);

	if (!isSourceFileExists) {
		throw new Error('FS operation failed');
	}

	try {
		await fs.rm(sourceFilepath);
	} catch {
		throw new Error('FS operation failed');
	}
};

await remove();
