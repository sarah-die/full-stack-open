export const Total = ({ parts }) => {
  const sum = parts.reduce((acc, obj) => acc + obj.exercises, 0);
  return <h3>Total of exercises: {sum}</h3>;
};
