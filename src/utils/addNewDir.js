import process from 'node:process';
import path from 'node:path';
import fs from 'fs/promises';

export const addNewDir = async (args) => {
	let fixedArgs = args;
	if (args.join(' ').includes("'")) {
		fixedArgs = args.join(' ').match(/'.*?'/g);
	}
	if (args.join(' ').includes('"')) {
		fixedArgs = args.join(' ').match(/".*?"/g);
	}

	if (fixedArgs.length > args.length || fixedArgs.length !== 1) {
		console.log('\nInvalid input');
		return;
	}

	const [dirpath] = fixedArgs
		.map((arg) => arg.replaceAll("'", ''))
		.map((arg) => arg.replaceAll('"', ''));
	const currentDirPath = process.cwd();
	const absoluteDirpath = path.resolve(currentDirPath, dirpath);

	try {
		const isExisted = await fs
			.access(absoluteDirpath)
			.then(() => true)
			.catch(() => false);
		if (isExisted) throw new Error();
		await fs.mkdir(absoluteDirpath);
	} catch {
		console.error('\nOperation failed');
	}
};
