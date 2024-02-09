import config from '../config/config'

const login = async ({ userName, password }) => {
  const response = await fetch(`${config.url}/Account/v1/Authorized`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password })
  })
  return {
    headers: response.headers,
    status: response.status,
    data: await response.json()
  }
}

// функция генераци токена
const getAuthToken = async ({ userName, password }) => {
  const response = await fetch(`${config.url}/Account/v1/GenerateToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password })
  })
  return {
    headers: response.headers,
    status: response.status,
    data: await response.json()
  }
}

export default {
  getAuthToken,
  login
}
