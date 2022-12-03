import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig
} from '@/hooks/use-optimistic-options'
import { Task } from '@/types/task'
import { useHttp } from '@/utils/http'
import { QueryKey, useMutation, useQuery } from 'react-query'

export const useTask = (id?: number) => {
  const client = useHttp()
  return useQuery<Task>(['task', id], () => client(`tasks/${id}`), {
    enabled: !!id //id 不为undefined才会触发
  })
}

export const useTasks = (param?: Partial<Task>) => {
  // console.log(param)
  const client = useHttp()
  return useQuery<Task[], Error>(['tasks', param], () =>
    client('tasks', { data: param })
  )
}
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: 'POST'
      }),
    useAddConfig(queryKey)
  )
}

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        data: params,
        method: 'PATCH'
      }),
    useEditConfig(queryKey)
  )
}
export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}
