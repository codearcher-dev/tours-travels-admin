import api from "../config/axios.config";

export const getDailyInsights = async (start, end) => {
    let url = '/insight';
    const params = new URLSearchParams();
    if (start) params.append('start', start);
    if (end) params.append('end', end);
    
    if (params.toString()) {
        url += `?${params.toString()}`;
    }
    
    const res = await api.get(url);
    return res.data;
}

export const getGlobalInsights = async () => {
    const res = await api.get('/insight/global');
    return res.data;
}
