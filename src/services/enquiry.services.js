import api from "../config/axios.config";

export const getEnquiries = async () => {
    const res = await api.get("/enquiry");
    return res.data;
}

export const deleteEnquiries = async (id) => {
    const res = await api.delete(`/enquiry/${id}`);
    return res.data;
}
export const updateEnquiryStatus = async (id) => {
    const res = await api.patch(`/enquiry/${id}`);
    return res.data;
}