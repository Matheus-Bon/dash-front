'use server'

import { revalidateTag } from "next/cache";
import api from "../api";

const deleteUser = async (id) => {
    const route = `/users/${id}`;
    const options = {
        method: 'DELETE',
        next: {
            tags: ['users']
        }
    };

    const { statusCode, data, status, message } = await api(route, options);
    revalidateTag('index-users');
    return { statusCode, data, status, message };
};

export default deleteUser;