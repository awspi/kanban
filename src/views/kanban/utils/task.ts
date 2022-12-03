import { Task } from '@/types/task'
import { useHttp } from '@/utils/http'
import { useQuery } from 'react-query'

export const useTasks = (param?: Partial<Task>) => {
  console.log(param)
  const client = useHttp()
  return useQuery<Task[], Error>(['tasks', param], () =>
    client('tasks', { data: param })
  )
}
