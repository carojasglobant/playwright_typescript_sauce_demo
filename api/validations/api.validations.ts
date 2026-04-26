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

    static async validatePetResponse(response: any, expectedPet: any): Promise<void> {
        const pet = await response.json();
        expect(pet.id).toBe(expectedPet.id);
        expect(pet.name).toBe(expectedPet.name);
        expect(pet.status).toBe(expectedPet.status);
    }

    static async validatePetCreation(response: any): Promise<void> {
        expect([200, 201]).toContain(response.status());
        
        const pet = await response.json();
        expect(pet).toHaveProperty('id');
        expect(pet).toHaveProperty('name');
        expect(pet).toHaveProperty('status');
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

    static validateBadRequestOrServerError(response: any): void {
        expect([400, 405, 500]).toContain(response.status());
    }

    static async validatePetSchema(response: any): Promise<void> {
        const pet = await response.json();
        
        expect(pet).toHaveProperty('id');
        expect(pet).toHaveProperty('name');
        expect(pet).toHaveProperty('photoUrls');
        expect(Array.isArray(pet.photoUrls)).toBe(true);
        
        if (pet.category) {
            expect(pet.category).toHaveProperty('id');
            expect(pet.category).toHaveProperty('name');
        }
        
        if (pet.tags) {
            expect(Array.isArray(pet.tags)).toBe(true);
        }
    }
}