import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const calculateHash = async () => {
	// Write your code here
	const sourceFilepath = path.resolve(import.meta.dirname, 'files', 'fileToCalculateHashFor.txt');
	const readStream = fs.createReadStream(sourceFilepath);
	const hash = crypto.createHash('sha256');

	readStream
		.on('data', (chunk) => {
			hash.update(chunk);
		})
		.on('end', () => {
			console.log(hash.digest('hex'));
		});
};

await calculateHash();
