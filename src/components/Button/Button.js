import "./Button.scss";

const Button = ({ type, label, deleteWarehouse }) => {
  return (
    <button className={`button button__${type}`} onClick={deleteWarehouse}>
      {label}
    </button>
  );
};

export default Button;
