import Login from './pages/Login'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
const Layout = () =>{
    const authState = useSelector((state) => state.user.auth)
    return(
        <>
            <Routes>
                <Route path='/login' element = {!authState.authenticated ? <Login/> : <Navigate to = "/"/>} />
                <Route path = "/" element = {authState.authenticated ?  <Home/> : <Navigate to = "/login"/>} />
            </Routes>
        </>
    )
   
}


export default Layout