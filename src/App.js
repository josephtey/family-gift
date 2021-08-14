/*global chrome*/
import React, { useEffect, useState } from 'react'
import './App.css';
import { Input, Button, Loader, Dimmer } from 'semantic-ui-react'
import firebase from './firebase'
import "firebase/auth";
import styled from 'styled-components'
import { useToasts } from 'react-toast-notifications';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  gap: 10px;
`

function Login({
  onLogin,
  gotoCreateAccountScreen
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <>

      <Input placeholder='Email' onChange={(e) => {
        setEmail(e.target.value)
      }} />
      <Input type="password" placeholder='Password' onChange={(e) => {
        setPassword(e.target.value)
      }} />

      <br />
      <Button
        onClick={() => {
          onLogin(email, password)
        }}
      >Login</Button>

      <br />
      <a
        onClick={() => {
          gotoCreateAccountScreen()
        }}
      >
        Create Account
      </a>
    </>
  );
}

function CreateAccount({
  onAccountCreate,
  gotoLoginScreen
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <>
      <a
        onClick={() => {
          gotoLoginScreen()
        }}
      >
        Back
      </a>
      <br />
      <Input placeholder='Email' onChange={(e) => {
        setEmail(e.target.value)
      }} />
      <Input type="password" placeholder='Password' onChange={(e) => {
        setPassword(e.target.value)
      }} />
      <br />
      <Button
        onClick={() => {
          onAccountCreate(email, password)
        }}
      >Create Acount</Button>
    </>
  )
}

const App = () => {
  const [screenMode, setScreenMode] = useState("login")
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const { addToast } = useToasts();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser(firebase.auth().currentUser)
      }

      setLoading(false)
    });
  }, [])

  if (loading) {
    return (
      <Container >
        <Dimmer active inverted>
          <Loader inverted />
        </Dimmer>
      </Container>
    )
  }

  return (
    <>
      <Container>

        {!user ?

          <>
            {screenMode === "login" ?
              <Login
                onLogin={(email, password) => {
                  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                    .then(() => {
                      setLoading(true)
                      return firebase.auth().signInWithEmailAndPassword(email, password)
                        .then((userCredential) => {

                          let authUser = userCredential.user;
                          setUser(authUser)
                          setLoading(false)
                        })
                        .catch((error) => {
                          addToast(error.message, { appearance: 'error' });
                          setLoading(false)
                        });
                    })
                    .catch((error) => {
                      addToast(error.message, { appearance: 'error' });
                      setLoading(false)
                    });
                }}
                gotoCreateAccountScreen={() => {
                  setScreenMode('create-account')
                }}
              />
              : screenMode === 'create-account' ?
                <CreateAccount
                  onAccountCreate={(email, password) => {
                    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                      .then(() => {
                        setLoading(true)
                        return firebase.auth().createUserWithEmailAndPassword(email, password)
                          .then((userCredential) => {
                            let authUser = userCredential.user;
                            setUser(authUser)
                            setLoading(false)
                          })
                          .catch((error) => {
                            addToast(error.message, { appearance: 'error' });
                            setLoading(false)
                          });
                      }).catch((error) => {
                        addToast(error.message, { appearance: 'error' });
                        setLoading(false)
                      });
                  }}
                  gotoLoginScreen={() => {
                    setScreenMode('login')
                  }}
                />
                : null
            }
          </>


          :

          <>
            <div>Logged in as {firebase.auth().currentUser.email}</div>

            <Button
              onClick={async () => {
                firebase.auth().signOut()
                setUser(null)
              }}
            >
              Sign-Out
              </Button>
          </>

        }

      </Container>
    </>
  );
}

export default App;
