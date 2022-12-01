import { User } from '@/types/user'
import { cleanObject } from '@/utils'
import { useHttp } from '@/utils/http'
import { useEffect } from 'react'
import { useDebounce } from '../../../hooks'
import { useAsync } from '../../../hooks/use-async'

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>()
  const client = useHttp()
  const debounceParam = useDebounce(param, 500) //防抖
  useEffect(() => {
    run(client('users', { data: cleanObject(debounceParam || {}) }))
  }, [debounceParam])
  return { ...result }
}
