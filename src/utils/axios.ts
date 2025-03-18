import axios from "axios"
export const prodURL = "https://flashcardquiz-backend.onrender.com/api/v1"

export const axiosInstance = axios.create({
    baseURL: prodURL
})