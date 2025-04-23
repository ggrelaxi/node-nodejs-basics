import fs from 'fs/promises';
import path from 'node:path';

const read = async () => {
	// Write your code here
	const sourceFilepath = path.resolve(import.meta.dirname, 'files', 'fileToRead.txt');

	const isSourceFileExists = fs
		.access(sourceFilepath)
		.then(() => true)
		.catch(() => false);

	if (!isSourceFileExists) {
		throw new Error('FS operation failed');
	}

	try {
		const content = await fs.readFile(sourceFilepath);
		console.log(content.toString());
	} catch {
		throw new Error('FS operation failed');
	}
};

await read();
