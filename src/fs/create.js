import fs from 'fs/promises';
import path from 'node:path';

const create = async () => {
	// Write your code here
	const filepath = path.resolve(import.meta.dirname, 'files', 'fresh.txt');

	const isExists = await fs
		.access(filepath)
		.then(() => true)
		.catch(() => false);

	if (isExists) {
		throw new Error('FS operation failed');
	}

	try {
		await fs.writeFile(filepath, 'I am fresh and young');
	} catch {
		throw new Error('FS operation failed');
	}
};

await create();
