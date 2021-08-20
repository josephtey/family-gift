/*global chrome*/
import React, { useEffect, useState, useRef } from 'react'
import { Button, Input, Modal, Form } from 'semantic-ui-react'
import firebase from '../firebase'
import "firebase/auth";
import "firebase/storage";
import Clock from 'react-live-clock';
import styled from 'styled-components'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications';
import UserCard from '../components/followedUserCard'
import { BackgroundImage } from 'react-image-and-background-image-fade'
import TopOverlayImage from '../assets/top-overlay.png'
import { FaTree, FaSignOutAlt } from 'react-icons/fa'
import ReactImageAppear from 'react-image-appear';


const CoverPhotoImage = styled(BackgroundImage)`
  background-repeat: no-repeat center center fixed;
  background-position: center;
  background-size: cover;
`
const Container = styled.div`
  animation: fade-in-scale-down 0.2s ease-out 1;
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

  .fade-in {
    opacity: 1;
    transition: opacity 1s ease;
  }

  .animate-in {
    animation: fade-in-scale-down 0.2s ease-out 1;
  }

  .ui.disabled.input, .ui.form .disabled.field, .ui.form .disabled.fields .field, .ui.form .field :disabled {
    opacity: 1 !important;
    font-family: ProductSansBold !important;
  }
`

const CoverPhoto = styled.div`
  flex: 1.2;
  transition: flex 0.5s ease;
  position: relative;

  &:hover {
    flex: 1.8;
    transition: flex 0.5s ease;
  }

  // & > div > div {
  //   background-color: #262626 !important;
  // }

  // & > div > div:before {
  //   background-image: linear-gradient(
  //     100deg,
  //     rgba(255, 255, 255, 0),
  //     rgba(255, 255, 255, 0) 50%,
  //     rgba(255, 255, 255, 0) 80%
  //   );
  // }
`

const MainScreen = styled.div`
  transition: flex 0.5s ease;
  flex: ${props => props.expand ? '0.8' : '0.4'};
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
  flex: 1;
  margin-bottom: 30px;
  transition: margin-bottom 0.5s ease;

  &:hover {
    margin-bottom: 0px;
    transition: margin-bottom 0.5s ease;
  }

  &:hover svg {
    opacity: 0.3;
  }
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
  flex: 1;
  justify-content: flex-end;
  opacity: 0;
`
const Temperature = styled.div`
  font-family: ProductSansBold;
  font-size: 45px;
  flex-direction: row;
  gap: 10px;
`

const WeatherIcon = styled.img`

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
  overflow: hidden;
  flex: ${props => props.expand ? '0.5' : '0'};
  padding: ${props => props.expand ? '25px 150px' : '0 150px'};
  background: #F4F4F4;
  display: flex;
  gap: 30px;
  transition: all 0.5s ease;
`

const ActionLinks = styled.div`
  font-family: ProductSansRegular;
  display: flex;
  gap: 10px;

  svg {
    cursor: pointer;
    opacity: 0;
    color: black;
    transition: opacity 0.5s ease;
  }

  svg:hover {
    opacity: 0.7;
    transition: opacity 0.5s ease;
  }
  
`
const MiddleSection = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  flex-direction: column;
  position: relative;
  flex: 1;
`

const TopOverlay = styled.img`
  width: 100%;
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0; 
  height: 300px;
`

const BottomOverlay = styled.img`
  transform: scaleY(-1);
  width: 100%;
  z-index: 100;
  position: absolute;
  bottom: 0;
  height: 400px;
`

const MainQuote = styled.div`
  color: white;
  font-family: ProductSansRegular;
  font-size: 15px;
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 15px;
  z-index: 1000;
`

const FocusInput = styled(Input)`
  width: 30%;

  input, input:active, input:focus {
    font-family: ProductSansRegular !important;
    font-size: 20px;
    border: none !important;
    text-align: center !important;
    background: rgba(0,0,0,0) !important;
    color: white !important;
    border-radius: 0 !important;
  }
  input::selection {
    background: white;
    color: black;
    border-bottom: 1px solid white;
  }

  input::placeholder {
    color: rgba(255, 255, 255, 0.3) !important;
    opacity: 1;
  }
`

const TodayHighlight = styled.div`
  position: absolute;
  color: white;
  top: 15px;
  font-size: 15px;
  font-family: ProductSansRegular;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`

const FocusSubText = styled.div`
  opacity: 0;
  text-transform: uppercase;
  font-family: ProductSansBold;
  font-size: 10px;
  text-align: center;
  margin-top: -4px;
  color: rgba(255, 255, 255, 0.8);
  transition: opacity 1s ease;
  cursor: ${props => props.pointerCursor ? 'pointer' : 'normal'};
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
  const [onLoad, setOnLoad] = useState(false)
  const [highlight, setHighlight] = useState("")
  const [highlightExists, setHighlightExists] = useState(false)
  const [expand, setExpand] = useState(false)
  const focusInputRef = useRef()

  const getFollowedUsers = async () => {
    const tempFriends = []
    const friends = await firebase.firestore().collection("friends").where("mainUser", "==", user.email).get()
    friends.forEach(doc => {
      tempFriends.push(doc.data().otherUser);
    })

    const tempFriendInfo = []
    for (let i = 0; i < tempFriends.length; i++) {
      let friendInfo = await firebase.firestore().collection("users").where("email", "==", tempFriends[i]).get()
      friendInfo.forEach(doc => tempFriendInfo.push(doc.data()))
    }

    setFollowedUsers(tempFriendInfo)
  }

  const fetchHighlight = async () => {

    let highlight = null
    const highlights = await firebase.firestore().collection("highlights").where("user", "==", user.email).where("date", "==", new Date().toLocaleDateString("en-AU", { timeZone: user.timezone })).get()
    highlights.forEach(doc => highlight = doc.data().highlight)

    setHighlight(highlight)

    if (highlight) {
      setHighlightExists(true)
    }
  }


  const updateHighlight = async (newHighlight) => {

    let todayhighlightID = null
    const highlights = await firebase.firestore().collection("highlights").where("user", "==", user.email).where("date", "==", new Date().toLocaleDateString("en-AU", { timeZone: user.timezone })).get()
    highlights.forEach(doc => todayhighlightID = doc.id)

    if (todayhighlightID) {
      const docRef = firebase.firestore().collection("highlights").doc(todayhighlightID)
      firebase.firestore().runTransaction((transaction) => {
        return transaction.get(docRef).then((doc) => {
          if (!doc.exists) {
            addToast('Error, highlight does not exist', { appearance: 'error' })
          }

          transaction.update(docRef, { highlight: newHighlight })
        })
      }).then(() => {
        console.log("Transaction successfully committed!");
      }).catch((error) => {
        addToast(error.message, { appearance: 'error' })
      });
    } else {
      firebase.firestore().collection("highlights").add({
        user: user.email,
        date: new Date().toLocaleDateString("en-AU", { timeZone: user.timezone }),
        highlight: newHighlight
      })
    }

  }

  useEffect(() => {

    const getWeather = async () => {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${user.location}&appid=311bafebdf0eea75bbc8bf0076efb2b0&units=metric`)

      console.log(response.data)

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

    getWeather()
    getFollowedUsers()
    fetchHighlight()

    setTimeout(() => {
      setOnLoad(true)
    }, 0)
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
        {/* <TopRightBar>
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
        </TopRightBar> */}


        <CoverPhoto className="coverPhoto">
          <TopOverlay src={TopOverlayImage} />
          <MainQuote>
            Sometimes, less is more.
          </MainQuote>
          <TodayHighlight>
            <Form
              style={{
                width: '50%'
              }}
              onSubmit={() => {
                if (highlight.length != 0) {
                  updateHighlight(highlight)
                  setHighlightExists(true)
                } else {
                  setHighlightExists(false)
                }
              }}
              onBlur={() => {
                if (highlight.length != 0) {
                  updateHighlight(highlight)
                  setHighlightExists(true)
                } else {
                  setHighlightExists(false)
                }
              }}
            >
              <Form.Field>
                <FocusInput
                  value={highlight}
                  disabled={highlightExists ? true : false} className={`focus-input ${highlightExists ? "animate-in" : ""}`} placeholder="What is your focus today?" onChange={(e) => {
                    setHighlight(e.target.value)
                  }}
                  ref={focusInputRef}
                />

                <FocusSubText
                  pointerCursor={highlightExists}
                  onClick={() => {
                    if (highlightExists) {
                      setHighlightExists(false)
                      setTimeout(() => {
                        focusInputRef.current.focus()
                      }, 0)
                    }
                  }}
                  className={highlightExists ? "fade-in" : ""}>
                  <span>Today's Focus</span>
                </FocusSubText>

              </Form.Field>
            </Form>
          </TodayHighlight>
          <BottomOverlay src={TopOverlayImage} />

          <CoverPhotoImage
            src='https://firebasestorage.googleapis.com/v0/b/family-gift-85cf0.appspot.com/o/wallpapers%2Fwallpaperflare.com_wallpaper.jpg?alt=media&token=81f5fc30-45ad-4891-a4d3-32a757bb99f7'
            width="100%"
            height="100%"
          />
        </CoverPhoto>
        <MainScreen
          expand={expand}
        >
          <GreetingMessage className="greeting">
            <ActionLinks>
              <FaTree size={25} onClick={() => {
                if (expand) {
                  setExpand(false)
                } else {
                  setExpand(true)
                }
              }} />
              <FaSignOutAlt
                onClick={() => {
                  firebase.auth().signOut()
                  chrome.storage.local.clear()
                  setUser(null)
                }}
                size={25}
              />
            </ActionLinks>
            <Greeting>
              Good Morning
            </Greeting>
            <Name>
              {user.name}
            </Name>
          </GreetingMessage>
          <MiddleSection>
            <Clock format={'h:mm'} ticking={true} timezone={user.timezone} style={{
              fontFamily: 'productSansBold',
              fontSize: '80px'
            }} />
          </MiddleSection>
          <Weather className={weather ? "fade-in" : ""}>
            {weather ?
              <>
                <Temperature>
                  <p>{Math.round(weather.main.temp)}&deg;</p>
                </Temperature>
                <WeatherDesc>
                  <WeatherLocation>
                    {user.location.split(",")[0]}
                  </WeatherLocation>
                  <WeatherType>
                    {weather.weather[0].main}
                  </WeatherType>
                </WeatherDesc>
                <WeatherIcon src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} width="50px" height="50px" />
              </>
              : null}

          </Weather>
        </MainScreen>
        <FriendCards className="friendCards" expand={expand}>
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