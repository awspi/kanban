import React, { memo } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import styled from '@emotion/styled'
import { Menu } from 'antd'

const useRouteType = () => {
  //pathname: '/projects/2/epic'
  const units = useLocation().pathname.split('/')
  return units[units.length - 1]
}

const Project = memo(() => {
  const routeType = useRouteType()
  return (
    <Container>
      <Aside>
        <Menu
          mode="inline"
          items={[
            { label: <Link to={'kanban'}>看板</Link>, key: 'kanban' },
            { label: <Link to={'epic'}>任务组</Link>, key: 'epic' }
          ]}
          selectedKeys={[routeType]}
        ></Menu>
      </Aside>
      <Main>
        <Outlet />
      </Main>
    </Container>
  )
})

export default Project

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`
