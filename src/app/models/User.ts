export interface User {
    id?: string;

    username: string;
    password?: string;
    email?: string;

    address?: string;
    phone?: string;

    //image: ???;

    role?: string;
}