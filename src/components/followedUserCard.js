import React, { useEffect, useState } from 'react'
import axios from 'axios'
import firebase from '../firebase'
import styled from 'styled-components'
import Clock from 'react-live-clock';

const Card = styled.div`
  opacity: 0;
  transition: opacity 2s ease;
  height: 100%;
  width: 33%;
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

const CardWeather = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  gap: 20px;
`

const CardTemperature = styled.div`
  font-family: ProductSansBold;
  font-size: 40px;
`

const CardWeatherDesc = styled.div`
  font-family: ProductSansBold;
  font-size: 20px;
`

const WeatherIcon = styled.img`

`

const UserCard = ({
  user
}) => {

  const [weather, setWeather] = useState(null)
  const [highlight, setHighlight] = useState(null)
  const [onLoad, setOnLoad] = useState(false)

  useEffect(() => {
    const getWeather = async () => {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${user.location}&appid=311bafebdf0eea75bbc8bf0076efb2b0&units=metric`)

      setWeather({
        main: response.data.main,
        weather: response.data.weather
      })
    }

    const getHighlight = async () => {

      const highlights = await firebase.firestore().collection("highlights").where("user", "==", user.email).where("date", "==", new Date().toLocaleDateString("en-AU", { timeZone: user.timezone })).get()
      highlights.forEach(doc => setHighlight(doc.data().highlight))
    }

    setTimeout(() => {
      setOnLoad(true)
    }, 100)

    getHighlight()
    getWeather()

  }, [])
  return (
    <>
      <Card className={onLoad ? "fade-in" : ""}>
        <p>
          In <b>{user.location.split(",")[0]}</b>, it's currently <b><Clock format={'h:mm A'} ticking={true} timezone={user.timezone} /></b>. <br />
          <b>{user.name}</b> is currently sleeping, dreaming about his future wife.
        </p>
      </Card>
      <Card className={weather ? "fade-in" : ""}>
        {weather ?
          <>
            <CardWeather>
              <CardTemperature>{Math.round(weather.main.temp)}&deg;</CardTemperature>
              <CardWeatherDesc>{weather.weather[0].main}</CardWeatherDesc>
              <WeatherIcon src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} width="50px" height="50px" />
            </CardWeather>
            <p style={{ fontSize: '15px' }}>
              Today’s weather at <b>{user.location.split(",")[0]}</b> is <b>{weather.weather[0].description}</b>, hopefully Joe’s outside kicking a soccer ball.
            </p>
          </>
          : null}
      </Card>
      <Card className={highlight ? "fade-in" : ""}>
        <p>
          <b>{user.name}'s</b> main focus today is: <br />
          {highlight}
        </p>
      </Card>
    </>
  )
}

export default UserCard