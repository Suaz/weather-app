const WEATHER_API_KEY    = '841e2129b884239801aac6c037f0dd67';
export const URL_WEATHER = (query) => `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${query}&appid=${WEATHER_API_KEY}`;
