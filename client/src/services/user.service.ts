import { User, UserLogin, UserSignup } from '../models/user'
import { httpService } from './http.service'

const URL = 'user/'

//  exports
export const userService = {
  login,
  signup,
}

async function login(credentials: UserLogin): Promise<User | void> {
  const response = await httpService.post(URL + 'login', credentials)
  if (response.success) return response.data

  console.log('Cannot login:', response.message)
}

async function signup(credentials: UserSignup): Promise<User | void> {
  const response = await httpService.post(URL + 'signup', credentials)
  if (response.success) return response.data

  console.log('Cannot signup:', response.message)
}

async function logout() {
  const response = await httpService.put(URL + 'logout', {})
  if (response.success) console.log(response.message)
  else console.log('Cannot logout:', response.message)
}
