import { Button, Navbar } from 'react-bootstrap'
import { User } from '../models/user'
import { userService } from '../services/user.service'

interface NavBarUserProps {
  user: User | null
  onLogout: () => void
  onSignup: () => void
  onLogin: () => void
}

export function NavBarUser({
  onSignup,
  onLogin,
  onLogout,
  user,
}: NavBarUserProps) {
  async function onLogoutClick() {
    try {
      await userService.logout()
      onLogout()
    } catch (error) {
      console.log('Log out error.', error)
    }
  }

  async function onSignupClick() {}
  async function onLoginClick() {}
  return (
    <>
      {user ? (
        <div>
          <Navbar.Text className='mr-2'>Hello, {user.username}</Navbar.Text>
          <Button
            className='ms-1'
            variant='outline-light'
            onClick={onLogoutClick}>
            Log out
          </Button>
        </div>
      ) : (
        <div>
          <Button
            className='ms-1'
            variant='outline-light'
            onClick={onSignupClick}>
            Sign up
          </Button>
          <Button
            className='ms-1'
            variant='outline-light'
            onClick={onLoginClick}>
            Log in
          </Button>
        </div>
      )}
    </>
  )
}
