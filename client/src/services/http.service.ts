import { debug } from 'util'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type Data = object | null

const BASE_URL =
  process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

export const httpService = {
  get(endpoint: string) {
    return ajax(endpoint, 'GET')
  },
  post(endpoint: string, data: Data) {
    return ajax(endpoint, 'POST', data)
  },
  put(endpoint: string, data: Data) {
    return ajax(endpoint, 'PUT', data)
  },
  delete(endpoint: string, data?: Data) {
    return ajax(endpoint, 'DELETE', data)
  },
}

async function ajax(
  endpoint: string,
  method: HttpMethod = 'GET',
  data: Data = null
) {
  console.log(
    'ajax endpoint:',
    endpoint,
    ', data:',
    data,
    ', json:',
    JSON.stringify(data)
  )
  try {
    let res = null
    if (method === 'GET' || method === 'DELETE')
      res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        credentials: 'include',
      })
    else
      res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    console.log('response:', res)
    return await res.json()
  } catch (err: any) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `,
      data
    )
    console.dir(err)
    if (err.response && err.response.status === 401) {
      sessionStorage.clear()
      window.location.assign('/')
    }
    throw err
  }
}
