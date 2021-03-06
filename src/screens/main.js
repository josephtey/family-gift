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
import { FaTree, FaSignOutAlt, FaKissWinkHeart, FaAngleLeft, FaLightbulb } from 'react-icons/fa'
import ReactImageAppear from 'react-image-appear';

const Card = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: white;
  font-family: ProductSansRegular;
  font-size: 18px;
  color: #545454;
  padding: 30px;
  box-shadow: 0 0 12px -2px rgba(0,0,0,0.05);
  flex: 1;

  b {
    font-family: ProductSansBold;
  }
`

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
    border: none !important;
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
  margin-bottom: 40px;
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
  display: flex;
  gap: 30px;
  height: 100%;
  width: 100%;
`
const FriendCardsWrapper = styled.div`
  background: #F4F4F4;
  overflow: hidden;
  flex: ${props => props.expand ? '0.5' : '0'};
  padding: ${props => props.expand ? '25px 150px' : '0 150px'};
  background: #F4F4F4;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
  gap: 20px;
  align-items: center;

  &:hover > .reminder-icon, &:hover > .musing-icon {
    opacity: ${props => props.cardState === 'normal' ? '0.3' : '0'};
  }
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

const ReminderPopup = styled.div`
  color: white;
  font-family: ProductSansRegular;
  font-size: 12px;
  text-align: center;
  position: absolute;
  background: rgba(0,0,0,0.2);
  border-radius: 15px;
  padding: 12px;
  right: 15px;
  top: 15px;
  z-index: 1000;
  width: 20%;
`

const MusingPopup = styled.div`
  color: white;
  font-family: ProductSansRegular;
  font-size: 12px;
  text-align: center;
  position: absolute;
  background: rgba(0,0,0,0.2);
  border-radius: 15px;
  padding: 12px;
  left: 15px;
  top: 15px;
  z-index: 1000;
  width: 20%;
`

const CardInput = styled(Input)`
  width: 60%;
  margin-top: 10px;

  input, input:active, input:focus {
    font-family: ProductSansRegular !important;
    font-size: 20px;
    border-left: none !important;
    border-right: none !important;
    border-top: none !important;
    border-bottom: 1.5px solid rgba(0,0,0,0.15) !important;
    text-align: center !important;
    background: rgba(0,0,0,0) !important;
    color: rgba(0,0,0,0.3) !important;
    border-radius: 0 !important;
    padding: 2px !important;
  }
  input::selection {
    background: black;
    color: white;
    border-bottom: 1px solid white;
  }

  input::placeholder {
    color: rgba(255, 255, 255, 0.3) !important;
    opacity: 1;
  }
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

const FriendCardsTitle = styled.div`
  font-family: ProductSansBold;
  color: rgba(0,0,0,0.3);
  font-size: 20px;
`

const ReminderIcon = styled(FaKissWinkHeart)`
  position: absolute;
  left: 110px;
  opacity: 0;
  transition: all 1s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.5 !important;
  }
`

const MusingIcon = styled(FaLightbulb)`
  position: absolute;
  right: 110px;
  opacity: 0;
  transition: all 1s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.5 !important;
  }
`

const BackButton = styled(FaAngleLeft)`
  opacity: 0.3;
  transition: all 1s ease;  
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`


const Main = ({
  user,
  setUser
}) => {
  const { addToast } = useToasts();

  const [weather, setWeather] = useState(null)
  const [quote, setQuote] = useState("")
  const [addQuoteOpen, setAddQuoteOpen] = useState(false)
  const [addQuoteText, setAddQuoteText] = useState("")
  const [followEmail, setFollowEmail] = useState('')
  const [open, setOpen] = useState(false)
  const [followedUsers, setFollowedUsers] = useState([])
  const [backgroundURL, setBackgroundURL] = useState(null)
  const [onLoad, setOnLoad] = useState(false)
  const [highlight, setHighlight] = useState("")
  const [highlightExists, setHighlightExists] = useState(false)
  const [expand, setExpand] = useState(false)
  const [cardState, setCardState] = useState('normal')
  const [reminderExists, setReminderExists] = useState(false)
  const [reminder, setReminder] = useState("")
  const [musing, setMusing] = useState("")
  const [musingExists, setMusingExists] = useState(false)
  const [followedMusing, setFollowedMusing] = useState()
  const [followedReminder, setFollowedReminder] = useState()
  const [allMusings, setAllMusings] = useState([])
  const [allReminders, setAllReminders] = useState([])
  const [allRemindersOpen, setAllRemindersModalOpen] = useState(false)
  const [allMusingsOpen, setAllMusingsModalOpen] = useState(false)

  const focusInputRef = useRef()
  const cardInputRef = useRef()

  const getAllMusings = async (user) => {

    let musings = []
    const querySnapshot = await firebase.firestore().collection("musings").where("user", "==", user.email).get()
    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        musings.push(doc.data());
      })
    }

    setAllMusings(musings)
  }


  const getAllReminders = async (user) => {

    let reminders = []
    const querySnapshot = await firebase.firestore().collection("reminders").where("user", "==", user.email).get()
    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        reminders.push(doc.data());
      })
    }

    setAllReminders(reminders)
  }

  const getMusingAndReminder = async (followedUsers) => {

    // for child
    if (followedUsers.length > 1) {
      if (followedUsers[0].name === 'Dad') {
        getAllMusings(followedUsers[0]);
        firebase.firestore().collection("musings").where("user", "==", followedUsers[0].email).where("date", "==", new Date().toLocaleDateString("en-AU", { timeZone: followedUsers[0].timezone })).get()
          .then(querySnapshot => {
            if (querySnapshot.docs.length > 0) {
              querySnapshot.forEach((doc) => {
                setFollowedMusing(['Dad', doc.data().musing])
              })
            }
          }
          )
      }

      if (followedUsers[0].name === 'Mum') {
        getAllReminders(followedUsers[0])
        firebase.firestore().collection("reminders").where("user", "==", followedUsers[0].email).where("date", "==", new Date().toLocaleDateString("en-AU", { timeZone: followedUsers[0].timezone })).get()
          .then(querySnapshot => {
            if (querySnapshot.docs.length > 0) {
              querySnapshot.forEach((doc) => {
                setFollowedReminder(['Mum', doc.data().reminder])
              })
            }
          }
          )
      }
      if (followedUsers[1].name === 'Dad') {
        getAllMusings(followedUsers[1]);
        firebase.firestore().collection("musings").where("user", "==", followedUsers[1].email).where("date", "==", new Date().toLocaleDateString("en-AU", { timeZone: followedUsers[1].timezone })).get()
          .then(querySnapshot => {
            if (querySnapshot.docs.length > 0) {
              querySnapshot.forEach((doc) => {
                setFollowedMusing(['Dad', doc.data().musing])
              })
            }
          }
          )
      }

      if (followedUsers[1].name === 'Mum') {
        getAllReminders(followedUsers[1])
        firebase.firestore().collection("reminders").where("user", "==", followedUsers[1].email).where("date", "==", new Date().toLocaleDateString("en-AU", { timeZone: followedUsers[1].timezone })).get()
          .then(querySnapshot => {
            if (querySnapshot.docs.length > 0) {
              querySnapshot.forEach((doc) => {
                setFollowedReminder(['Mum', doc.data().reminder])
              })
            }
          }
          )
      }

      // for parents
    } else {
      getAllMusings(followedUsers[0]);
      firebase.firestore().collection("musings").where("user", "==", followedUsers[0].email).where("date", "==", new Date().toLocaleDateString("en-AU", { timeZone: followedUsers[0].timezone })).get()
        .then(querySnapshot => {
          if (querySnapshot.docs.length > 0) {
            querySnapshot.forEach((doc) => {
              setFollowedMusing([followedUsers[0].name, doc.data().musing])
            })
          }
        }
        )

      getAllReminders(followedUsers[0])
      firebase.firestore().collection("reminders").where("user", "==", followedUsers[0].email).where("date", "==", new Date().toLocaleDateString("en-AU", { timeZone: followedUsers[0].timezone })).get()
        .then(querySnapshot => {
          if (querySnapshot.docs.length > 0) {
            querySnapshot.forEach((doc) => {
              setFollowedReminder([followedUsers[0].name, doc.data().reminder])
            })
          }
        }
        )
    }

  }

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

    getMusingAndReminder(tempFriendInfo)

    const newTempFriendInfo = tempFriendInfo.map(friend => {
      if (friend.name === 'Dad' || friend.name === 'Mum') {
        return {
          ...friend,
          name: 'Mum & Dad'
        }
      } else {
        return friend
      }
    })

    setFollowedUsers(newTempFriendInfo)
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

  const addQuote = (quote) => {
    firebase.firestore().collection("quotes").add({
      quote,
      date: ""
    })
      .then(() => {
        addToast('Quote added!', { appearance: 'success' });
      })
      .catch((error) => {

        addToast(error.message, { appearance: 'error' });
      });
  }

  const updateMusing = async (newMusing) => {
    let todayMusingID = null
    const musings = await firebase.firestore().collection("musings").where("user", "==", user.email).where("date", "==", new Date().toLocaleDateString("en-AU", { timeZone: user.timezone })).get()
    musings.forEach(doc => todayMusingID = doc.id)

    if (todayMusingID) {
      const docRef = firebase.firestore().collection("musings").doc(todayMusingID)
      firebase.firestore().runTransaction((transaction) => {
        return transaction.get(docRef).then((doc) => {
          if (!doc.exists) {
            addToast('Error, reminder does not exist', { appearance: 'error' })
          }

          transaction.update(docRef, { musing: newMusing })
        })
      }).then(() => {
        console.log("Transaction successfully committed!");
      }).catch((error) => {
        addToast(error.message, { appearance: 'error' })
      });
    } else {
      firebase.firestore().collection("musings").add({
        user: user.email,
        date: new Date().toLocaleDateString("en-AU", { timeZone: user.timezone }),
        musing: newMusing
      })
    }
  }

  const updateReminder = async (newReminder) => {
    let todayReminderID = null
    const reminders = await firebase.firestore().collection("reminders").where("user", "==", user.email).where("date", "==", new Date().toLocaleDateString("en-AU", { timeZone: user.timezone })).get()
    reminders.forEach(doc => todayReminderID = doc.id)

    if (todayReminderID) {
      const docRef = firebase.firestore().collection("reminders").doc(todayReminderID)
      firebase.firestore().runTransaction((transaction) => {
        return transaction.get(docRef).then((doc) => {
          if (!doc.exists) {
            addToast('Error, reminder does not exist', { appearance: 'error' })
          }

          transaction.update(docRef, { reminder: newReminder })
        })
      }).then(() => {
        console.log("Transaction successfully committed!");
      }).catch((error) => {
        addToast(error.message, { appearance: 'error' })
      });
    } else {
      firebase.firestore().collection("reminders").add({
        user: user.email,
        date: new Date().toLocaleDateString("en-AU", { timeZone: user.timezone }),
        reminder: newReminder
      })
    }
  }
  const fetchReminder = () => {
    firebase.firestore().collection("reminders").where("user", "==", user.email).where("date", "==", new Date().toLocaleDateString("en-AU", { timeZone: user.timezone })).get()
      .then(snapshot => {
        if (snapshot.size > 0) {
          snapshot.forEach(doc => {
            setReminder(doc.data().reminder)
            setReminderExists(true)
          })
        }
      })
  }

  const fetchMusing = () => {
    firebase.firestore().collection("musings").where("user", "==", user.email).where("date", "==", new Date().toLocaleDateString("en-AU", { timeZone: user.timezone })).get()
      .then(snapshot => {
        if (snapshot.size > 0) {
          snapshot.forEach(doc => {
            setMusing(doc.data().musing)
            setMusingExists(true)
          })
        }
      })
  }

  const fetchRandomQuote = () => {

    firebase.firestore().collection("quotes").where("date", "==", new Date().toLocaleDateString("en-AU", { timeZone: user.timezone })).get()
      .then(snapshot => {
        if (snapshot.size > 0) {
          snapshot.forEach(doc => {
            setQuote(doc.data().quote)
          })
        } else {
          firebase.firestore().collection("quotes").where("date", "==", "").get()
            .then(snapshot => {
              if (snapshot.size > 0) {
                snapshot.forEach(doc => {
                  setQuote(doc.data().quote)

                  const docRef = firebase.firestore().collection("quotes").doc(doc.id)
                  firebase.firestore().runTransaction((transaction) => {
                    return transaction.get(docRef).then((doc) => {
                      if (!doc.exists) {
                        addToast('Error, quote does not exist', { appearance: 'error' })
                      }

                      transaction.update(docRef, { date: new Date().toLocaleDateString("en-AU", { timeZone: user.timezone }) })
                    })

                  });
                })
              }
            })
            .catch(error => {
              addToast(error.message, { appearance: 'error' });
            });
        }
      })


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

    fetchRandomQuote()
    getWeather()
    getFollowedUsers()
    fetchHighlight()
    fetchReminder()
    fetchMusing()

    setTimeout(() => {
      setOnLoad(true)
    }, 0)
  }, [])

  if (user) {
    return (
      <Container>
        <Modal
          onClose={() => setAllRemindersModalOpen(false)}
          onOpen={() => setAllRemindersModalOpen(true)}
          open={allRemindersOpen}
        >
          <Modal.Header>All Reminders</Modal.Header>
          <Modal.Content>
            <div style={{ height: '300px', overflow: 'auto' }}>
              {allReminders.length > 0 && allReminders.map((reminder) => {
                return (
                  <div>
                    <b>{reminder.date}</b> <br />
                    {reminder.reminder} <br /> <br />
                  </div>
                )
              })}
            </div>
          </Modal.Content>
          <Modal.Actions>
            {/* <Button
              onClick={async () => {
                addQuote(addQuoteText)
                setAddQuoteOpen(false)
              }}
            >
              Add Quote
          </Button> */}
          </Modal.Actions>
        </Modal>

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

        <Modal
          onClose={() => setAddQuoteOpen(false)}
          onOpen={() => setAddQuoteOpen(true)}
          open={addQuoteOpen}
        >
          <Modal.Header>Add Quote</Modal.Header>
          <Modal.Content>
            <Input placeholder="What quote do you want to add?" onChange={(e) => {
              setAddQuoteText(e.target.value)
            }} />
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={async () => {
                addQuote(addQuoteText)
                setAddQuoteOpen(false)
              }}
            >
              Add Quote
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


        <CoverPhoto className="coverPhoto" onClick={() => {
          setAllRemindersModalOpen(true);
        }}>
          <TopOverlay src={TopOverlayImage} />

          {followedReminder ?
            <ReminderPopup className={followedReminder ? "fade-in" : null}>
              <span style={{ fontSize: '15px', 'margin-bottom': '10px' }}>A reminder from <b>{followedReminder[0]}</b></span> <br />
              <span style={{ fontSize: '10px', lineHeight: '7px', opacity: '0.8' }}>{followedReminder[1]}</span>
            </ReminderPopup>
            : null}

          {followedMusing ?
            <MusingPopup className={followedMusing ? "fade-in" : null}>
              <span style={{ fontSize: '15px', 'margin-bottom': '10px' }}>A musing from <b>{followedMusing[0]}</b></span> <br />
              <span style={{ fontSize: '11px', lineHeight: '7px', opacity: '0.8' }}>{followedMusing[1]}</span>
            </MusingPopup>
            : null}




          <MainQuote
            onClick={() => {
              setAddQuoteOpen(true)
            }}
          >
            {quote}
          </MainQuote>
          <TodayHighlight>
            <Form
              style={{
                width: '50%'
              }}
              onSubmit={() => {
                if (highlight && highlight.length != 0) {
                  updateHighlight(highlight)
                  setHighlightExists(true)
                } else {
                  setHighlightExists(false)
                }
              }}
              onBlur={() => {
                if (highlight && highlight.length != 0) {
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
            src='https://i.ibb.co/9nXdSBd/wallpaperflare-com-wallpaper.jpg'
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
                  chrome.storage.sync.clear()
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
        <FriendCardsWrapper expand={expand} cardState={cardState}>
          {followedUsers.length > 0 && user.name != 'Dad' ?
            <ReminderIcon size={25} className="reminder-icon" onClick={() => {
              setCardState('reminder')
            }} />
            : null}

          {followedUsers.length > 0 && user.name != 'Mum' ?
            <MusingIcon size={25} className="musing-icon" onClick={() => {
              setCardState('musing')
            }} />
            : null}

          {cardState === 'normal' ?
            <FriendCards className="friendCards" expand={expand}>

              {followedUsers.length > 0 ?
                <UserCard
                  user={followedUsers[0]}
                />
                : null}

            </FriendCards>
            : cardState === 'reminder' ?
              <>
                <Card>
                  <BackButton size={25} onClick={() => {
                    setCardState('normal')
                  }} />

                  <Form
                    onSubmit={() => {
                      updateReminder(reminder)
                      setReminderExists(true)
                    }}
                    style={{ fontSize: '20px' }}
                  >
                    <Form.Field>
                      What's something you'd like to gently remind {followedUsers[0].name} about?
                      <div
                        onClick={() => {
                          if (reminderExists) {
                            setReminderExists(false)
                            setTimeout(() => {
                              cardInputRef.current.focus()
                            }, 0)
                          }
                        }}
                      >
                        <CardInput
                          disabled={reminderExists}
                          value={reminder}
                          onChange={(e) => {
                            setReminder(e.target.value)
                          }}
                          ref={cardInputRef}
                          className={`${reminderExists ? "animate-in" : ""}`}
                          ref={cardInputRef}
                        />
                      </div>
                    </Form.Field>
                  </Form>
                </Card>
              </>
              : cardState === 'musing' ?
                <Card>
                  <BackButton size={25} onClick={() => {
                    setCardState('normal')
                  }} />

                  <Form
                    onSubmit={() => {
                      updateMusing(musing)
                      setMusingExists(true)
                    }}
                    style={{ fontSize: '20px' }}
                  >
                    <Form.Field>
                      What's something you've realised recently and want to share with {followedUsers[0].name}?
                  <div
                        onClick={() => {

                          if (musingExists) {
                            setMusingExists(false)
                            setTimeout(() => {
                              cardInputRef.current.focus()
                            }, 0)
                          }
                        }}
                      >
                        <CardInput
                          disabled={musingExists}
                          value={musing}
                          onChange={(e) => {
                            setMusing(e.target.value)
                          }}
                          className={`${musingExists ? "animate-in" : ""}`}
                          ref={cardInputRef}
                        />
                      </div>
                    </Form.Field>
                  </Form>
                </Card>
                : null
          }
        </FriendCardsWrapper>
      </Container>
    )
  } else {
    return null
  }
}

export default Main