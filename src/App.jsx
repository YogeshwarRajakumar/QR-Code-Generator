import { useEffect, useState } from 'react';
import './App.css'

import clearIcon from "./assets/clear.jpeg";
import cloudIcon from "./assets/cloud.jpeg";
import drizzleIcon from "./assets/drizzle.jpeg";
import humidityIcon from "./assets/humidity.png";
import rainIcon from "./assets/rain.jpeg";
import searchIcon from "./assets/search.png";
import snowIcon from "./assets/snow.png";
import windIcon from "./assets/wind.png";

const WeatherDetails=({icon,temp,location,country,lat,long,humidity,wind})=>{
  return(
  <>
      <div className='image'><img className='img' src={icon} alt="" /></div>
      <div className='Temp'>{temp}°C</div>
      <div className='city'>{location}</div>
      <div className='country'>{country}</div>
      <div className='Cord'> 
          <div>
            <span className='lat'>Latitude</span>
            <span>{lat}</span>
          </div>
          <div>
            <span className='long'>Longtitude</span>
            <span>{long}</span>
          </div>
      </div>
      <div className='data-container'>
          <div className='element'>
              <img src={humidityIcon} alt="" height={40}/>
              <div className='data'>
                  <div className='humidity-percent'>{humidity}%</div>
                  <div className='text'>Humidity</div>
              </div>
          </div>
          <div className='element'>
              <img src={windIcon} alt="" height={40}/>
              <div className='data'>
                  <div className='wind-percent'>{wind} Km/Hr</div>
                  <div className='text'>Wind Speed</div>
              </div>
          </div>
      </div>
  </>
  )
}

function App() {
const [icon,setIcon]=useState(snowIcon)
const [temp,setTemp]=useState(0)
const[location,setLocation]=useState("Chennai")
const [country,setCountry]=useState("India")
const[lat,setLat]=useState(0)
const[long,setLong]=useState(0)
const[humidity,setHumidity]=useState(0)
const[wind,setWind]=useState(0)
const[cityNotFound,setcityNotFound]=useState(false)
const[loading,setloading]=useState(false)

let apiKey="a340ae9195235fb57a334f6c7c377dc2";
const [text,setText]=useState("chennai")

const weatherIconMap={
  "01d":clearIcon,
  "01n":clearIcon,
  "02d":cloudIcon,
  "02n":cloudIcon,
  "03d":drizzleIcon,
  "03n":drizzleIcon,
  "04d":drizzleIcon,
  "04n":drizzleIcon,
  "09d":rainIcon,
  "09n":rainIcon,
  "10d":rainIcon,
  "10n":rainIcon,
  "13d":snowIcon,
  "13n":snowIcon,

}

const search=async ()=>{
  setloading(true)
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`
  try{
    let res=await fetch(url);
    let data=await res.json();
    // console.log(data)
    if(data.cod==="404"){
      console.log("city not found")
      setcityNotFound(true)
      setloading(false)
      return;
    }

    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setTemp(Math.floor(data.main.temp));
    setLocation(data.name);
    setCountry(data.sys.country);
    setLat(data.coord.lat)
    setLong(data.coord.lon)
    const weatherIconCode=data.weather[0].icon
    setIcon(weatherIconMap[weatherIconCode] || clearIcon)
    setcityNotFound(false)
  }
  catch(error){
      console.log("the error occured " ,error.message)
  }
  finally{
      setloading(false)
  }
};
const handleCity=(e)=>{
  setText(e.target.value)
}
const handleKeyEvent=(e)=>{
  if(e.key === "Enter"){
    search();
  }

  useEffect(function(){
    search();
  },[])
}
  return (
    <>
    <div className='container'>
        <div className='input-container'>
              <input type="text" className="cityInput" placeholder='Enter City Name' onChange={handleCity} value={text} onKeyDown={handleKeyEvent}/>
            <div className='search-icon'onClick={()=>search()}>
              <img src={searchIcon} alt="Search" height={20} />
            </div>
        </div>
        {loading &&<div className='loading'>Loading......</div>}
        {cityNotFound &&<div className='cityNotFound'>CityNotFound</div>}
       {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} location={location} country={country} lat={lat} long={long} humidity={humidity} wind={wind} />}
    </div>
    </>
  )
}

export default App
