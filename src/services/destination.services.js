import api from "../config/axios.config"

export const getDestinations = async () => {
    const res = await api.get('/destination');
    return res.data;
}

export const updateDestination = async (id, data) => {
    const res = await api.patch(`/destination/${id}`, data);
    return res.data;
}
export const createDestination = async (data) => {
    const res = await api.post(`/destination`, data);
    return res.data;
}
export const deleteDestination = async (id) => {
    const res = await api.delete(`/destination/${id}`);
    return res.data;
}