export const API_CONFIG = {
    BASE_URL: 'https://restful-booker.herokuapp.com',
    ENDPOINTS: {
        USER: {
            LOGIN: 'user/login',
            LOGOUT: 'user/logout',
            GET_USER: 'user/',
            CREATE_USER: 'user'
        }
    },
    TIMEOUT: 30000,
    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
} as const;