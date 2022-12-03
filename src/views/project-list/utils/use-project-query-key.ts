import { useProjectsSearchParams } from './use-projects-search-params'

export const useProjectQueryKey = () => {
  const [param] = useProjectsSearchParams()
  return ['projects', param]
}
