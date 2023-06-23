import { Part } from "./Part";

export const Content = ({ parts }) => (
  <div>
    {parts.map((el) => {
      return <Part part={el} key={el.id} />;
    })}
  </div>
);
