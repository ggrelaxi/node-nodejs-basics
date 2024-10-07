import process from 'node:process';

const parseArgs = () => {
    // Write your code here
    const [environmentPath, filepath, ...userArgv] = process.argv
    let parts = []

    for (let i = 0; i < userArgv.length; i += 2) {
        parts.push(`${userArgv[i].slice(2)} is ${userArgv[i + 1]}`);
    }

    console.log(parts.join(', '))
};

parseArgs();