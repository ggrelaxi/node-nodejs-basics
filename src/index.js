import process from 'node:process';
import os from 'node:os';
import { commandDispatch, printCommandsPromts } from './utils/commandDispatch.js';
import { printWelcome } from './utils/printWelcome.js';

export const runFileManager = async () => {
	const [shell, currentFilepath, userName] = process.argv;
	printWelcome(userName);
	process.chdir(os.homedir());
	printCommandsPromts();

	process.stdin.on('data', async (userInput) => {
		let [command, ...args] = userInput.toString().trim().split(' ');

		await commandDispatch(command, args, userName);
		printCommandsPromts();
	});

	process.on('SIGINT', () => {
		commandDispatch('SIGINT', '', userName);
	});
};
