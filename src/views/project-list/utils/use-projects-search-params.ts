import { useUrlQueryParam } from '@/hooks/use-url-query-param'
import { useMemo } from 'react'

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam
  ] as const
}
