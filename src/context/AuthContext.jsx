import { createContext, useContext, useMemo, useState } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getStoredUser())

  const value = useMemo(
    () => ({
      user,
      isDemo: true,
      async login(credentials) {
        const res = await authService.login(credentials)
        setUser(res.user)
        return res
      },
      async register(payload) {
        const res = await authService.register(payload)
        setUser(res.user)
        return res
      },
      async adminLogin(payload) {
        const res = await authService.adminLogin(payload)
        setUser(res.user)
        return res
      },
      async forgotPassword(email) {
        return authService.forgotPassword(email)
      },
      logout() {
        authService.logout()
        setUser(null)
      },
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
