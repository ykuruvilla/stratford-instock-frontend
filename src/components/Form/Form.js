import arrow from "../../assets/icons/arrow_back-24px.svg";
import Button from "../Button/Button";
import FormCard from "../FormCard/FormCard";
import "./Form.scss";

const Form = ({ title }) => {
  return (
    <section className="form">
      <div className="form__container">
        <img src={arrow} alt="" className="form__arrow" />
        <h1 className="form__title">{title}</h1>
      </div>
      <div className="form__container-cards">
        <FormCard
          title={"Warehouse Details"}
          labelOne={"Warehouse Name"}
          labelTwo={"Street Address"}
          labelThree={"City"}
          labelFour={"Country"}
          borderClass="formcard__border"
        />

        <FormCard
          title={"Contact Details"}
          labelOne={"Contact Name"}
          labelTwo={"Position"}
          labelThree={"Phone Number"}
          labelFour={"Email"}
          className=""
        />
      </div>
      <div className="form__buttons">
        <Button type="cancel button__form-cancel" label="Cancel" action={""} />
        <Button type="add button__edit " label="+ Add Warehouse" action={""} />
      </div>
    </section>
  );
};

export default Form;
