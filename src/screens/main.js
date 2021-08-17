/*global chrome*/
import React, { useEffect, useState } from 'react'
import { Button, Header, Segment, Input, Modal } from 'semantic-ui-react'
import firebase from '../firebase'
import "firebase/auth";
import "firebase/storage";
import Clock from 'react-live-clock';
import styled from 'styled-components'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications';
import UserCard from '../components/followedUserCard'

const Container = styled.div`
  animation: fade-in-scale-down 0.4s ease-out 1;
  -webkit-animation: fade-in-scale-down 0.4s ease-in-out 1;
  -moz-animation:    fade-in-scale-down 0.4s ease-in-out 1;
  -o-animation:      fade-in-scale-down 0.4s ease-in-out 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @keyframes fade-in-scale-down{
    0%{
      opacity:0;
      -webkit-transform:scale(1.1);
      -ms-transform:scale(1.1);
      transform:scale(1.1)
    }
    
    100%{
      opacity:1;
      -webkit-transform:scale(1);
      -ms-transform:scale(1);
      transform:scale(1);
    }
  }
`
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

const CoverPhoto = styled.div`
  background-image: url("${props => props.bgurl}");
  background-repeat: no-repeat center center fixed;
  background-position: center;
  background-size: cover;
  flex: 1.2;
`

const MainScreen = styled.div`
  flex: 1.5;
  display: flex;
  background: white;
  padding: 10px 150px;
  align-items: center;
  justify-content: space-between;
  color: #545454;
`

const GreetingMessage = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 23px;
`

const Greeting = styled.div`
  font-family: ProductSansRegular;
  font-size: 30px;
`

const Name = styled.div`
  font-family: ProductSansBold;
  font-size: 40px;
`

const Weather = styled.div`
  display: flex;
  align-items: center;
`
const Temperature = styled.div`
  font-family: ProductSansBold;
  font-size: 45px;
`

const WeatherDesc = styled.div`
  flex-direction: column;
  display: flex;
  text-align: center;
  padding: 0 15px;
`

const WeatherLocation = styled.div`
  font-family: ProductSansRegular;
  font-size:17px;
`

const WeatherType = styled.div`
  font-family: ProductSansBold;
  font-size: 17px;
`

const FriendCards = styled.div`
  flex: 0.8 ;
  background: #F4F4F4;
  padding: 25px 150px;
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
  const [backgroundURL, setBackgroundURL] = useState(null)

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

    const downloadWallpaper = async () => {
      const storageRef = firebase.storage().ref('wallpapers')

      function setBackground(imageRef) {
        imageRef.getDownloadURL().then(function (url) {
          console.log(url)
          setBackgroundURL(url)
        }).catch(function (error) {
          addToast(error.message, { appearance: 'error' });
        });
      }

      storageRef.listAll()
        .then((res) => {
          res.items.forEach(async (imageRef) => {
            setBackground(imageRef)
          });
        }).catch((error) => {
          addToast(error.message, { appearance: 'error' });
        });
    }

    downloadWallpaper()
    getWeather()
    getFollowedUsers()
  }, [])

  if (user) {
    return (
      <Container>
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


        <CoverPhoto bgurl={backgroundURL} />
        <MainScreen>
          <GreetingMessage>
            <Greeting>
              Good Morning
            </Greeting>
            <Name>
              {user.name}
            </Name>
          </GreetingMessage>
          <Clock format={'h:mm'} ticking={true} timezone={user.timezone} style={{
            fontFamily: 'productSansBold',
            fontSize: '80px'
          }} />
          <Weather>
            <Temperature>
              {weather ? Math.round(weather.main.temp) : null}&deg;
            </Temperature>
            <WeatherDesc>
              <WeatherLocation>
                {user.location.split(",")[0]}
              </WeatherLocation>
              <WeatherType>
                Partly Cloudy
              </WeatherType>
            </WeatherDesc>

          </Weather>
        </MainScreen>
        <FriendCards>
          {followedUsers.map((user, i) => {
            return (
              <UserCard
                user={user}
                index={i}
              />
            )
          })}

        </FriendCards>
        {/*
        {followedUsers.map((user, i) => {
          return (
            <UserCard
              user={user}
              index={i}
            />
          )
        })}

        

         <br />
        <Clock format={'h:mm A'} ticking={true} timezone={user.timezone} style={{
          fontSize: '60px'
        }} />
        <Header>Good Morning, {user.name}</Header>
        <Segment>{user.location} | {user.timezone} | {weather ? <>{weather.main.temp}&deg;C</> : null}</Segment> */}
      </Container>
    )
  } else {
    return null
  }
}

export default Main