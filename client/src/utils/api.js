import axios from 'axios';

const api = axios.create({
    // baseURL: "https://great-read-image-eccytorgrq-uc.a.run.app"
    // baseURL: "https://great-read-maiz-portfolio-t5emekf4ta-uc.a.run.app"
    baseURL: "https://admin.great-read.com"
    // baseURL: "http://localhost:8080"
});

export async function getBooks(offset, limit, categories, searchTerm) {
    try {
        const requestData = {
            offset: offset,
            limit: limit,
            categories: categories,
            searchTerm: searchTerm,
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

export async function getCategories() {
    try {
        const response = await api.get('/get/categories');
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch categories: ${error.message}`);
    }
}

export async function getRandomBooks(categories, goal, books) {
    try {
        const response = await api.post('/get/getRandomBooks', {
            categories: categories,
            goal: goal,
            books: books,
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch random books: ${error.message}`);
    }
}

export async function purchaseBooksAPI(previewOptions, books, selectedButton, notesCategories) {
    try {
        const response = await api.post('/purchase', {
            previewOptions: previewOptions,
            books: books,
            selectedButton: selectedButton,
            notesCategories: notesCategories,
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch signed URLs: ${error}`);
    }
}

export async function getPaymentDetails(sessionId) {
    try {
        const response = await api.post('/get/getPayment', {
            sessionId: sessionId,
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch payment details: ${error}`);
    }
}

export default api;
