import fs from 'node:fs';
import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';

const compress = async () => {
	// Write your code here
	const sourceFilepath = path.resolve(import.meta.dirname, 'files', 'fileToCompress.txt');
	const destinationFilepath = path.resolve(import.meta.dirname, 'files', 'archive.gz');

	const gzip = zlib.createGzip();
	const readStream = fs.createReadStream(sourceFilepath);
	const writeStream = fs.createWriteStream(destinationFilepath);

	try {
		await pipeline(readStream, gzip, writeStream);
	} catch (e) {
		console.error(e);
	}
};

await compress();
