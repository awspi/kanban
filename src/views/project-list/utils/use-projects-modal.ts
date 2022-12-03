import {
  useSetUrlSearchParam,
  useUrlQueryParam
} from '@/hooks/use-url-query-param'
import { useProject } from './use-project'

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    'projectCreate'
  ])
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId'
  ])
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  )
  const setUrlParams = useSetUrlSearchParam()
  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => {
    setUrlParams({ projectCreate: '', editingProjectId: '' })
  }
  const startEdit = (id: number) => {
    setEditingProjectId({ editingProjectId: id })
  }
  //返回tuple
  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  }
}
