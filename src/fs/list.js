import fs from 'fs/promises';
import path from 'node:path';

const list = async () => {
	// Write your code here
	const sourceDirpath = path.resolve(import.meta.dirname, 'files');

	const isSourceDirExists = fs
		.access(sourceDirpath)
		.then(() => true)
		.catch(() => false);

	if (!isSourceDirExists) {
		throw new Error('FS operation failed');
	}

	try {
		const files = await fs.readdir(sourceDirpath);
		console.log(files.join('\n'));
	} catch {
		throw new Error('FS operation failed');
	}
};

await list();
