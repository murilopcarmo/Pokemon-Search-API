import * as React from 'react'
import { Outlet, createRootRoute, Link } from '@tanstack/react-router'



export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      {/* <header>
        <SearchAppBar/>
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
      </header>
      <Outlet />
      <footer>© 2026 PokéPedia</footer> */}
    </React.Fragment>
  )
}
