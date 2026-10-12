
import axios from 'axios'

const baseUrl = 'https://api.sampleapis.com/wines'

export const getWinesByType = async (type) => {
    const response = await axios.get(`${baseUrl}/${type}`)
    return response.data
}
