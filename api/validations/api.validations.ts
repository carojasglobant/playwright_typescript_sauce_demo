import { expect } from '@playwright/test';

export class ApiValidations {
    static async validateSuccessResponse(response: any, expectedContent?: string): Promise<void> {
        expect(response.status()).toBe(200);
        
        if (expectedContent) {
            const responseBody = await response.text();
            expect(responseBody).toContain(expectedContent);
        }
    }

    static async validateUserResponse(response: any, expectedUsername: string): Promise<void> {
        const user = await response.json();
        expect(user.username).toBe(expectedUsername);
    }

    static validatePossibleStatusCodes(response: any, expectedCodes: number[]): void {
        expect(expectedCodes).toContain(response.status());
    }

    static async validateErrorMessage(response: any, expectedMessage: string): Promise<void> {
        const responseBody = await response.json();
        expect(responseBody.message).toContain(expectedMessage);
    }

    static validateCreatedOrServerError(response: any): void {
        expect([200, 201, 500]).toContain(response.status());
    }

    static validateNotFoundOrServerError(response: any): void {
        expect([404, 500]).toContain(response.status());
    }
}