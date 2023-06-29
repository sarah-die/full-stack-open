import React, { ChangeEventHandler, useEffect, useState } from "react";
import { CountryFilter } from "./components/CountryFilter";
import { CountryBasicData } from "./components/CountryBasicData";
import { Countries } from "./components/Countries";
import countryService from "./services/countries";

export type Country = {
  name: { common: string };
  capital: string;
  area: number;
  languages: string[];
  flags: { png: string; alt: string };
};

function App() {
  const [countries, setCountries] = useState<string[]>([]);
  const [singleCountry, setSingleCountry] = useState<Country>({
    name: { common: "" },
    capital: "",
    area: 0,
    languages: [],
    flags: { png: "", alt: "" },
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

  const handleFilterChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFilter(event.target.value);
    const filtered: string[] = countries.filter((c) =>
      c.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <div>
      <CountryFilter filter={filter} handleFilterChange={handleFilterChange} />
      {filteredCountries.length === 1 &&
      filteredCountries[0] === singleCountry.name.common ? (
        <CountryBasicData country={singleCountry} />
      ) : (
        <Countries filter={filter} filteredCountries={filteredCountries} />
      )}
    </div>
  );
}

export default App;
