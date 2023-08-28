import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000"
});

export async function getBooks(offset, limit, categories) {
    try {
        const requestData = {
            offset: offset,
            limit: limit,
            categories: categories
        };

        const response = await api.post('/get/books', requestData);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch books: ${error.message}`);
    }
}

export default api;
