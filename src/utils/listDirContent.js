import process from 'node:process';
import fs from 'fs/promises';

export const listDirContent = async () => {
	const currentDirPath = process.cwd();

	try {
		const dirContent = await fs.readdir(currentDirPath);

		const typeAndPathRepresent = dirContent.map(async (itemPath) => {
			const stat = await fs.stat(itemPath);
			return [itemPath, stat.isDirectory() ? 'directory' : 'file'];
		});

		const data = await Promise.all(typeAndPathRepresent);

		const dataWithColumns = data.map(([name, type]) => {
			return { Name: name, Type: type };
		});

		console.table(dataWithColumns);
	} catch {
		console.error('\nOperation failed');
	}
};
