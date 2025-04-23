import process from 'node:process';

const parseArgs = () => {
	// Write your code here
	const args = process.argv.slice(2);
	const content = [];

	for (let i = 0; i < args.length; i += 2) {
		const name = args[i];
		const value = args[i + 1];

		content.push(`${name} is ${value}`);
	}

	console.log(content.join(', '));
};

parseArgs();
