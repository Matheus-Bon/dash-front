'use server'

import { revalidateTag } from 'next/cache'
import api from "../api";

const editOrder = async (id, body) => {
    const route = `/orders/${id}`;
    const options = {
        method: 'PATCH',
        next: {
            cache: 'no-store',
            tags: ['orders']
        }
    }

    const { statusCode, data, status, message } = await api(route, options, body);
    revalidateTag('orders')

    return { statusCode, data, status, message };
}

export default editOrder;