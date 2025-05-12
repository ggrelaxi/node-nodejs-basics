import http from 'node:http';
import { IUser, Methods } from './types/user';
import { dynamicRoutes } from './routes/routes';
import url from 'node:url';
import 'dotenv/config';

const app = () => {
	const users: IUser[] = [];

	const server = http.createServer(async (request, response) => {
		const parsedUrl = url.parse(request.url as string, true);
		const pathname = parsedUrl.pathname as string;
		const method = request.method as Methods;

		try {
			await dynamicRoutes(request, response, method, pathname, users);
			throw new Error();
		} catch (e) {
			response.statusCode = 500;
			response.write('Internal server error');
			response.end();
		}
	});

	server.listen(process.env.PORT, () => console.log('server started!'));
	server.on('error', (error) => {
		console.error(error);
	});

	return server;
};

app();
