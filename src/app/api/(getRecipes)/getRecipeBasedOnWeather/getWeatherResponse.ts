export const getWeatherResponse = async (lat: number, lon: number) => {
  try {
    if (!process.env.WEATHER_API_KEY)
      throw new Error(
        "WEATHER_API_KEY is not defined in environment variables."
      );

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`
    );

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data.");
    }

    const data = await weatherResponse.json();

    if (!data || !data.main) {
      throw new Error("Failed to fetch weather data.");
    }

    const temperatureCelsius = Math.round(data.main.temp - 273.15);
    const place = data.name;
    const weatherDescription = data.weather[0]?.main || "";
    const weatherDetails = data.weather[0]?.description || "";
    const humidity = data.main.humidity || 0;
    const windSpeed = data.wind?.speed || 0;
    const clouds = data.clouds?.all || 0;

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
