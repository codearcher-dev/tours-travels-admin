import api from "../config/axios.config"

export const getAllPackages = async () => {
    const res = await api.get("/package");
    return res.data;
}

export const getPackageById = async (id) => {
    const res = await api.get(`/package/${id}`);
    return res.data;
}

export const createPackage = async (data) => {
    const res = await api.post(`/package`, data);
    return res.data;
}
export const updatePackage = async (id, data) => {
    const res = await api.patch(`/package/${id}`, data);
    return res.data;
}

export const deletePackage = async (id) => {
    const res = await api.delete(`/package/${id}`);
    return res.data;
}
