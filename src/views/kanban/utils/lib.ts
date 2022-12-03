import { useDebounce } from '@/hooks'
import { useUrlQueryParam } from '@/hooks/use-url-query-param'
import { useProject } from '@/views/project-list/utils/use-project'
import { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useTask } from './task'

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}
export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbansSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useKanbansQueryKey = () => ['kanbans', useKanbansSearchParams()]

export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    'name',
    'typeId',
    'processorId',
    'tagId'
  ])
  const projectId = useProjectIdInUrl()
  // const debouncedName = useDebounce(param.name, 200);//todo 卡顿
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name
    }),
    [projectId, param]
  )
}

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]

export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    'editingTaskId'
  ])

  const { data: editingTask, isLoading } = useTask(Number(editingTaskId))

  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id })
    },
    [setEditingTaskId]
  )

  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: '' })
  }, [setEditingTaskId])

  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading
  }
}
