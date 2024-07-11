'use server'

import { cookies } from 'next/headers'
import api from "../api";

const login = async (body) => {
    const route = `/login`;
    const options = {
        method: 'POST',
        next: {
            cache: 'no-store',
            tags: ['login']
        }
    }

    const { statusCode, data, status, message } = await api(route, options, body);

    if (statusCode === 200) {
        cookies().set({
            name: 'auth',
            value: data.accessToken,
            secure: true,
            path: '/',
        });
    }

    return { statusCode, data, status, message };
}

export default login;