'use server'

import { revalidateTag } from 'next/cache'
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

    revalidateTag('index-users');

    return { statusCode, data, status, message };
}

export default createUser;