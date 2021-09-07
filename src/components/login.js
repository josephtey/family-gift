/*global chrome*/
import React, { useState } from 'react'
import firebase from '../firebase'
import "firebase/auth";
import { useToasts } from 'react-toast-notifications';
import { Input, Button } from 'semantic-ui-react'
import styled from 'styled-components'

const FormContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  a {
    text-align: center;
  }
`

const Login = ({
  setLoading,
  setUser,
  gotoCreateAccountScreen
}) => {
  const { addToast } = useToasts();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <FormContainer>

      <Input id="email" placeholder='Email' onChange={(e) => {
        setEmail(e.target.value)
      }} />
      <Input id="password" type="password" placeholder='Password' onChange={(e) => {
        setPassword(e.target.value)
      }} />

      <br />
      <Button
        onClick={() => {
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
              setLoading(true)
              return firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {

                  let authUser = userCredential.user;

                  // get extra info
                  firebase.firestore().collection("users").doc(userCredential.user.uid).get()
                    .then((doc) => {
                      if (doc.exists) {
                        setUser({
                          ...authUser,
                          ...doc.data()
                        })
                        chrome.storage.sync.set({
                          user: doc.data()
                        });
                        setLoading(false)
                      } else {
                        setLoading(false)
                        addToast("Extra user info doesn't exist", { appearance: 'error' });
                      }
                    }).catch((error) => {
                      addToast(error.message, { appearance: 'error' });

                    });

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
      >Login</Button>

      <br />
      {/* <a
        onClick={() => {
          gotoCreateAccountScreen()
        }}
      >
        Create Account
      </a> */}
    </FormContainer>
  );
}

export default Login