/*global chrome*/
import React, { useEffect, useState } from 'react'
import './App.css';
import { Button, Loader, Dimmer } from 'semantic-ui-react'
import firebase from './firebase'
import "firebase/auth";
import styled from 'styled-components'
import AuthScreen from './screens/authScreen'
import Main from './screens/main'
import { useToasts } from 'react-toast-notifications';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  gap: 10px;
`

const App = () => {
  const { addToast } = useToasts();

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      chrome.storage.sync.get("user", data => {
        if (data.user) {
          setUser(data.user)
        }
      })
    } catch (err) {
      setUser({
        email: 'joetey@stanford.edu',
        name: 'Joseph Tey',
        timezone: 'America/Los_Angeles',
        location: 'San Francisco,US'
      })
    }
  }, [])

  useEffect(() => {
    if (user) {
      setLoading(false)
    }
  }, [user])

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

        <AuthScreen
          setLoading={setLoading}
          setUser={setUser}
          user={user}
        >
          <Main
            user={user}
            setUser={setUser}
          />
        </AuthScreen>

      </Container>
    </>
  );
}

export default App;
