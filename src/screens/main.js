/*global chrome*/
import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'
import firebase from '../firebase'
import "firebase/auth";
import Clock from 'react-live-clock';
import styled from 'styled-components'

const TopRightBar = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`

const TopRightBarInner = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  height: 40px;
`

const Main = ({
  user,
  setUser
}) => {
  if (user) {
    return (
      <>
        <TopRightBar>
          <TopRightBarInner>
            <div>{user.email}</div>
            <Button
              onClick={async () => {
                firebase.auth().signOut()
                setUser(null)
              }}
            >
              Sign-Out
            </Button>

          </TopRightBarInner>
        </TopRightBar>

        <Clock format={'h:mm A'} ticking={true} timezone={user.timezone} style={{
          fontSize: '60px'
        }} />
      </>
    )
  } else {
    return null
  }
}

export default Main