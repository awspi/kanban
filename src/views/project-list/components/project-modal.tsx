import React, { memo, useEffect } from 'react'
import styled from '@emotion/styled'
import { Button, Drawer, Spin, Form, Input } from 'antd'
import { useProjectModal } from '../utils/use-projects-modal'
import UserSelect from '@/components/user-select'
import { useProjectsQueryKey } from '../utils/use-projects-query-key'
import { ErrorBox } from '@/components/lib'
import { useAddProject, useEditProject } from '../utils/project'
const ProjectModal = memo(() => {
  const {
    projectModalOpen: isVisilble,
    close,
    isLoading,
    editingProject
  } = useProjectModal()

  const [form] = Form.useForm()
  const title = editingProject ? '编辑项目' : '创建项目'
  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])

  const useMutateProject = editingProject ? useEditProject : useAddProject

  const {
    mutateAsync,
    error,
    isLoading: mutateLoading
  } = useMutateProject(useProjectsQueryKey())

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (values: any) => {
    //可能是编辑/新建
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields()
      closeModal()
    })
  }

  return (
    <Drawer
      forceRender={true}
      open={isVisilble}
      onClose={close}
      title="Basic Drawer"
      placement="right"
      width={'100%'}
    >
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              layout="vertical"
              style={{ width: '40rem' }}
              onFinish={onFinish}
            >
              <Form.Item
                label={'名称'}
                name={'name'}
                rules={[{ required: true, message: '请输入项目名' }]}
              >
                <Input placeholder={'请输入项目名称'} />
              </Form.Item>

              <Form.Item
                label={'部门'}
                name={'organization'}
                rules={[{ required: true, message: '请输入部门名' }]}
              >
                <Input placeholder={'请输入部门名'} />
              </Form.Item>

              <Form.Item label={'负责人'} name={'personId'}>
                <UserSelect defaultOptionName={'负责人'} />
              </Form.Item>

              <Form.Item style={{ textAlign: 'right' }}>
                <Button
                  loading={mutateLoading}
                  type={'primary'}
                  htmlType={'submit'}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  )
})

export default ProjectModal

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
