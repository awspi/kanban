import React, { ReactNode, useState } from 'react'
import * as auth from '@/auth-provider'
import { User } from '@/types/user'
import { http } from '@/utils/http'
import { useMount } from '@/hooks'
import { useAsync } from '@/hooks/use-async'
import { FullPageErrorFallback, FullPageLoading } from '@/components/lib'

interface AuthForm {
  username: string
  password: string
}
/**
 * 初始化User
 */
const bootStrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

const AuthContext = React.createContext<
  | {
      user: User | null
      register: (form: AuthForm) => Promise<void>
      login: (form: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user,setUser]=useState<User|null>(null)
  const {
    data: user,
    setData: setUser,
    run,
    isLoading,
    isIdle,
    isError,
    error
  } = useAsync<User | null>()
  //? point free
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  //* 初始化时获取user信息
  useMount(() => {
    run(bootStrapUser())
  })
  if (isIdle || isLoading) {
    return <FullPageLoading />
  }
  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  )
}
export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
