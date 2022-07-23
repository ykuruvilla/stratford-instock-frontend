import "./FormCard.scss";

const FormCard = ({
  title,
  labelOne,
  labelTwo,
  labelThree,
  labelFour,
  borderClass,
}) => {
  return (
    <article className={`formcard ${borderClass}`}>
      <h2 className="formcard__title">{title}</h2>
      <label htmlFor="" className="formcard__label">
        {labelOne}
      </label>
      <input
        type="text"
        className="formcard__input"
        placeholder={`${labelOne}`}
      />
      <label htmlFor="" className="formcard__label">
        {labelTwo}
      </label>
      <input
        type="text"
        className="formcard__input"
        placeholder={`${labelTwo}`}
      />
      <label htmlFor="" className="formcard__label">
        {labelThree}
      </label>
      <input
        type="text"
        className="formcard__input"
        placeholder={`${labelThree}`}
      />
      <label htmlFor="" className="formcard__label">
        {labelFour}
      </label>
      <input
        type="text"
        className="formcard__input"
        placeholder={`${labelFour}`}
      />
    </article>
  );
};

export default FormCard;
