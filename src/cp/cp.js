import { fork } from 'node:child_process';
import path from 'node:path';

const spawnChildProcess = async (args) => {
	// Write your code here
	const sourceScriptPath = path.resolve(import.meta.dirname, 'files', 'script.js');
	const childProcess = fork(sourceScriptPath, args, { silent: true });

	process.stdin.pipe(childProcess.stdin);
	childProcess.stdout.pipe(process.stdout);
};

spawnChildProcess();
