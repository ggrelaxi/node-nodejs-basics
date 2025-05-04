import path from 'node:path';
import process from 'node:process';
import fs from 'fs/promises';

export const changeDirectory = async (pathArgs) => {
	if (pathArgs.length !== 1) {
		console.log('Invalid input\n');
		return;
	}

	const [pathString] = pathArgs;
	const destinationPath = path.resolve(process.cwd(), pathString);

	try {
		await fs.access(destinationPath);
		process.chdir(destinationPath);
	} catch (e) {
		console.error('\nOperation failed');
	}
};
