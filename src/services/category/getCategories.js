'use server'

import api from "../api";

const getCategories = async ({ page = 1, limit = 10, search = '' }) => {
    const query = new URLSearchParams({ page, limit, search }).toString();
    const route = `/categories?${query}`;
    const options = {
        next: {
            tags: ['categories']
        }
    };

    const { statusCode, data, status, message } = await api(route, options);
    return { statusCode, data, status, message };
};

export default getCategories;