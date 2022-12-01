import { useAsync } from '@/hooks/use-async'
import { Project } from '@/types/project'
import { useHttp } from '@/utils/http'

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
      })
    )
  }
  return {
    mutate,
    ...asyncResult
  }
}
