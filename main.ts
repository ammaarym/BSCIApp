import axios, { AxiosResponse } from 'axios';

// Define the Client interface
interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

// BSCI Client class to interact with the API
class BSCIClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    // Get all clients
    public async getClients(): Promise<Client[]> {
        try {
            const response: AxiosResponse<Client[]> = await axios.get(`${this.baseURL}/clients`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching clients: ${(error as Error).message}`);
        }
    }

    // Get a client by ID
    public async getClientById(id: number): Promise<Client> {
        try {
            const response: AxiosResponse<Client> = await axios.get(`${this.baseURL}/clients/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching client with ID ${id}: ${(error as Error).message}`);
        }
    }

    // Create a new client
    public async createClient(newClient: Omit<Client, 'id'>): Promise<Client> {
        try {
            const response: AxiosResponse<Client> = await axios.post(`${this.baseURL}/clients`, newClient);
            return response.data;
        } catch (error) {
            throw new Error(`Error creating client: ${(error as Error).message}`);
        }
    }

    // Update a client
    public async updateClient(id: number, updatedClient: Partial<Client>): Promise<Client> {
        try {
            const response: AxiosResponse<Client> = await axios.put(`${this.baseURL}/clients/${id}`, updatedClient);
            return response.data;
        } catch (error) {
            throw new Error(`Error updating client with ID ${id}: ${(error as Error).message}`);
        }
    }

    // Delete a client
    public async deleteClient(id: number): Promise<void> {
        try {
            await axios.delete(`${this.baseURL}/clients/${id}`);
        } catch (error) {
            throw new Error(`Error deleting client with ID ${id}: ${(error as Error).message}`);
        }
    }
}

// Main function to demonstrate using the BSCIClient
const main = async () => {
    const baseURL = 'https://api.example.com';  // Replace with your actual API base URL
    const clientService = new BSCIClient(baseURL);

    try {
        // Get all clients
        const clients: Client[] = await clientService.getClients();
        console.log('All clients:', clients);

        // Get a specific client by ID
        const client = await clientService.getClientById(1);
        console.log('Client with ID 1:', client);

        // Create a new client
        const newClient: Omit<Client, 'id'> = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '555-1234',
            address: '123 Main St',
        };
        const createdClient = await clientService.createClient(newClient);
        console.log('Created client:', createdClient);

        // Update a client
        const updatedClient = await clientService.updateClient(createdClient.id, {
            phone: '555-5678',
        });
        console.log('Updated client:', updatedClient);

        // Delete a client
        await clientService.deleteClient(createdClient.id);
        console.log(`Deleted client with ID ${createdClient.id}`);

    } catch (error) {
        console.error('Error:', error);
    }
};

// Run the main function
main();
