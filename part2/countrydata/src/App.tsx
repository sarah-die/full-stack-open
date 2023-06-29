import React, { ChangeEventHandler, useEffect, useState } from "react";
import { CountryFilter } from "./components/CountryFilter";
import { CountryBasicData } from "./components/CountryBasicData";
import { Countries } from "./components/Countries";
import countryService from "./services/countries";
import weatherService from "./services/weather";
import { WeatherData } from "./components/WeatherData";

export type Country = {
  name: { common: string };
  capital: string[];
  area: number;
  languages: string[];
  flags: { png: string; alt: string };
  cca2: string;
};

export type Weather = {
  temperature: string;
  condition: { source: string; alt: string };
  wind: string;
};

function App() {
  const [countries, setCountries] = useState<string[]>([]);
  const [singleCountry, setSingleCountry] = useState<Country>({
    name: { common: "" },
    capital: [],
    area: 0,
    languages: [],
    flags: { png: "", alt: "" },
    cca2: "",
  });
  const [weather, setWeather] = useState<Weather>({
    temperature: "",
    condition: { source: "", alt: "" },
    wind: "",
  });

  const [filter, setFilter] = useState<string>("");
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);

  useEffect(() => {
    countryService.getAllNames().then((all) => {
      setCountries(all);
    });
  }, []);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      countryService.getCountry(filteredCountries[0]).then((country) => {
        setSingleCountry(country);
      });
    }
  }, [filteredCountries]);

  useEffect(() => {
    if (singleCountry.capital[0]) {
      weatherService
        .getWeather(singleCountry.capital[0], singleCountry.cca2)
        .then((weatherData) => {
          const newWeatherObject: Weather = {
            temperature: (weatherData.main.temp - 273.16).toFixed(2),
            condition: {
              source: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
              alt: weatherData.weather[0].description,
            },
            wind: weatherData.wind.speed,
          };
          setWeather(newWeatherObject);
        });
    }
  }, [singleCountry]);

  const handleFilterChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFilter(event.target.value);
    const filtered: string[] = countries.filter((c) =>
      c.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const showCountry = (country: string) => () => {
    setFilter(country);
    setFilteredCountries([country]);
  };

  return (
    <div>
      <CountryFilter filter={filter} handleFilterChange={handleFilterChange} />
      {filteredCountries.length === 1 &&
      filteredCountries[0] === singleCountry.name.common ? (
        <CountryBasicData country={singleCountry} />
      ) : (
        <Countries
          filter={filter}
          filteredCountries={filteredCountries}
          showCountry={showCountry}
        />
      )}
      {filteredCountries.length === 1 && (
        <WeatherData
          capital={singleCountry.capital[0]}
          temperature={weather.temperature}
          conditionSource={weather.condition.source}
          conditionAlt={weather.condition.alt}
          wind={weather.wind}
        />
      )}
    </div>
  );
}

export default App;
