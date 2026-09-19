import api from "../config/axios.config.js";

export const login = async (data) => {
    const res = await api.post("/admin/login", data);
    return res.data;
}

export const logout = async () => {
    const res = await api.post("/admin/logout");
    return res.data;
}

export const getUser = async () => {
    const res = await api.get("/admin");
    return res.data;
}

export const changePassword = async ({ oldPassword, newPassword }) => {
    const res = await api.patch("/admin/password", { oldPassword, newPassword });
    return res.data;
}