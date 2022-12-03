import { TaskType } from '@/types/task-type'
import { useHttp } from '@/utils/http'
import { useQuery } from 'react-query'

export const useTaskTypes = () => {
  const client = useHttp()
  return useQuery<TaskType[], Error>(['taskTypes'], () => client('taskTypes'))
}
