import { Project } from '@/types/project'
import { useHttp } from '@/utils/http'
import { useQuery } from 'react-query'

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(['project', id], () => client(`projects/${id}`), {
    enabled: !!id //id 不为undefined才会触发
  })
}
