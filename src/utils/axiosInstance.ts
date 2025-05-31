import axios from 'axios'
import { toast } from 'react-toastify'
import { ERROR_MESSAGES } from '@/config/errorMessages'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const statusCode: number | string =
            error.response?.status ?? 'GENERIC_ERROR'
        const message =
            ERROR_MESSAGES[statusCode] || ERROR_MESSAGES.GENERIC_ERROR

        toast.error(message)
        return Promise.reject(new Error(message))
    }
)

export default axiosInstance
