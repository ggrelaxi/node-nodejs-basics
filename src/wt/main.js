import { Worker, workerData } from "node:worker_threads";
import * as url from "node:url";
import path from "node:path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const performCalculations = async () => {
    const sourceWorkerModule = path.resolve(__dirname, "worker.js");

    const workersCount = 8;
    let increment = 10;
    const promises = [];

    for (let i = 0; i < workersCount; i++) {
        const promiseInstance = new Promise((resolve, reject) => {
            const worker = new Worker(sourceWorkerModule, { workerData: increment++ });
            worker.on("message", (result) => resolve({ status: "resolved", value: result }));
            worker.on("error", (error) => {
                resolve({ status: "error", value: error });
            });
            worker.on("exit", (code) => {
                if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
        promises.push(promiseInstance);
    }

    Promise.all(promises)
        .then((data) => console.log(data))
        .catch((e) => console.log(e));
};

await performCalculations();
