import { User, UserLogin, UserSignup } from '../models/user'
import { httpService } from './http.service'
import { storageService } from './storage.service'

const URL = 'user/'
const STORAGE_KEY = 'user'

export const userService = {
  login,
  signup,
  logout,
  getUser,
}

function getUser(): User | null {
  const user = storageService.loadFromStorage(STORAGE_KEY)
  return user
}

function _saveUser(user: User | null) {
  if (user) storageService.saveToStorage(STORAGE_KEY, user)
  else storageService.removeFromLS(STORAGE_KEY)
}

async function login(credentials: UserLogin): Promise<User | void> {
  const response = await httpService.post(URL + 'login', credentials)
  if (response.success) {
    const user = response.data
    _saveUser(user)
    return user
  }

  throw new Error(response.message)
}

async function signup(credentials: UserSignup): Promise<User | void> {
  const response = await httpService.post(URL + 'signup', credentials)
  if (response.success) {
    const user = response.data
    _saveUser(user)
    return user
  }

  throw new Error(response.message)
}

async function logout() {
  const response = await httpService.put(URL + 'logout', {})
  if (response.success) _saveUser(null)
  else console.log('Cannot logout:', response.message)
}
