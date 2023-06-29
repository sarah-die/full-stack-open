export const WeatherData = (props: {
  capital: string;
  temperature: string;
  conditionSource: string;
  conditionAlt: string;
  wind: string;
}) => {
  return (
    <div>
      <h2>Weather in {props.capital}</h2>
      <div>temperature {props.temperature} Celsius</div>
      <img src={props.conditionSource} alt={props.conditionAlt} />
      <div>wind {props.wind} m/s</div>
    </div>
  );
};
