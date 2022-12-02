import { Project } from '@/types/project'
import { useHttp } from '@/utils/http'
import { useMutation, useQueryClient } from 'react-query'

export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/`, {
        data: params,
        method: 'POST'
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
}
