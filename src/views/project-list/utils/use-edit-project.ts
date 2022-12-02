import { Project } from '@/types/project'
import { useHttp } from '@/utils/http'
import { useMutation, useQueryClient } from 'react-query'

export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
}
