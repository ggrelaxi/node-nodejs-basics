import { resolve } from 'node:path';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { stdout } from 'node:process';

const calculateHash = async () => {
    // Write your code here 

    const hash = createHash('sha256')
    const streamData = createReadStream(resolve(import.meta.dirname, 'files', 'fileToCalculateHashFor.txt'))

    streamData.pipe(hash).setEncoding('hex').pipe(stdout)
};

await calculateHash();