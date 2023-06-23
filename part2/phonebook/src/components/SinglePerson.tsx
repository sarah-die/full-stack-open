export const SinglePerson = (props: {name: string, number: string}) => (
    <div key={props.name}>
        Name: {props.name} Number: {props.number}
    </div>
);
