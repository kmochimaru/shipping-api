export interface JwtPayload {
    user_id?: string;
    username: string;
    user_email: string;
    user_role: string;
    iat: number;
}