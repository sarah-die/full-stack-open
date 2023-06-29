export const Countries = (props: {
  filter: string;
  filteredCountries: string[];
}) => {
  if (!props.filter) return null;

  return (
    <div>
      {props.filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter.</div>
      ) : (
        <div>
          {props.filteredCountries.map((c) => {
            return <div key={c}>{c}</div>;
          })}
        </div>
      )}
    </div>
  );
};
