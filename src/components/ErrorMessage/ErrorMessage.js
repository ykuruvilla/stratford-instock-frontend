import error from "../../assets/icons/error-24px.svg";
import "./ErrorMessage.scss";

const ErrorMessage = ({ errorInput, emailError, phoneError }) => {
  let errorText = "This field is required";

  // conditional error text
  if (emailError) {
    errorText = "Please provide a valid email";
  } else if (phoneError) {
    errorText = "Please provide a valid phone number";
  }

  return (
    <div
      className={`formcard__error-container ${
        errorInput || emailError || phoneError ? "" : "formcard__error--hidden"
      }`}
    >
      <img src={error} alt="error icon" className="formcard__error-img" />
      <p className="formcard__error-message">{errorText}</p>
    </div>
  );
};

export default ErrorMessage;
