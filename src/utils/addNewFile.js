import process from 'node:process';
import path from 'node:path';
import fs from 'fs/promises';

export const addNewFile = async (args) => {
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

	const [filepath] = fixedArgs
		.map((arg) => arg.replaceAll("'", ''))
		.map((arg) => arg.replaceAll('"', ''));
	const currentDirPath = process.cwd();
	const absoluteFilepath = path.resolve(currentDirPath, filepath);

	try {
		const isExisted = await fs
			.access(absoluteFilepath)
			.then(() => true)
			.catch(() => false);
		if (isExisted) throw new Error();
		await fs.writeFile(absoluteFilepath, '', { encoding: 'utf-8' });
	} catch {
		console.error('\nOperation failed');
	}
};
