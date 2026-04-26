import { test, expect } from '@playwright/test';
import { PetService } from '../../api/services/pet.service';
import { ApiValidations } from '../../api/validations/api.validations';

test.describe('Pet API Tests - Create Pet Endpoint', () => {
    let petService: PetService;

    test.beforeEach(async ({ request }) => {
        petService = new PetService(request);
    });

    // Test Case 1: Create pet with complete valid data
    test('Create Pet - Complete Valid Data', async () => {
        const petData = {
            id: 12345,
            category: {
                id: 1,
                name: "Dogs"
            },
            name: "Fluffy",
            photoUrls: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
            tags: [
                {
                    id: 1,
                    name: "friendly"
                },
                {
                    id: 2,
                    name: "trained"
                }
            ],
            status: "available"
        };

        const response = await petService.createPet(petData);
        
        console.log('Response status:', response.status());
        console.log('Response body:', await response.text());
        
        await ApiValidations.validatePetResponse(response, petData);
        await ApiValidations.validatePetSchema(response);
    });

    // Test Case 2: Create pet with minimal required data
    test('Create Pet - Minimal Required Data', async () => {
        const petData = {
            id: 12346,
            name: "Minimal Pet",
            photoUrls: ["https://example.com/minimal.jpg"],
            status: "available"
        };

        const response = await petService.createPet(petData);
        
        console.log('Response status:', response.status());
        console.log('Response body:', await response.text());
        
        await ApiValidations.validatePetResponse(response, petData);
        await ApiValidations.validatePetSchema(response);
    });

    // Test Case 3: Create pet with different status values
    test('Create Pet - Status Pending', async () => {
        const petData = {
            id: 12347,
            name: "Pending Pet",
            photoUrls: ["https://example.com/pending.jpg"],
            status: "pending"
        };

        const response = await petService.createPet(petData);
        
        await ApiValidations.validatePetResponse(response, petData);
        expect(response.status()).toBe(200);
    });

    test('Create Pet - Status Sold', async () => {
        const petData = {
            id: 12348,
            name: "Sold Pet",
            photoUrls: ["https://example.com/sold.jpg"],
            status: "sold"
        };

        const response = await petService.createPet(petData);
        
        await ApiValidations.validatePetResponse(response, petData);
        expect(response.status()).toBe(200);
    });

    // Test Case 4: Create pet with missing required fields
    test('Create Pet - Missing Required Name Field', async () => {
        const petData = {
            id: 12349,
            photoUrls: ["https://example.com/noname.jpg"],
            status: "available"
        };

        const response = await petService.createPet(petData);
        
        console.log('Response status:', response.status());
        console.log('Response body:', await response.text());
        
        ApiValidations.validateBadRequestOrServerError(response);
    });

    test('Create Pet - Missing Required PhotoUrls Field', async () => {
        const petData = {
            id: 12350,
            name: "No Photo Pet",
            status: "available"
        };

        const response = await petService.createPet(petData);
        
        console.log('Response status:', response.status());
        console.log('Response body:', await response.text());
        
        ApiValidations.validateBadRequestOrServerError(response);
    });

    // Test Case 5: Create pet with invalid data
    test('Create Pet - Empty Object', async () => {
        const petData = {};

        const response = await petService.createPet(petData);
        
        console.log('Response status:', response.status());
        console.log('Response body:', await response.text());
        
        ApiValidations.validateBadRequestOrServerError(response);
    });

    test('Create Pet - Invalid Data Types', async () => {
        const petData = {
            id: "not-a-number",
            name: 12345,
            photoUrls: "not-an-array",
            status: 123
        };

        const response = await petService.createPet(petData);
        
        console.log('Response status:', response.status());
        console.log('Response body:', await response.text());
        
        ApiValidations.validateBadRequestOrServerError(response);
    });

    // Test Case 6: Create pet with empty arrays
    test('Create Pet - Empty Arrays', async () => {
        const petData = {
            id: 12351,
            name: "Empty Arrays Pet",
            photoUrls: [],
            tags: [],
            status: "available"
        };

        const response = await petService.createPet(petData);
        
        console.log('Response status:', response.status());
        console.log('Response body:', await response.text());
        
        await ApiValidations.validatePetResponse(response, petData);
        await ApiValidations.validatePetSchema(response);
    });

    // Test Case 7: Create pet with special characters
    test('Create Pet - Special Characters in Name', async () => {
        const petData = {
            id: 12352,
            name: "Pet @#$%^&*()_+-={}[]|\\:;\"'<>,.?/",
            photoUrls: ["https://example.com/special.jpg"],
            status: "available"
        };

        const response = await petService.createPet(petData);
        
        console.log('Response status:', response.status());
        console.log('Response body:', await response.text());
        
        await ApiValidations.validatePetResponse(response, petData);
    });

    // Test Case 8: Create pet with very long values
    test('Create Pet - Very Long Values', async () => {
        const longName = "A".repeat(1000);
        const longUrl = "https://example.com/" + "very".repeat(200) + "long.jpg";
        
        const petData = {
            id: 12353,
            name: longName,
            photoUrls: [longUrl],
            status: "available"
        };

        const response = await petService.createPet(petData);
        
        console.log('Response status:', response.status());
        console.log('Response body:', await response.text());
        
        await ApiValidations.validatePetResponse(response, petData);
    });

    // Test Case 9: Create duplicate pet with same ID
    test('Create Pet - Duplicate ID', async () => {
        const petData = {
            id: 54, // Existing ID from basic functionality test
            name: "Duplicate Pet",
            photoUrls: ["https://example.com/duplicate.jpg"],
            status: "available"
        };

        const response = await petService.createPet(petData);
        
        console.log('Response status:', response.status());
        console.log('Response body:', await response.text());
        
        // Should return 200 as it updates the existing pet, or 400/409
        expect([200, 400, 409]).toContain(response.status());
    });

    // Test Case 10: Create pet with negative ID
    test('Create Pet - Negative ID', async () => {
        const petData = {
            id: -1,
            name: "Negative ID Pet",
            photoUrls: ["https://example.com/negative.jpg"],
            status: "available"
        };

        const response = await petService.createPet(petData);
        
        console.log('Response status:', response.status());
        console.log('Response body:', await response.text());
        
        await ApiValidations.validatePetResponse(response, petData);
    });

    // Test Case 11: Create pet with zero ID
    test('Create Pet - Zero ID', async () => {
        const petData = {
            id: 0,
            name: "Zero ID Pet",
            photoUrls: ["https://example.com/zero.jpg"],
            status: "available"
        };

        const response = await petService.createPet(petData);
        
        console.log('Response status:', response.status());
        console.log('Response body:', await response.text());
        
        await ApiValidations.validatePetResponse(response, petData);
    });

    // Test Case 12: Create pet with null values
    test('Create Pet - Null Values', async () => {
        const petData = {
            id: 12354,
            name: "Null Values Pet",
            photoUrls: ["https://example.com/null.jpg"],
            category: null,
            tags: null,
            status: "available"
        };

        const response = await petService.createPet(petData);
        
        console.log('Response status:', response.status());
        console.log('Response body:', await response.text());
        
        await ApiValidations.validatePetResponse(response, petData);
    });

    // Test Case 13: Create pet and verify retrieval
    test('Create Pet - Verify Full CRUD Cycle', async () => {
        const petData = {
            id: 12355,
            name: "CRUD Test Pet",
            photoUrls: ["https://example.com/crud.jpg"],
            category: {
                id: 2,
                name: "Cats"
            },
            tags: [
                {
                    id: 3,
                    name: "playful"
                }
            ],
            status: "available"
        };

        // Create pet
        const createResponse = await petService.createPet(petData);
        expect(createResponse.status()).toBe(200);
        
        // Retrieve pet
        const getResponse = await petService.getPetById(petData.id);
        expect(getResponse.status()).toBe(200);
        await ApiValidations.validatePetResponse(getResponse, petData);
        
        // Update pet
        const updatedPetData = { ...petData, name: "Updated CRUD Test Pet", status: "sold" };
        const updateResponse = await petService.updatePet(updatedPetData);
        expect(updateResponse.status()).toBe(200);
        await ApiValidations.validatePetResponse(updateResponse, updatedPetData);
        
        // Verify update
        const verifyResponse = await petService.getPetById(petData.id);
        expect(verifyResponse.status()).toBe(200);
        await ApiValidations.validatePetResponse(verifyResponse, updatedPetData);
        
        // Delete pet
        const deleteResponse = await petService.deletePet(petData.id);
        expect(deleteResponse.status()).toBe(200);
        
        // Verify deletion
        const verifyDeletionResponse = await petService.getPetById(petData.id);
        expect(verifyDeletionResponse.status()).toBe(404);
    });
});