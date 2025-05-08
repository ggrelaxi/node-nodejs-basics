import { v4 as uuidv4 } from 'uuid';
import http, {IncomingMessage} from 'node:http';
import { IUser, Methods } from './types/user';
import { dynamicRoutes } from './routes/routes';
import url from 'node:url';

const app = () => {
	const users: IUser[] = [{ id: uuidv4(), username: 'testUser', age: 33, hobies: ['moto'] }];

	const server = http.createServer((request, response) => {
		const parsedUrl = url.parse(request.url as string, true);
		const pathname = parsedUrl.pathname as string;
		const method = request.method as Methods;

		dynamicRoutes(request, response, method, pathname, users)
	});

	server.listen(4000, () => console.log('server started!'));
};

app();
