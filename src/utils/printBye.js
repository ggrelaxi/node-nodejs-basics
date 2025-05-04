export const printBye = (argsUsername) => {
	const username = argsUsername.split('=')[1];
	console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
};
