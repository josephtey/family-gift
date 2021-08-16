import React, { useEffect, useState } from 'react'
import { Segment } from 'semantic-ui-react'
import axios from 'axios'
import styled from 'styled-components'
import Clock from 'react-live-clock';

const Container = styled(Segment)`
  p {
    font-size: 20px;
  }
`

const UserCard = ({
  user
}) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const getWeather = async () => {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${user.location}&appid=311bafebdf0eea75bbc8bf0076efb2b0&units=metric`)

      setWeather({
        main: response.data.main,
        weather: response.data.weather
      })
    }

    getWeather()

  }, [])
  return (
    <Container>
      <p>At {user.location.split(",")[0]}, it is currently <Clock format={'h:mm A'} ticking={true} timezone={user.timezone} />.</p>
      <p>{user.name} is probably sleeping, while thinking about you :)</p>
      <p>It's currently {weather ? <>{weather.main.temp}&deg;C</> : null}</p>
    </Container>
  )
}

export default UserCard