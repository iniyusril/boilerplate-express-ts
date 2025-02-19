export interface UserRequest {
    email: string;
    password: string;
    full_name: string;
    status: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
}
