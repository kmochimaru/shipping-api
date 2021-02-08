export interface JwtPayload {
    _id?: string;
    username: string;
    user_email: string;
    user_role: string;
    iat: number;
}