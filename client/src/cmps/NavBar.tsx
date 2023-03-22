import { Container, Nav, Navbar } from 'react-bootstrap'
import { User } from '../models/user'
import { NavBarUser } from './NavBarUser'

interface NavBarProps {
  loggedInUser: User | null
  onSignup: () => void
  onLogin: () => void
  onLogout: () => void
}
export function NavBar({
  loggedInUser,
  onSignup,
  onLogin,
  onLogout,
}: NavBarProps) {
  return (
    <Navbar bg='primary' variant='dark' expand='sm' sticky='top'>
      <Container>
        <Navbar.Brand>Notes App</Navbar.Brand>
        <Navbar.Toggle aria-controls='main-navbar' />
        <Navbar.Collapse id='main-navbar'>
          <Nav className='ms-auto'>
            <NavBarUser
              user={loggedInUser}
              onSignup={onSignup}
              onLogin={onLogin}
              onLogout={onLogout}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
