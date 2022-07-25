import "./ItemAvailabilityForm.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const ItemAvailabilityForm = ({
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
      <h3 className="formcard__radio-header">Status</h3>
      <div className="formcard__wrapper">
        <div className="formcard__container-top">
          <input
            type="radio"
            className={`formcard__radio ${
              ErrorInputTwo ? "formcard__error" : ""
            }`}
            name={"status"}
            id={labelTwo.replace(/\s+/g, "")}
            value={labelTwo.replace(/\s+/g, "")}
          />
          <label
            htmlFor={labelTwo.replace(/\s+/g, "")}
            className="formcard__label"
          >
            {labelTwo}
          </label>
        </div>
        <div className="formcard__container-bottom">
          <input
            type="radio"
            className={`formcard__radio ${
              ErrorInputTwo ? "formcard__error" : ""
            }`}
            name={"status"}
            id={labelThree.replace(/\s+/g, "")}
            value={labelThree.replace(/\s+/g, "")}
          />
          <label
            htmlFor={labelThree.replace(/\s+/g, "")}
            className="formcard__label"
          >
            {labelThree}
          </label>
        </div>
      </div>
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

export default ItemAvailabilityForm;
