import fs from 'fs/promises';
import path from 'node:path';

const copy = async () => {
	// Write your code here
	const sourceDirpath = path.resolve(import.meta.dirname, 'files');
	const destinationDirpath = path.resolve(import.meta.dirname, 'files_copy');

	const isSourceDirExists = fs
		.access(sourceDirpath)
		.then(() => true)
		.catch(() => false);

	if (!isSourceDirExists) {
		throw new Error('FS operation failed');
	}

	try {
		await fs.cp(sourceDirpath, destinationDirpath, {
			recursive: true,
			force: false,
			errorOnExist: true,
		});
	} catch (e) {
		throw new Error('FS operation failed');
	}
};

copy();
