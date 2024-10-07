import { stdin, stdout } from 'node:process';
import { Transform } from 'node:stream';
import { pipeline } from "node:stream/promises";


const transform = async () => {
    const transform = new Transform({
        transform(chunk, _, callback) {
            callback(null, chunk.toString().split('').reverse().join(''))
        }
    })

    try {
        await pipeline(stdin, transform, stdout)
    } catch(e) {
        console.error(e)
    }
};

await transform();