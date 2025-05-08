import { IncomingMessage, ServerResponse } from "http"
import { IUser } from "../types/user";

export const deleteUser = (_: IncomingMessage, response: ServerResponse, params: Record<string, string>, users: IUser[]) => {
    const { userId } = params
    const uuidPattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

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
    const existedUserId = users.findIndex(user => user.id === userId);
    users.splice(existedUserId, 1)
    
    response.statusCode = 200;
    response.end();
}