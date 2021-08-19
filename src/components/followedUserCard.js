import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
  font-family: ProductSansBold;
  font-size: 40px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
`

const WeatherIcon = styled.img`

`

const UserCard = ({
  user
}) => {

  const [weather, setWeather] = useState(null)
  const [onLoad, setOnLoad] = useState(false)

  useEffect(() => {
    const getWeather = async () => {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${user.location}&appid=311bafebdf0eea75bbc8bf0076efb2b0&units=metric`)

      setWeather({
        main: response.data.main,
        weather: response.data.weather
      })
    }

    setTimeout(() => {
      setOnLoad(true)
    }, 100)
    getWeather()

  }, [])
  return (
    <>
      <Card className={onLoad ? "fade-in" : ""}>
        <p>
          It’s <b><Clock format={'h:mm A'} ticking={true} timezone={user.timezone} /></b> at <b>{user.location.split(",")[0]}</b>. <br />
          <b>{user.name}</b> is currently sleeping, dreaming about his future wife.
        </p>
      </Card>
      <Card className={weather ? "fade-in" : ""}>
        {weather ?
          <CardWeather>
            <div>{Math.round(weather.main.temp)}&deg;</div>
            <WeatherIcon src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} width="50px" height="50px" />
          </CardWeather>
          : null}
        <p style={{ fontSize: '15px' }}>
          Today’s weather at <b>{user.location.split(",")[0]}</b> is fantabulous, hopefully Joe’s outside kicking a soccer ball.
        </p>
      </Card>
      {/* <Card>
        <p>
          It’s <b>5:45 AM</b> at <b>San Francisco</b>. <br />
          <b>Joseph</b> is currently sleeping, dreaming about his future wife.
        </p>
      </Card> */}
    </>
  )
}

export default UserCard