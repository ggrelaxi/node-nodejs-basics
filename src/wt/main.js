import os from 'node:os';
import { Worker } from 'node:worker_threads';
import path from 'node:path';

const performCalculations = async () => {
	// Write your code here
	const cpuCounts = os.cpus().length;
	let counter = 10;
	const workers = [];

	for (let i = 0; i < cpuCounts; i++) {
		const promise = new Promise((resolve, reject) => {
			const worker = new Worker(path.resolve(import.meta.dirname, 'worker.js'), {
				workerData: counter++,
			});

			worker.on('message', (fibo) => {
				resolve({ status: 'resolved', data: fibo });
			});
			worker.on('error', () => {
				reject({ status: 'error', data: null });
			});
		});
		workers.push(promise);
	}

	const result = await Promise.allSettled(workers);
	console.log(result.map((record) => record.value ?? record.reason));
};

await performCalculations();
