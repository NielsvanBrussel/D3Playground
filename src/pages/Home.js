import React from 'react'
import { BrowserRouter as  Router, Link, Outlet } from "react-router-dom"

const Home = () => {
  return (
    <div>
        Home
        <Outlet />
    </div>
  )
}

export default Home