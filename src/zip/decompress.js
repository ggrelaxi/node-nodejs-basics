import fs from 'node:fs';
import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';

const decompress = async () => {
	// Write your code here
	const sourceFilepath = path.resolve(import.meta.dirname, 'files', 'archive.gz');
	const destinationFilepath = path.resolve(import.meta.dirname, 'files', 'fileToCompress.txt');

	const unzip = zlib.createUnzip();
	const readStream = fs.createReadStream(sourceFilepath);
	const writeStream = fs.createWriteStream(destinationFilepath);

	try {
		await pipeline(readStream, unzip, writeStream);
	} catch (e) {
		console.error(e);
	}
};

await decompress();
