import { MouseEventHandler } from "react";

export const Countries = (props: {
  filter: string;
  filteredCountries: string[];
  showCountry: (country: string) => MouseEventHandler<HTMLButtonElement>;
}) => {
  if (!props.filter) return null;

  return (
    <div>
      {props.filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter.</div>
      ) : (
        <div>
          {props.filteredCountries.map((country) => {
            return (
              <div key={country}>
                <div>{country}</div>
                <button onClick={props.showCountry(country)}>show</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
