import { IncomingMessage, ServerResponse } from "http";
import { getUsers } from "../handlers/getUsers";
import { IUser, Methods } from "../types/user";
import { getUserById } from "../handlers/getUserById";
import { createUser } from "../handlers/createUser";
import { putUser } from "../handlers/putUser";
import { deleteUser } from "../handlers/deleteUser";

export const dynamicRoutes = (request: IncomingMessage, response: ServerResponse, method: Methods, pathname: string, users: IUser[]) => {
    const routes = {
        'GET': [
            {
                pattern: /^\/api\/users$/,
                params: [],
                handler: getUsers
            },
            {
                pattern: /^\/api\/users\/([^\/]+)$/,
                params: ['userId'],
                handler: getUserById
            }
        ],
        "POST": [
            {
                pattern: /^\/api\/users$/,
                params: [],
                handler: createUser
            }
        ],
        "PUT": [
            {
                pattern: /^\/api\/users\/([^\/]+)$/,
                params: ['userId'],
                handler: putUser
            }
        ],
        "DELETE": [
            {
                pattern: /^\/api\/users\/([^\/]+)$/,
                params: ['userId'],
                handler: deleteUser
            }
        ]
    }

    const routesForMethod = routes[method] || [];

    for (const route of routesForMethod) {
        const match = pathname.match(route.pattern);

        if (match) {
            const params: Record<string, string> = {};
            route.params.forEach((paramName, index) => {
                params[paramName] = match[index + 1];
            })
            
            route.handler(request, response, params, users);
        }
    }
} 