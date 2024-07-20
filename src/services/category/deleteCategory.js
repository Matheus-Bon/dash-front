'use server'

import { revalidateTag } from "next/cache";
import api from "../api";

const deleteCategory = async (id) => {
    const route = `/categories/${id}`;
    const options = {
        method: 'DELETE',
        next: {
            tags: ['categories']
        }
    };

    const { statusCode, data, status, message } = await api(route, options);
    
    revalidateTag('categories');
    
    return { statusCode, data, status, message };
};

export default deleteCategory;