import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const write = async () => {
	// Write your code here
	const sourceFilepath = path.resolve(import.meta.dirname, 'files', 'fileToWrite.txt');
	const writeStream = fs.createWriteStream(sourceFilepath);

	process.stdin.pipe(writeStream);
};

await write();
