import process, { stdout } from 'node:process';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const transform = async () => {
	// Write your code here
	const transform = new Transform({
		transform(chunk, _, callback) {
			callback(null, chunk.toString().split('').reverse().join(''));
		},
	});

	try {
		await pipeline(process.stdin, transform, process.stdout);
	} catch (e) {
		console.log(e);
	}
};

await transform();
