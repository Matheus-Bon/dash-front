'use server'

import { cookies } from 'next/headers'
import api from "../api";

const logout = async (body) => {
    const route = `/logout`;
    const options = {
        method: 'POST',
        next: {
            cache: 'no-store',
            tags: ['logout']
        }
    }

    const { statusCode, data, status, message } = await api(route, options, body);

    if (statusCode === 200) {
        cookies().delete('auth');
    }

    return { statusCode, data, status, message };
}

export default logout;