async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here

  //Helper variable for weather widget, set initial to hide
  let weatherWidget = document.querySelector('div#weatherWidget')
  weatherWidget.style.display = 'none'

  //Actions to take when Select Box is changed
  let citySelect = document.querySelector('select#citySelect')
  citySelect.addEventListener('change', option => {
    citySelect.disabled = true;
    weatherWidget.style.display = 'none'
    document.querySelector('p.info').textContent = "Fetching weather data..."

    let city = option.target.value.replace(" ", "+")
    let cityURL = `http://localhost:3003/api/weather?city=${city}`
    axios.get(cityURL)
      .then(result => {
        document.querySelector('p.info').textContent = ""
        citySelect.disabled = false
        weatherWidget.style.display = 'block'

        let location = document.querySelector('#location')
        location.children.item(0).textContent = result.data.location.city
        location.children.item(1).textContent = result.data.location.country

        //Process info for Today block
        let todayTemp = document.querySelector('div#apparentTemp')
        todayTemp.children.item(1).textContent = result.data.current.apparent_temperature + "°"

        function weatherDesc(string){
          for (let index = 0; index < descriptions.length; index++){
            if (string === descriptions[index][0]){
              return descriptions[index][1]
            }
          }
        }
        
        document.querySelector('#todayDescription').textContent = weatherDesc(result.data.current.weather_description)

        let todayStats = document.querySelector('#todayStats')
        todayStats.children.item(0).textContent = `${result.data.current.temperature_min}°/${result.data.current.temperature_max}°`
        todayStats.children.item(1).textContent = `Precipitation: ${result.data.current.precipitation_probability * 100}%`
        todayStats.children.item(2).textContent = `Humidity: ${result.data.current.humidity}%`
        todayStats.children.item(3).textContent = `Wind: ${result.data.current.wind_speed}m/s`

        //Process Forecast
        let forecastDayOne = document.querySelector('#forecast').children.item(0)
        let forecastDayTwo = document.querySelector('#forecast').children.item(1)
        let forecastDayThree = document.querySelector('#forecast').children.item(2)

        function forecastCard(element, dayNum){
          let index = dayNum - 1
          let weather = result.data.forecast.daily[index]
          element.children.item(1).textContent = weatherDesc(weather.weather_description)
          element.children.item(2).textContent = `${weather.temperature_min}°/${weather.temperature_max}°`
          element.children.item(3).textContent = `Precipitation ${weather.precipitation_probability * 100}%`
        }

        forecastCard(forecastDayOne, 1)
        forecastCard(forecastDayTwo, 2)
        forecastCard(forecastDayThree, 3)

      })
      .catch(error => {
        console.log(`Error: ${error.message}`)
      })
  })

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
