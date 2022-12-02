import { useDebounce } from '@/hooks'
import { Project } from '@/types/project'
import { useHttp } from '@/utils/http'
import { useQuery } from 'react-query'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  return useQuery<Project[], Error>(['projects', param], () =>
    client('projects', { data: param })
  )
}
