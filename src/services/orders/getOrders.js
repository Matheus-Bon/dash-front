'use server'

import api from "../api";

const getOrders = async () => {
    const route = `/orders`;
    const options = {
        next: {
            cache: 'no-store',
            tags: ['orders']
        }
    }

    const { statusCode, data, status, message } = await api(route, options);

    return { statusCode, data, status, message };
}

export default getOrders;