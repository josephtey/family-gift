import React, { useState } from 'react'
import firebase from '../firebase'
import "firebase/auth";
import { useToasts } from 'react-toast-notifications';
import { Input, Button, Form } from 'semantic-ui-react'
import styled from 'styled-components'
import TimezoneSelect from 'react-timezone-select'




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
  const [password, setPassword] = useState("")

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
                    let authUser = userCredential.user;

                    firebase.firestore().collection("users").doc(userCredential.user.uid).set({
                      timezone: timezone.value ? timezone.value : timezone
                    })
                      .then(() => {
                        setUser({
                          ...authUser,
                          timezone: timezone.value ? timezone.value : timezone
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