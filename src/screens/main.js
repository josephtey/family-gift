/*global chrome*/
import React, { useEffect, useState } from 'react'
import { Button, Header, Segment, Input, Modal } from 'semantic-ui-react'
import firebase from '../firebase'
import "firebase/auth";
import Clock from 'react-live-clock';
import styled from 'styled-components'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications';
import UserCard from '../components/followedUserCard'

const TopRightBar = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`

const TopRightBarInner = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  height: 40px;
`

const FollowedUsers = styled.div`
  display: flex;
  gap: 30px;
`

const Main = ({
  user,
  setUser
}) => {
  const { addToast } = useToasts();

  const [weather, setWeather] = useState(null)
  const [followEmail, setFollowEmail] = useState('')
  const [open, setOpen] = useState(false)
  const [followedUsers, setFollowedUsers] = useState([])

  const getFollowedUsers = async () => {
    const tempFriends = []
    const friends = await firebase.firestore().collection("friends").where("mainUser", "==", user.email).get()
    friends.forEach(doc => tempFriends.push(doc.data().otherUser))

    const tempFriendInfo = []
    for (let i = 0; i < tempFriends.length; i++) {
      let friendInfo = await firebase.firestore().collection("users").where("email", "==", tempFriends[i]).get()
      friendInfo.forEach(doc => tempFriendInfo.push(doc.data()))
    }

    setFollowedUsers(tempFriendInfo)
  }

  useEffect(() => {

    const getWeather = async () => {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${user.location}&appid=311bafebdf0eea75bbc8bf0076efb2b0&units=metric`)

      setWeather({
        main: response.data.main,
        weather: response.data.weather
      })
    }

    getWeather()
    getFollowedUsers()
  }, [])

  if (user) {
    return (
      <>
        <TopRightBar>
          <TopRightBarInner>
            <div>{user.email}</div>

            <Button
              onClick={() => {
                setOpen(true)
              }}
            >Follow User</Button>
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

        {followedUsers.map((user, i) => {
          return (
            <UserCard
              user={user}
              index={i}
            />
          )
        })}

        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
        >
          <Modal.Header>Find User</Modal.Header>
          <Modal.Content>
            <Input placeholder="Enter email" onChange={(e) => {
              setFollowEmail(e.target.value)
            }} />
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={async () => {
                firebase.firestore().collection("users").where("email", "==", followEmail).get()
                  .then(querySnapshot => {
                    if (querySnapshot.docs.length > 0) {
                      querySnapshot.forEach((doc) => {

                        firebase.firestore().collection("friends").add({
                          mainUser: user.email,
                          otherUser: doc.data().email
                        })
                          .then(() => {
                            addToast('User followed!', { appearance: 'success' });

                            getFollowedUsers()
                            setOpen(false)
                          })
                          .catch((error) => {

                            addToast(error.message, { appearance: 'error' });
                          });

                      })
                    } else {
                      addToast('This user email is not valid.', { appearance: 'error' });
                    }
                  }).catch(err => {
                    console.log(err)
                  })
              }}
            >
              Follow
          </Button>
          </Modal.Actions>
        </Modal>

        <br />
        <Clock format={'h:mm A'} ticking={true} timezone={user.timezone} style={{
          fontSize: '60px'
        }} />
        <Header>Good Morning, {user.name}</Header>
        <Segment>{user.location} | {user.timezone} | {weather ? <>{weather.main.temp}&deg;C</> : null}</Segment>
      </>
    )
  } else {
    return null
  }
}

export default Main