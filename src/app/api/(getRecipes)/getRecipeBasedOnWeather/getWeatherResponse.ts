import axios from "axios";

export const getWeatherResponse: WeatherResponseProps = async (lat, lon) => {
  try {
    if (!process.env.WEATHER_API_KEY)
      throw new Error(
        "WEATHER_API_KEY is not defined in environment variables."
      );

    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`
    );

    if (!weatherResponse.data || !weatherResponse.data.main)
      throw new Error("Failed to fetch weather data.");

    const temperatureCelsius = Math.round(
      weatherResponse.data.main.temp - 273.15
    );
    const place = weatherResponse.data.name;
    const weatherDescription = weatherResponse.data.weather[0]?.main || "";
    const weatherDetails = weatherResponse.data.weather[0]?.description || "";
    const humidity = weatherResponse.data.main.humidity || 0;
    const windSpeed = weatherResponse.data.wind?.speed || 0;
    const clouds = weatherResponse.data.clouds?.all || 0;

    return {
      temperature: temperatureCelsius,
      place,
      weatherDescription,
      weatherDetails,
      humidity,
      windSpeed,
      clouds,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data.");
  }
};
