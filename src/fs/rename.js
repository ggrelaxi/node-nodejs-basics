import fs from 'fs/promises';
import path from 'node:path';

const rename = async () => {
	// Write your code here
	const sourceFilename = path.resolve(import.meta.dirname, 'files', 'wrongFilename.txt');
	const destinationFilename = path.resolve(import.meta.dirname, 'files', 'properFilename.md');

	const isSourceFileExists = await fs
		.access(sourceFilename)
		.then(() => true)
		.catch(() => false);

	if (!isSourceFileExists) {
		throw new Error('FS operation failed');
	}

	const isDestinationFileExists = await fs
		.access(destinationFilename)
		.then(() => true)
		.catch(() => false);

	if (isDestinationFileExists) {
		throw new Error('FS operation failed');
	}

	try {
		await fs.rename(sourceFilename, destinationFilename);
	} catch {
		throw new Error('FS operation failed');
	}
};

await rename();
