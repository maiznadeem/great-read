import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000"
});

export async function getBooks(offset, limit) {
    try {
        const response = await api.get(`/get/books?offset=${offset}&limit=${limit}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch books: ${error.message}`);
    }
}

export default api;
