import { IncomingMessage, ServerResponse } from "http"
import { IUser } from "../types/user";
import { v4 as uuidv4 } from 'uuid';

export const createUser = (request: IncomingMessage, response: ServerResponse, params: Record<string, string>, users: IUser[]) => {
    let buffer: Buffer[] = [];
    
    request
        .on('data', (chunk: Buffer) => {
            buffer.push(chunk);
        })
        .on('end', () => {
            const body = JSON.parse(Buffer.concat(buffer).toString());
            const requiredFields = ['name', 'age', 'hobbies']

            const isRequiredFiledsSend = requiredFields.every((field) => field in body)
            
            if (!isRequiredFiledsSend) {
                response.statusCode = 400;
                response.write('Required fields not submitted')
                response.end();
                return;
            }

            const newUser = { id: uuidv4(), ...body };
            users.push(newUser)

            response.statusCode = 201;
            response.write(JSON.stringify(newUser));
            response.end();
        })
        .on('error', () => {
            throw new Error()
        })
}