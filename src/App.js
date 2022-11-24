import { useEffect, useState } from "react";
function App() {
  const [weather, setweather] = useState([]);
  const [weatherArr, setweatherArr] = useState([]);

  const getWeatherData = async () => {
    const lat = "-6.200000";
    const lon = "106.816666";
    const part = "current,minutely,hourly";
    const API_key = "4f1769740d1c0106507af3fa54377371";
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=${part}&appid=${API_key}`
    );
    const dataWeather = await weatherData.json();
    const weatherList = await dataWeather.list;
    setweather(weatherList);
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  useEffect(() => {
    let weatherArr = [];
    for (let i = 0; i < weather.length; ) {
      weatherArr.push(weather[i]);
      i += 8;
    }
    setweatherArr(weatherArr);
  }, [weather]);

  return (
    <div className="App">
      <p>Weather forecast:</p>
      <table>
        <tbody>
          {weatherArr.map((x, i) => (
            <tr key={i}>
              <td>
                <p>
                  {x.dt_txt.slice(0, 10)}: {(x.main.temp - 273.15).toFixed(2)}°C
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
