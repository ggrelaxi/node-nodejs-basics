import process from 'node:process';
import { printBye } from './printBye.js';
import { getUpperDir } from './goUpperDir.js';
import { changeDirectory } from './changeDirectory.js';
import { listDirContent } from './listDirContent.js';
import { printFileContent } from './printFileContent.js';
import { addNewFile } from './addNewFile.js';
import { addNewDir } from './addNewDir.js';
import { deleteFile } from './deleteFile.js';
import { rename } from './rename.js';
import { copyFile } from './copyFile.js';
import { moveFile } from './moveFIle.js';

const commandsList = {
	'.exit': (_, userName) => {
		printBye(userName);
		process.exit(1);
	},
	SIGINT: (_, userName) => {
		printBye(userName);
		process.exit(1);
	},
	up: (args) => {
		getUpperDir(args);
	},
	cd: async (args) => {
		await changeDirectory(args);
	},
	ls: async () => {
		await listDirContent();
	},
	cat: async (args) => {
		await printFileContent(args);
	},
	add: async (args) => {
		await addNewFile(args);
	},
	mkdir: async (args) => {
		await addNewDir(args);
	},
	rn: async (args) => {
		await rename(args);
	},
	cp: async (args) => {
		await copyFile(args);
	},
	mv: async (args) => {
		await moveFile(args);
	},
	rm: async (args) => {
		await deleteFile(args);
	},
};

export const commandPrompts = {
	'.exit': 'Exit to File Manager',
	up: 'Go to parent DIR',
	cd: 'Go to dirpath <path>',
	ls: 'Print list of files, from current DIR',
	cat: 'Print file content by path <filepath>',
	add: 'Create new empty file <filepath>, from current DIR',
	mkdir: 'Create new directory <dirpath>, in current working directory',
	rn: 'Rename file <oldname> <newname>',
	cp: 'Copy file <oldfilepath> <newfilepath>',
	mv: 'Move file <oldpath> <newpath>',
	rm: 'Delete file by <filepath>',
	os: 'Print OS information. By setting --EOL, --cpus, --homedir, --username, --architecture',
	hash: 'Print hash of file by filepath <filepath>',
	compress: 'Compress file <filepath> <archive_filepath_without_extension>',
	decompress: 'Decompress file <archfilepath> <decompressfilepath>',
};

export const printCommandsPromts = () => {
	const prompts = Object.entries(commandPrompts)
		.map(([command, description]) => `${command} - ${description}`)
		.join('\n');
	console.log(`\nYou are currently in ${process.cwd()}`);

	console.log('\nAvailable commands list\n');
	console.log(prompts, '\n');
};

export const commandDispatch = async (command, args, userName) => {
	if (command in commandsList) {
		await commandsList[command](args, userName);
		return;
	}
	console.log('\nInvalid input');
};
