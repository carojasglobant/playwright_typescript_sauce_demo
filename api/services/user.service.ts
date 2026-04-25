import { API_CONFIG } from '../config/api.config';

export class UserService {
    private request: any;

    constructor(request: any) {
        this.request = request;
    }

    async loginUser(username: string, password: string): Promise<any> {
        return await this.request.get(`${API_CONFIG.ENDPOINTS.USER.LOGIN}?username=${username}&password=${password}`);
    }

    async logoutUser(): Promise<any> {
        return await this.request.get(API_CONFIG.ENDPOINTS.USER.LOGOUT);
    }

    async getUserByUsername(username: string): Promise<any> {
        return await this.request.get(`${API_CONFIG.ENDPOINTS.USER.GET_USER}${username}`);
    }

    async createUser(userData: any): Promise<any> {
        return await this.request.post(API_CONFIG.ENDPOINTS.USER.CREATE_USER, {
            data: userData,
            headers: API_CONFIG.HEADERS
        });
    }
}