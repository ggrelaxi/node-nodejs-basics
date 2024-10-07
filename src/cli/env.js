import proccess from 'node:process'

const parseEnv = () => {
    // Write your code here 
    const filteredEnvRecords = Object
        .entries(process.env)
        .filter(([key, value]) => key.startsWith('RSS'))
        .map(([key, value]) => `${key}=${value}`).join('; ')

    console.log(filteredEnvRecords)
};

parseEnv();