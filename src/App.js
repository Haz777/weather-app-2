import React, {useState} from 'react'
import './App.css'

function App() {

const apiKey = ('ceaebbe8a856935a9a256f55677a16d6')
const [weatherData, setWeatherData]=useState([{}])
const [city, setCity]=useState('')

const getWeather = (event) => {
  if (event.key === 'Enter') {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json()
    ).then(
      data => {
        setWeatherData(data)
        setCity('')
      }
    )
  }
}

return (
    <div className='container'>
      <input 
      className='input' 
      placeholder='Enter city...'
      onChange={e =>setCity(e.target.value)}
      value={city}
      onKeyPress={getWeather}
      />
      
      {typeof weatherData.main === 'undefined' ? (
        <div>
          <p>Welcome to weather app! Please enter a city name.</p>
        </div>
        ) : (
          <div classname='weather-data'>
            <p className='city'>{weatherData.name}</p>
            <p className='weather'>{weatherData.weather[0].main} </p>
            <p className='temp'>{Math.round(weatherData.main.temp)}°C</p>
            <p className='temp-min'>Lowest: {weatherData.main.temp_min}°C</p>
            <p className='temp-max'>Highest: {weatherData.main.temp_max}°C</p>
            <p className='humidity'>Humidity: {Math.round(weatherData.main.humidity)}%</p>
          </div>
        )
      }

      {weatherData.cod === '404'? (
        <p>City not found. Please enter valid city.</p>
      ):(
        <>
        </>
      )}
    </div>
  )
}
export default App;