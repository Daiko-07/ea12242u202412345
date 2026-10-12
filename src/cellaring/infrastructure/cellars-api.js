
import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL

export const getCellars = async () => {
    const response = await axios.get(`${baseUrl}/cellars`)
    return response.data
}

export const getStorageItems = async () => {
    const response = await axios.get(`${baseUrl}/storage-items`)
    return response.data
}
export const createStorageItem = async (item) => {
    const response = await axios.post(`${baseUrl}/storage-items`, item)
    return response.data
}