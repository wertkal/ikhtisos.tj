import axios from 'axios'
import { getToken, destroyToken, saveToken, saveUser } from './token'

const axiosRequest = axios.create({
  baseURL: 'http://localhost:5000', // Замените на ваш URL сервера
  headers: {
    'Content-Type': 'application/json',
  },
})

// Добавляем токен в заголовок перед каждым запросом
axiosRequest.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Обработка ответа
axiosRequest.interceptors.response.use(
  (response) => {
    // При логине сохраняем токен и пользователя
    if (response.config.url?.includes('/login') && response.data.token) {
      saveToken(response.data.token)
      saveUser(response.data.user)
    }
    return response
  },
  (error) => {
    // При 401 удаляем токен и редиректим на login
    if (error.response?.status === 401) {
      destroyToken()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosRequest
