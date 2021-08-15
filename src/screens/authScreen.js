import React, { useEffect, useState } from 'react'
import Login from '../components/login'
import CreateAccount from '../components/createAccount'

const AuthScreen = ({
  setUser,
  user,
  setLoading,
  children
}) => {
  const [screenMode, setScreenMode] = useState("login")

  if (user) {
    return (
      <>
        {children}
      </>
    )
  }

  return (
    <>
      {screenMode === "login" ?
        <Login
          setLoading={setLoading}
          setUser={setUser}
          gotoCreateAccountScreen={() => {
            setScreenMode('create-account')
          }}
        />
        : screenMode === 'create-account' ?
          <CreateAccount
            setLoading={setLoading}
            setUser={setUser}
            gotoLoginScreen={() => {
              setScreenMode('login')
            }}
          />
          :
          <div>Error occurred</div>
      }
    </>
  )
}

export default AuthScreen