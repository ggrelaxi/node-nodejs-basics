import { IncomingMessage, ServerResponse } from "http"
import { IUser } from "../types/user";

export const getUsers = (_: IncomingMessage, response: ServerResponse, params: Record<string, string>, users: IUser[]) => {
    response.statusCode = 200;
    response.write(JSON.stringify(users))
    response.end();
}