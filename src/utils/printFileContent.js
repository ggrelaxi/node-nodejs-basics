import process from 'node:process';
import path from 'node:path';
import fs from 'fs/promises';
import { createReadStream } from 'node:fs';

export const printFileContent = async (args) => {
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
		await fs.access(absoluteFilepath);
		const stat = await fs.stat(absoluteFilepath);
		if (stat.isDirectory()) throw new Error();

		const readStream = createReadStream(absoluteFilepath);
		const content = [];
		const promiseContent = new Promise((resolve, reject) => {
			readStream.on('data', (chunk) => {
				content.push(chunk);
			});
			readStream.on('end', () => {
				console.log(content.join('').toString());
				resolve();
			});
			readStream.on('error', () => {
				reject();
			});
		});
		await promiseContent;
	} catch {
		console.error('\nOperation failed');
	}
};
