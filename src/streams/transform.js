import { Transform } from "node:stream";
import { stdout, stdin } from "node:process";
import { pipeline } from "node:stream/promises";

const transform = async () => {
    const transformStream = new Transform({
        transform(chunk, enc, cb) {
            const upperCaseData = chunk.toString().split("").reverse().join("");
            cb(null, upperCaseData);
        },
    });
    try {
        await pipeline(stdin, transformStream, stdout);
    } catch (e) {
        console.log(e);
    }
};

await transform();
