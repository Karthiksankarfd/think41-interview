import React from 'react'
import { Routes , Route  } from 'react-router-dom'
const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<h1>This is home page </h1>}  />
        <Route path='/about' element={<h1>This is about page </h1>}  />
    </Routes>
  )
}

export default MainRoutes
