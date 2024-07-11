'use server'

import api from "../api";

const getUsers = async ({ page = 1, limit = 10, search = '', role = 'delivery_man' }) => {
    const query = new URLSearchParams({ page, limit, search, role }).toString();
    const route = `/users?${query}`;
    const options = {
        next: {
            tags: ['users', 'index-users']
        }
    };

    const { statusCode, data, status, message } = await api(route, options);
    return { statusCode, data, status, message };
};

export default getUsers;