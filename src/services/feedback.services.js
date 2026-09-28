import api from "../config/axios.config";

export const getFeedbacks = async () => {
    const res = await api.get("/feedback");
    return res.data;
}

export const deleteFeedback = async (id) => {
    const res = await api.delete(`/feedback/${id}`);
    return res.data;
}

export const createFeedbackLink = async (data) => {
    const res = await api.post("/feedback/link/create", data);
    return res.data;
}

export const getFeedbackLinks = async () => {
    const res = await api.get("/feedback/link");
    return res.data;
}

export const deleteFeedbackLink = async (id) => {
    const res = await api.delete(`/feedback/link/${id}`);
    return res.data;
}