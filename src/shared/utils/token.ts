// Сохраняет токен
export const saveToken = (token: string) => {
    localStorage.setItem('token', token)
  }
  
  // Получает токен
  export const getToken = (): string | null => {
    return localStorage.getItem('token')
  }
  
  // Удаляет токен
  export const destroyToken = () => {
    localStorage.removeItem('token')
  }
  
  // Сохраняет данные пользователя
  export const saveUser = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user))
  }
  
  // Получает данные пользователя
  export const getUser = () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
  
  // Удаляет данные пользователя
  export const destroyUser = () => {
    localStorage.removeItem('user')
  }
  