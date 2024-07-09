'use server'

import api from "../api";

const createUser = async (body) => {
    const route = `/users`;
    const options = {
        method: 'POST',
        next: {
            cache: 'no-store',
            tags: ['users']
        }
    }

    const { statusCode, data, status, message } = await api(route, options, body);
    return { statusCode, data, status, message };
}

export default createUser;