import axios from "axios"
export const prodURL = "/v1"

export const axiosInstance = axios.create({
    baseURL: prodURL
})
