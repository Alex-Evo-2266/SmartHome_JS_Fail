import {createContext} from 'react'

function noop() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  userLavel: null,
  login: noop,
  logout: noop,
  isAuthenticated: false
})
