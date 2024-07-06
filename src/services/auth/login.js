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

    return await api(route, options, body);
}

export default login;