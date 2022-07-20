import "./Button.scss";

const ButtonCancel = () => {
  return (
    <button className="button button__cancel">
      <h3 className="button__text">Cancel</h3>
    </button>
  );
};

const ButtonDelete = () => {
  return (
    <button className="button button__delete">
      <h3 className="button__text">Delete</h3>
    </button>
  );
};

export { ButtonCancel, ButtonDelete };
