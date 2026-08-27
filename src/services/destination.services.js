import api from "../config/axios.config"

export const getDestinations = async () => {
    const res = await api.get('/destination');
    return res.data;
}