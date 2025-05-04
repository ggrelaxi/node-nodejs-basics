import path from 'node:path';
import process from 'node:process';

export const getUpperDir = () => {
	const upperDir = path.resolve(process.cwd(), '..');
	process.chdir(upperDir);
};
