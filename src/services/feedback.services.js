import api from "../config/axios.config";

export const getFeedbacks = async () => {
    const res = await api.get("/feedbacks");
    return res.data;
}

export const deleteFeedback = async (id) => {
    const res = await api.delete(id);
    return res.data;
}