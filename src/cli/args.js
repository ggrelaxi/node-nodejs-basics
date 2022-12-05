const parseArgs = () => {
    const processArguments = process.argv.slice(2);
    const result = [];

    for (let i = 0; i < processArguments.length; i += 2) {
        const key = processArguments[i];
        const value = processArguments[i + 1];
        result.push(`${key.slice(2)} is ${value}`);
    }
    console.log(result.join(", "));
};

parseArgs();
