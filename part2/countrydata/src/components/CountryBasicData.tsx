import { Country } from "../App";

export const CountryBasicData = (props: { country: Country }) => {
  return (
    <div>
      <h1>{props.country.name.common}</h1>
      <div>capital {props.country.capital[0]}</div>
      <div>area {props.country.area}</div>
      <div>
        <strong>languages:</strong>
        <ul>
          {Object.values(props.country.languages).map((lang: string) => {
            return <li key={lang}>{lang}</li>;
          })}
        </ul>
      </div>
      <img src={props.country.flags.png} alt={props.country.flags.alt} />
    </div>
  );
};
