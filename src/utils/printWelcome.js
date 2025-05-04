export const printWelcome = (argsUsername) => {
	const username = argsUsername.split('=')[1];

	console.log(`Welcome to the File Manager, ${username}!`);
};
