import api from "../config/axios.config"

export const getAllPackages = async () => {
    const res = await api.get("/packages");
    return res.data;
}

export const getPackageById = async (id) => {
    const res = await api.get(`/packages/${id}`);
    return res.data;
}
