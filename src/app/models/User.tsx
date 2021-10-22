export interface UserModel {
    _id: string;
    email: string;
    password?: string;
    username?: string;
    age?: number;
    favorites?: number[];
    friends?: number[];
}
// TODO - create proxies, so that user data is only available for primary code