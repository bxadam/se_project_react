export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

export function getWeather({ latitude, longitude }, APIkey) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
}

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: data.main.temp,
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  result.type = getWeatherType(result.temp);

  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature.F > 75 || temperature.C > 24) {
    return "hot";
  } else if (temperature > 60 || temperature.C > 16) {
    return "warm";
  } else {
    return "cold";
  }
};
