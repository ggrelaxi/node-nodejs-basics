import { IncomingMessage, ServerResponse } from "http"
import { IUser } from "../types/user";

export const putUser = (request: IncomingMessage, response: ServerResponse, params: Record<string, string>, users: IUser[]) => {
    const { userId } = params
    const uuidPattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    console.log(userId)
    if (!uuidPattern.test(userId)) {
        response.statusCode = 400;
        response.write('Invalid user id (should be uuid)')
        response.end();
        return;
    }

    const existedUser = users.find(user => user.id === userId)

    if (!existedUser) {
        response.statusCode = 404;
        response.write('User not found')
        response.end();
        return;
    }

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

            const existedUserId = users.findIndex((user) => user.id === userId);
            users[existedUserId] = { id: existedUser.id, ...body }

            response.statusCode = 200;
            response.write(JSON.stringify(users[existedUserId]));
            response.end();
        })
        .on('error', () => {
            throw new Error()
        })
}