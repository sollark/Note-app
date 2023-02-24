type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type Data = object | null

const BASE_URL =
  process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

export const httpService = {
  get(endpoint: string) {
    return ajax(endpoint, 'GET')
  },
  post(endpoint: string, data: Data) {
    console.log('data in post:', data)

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
  console.log('data in ajax:', data)
  try {
    let res = null
    if (method === 'GET')
      res = await fetch(`${BASE_URL}${endpoint}`, { method })
    else if (method === 'POST')
      res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    else
      res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        body: JSON.stringify(data),
      })

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
