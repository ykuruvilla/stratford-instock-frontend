import "./Button.scss";

const Button = ({ type, label, action }) => {
  return (
    <button className={`button button__${type}`} onClick={action}>
      {label}
    </button>
  );
};

export default Button;
