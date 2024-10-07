import { cpus } from 'node:os'
import { Worker } from 'node:worker_threads';
import path from 'node:path';

const performCalculations = async () => {
    // Write your code here
    const threadCount = cpus().length;
    let increment = 10;
    const promises = []

    for (let i = 0; i < threadCount; i++) {
        const promise = new Promise((resolve) => {
            const worker = new Worker(path.resolve(import.meta.dirname, 'worker.js'), { workerData: increment++ })

            worker.on('message', (data) => resolve({ status: 'resolved', data }))
            worker.on('error', () => resolve({ status: 'error', data: null }))
        })

        promises.push(promise)
    }

    const result = await Promise.all(promises)

    console.log(result);
};

await performCalculations();