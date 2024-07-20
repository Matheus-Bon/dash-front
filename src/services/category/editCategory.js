'use server'

import { revalidateTag } from 'next/cache'
import api from "../api";

const editCategory = async (id, body) => {
    const route = `/categories/${id}`;
    const options = {
        method: 'PATCH',
        next: {
            cache: 'no-store',
            tags: ['categories']
        }
    }

    const { statusCode, data, status, message } = await api(route, options, body);
    
    revalidateTag('categories');

    return { statusCode, data, status, message };
}

export default editCategory;