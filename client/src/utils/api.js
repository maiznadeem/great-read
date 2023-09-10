import axios from 'axios';

const api = axios.create({
    baseURL: "https://great-read-398408.uc.r.appspot.com"
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

export async function getTopPicks() {
    try {
        const response = await api.get('/get/toppicks');
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch top picks: ${error.message}`);
    }
}

export async function getQuotes() {
    try {
        const response = await api.get('/get/quotes');
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch quotes: ${error.message}`);
    }
}

export async function getRandomQuotes() {
    try {
        const response = await api.get('/get/randomquotes');
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch random quotes: ${error.message}`);
    }
}

export default api;
