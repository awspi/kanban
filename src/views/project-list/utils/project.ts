import { useAddConfig, useDeleteConfig } from '@/hooks/use-optimistic-options'
import { useEditConfig } from '@/hooks/use-optimistic-options'
import { Project } from '@/types/project'
import { useHttp } from '@/utils/http'
import { QueryKey, useMutation, useQueryClient } from 'react-query'

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/`, {
        data: params,
        method: 'POST'
      }),
    useAddConfig(queryKey)
  )
}

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()
  // const [searchParams]=useProjectsSearchParams()
  // const queryClient = useQueryClient()
  // const queryKey=['projects',searchParams]

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
      }),
    useEditConfig(queryKey)
  )
}

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp()
  // const [searchParams]=useProjectsSearchParams()
  // const queryClient = useQueryClient()
  // const queryKey=['projects',searchParams]

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}
