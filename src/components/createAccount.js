import React, { useState } from 'react'
import firebase from '../firebase'
import "firebase/auth";
import { useToasts } from 'react-toast-notifications';
import { Input, Button, Form } from 'semantic-ui-react'
import styled from 'styled-components'
import TimezoneSelect from 'react-timezone-select'
import Autocomplete from "react-google-autocomplete";


const FormContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    width: 100%;
  }
`
const CreateAccount = ({
  setLoading,
  setUser,
  gotoLoginScreen
}) => {
  const { addToast } = useToasts();

  const [email, setEmail] = useState("")
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
  const [location, setLocation] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  return (
    <FormContainer>
      <a
        onClick={() => {
          gotoLoginScreen()
        }}
      >
        Back
      </a>
      <br />
      <Form
        autoComplete="off"
      >
        <Form.Field>
          <Input id="email" placeholder='Email' onChange={(e) => {
            setEmail(e.target.value)
          }} />
        </Form.Field>

        <Form.Field>
          <Input id="name" placeholder='Name' onChange={(e) => {
            setName(e.target.value)
          }} />
        </Form.Field>

        <Form.Field>
          <Autocomplete
            placeholder="Enter a city/suburb"
            apiKey={"AIzaSyAoo4AxObgyDTt93omLUjila-ircLZX5_s"}
            onPlaceSelected={(place) => {
              const country = place.address_components.find(item => item.types.includes('country')).short_name
              const main = place.address_components[0].long_name

              setLocation(`${main}, ${country}`)
            }}
          />
        </Form.Field>

        <Form.Field>
          <TimezoneSelect
            value={timezone}
            onChange={setTimezone}
          />
        </Form.Field>

        <Form.Field>
          <Input id="password" type="password" placeholder='Password' onChange={(e) => {
            setPassword(e.target.value)
          }} />
        </Form.Field>
        <br />
        <Button
          onClick={() => {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
              .then(() => {
                setLoading(true)
                return firebase.auth().createUserWithEmailAndPassword(email, password)
                  .then((userCredential) => {
                    const authUser = userCredential.user;
                    const extraUserInfo = {
                      timezone: timezone.value ? timezone.value : timezone,
                      name,
                      email,
                      location
                    }

                    firebase.firestore().collection("users").doc(userCredential.user.uid).set(extraUserInfo)
                      .then((doc) => {
                        setUser({
                          ...authUser,
                          ...extraUserInfo
                        })

                        setLoading(false)
                        addToast('You have successfully created your account!', { appearance: 'success' });

                      })
                      .catch((error) => {
                        setLoading(false)
                        addToast(error.message, { appearance: 'error' });
                      });


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
        >Create Acount</Button>
      </Form>
    </FormContainer>
  )
}

export default CreateAccount