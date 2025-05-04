import os from 'node:os';

const flags = {
	'--EOL': () => console.log(`\nEOL is - ${JSON.stringify(os.EOL)}`),
	'--cpus': () => {
		const cpus = os.cpus();
		console.log(`\nCPUS count is - ${cpus.length}`);
		cpus.forEach((cp) => {
			console.log(`Model - ${cp.model}\nSpeed - ${cp.speed} Ghz`);
		});
	},
	'--homedir': () => console.log(`\nHome dir is - ${os.homedir()}`),
	'--username': () => console.log(`\nUsername is - ${os.userInfo().username}`),
	'--architecture': () => console.log(`\nArchitecture is - ${os.arch()}`),
};

export const osInfo = async (args) => {
	if (args.length !== 1) {
		console.log('\nInvalid input');
		return;
	}

	const [flag] = args;

	if (!(flag in flags)) {
		console.log('\nInvalid input');
		return;
	}

	flags[flag](args);
};
