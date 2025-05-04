import process from 'node:process';
import path from 'node:path';
import crypto from 'node:crypto';
import fs from 'fs/promises';
import { createReadStream, read } from 'node:fs';

export const calculateHash = async (args) => {
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

	const isSourceExisted = await fs
		.access(absoluteFilepath)
		.then(() => true)
		.catch(() => false);

	if (!isSourceExisted) {
		console.error('\nInvalid input');
		return;
	}

	const hash = crypto.createHash('sha256');
	const readStream = createReadStream(absoluteFilepath);

	const hashPromise = new Promise((resolve, reject) => {
		readStream.on('error', () => reject());
		readStream.on('data', (chunk) => {
			hash.update(chunk.toString());
		});
		readStream.on('end', () => {
			console.log(`\n${hash.digest('hex')}`);
			resolve();
		});
	});

	try {
		await hashPromise;
	} catch {
		console.error('\nOperation failed');
	}
};
