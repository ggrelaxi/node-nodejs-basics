import { v4 as uuidv4 } from 'uuid';
import http from 'node:http';
import { IUser } from './types/user';
import 'dotenv/config';

const app = () => {
	const users: IUser[] = [{ id: uuidv4(), username: 'testUser', age: 33, hobies: ['moto'] }];

	const server = http.createServer((request, response) => {
		response.write('1');
		response.end();
	});

	server.listen(process.env.PORT, () => console.log('server started!'));
};

app();
