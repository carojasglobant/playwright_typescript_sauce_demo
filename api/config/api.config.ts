export const API_CONFIG = {
    BASE_URL: 'https://petstore3.swagger.io/api/v3',
    ENDPOINTS: {
        USER: {
            LOGIN: 'user/login',
            LOGOUT: 'user/logout',
            GET_USER: 'user/',
            CREATE_USER: 'user'
        },
        PET: {
            CREATE: 'pet',
            GET_BY_ID: 'pet/',
            UPDATE: 'pet',
            DELETE: 'pet/'
        }
    },
    TIMEOUT: 30000,
    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
} as const;