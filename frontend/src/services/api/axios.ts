import type { AxiosInstance } from 'axios'
import axios from 'axios'

export const api: AxiosInstance = axios.create({
  baseURL: 'api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  },
)
