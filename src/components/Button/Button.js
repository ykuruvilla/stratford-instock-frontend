import "./Button.scss";

const Button = ({ type, label }) => {
  return <button className={`button button__${type}`}>{label}</button>;
};

export default Button;
