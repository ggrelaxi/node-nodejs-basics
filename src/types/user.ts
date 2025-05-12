export interface IUser {
    id: string;
    username: string;
    age: number;
    hobies: string[]
}

export type Methods = "GET" | "POST" | "PUT" | "DELETE"