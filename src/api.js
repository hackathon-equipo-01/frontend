
const BASE_URL = 'http://localhost:8080/api';


async function http(method, endpoint, body) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
    });
    
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || `Error ${res.status}`);
    }

    if (res.status === 204) return null;
    return res.json();
}

export const getAll = (entity) => http('GET', `/${entity}`);
export const create = (entity, data) => http('POST', `/${entity}`, data);
export const update = (entity, pk, pkValue, data) => http('PUT', `/${entity}/${pkValue}`, data);
export const remove = (entity, pk, pkValue) => http('DELETE', `/${entity}/${pkValue}`);
