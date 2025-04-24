import process from 'node:process';

const parseEnv = () => {
	// Write your code here
	const variables = Object.entries(process.env)
		.filter(([key]) => key.startsWith('RSS_'))
		.map(([key, value]) => `${key}=${value}`);

	console.log(variables.join('; '));
};

parseEnv();
