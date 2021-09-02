import React, { useEffect, useState } from 'react'
import axios from 'axios'
import firebase from '../firebase'
import styled from 'styled-components'
import Clock from 'react-live-clock';
import gen from 'random-seed';

const Card = styled.div`
  opacity: 0;
  transition: opacity 2s ease;
  height: 100%;
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

const actionStates = {
  0: ["Breakfast"],
  1: ["Classes"],
  2: ["Lunch"],
  3: ["Activities"],
  4: ["Dinner"],
  5: ["Chill after dinner", "Party", "Have fun", "Listen to tunes"],
  6: ["In dorm, winding down"],
  7: ["Sleep!"]
}

const weatherStates = {
  0: ["Thunder"],
  1: ["Drizzle"],
  2: ["Rain"],
  3: ["Snow"],
  4: ["Weird"],
  5: ["Clear"],
  6: ["Some clouds"],
  7: ["Very cloudy"]
}

const getWeatherStatesFromCode = (weatherCode) => {
  if (weatherCode >= 200 && weatherCode < 300) {
    return 0
  } else if (weatherCode >= 300 && weatherCode < 400) {
    return 1
  } else if (weatherCode >= 500 && weatherCode < 600) {
    return 2
  } else if (weatherCode >= 600 && weatherCode < 700) {
    return 3
  } else if (weatherCode >= 700 && weatherCode < 800) {
    return 4
  } else if (weatherCode == 800) {
    return 5
  } else if (weatherCode > 800 && weatherCode <= 802) {
    return 6
  } else if (weatherCode >= 803 && weatherCode <= 804) {
    return 7
  }
}

const getActionStatesFromTime = (time) => {
  if (time[3] === "AM") {
    if (time[0] >= 12 && time[0] < 1) {
      return 6
    } else if (time[0] >= 1 && time[0] < 8) {
      return 7
    } else if (time[0] >= 8 && time[0] < 9) {
      return 0
    } else if (time[0] >= 9 && time[0] < 12) {
      return 1
    }
  } else {
    if (time[0] >= 12 && time[0] < 2) {
      return 2
    } else if (time[0] >= 2 && time[0] < 5) {
      return 3
    } else if (time[0] >= 5 && time[0] < 7) {
      return 4
    } else if (time[0] >= 7 && time[0] < 12) {
      return 5
    }
  }
}

const UserCard = ({
  user
}) => {

  const [weather, setWeather] = useState(null)
  const [highlight, setHighlight] = useState(null)
  const [onLoad, setOnLoad] = useState(false)
  const [actionState, setActionState] = useState(null)
  const [weatherState, setWeatherState] = useState(null)
  const [randNumState, setRandNumState] = useState(null)
  const [randNumWeather, setRandNumWeather] = useState(null)

  const getRandNumState = (state, length) => {
    const currentDate = new Date().toLocaleDateString("en-AU", { timeZone: user.timezone })
    const rand = gen(currentDate + state)

    return rand(length)
  }

  const getRandNumWeather = (length) => {
    const currentDate = new Date().toLocaleDateString("en-AU", { timeZone: user.timezone })
    const rand = gen(currentDate)


    console.log(rand(length))
    return rand(length)
  }

  useEffect(() => {

    const getWeather = async () => {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${user.location}&appid=311bafebdf0eea75bbc8bf0076efb2b0&units=metric`)
      const weatherStateTemp = getWeatherStatesFromCode(response.data.weather[0].id)
      setWeatherState(weatherStateTemp)
      setRandNumWeather(getRandNumWeather(weatherStates[weatherStateTemp].length))

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
          In <b>{user.location.split(",")[0]}</b>, it's currently <b><Clock onChange={(output) => {
            const timeString = new Date(output).toLocaleTimeString("en-US", { timeZone: user.timezone })
            const actionState = getActionStatesFromTime([parseInt(timeString.split(":")[0]), parseInt(timeString.split(":")[1]), parseInt(timeString.split(":")[2].split(" ")[0]), timeString.split(" ")[1]])

            setRandNumState(getRandNumState(actionState, actionStates[actionState].length))
            setActionState(actionState)
          }} format={'h:mm A'} ticking={true} timezone={user.timezone} /></b>. <br />
          <b>{user.name}</b> is currently {actionState ? actionStates[actionState][randNumState] : null}
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
              Today’s weather at <b>{user.location.split(",")[0]}</b> is <b>{weather.weather[0].description}</b>, {weatherState ? weatherStates[weatherState][randNumWeather] : null}
            </p>
          </>
          : null}
      </Card>
      {highlight ?
        <Card className={highlight ? "fade-in" : ""}>
          <p>
            <b>{user.name}'s</b> main focus today is: <br />
            {highlight}
          </p>
        </Card>
        : null}
    </>
  )
}

export default UserCard