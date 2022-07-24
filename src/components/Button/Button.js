import "./Button.scss";

const Button = ({ type, label, action }) => {
  return (
    <button className={`button button__${type}`} onClick={action}>
      <span className="button__label">{label}</span>
    </button>
  );
};

export default Button;
