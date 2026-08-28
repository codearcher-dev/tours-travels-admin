import api from "../config/axios.config";

export const getEnquiries = async (page, status, search = "") => {
    const limit = 20;
    const offset = page * limit;
    let url = `/enquiry?limit=${limit}&offset=${offset}`;
    if (status) url += `&status=${status}`;
    if (search) url += `&search=${search}`;
    const res = await api.get(url);
    return res.data;
}

export const deleteEnquiry = async (id) => {
    const res = await api.delete(`/enquiry/${id}`);
    return res.data;
}
export const updateEnquiryStatus = async (id) => {
    const res = await api.patch(`/enquiry/${id}`);
    return res.data;
}

export const countEnquiries = async (status) => {
    const res = await api.get(`/enquiry/${status}`);
    return res.data;
}