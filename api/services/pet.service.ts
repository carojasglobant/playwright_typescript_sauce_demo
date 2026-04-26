import { API_CONFIG } from '../config/api.config';

export class PetService {
    private request: any;

    constructor(request: any) {
        this.request = request;
    }

    async createPet(petData: any): Promise<any> {
        return await this.request.post(API_CONFIG.ENDPOINTS.PET.CREATE, {
            data: petData,
            headers: API_CONFIG.HEADERS
        });
    }

    async getPetById(petId: number): Promise<any> {
        return await this.request.get(`${API_CONFIG.ENDPOINTS.PET.GET_BY_ID}${petId}`);
    }

    async updatePet(petData: any): Promise<any> {
        return await this.request.put(API_CONFIG.ENDPOINTS.PET.UPDATE, {
            data: petData,
            headers: API_CONFIG.HEADERS
        });
    }

    async deletePet(petId: number): Promise<any> {
        return await this.request.delete(`${API_CONFIG.ENDPOINTS.PET.DELETE}${petId}`);
    }
}