import React from 'react'
import { NavLink,Link,useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate()
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary"data-bs-theme="dark">
        <div className="container-fluid">
          
          {
             localStorage.getItem('Auth-Token') ? 
             <Link className="navbar-brand" to="/">Inotebook</Link> :
             <Link className="navbar-brand">Inotebook</Link>
          }
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {
              localStorage.getItem('Auth-Token') ? 
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">About</NavLink>
                </li>
              </ul>:
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                </li>
                <li className="nav-item">
                </li>
              </ul>
            }
            {
              localStorage.getItem('Auth-Token') ? 
              <button className="btn btn-primary mx-1" type="submit" onClick={()=>{
                navigate("/login")
                localStorage.removeItem('Auth-Token')
              }}>Logout</button> :
              <div className="d-flex">
                <NavLink style={{textDecoration:'none',color:'#ffff'}} to="/login"><button className="btn btn-primary mx-1" type="submit">Login</button></NavLink>
                <NavLink style={{textDecoration:'none',color:'#ffff'}} to="/signup"><button className="btn btn-primary mx-1" type="submit">SignUp</button></NavLink>
              </div>
            }

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
