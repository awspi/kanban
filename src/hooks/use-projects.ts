import { Project } from '@/types/project'
import { cleanObject } from '@/utils'
import { useHttp } from '@/utils/http'
import { useEffect } from 'react'
import { useDebounce } from '.'
import { useAsync } from './use-async'

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>()
  const client = useHttp()
  const debounceParam = useDebounce(param, 500) //防抖
  useEffect(() => {
    run(client('projects', { data: cleanObject(debounceParam || {}) }))
  }, [debounceParam])
  return { ...result }
}
