import { useUrlQueryParam } from '@/hooks/use-url-query-param'

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    'projectCreate'
  ])
  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => setProjectCreate({ projectCreate: undefined })
  //返回tuple
  return [projectCreate === 'true', open, close] as const
}
