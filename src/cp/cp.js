import { spawn, exec, fork } from 'node:child_process';
import path from 'node:path';

const spawnChildProcess = async (args) => {
	// Write your code here
	const sourceScriptPath = path.resolve(import.meta.dirname, 'files', 'script.js');
	fork(sourceScriptPath, args, {
		stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
	});
};

spawnChildProcess();
