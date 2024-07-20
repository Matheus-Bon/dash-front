'use server'

import { revalidateTag } from 'next/cache'
import api from "../api";

const createCategory = async (body) => {
    const route = `/categories`;
    const options = {
        method: 'POST',
        next: {
            cache: 'no-store',
            tags: ['categories']
        }
    }

    const { statusCode, data, status, message } = await api(route, options, body);

    revalidateTag('categories');

    return { statusCode, data, status, message };
}

export default createCategory;