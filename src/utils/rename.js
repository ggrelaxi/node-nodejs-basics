import process from 'node:process';
import path from 'node:path';
import fs from 'fs/promises';

export const rename = async (args) => {
	let fixedArgs = args;
	if (args.join(' ').includes("'")) {
		fixedArgs = args.join(' ').match(/'.*?'/g);
	}
	if (args.join(' ').includes('"')) {
		fixedArgs = args.join(' ').match(/".*?"/g);
	}

	if (fixedArgs.length > args.length || fixedArgs.length !== 2) {
		console.log('\nInvalid input');
		return;
	}

	const [sourceFilepath, destinationFilepath] = fixedArgs
		.map((arg) => arg.replaceAll("'", ''))
		.map((arg) => arg.replaceAll('"', ''));
	const currentDirPath = process.cwd();
	const absoluteSourceFilepath = path.resolve(currentDirPath, sourceFilepath);
	const absoulteDestinationFilepath = path.resolve(currentDirPath, destinationFilepath);

	try {
		await fs.rename(absoluteSourceFilepath, absoulteDestinationFilepath);
	} catch {
		console.error('\nOperation failed');
	}
};
