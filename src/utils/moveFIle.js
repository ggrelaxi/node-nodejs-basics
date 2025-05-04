import process from 'node:process';
import path from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import fs from 'fs/promises';

export const moveFile = async (args) => {
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
		const isSourceExisted = await fs
			.access(absoluteSourceFilepath)
			.then(() => true)
			.catch(() => false);
		const isDestinationExisted = await fs
			.access(absoulteDestinationFilepath)
			.then(() => true)
			.catch(() => false);

		if (!isSourceExisted || isDestinationExisted) {
			throw new Error();
		}

		const readStream = createReadStream(absoluteSourceFilepath);
		const writeSteam = createWriteStream(absoulteDestinationFilepath);

		const copyPromise = new Promise((resolve, reject) => {
			readStream.on('error', () => reject());
			writeSteam.on('error', () => reject());

			readStream.on('data', (chunk) => {
				writeSteam.write(chunk.toString());
			});
			readStream.on('end', () => writeSteam.end());

			writeSteam.on('finish', async () => {
				await fs.unlink(absoluteSourceFilepath);
				writeSteam.destroy();
				resolve();
			});
		});

		await copyPromise;
	} catch (e) {
		console.log(e);
		console.error('\nOperation failed');
	}
};
