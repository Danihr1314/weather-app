import './App.css'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';

function App() {

  const [weather, setWeather] = useState({});
  const [temperature, setTemperature] = useState(true);

  useEffect(()=>{
    
    const success = (pos) =>{
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=932c28cc4119932f66137dc0d6e86133`)
        .then(res => setWeather(res.data))
    }

    navigator.geolocation.getCurrentPosition(success);
  }, [])

  console.log(weather);

  return (
    <div className="App">
      <div className='card'>
        <h1>Current weather</h1>
        <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
        <p>{weather.weather?.[0].description}</p>
        <p>
        <i class="fa-solid fa-temperature-three-quarters"></i> {' '}
          {temperature ? parseInt(weather.main?.temp  -273.15)  : parseInt((weather.main?.temp - 273.15) * 9/5 + 32)}
          {' '}
          {temperature ? '°C' : '°F'}
        </p>
        <p><i className="fa-solid fa-map-location-dot"></i> {weather.name} {', '} {weather.sys?.country}</p>
        <button onClick={()=>setTemperature(!temperature)}>
          {temperature ? 'Fahrenheit' : 'Celsius'}
        </button>
      </div>
    </div>
  )
}

export default App
