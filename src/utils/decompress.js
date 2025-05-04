import process from 'node:process';
import path from 'node:path';
import zlib from 'node:zlib';
import fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

export const decompress = async (args) => {
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

	const isSourceExisted = await fs
		.access(absoluteSourceFilepath)
		.then(() => true)
		.catch(() => false);
	const isDestinationExisted = await fs
		.access(absoulteDestinationFilepath)
		.then(() => true)
		.catch(() => false);

	if (!isSourceExisted || isDestinationExisted) {
		console.log('\nInvalid input');
		return;
	}

	try {
		const readStream = createReadStream(absoluteSourceFilepath);
		const writeStream = createWriteStream(absoulteDestinationFilepath);
		const brotli = zlib.createBrotliDecompress();

		await pipeline(readStream, brotli, writeStream);
	} catch {
		console.error('\nOperation failed');
	}
};
