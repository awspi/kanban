import { useDebounce } from '@/hooks'
import { useAsync } from '@/hooks/use-async'
import { Project } from '@/types/project'
import { cleanObject } from '@/utils'
import { useHttp } from '@/utils/http'
import { useEffect } from 'react'

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>()
  const client = useHttp()
  const debounceParam = useDebounce(param, 200) //防抖
  const fetchProjects = () =>
    client('projects', { data: cleanObject(debounceParam || {}) })
  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects })
  }, [debounceParam])
  return { ...result }
}
