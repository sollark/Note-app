import { useEffect, useState } from 'react'
import { NavBar } from './cmps/NavBar'
import { LoginDialog } from './cmps/LoginDialog'
import { SignUpDialog } from './cmps/SignUpDialog'
import { User } from './models/user'
import { userService } from './services/user.service'
import NotePage from './pages/NotePage'
import WelcomePage from './pages/WelcomePage'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [showSignUpDialog, setShowSignUpDialog] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  useEffect(() => {
    function loadUser() {
      const user = userService.getUser()
      setUser(user)
    }
    loadUser()
  }, [])

  return (
    <>
      <NavBar
        loggedInUser={user}
        onSignup={() => setShowSignUpDialog(true)}
        onLogin={() => setShowLoginDialog(true)}
        onLogout={() => setUser(null)}
      />

      {user ? <NotePage /> : <WelcomePage />}

      {showSignUpDialog && (
        <SignUpDialog
          onDismiss={() => setShowSignUpDialog(false)}
          onSignUpSuccessful={(user) => setUser(user)}
        />
      )}

      {showLoginDialog && (
        <LoginDialog
          onDismiss={() => setShowLoginDialog(false)}
          onLoginSuccessful={(user) => setUser(user)}
        />
      )}
    </>
  )
}

export default App
