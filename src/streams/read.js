import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import os from 'node:os';

const read = async () => {
	// Write your code here
	const sourceFilepath = path.resolve(import.meta.dirname, 'files', 'fileToRead.txt');
	const readStream = fs.createReadStream(sourceFilepath);
	const data = [];

	readStream
		.on('data', (chunk) => {
			data.push(chunk);
		})
		.on('end', () => {
			process.stdout.write(data.join('') + os.EOL);
		});
};

await read();
