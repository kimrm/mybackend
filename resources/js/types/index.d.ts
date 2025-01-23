export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

interface Project {
    id: number;
    title: string;
    description: string;
    created_at: date;
    author: Author;
    model: string;
    model_id: number;
    sort: number;
}

export interface Author {
    id: number;
    name: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
