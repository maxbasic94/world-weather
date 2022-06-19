export const getWeatherData = async (url: string) => {
  const response = await fetch(url);
  const weatherData = await response.json();
  return weatherData;
};
