import "./Button.scss";

const Button = (props) => {
  return (
    <button className={`button button__${props.type}`}>{props.type}</button>
  );
};

export default Button;
