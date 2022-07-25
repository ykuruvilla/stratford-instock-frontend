import "./ItemDetailsForm.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const ItemDetailsForm = ({
  title,
  labelOne,
  labelTwo,
  labelThree,
  labelFour,
  borderClass,
  ErrorInputOne,
  ErrorInputTwo,
  ErrorInputThree,
  ErrorInputFour,
  phoneValidation,
  emailValidation,
}) => {
  return (
    <article className={`formcard ${borderClass}`}>
      <h2 className="formcard__title">{title}</h2>
      <label htmlFor={labelOne.replace(/\s+/g, "")} className="formcard__label">
        {labelOne}
      </label>
      <input
        type="text"
        className={`formcard__input ${ErrorInputOne ? "formcard__error" : ""}`}
        placeholder={labelOne}
        name={labelOne.replace(/\s+/g, "")}
        id={labelOne.replace(/\s+/g, "")}
      />
      <ErrorMessage errorInput={ErrorInputOne} />

      <label htmlFor={labelTwo.replace(/\s+/g, "")} className="formcard__label">
        {labelTwo}
      </label>
      <textarea
        type="text"
        className={`formcard__textarea ${
          ErrorInputTwo ? "formcard__error" : ""
        }`}
        placeholder={labelTwo}
        name={labelTwo.replace(/\s+/g, "")}
        id={labelTwo.replace(/\s+/g, "")}
      />
      <ErrorMessage errorInput={ErrorInputTwo} />

      <label
        htmlFor={labelFour.replace(/\s+/g, "")}
        className="formcard__label"
      >
        {labelFour}
      </label>
      <input
        type="text"
        className={`formcard__input ${ErrorInputFour ? "formcard__error" : ""}`}
        placeholder={labelFour}
        name={labelFour.replace(/\s+/g, "")}
        id={labelFour.replace(/\s+/g, "")}
      />
      <ErrorMessage errorInput={ErrorInputFour} emailError={emailValidation} />
    </article>
  );
};

export default ItemDetailsForm;
