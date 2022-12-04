const parseEnv = () => {
    const enviromentVariables = Object.entries(process.env)
        .filter(([key]) => key.startsWith("RSS"))
        .map(([key, value]) => `${key}=${value}`)
        .join("; ");
    console.log(enviromentVariables);
};

parseEnv();
