import { FC, useContext } from 'react'
import { Link } from 'react-router-dom'
import { TokenContext } from 'contexts'
import { logo } from 'assets/images'
import './Navigation.scss'

const Navigation:FC = () => {
  const { token, setToken } = useContext(TokenContext)

  const logout = () => {
    setToken(null)
    window.localStorage.removeItem('token')
  }

  return (
    <nav className='m-navigation'>
      <img className='m-navigation__logo' src={logo} alt='GeoBattle logo' />
      {token ?
        <>
          <Link to='/'>Home</Link>
          <Link to='/rooms'>Rooms</Link>
          <Link to='/create'>Create Room</Link>
          <button className='m-navigation__logout' onClick={() => logout()}>Log out</button>
        </> 
      :
        <>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </>
      }
    </nav>
  )
}

export default Navigation
