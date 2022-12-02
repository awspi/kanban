import React, { memo, useState } from 'react'
import { Button, Dropdown } from 'antd'
import styled from '@emotion/styled'
import { ReactComponent as SoftwareLogo } from '@/assets/software-logo.svg'
import { useAuth } from './context/auth-context'
import { ButtonNoPadding, Row } from './components/lib'
import { useRoutes, useNavigate } from 'react-router-dom'
import routes from './router'
import ProjectModal from './views/project-list/components/project-modal'
import ProjectPopover from './components/project-popover'
import UserPopover from './components/user-popover'
import { useProjectModal } from './views/project-list/utils/use-projects-modal'

const AuthenticatedApp = memo(() => {
  const [modalVisible, open, close] = useProjectModal()
  return (
    <div>
      <Container>
        <PageHeader />
        <Button onClick={open}>modal</Button>
        <Main>{useRoutes(routes)}</Main>
        <ProjectModal />
      </Container>
    </div>
  )
})

const PageHeader = () => {
  const navigate = useNavigate()
  function logoCLickHandle() {
    navigate('/')
  }
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={'link'} onClick={logoCLickHandle}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
        </ButtonNoPadding>
        <ProjectPopover />
        <UserPopover />
      </HeaderLeft>
      <User />
    </Header>
  )
}

const User = () => {
  const { user, logout } = useAuth()
  return (
    <Dropdown
      menu={{
        items: [
          {
            label: (
              <Button type={'link'} onClick={logout}>
                登出
              </Button>
            ),
            key: 'logout'
          }
        ]
      }}
    >
      <a onClick={(e) => e.preventDefault()}>Hi, {user?.name}</a>
    </Dropdown>
  )
}

export default AuthenticatedApp

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``

const Main = styled.main`
  height: calc(100vh - 6rem);
`
