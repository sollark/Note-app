import { useState } from 'react'
import { NavBar } from './cmps/NavBar'
import NotePage from './pages/NotePage'
import WelcomePage from './pages/WelcomePage'

function App() {
  const [user, setUser] = useState(null)

  return (
    <>
      <NavBar
        loggedInUser={null}
        onLogin={() => {}}
        onLogout={() => {}}
        onSignup={() => {}}
      />
      {user ? <NotePage /> : <WelcomePage />}
    </>
  )
}

export default App
