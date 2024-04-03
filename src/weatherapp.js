import react, { useEffect, useState } from 'react'
function Weatherapp() {
  let api_key = "bc177f1233d4d2ca4e0f329466eee73a";

  let [weather, setweather] = useState(
    {
      icon: "https://openweathermap.org/img/wn/10d@2x.png",
      temp: "",
      city: "",
      humidity: "",
      speed: "",
      temp_min:"",
      temp_max:""
    }
  )
  let search = (e) => {
    setweather(
      {
        ...weather,
        city:e.target.value
      }
    )
  }
  let submit = (event) => {
    event.preventDefault()
    if (weather.city ===" ") {
      alert("plz provide city name")
      return
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weather.city}&&appid=${api_key}&units=metric`)
      .then(response => {
        if (!response.ok) {
          throw new Error()
        }
        return response.json()
        // console.log(response)
      })

      .then(data => {
        console.log(data)
        setweather({
          icon: "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png",
          temp: data.main.temp,
          city: data.name,
          humidity: data.main.humidity,
          speed: data.wind.speed,
          temp_min:data.main.temp_min,
          temp_max:data.main.temp_max
        })

      })
      .catch(error => {
        alert("unable to to fetch the forecast")
      })

  }
  let d = new Date();
  //date
  let dayname=d.toLocaleDateString("en-us",
                                      {weekday:'long'})
  //time
  let time = d.toLocaleTimeString();

  return (
    <div className='my-5'>
      <div className='mx-auto text-center text-white p-4 container bg-transparent' style={{ width: "400px", height: "500px" }}>
        <h2>Weather Forecast</h2>
          <div className='d-flex mb-2'>
            <input type='text' placeholder='enter city' className='form-control m2-2 bg-transparent text-light' name="city" onChange={search} />
            <button type='submit' className='btn btn-light bg-transparent' onClick={submit}><i className="bi bi-search"></i></button>
          </div>
              <div className='card  bg-transparent'>
                   <p className='card-text lead'>{dayname} ,{time} </p>
              </div>
               <img src={weather.icon} alt='weatherimage' />
                <h1 className='card-title'>{weather.city}</h1>
                <h1 className='diasplay-4'>{weather.temp}&deg;C</h1>
                <p className='lead'>{weather.temp_max}&deg;C  | {weather.temp_max}&deg;C</p>
                <div className="row mb-3">
                    <div className="row align-items">
                        <div className="col"><i className="bi bi-water"></i>Humidity<br></br>{weather.humidity}%</div>
                         <div className="col"><i className="bi bi-wind"></i>wind speed<br></br>{weather.speed}km/s</div>
                     </div>
                </div>
      </div>
    </div>
  )
}
export default Weatherapp