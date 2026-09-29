import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})

/**
 * @description Send chat message to AI Interview Assistant backend
 */
export const sendChatMessage = async ({ message, history, interviewContext }) => {
    const response = await api.post("/api/chat", {
        message,
        history,
        interviewContext
    })
    return response.data
}
