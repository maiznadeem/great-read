import axios from 'axios';

const api = axios.create({
    baseURL: "https://great-read-398408.uc.r.appspot.com"
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

export async function getRandomNotes(currentSlide) {
    try {
        const response = await api.get('/get/randomnotes', {
            params: {
                currentSlide: currentSlide
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch random notes: ${error.message}`);
    }
}

export default api;
