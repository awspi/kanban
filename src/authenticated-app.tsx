import React, { memo } from 'react'
import { Button, Dropdown } from 'antd'
import styled from '@emotion/styled'
import { ReactComponent as SoftwareLogo } from '@/assets/software-logo.svg'
import { useAuth } from './context/auth-context'
import ProjectList from './views/project-list'
import { ButtonNoPadding, Row } from './components/lib'
import { logout } from './auth-provider'

const AuthenticatedApp = memo(() => {
  return (
    <div>
      <Container>
        <PageHeader />
        <Main>
          <ProjectList />
        </Main>
      </Container>
    </div>
  )
})

const PageHeader = () => {
  const { user, logout } = useAuth()
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={'link'}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
        </ButtonNoPadding>
        {/* <ProjectPopover /> */}
        {/* <UserPopover /> */}
      </HeaderLeft>
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
    </Header>
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
