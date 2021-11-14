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
  font-size: 16px;
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
  font-size: 30px;
`

const CardWeatherDesc = styled.div`
  font-family: ProductSansBold;
  font-size: 20px;
`

const WeatherIcon = styled.img`

`

const actionStates = {
  0: ["eating 2 eggs on a piece of bread."],
  1: ["taking classes.", "learning about the meaning of life!"],
  2: ["eating yummy Mexican food!"],
  3: ["playing card games with his roommate."],
  4: ["eating Japanese for dinner."],
  5: ["chilling with his friends.", "at a party...", "having the best time of his life.", "listening to music in his room."],
  6: ["in his dorm, having a deep & meaningful convo with his roommate."],
  7: ["sleeping zzzz"]
}

const weatherStates = {
  0: ["staying inside his dorm to avoid the thunder strikes!"],
  1: ["listening to the rain drops and thinking about life back home :)"],
  2: ["enjoying each drop of rain that hits the floor."],
  3: ["in awe of the snow."],
  4: ["weirded out by this strange, uncanny weather."],
  5: ["outside with his friends, kicking a football or something.", "outside going fountain hopping with his friends!"],
  6: ["going on a walk with a new friend, hearing their story."],
  7: ["sad that he can't see the sun because of how cloudy it is :("]
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
          }} format={'h:mm A'} ticking={true} timezone={user.timezone} /></b>. {user.name !== 'Mum & Dad' ? <><b>{user.name}</b> is currently {actionState ? actionStates[actionState][randNumState] : null}</> : null}
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
            <p style={{ fontSize: '12px' }}>
              Today’s weather at <b>{user.location.split(",")[0]}</b> is <b>{weather.weather[0].description}</b>. {user.name !== 'Mum & Dad' ? <><b>{user.name}</b> is probably {weatherState ? weatherStates[weatherState][randNumWeather] : null}</> : null}
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