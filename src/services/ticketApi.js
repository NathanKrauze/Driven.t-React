import api from './api'

export async function getTypesOfTickets(token) {
    const res = await api.get('/tickets/types', {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return res.data;
}

export async function postUserTicket(body, token) {
    const res = await api.post('/tickets', body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

export async function getTickets(token) {
    const res = await api.get('/tickets', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}