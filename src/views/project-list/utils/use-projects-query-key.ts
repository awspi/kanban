import { useProjectsSearchParams } from './use-projects-search-params'

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams()
  return ['projects', params]
}
