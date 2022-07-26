import "./FormCard.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../api/api";

const FormCard = ({
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
  location,
}) => {
  const [warehouseName, setWarehouseName] = useState("");
  const [warehouseAddress, setWarehouseAddress] = useState("");
  const [warehouseCity, setWarehouseCity] = useState("");
  const [warehouseCountry, setWarehouseCountry] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPosition, setContactPosition] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  useEffect(() => {
    if (!location.pathname.includes("add-new-warehouse")) {
      axios
        .get(`${BASE_URL}warehouse/${location.pathname.slice(-36)}`)
        .then((response) => {
          setWarehouseAddress(response.data.address);
          setWarehouseName(response.data.name);
          setWarehouseCity(response.data.city);
          setWarehouseCountry(response.data.country);
          setContactName(response.data.contact.name);
          setContactPosition(response.data.contact.position);
          setContactPhone(response.data.contact.phone);
          setContactEmail(response.data.contact.email);
          console.log("successful get warehousebyID");
        })
        .catch((error) =>
          console.log("GET warehouse by ID error in FormCard.js", error)
        );
    }
  }, []);

  return (
    <article className={`formcard ${borderClass}`}>
      <h2 className="formcard__title">{title}</h2>
      <label htmlFor={labelOne.replace(/\s+/g, "")} className="formcard__label">
        {labelOne}
      </label>
      {/* WAREHOUSE NAME FIELD  */}
      {location.pathname.includes("add-new-warehouse") && (
        <input
          type="text"
          className={`formcard__input ${
            ErrorInputOne ? "formcard__error" : ""
          }`}
          placeholder={labelOne}
          name={labelOne.replace(/\s+/g, "")}
          id={labelOne.replace(/\s+/g, "")}
        />
      )}
      {location.pathname.includes("edit-warehouse") && (
        <input
          type="text"
          className={`formcard__input ${
            ErrorInputOne ? "formcard__error" : ""
          }`}
          value={title === "Contact Details" ? contactName : warehouseName}
          onChange={
            title === "Contact Details"
              ? (e) => setContactName(e.target.value)
              : (e) => setWarehouseName(e.target.value)
          }
          name={labelOne.replace(/\s+/g, "")}
          id={labelOne.replace(/\s+/g, "")}
        />
      )}
      <ErrorMessage errorInput={ErrorInputOne} />
      <label htmlFor={labelTwo.replace(/\s+/g, "")} className="formcard__label">
        {labelTwo}
      </label>
      {location.pathname.includes("add-new-warehous") && (
        <input
          type="text"
          className={`formcard__input ${
            ErrorInputTwo ? "formcard__error" : ""
          }`}
          placeholder={labelTwo}
          name={labelTwo.replace(/\s+/g, "")}
          id={labelTwo.replace(/\s+/g, "")}
        />
      )}
      {location.pathname.includes("edit-warehouse") && (
        <input
          type="text"
          className={`formcard__input ${
            ErrorInputTwo ? "formcard__error" : ""
          }`}
          value={
            title === "Contact Details" ? contactPosition : warehouseAddress
          }
          onChange={
            title === "Contact Details"
              ? (e) => setContactPosition(e.target.value)
              : (e) => setWarehouseAddress(e.target.value)
          }
          name={labelTwo.replace(/\s+/g, "")}
          id={labelTwo.replace(/\s+/g, "")}
        />
      )}
      <ErrorMessage errorInput={ErrorInputTwo} />
      <label
        htmlFor={labelThree.replace(/\s+/g, "")}
        className="formcard__label"
      >
        {labelThree}
      </label>
      {location.pathname.includes("add-new-warehouse") && (
        <input
          type="text"
          className={`formcard__input ${
            ErrorInputThree ? "formcard__error" : ""
          }`}
          placeholder={labelThree}
          name={labelThree.replace(/\s+/g, "")}
          id={labelThree.replace(/\s+/g, "")}
        />
      )}
      {location.pathname.includes("edit-warehouse") && (
        <input
          type="text"
          className={`formcard__input ${
            ErrorInputThree ? "formcard__error" : ""
          }`}
          value={title === "Contact Details" ? contactPhone : warehouseCity}
          onChange={
            title === "Contact Details"
              ? (e) => setContactPhone(e.target.value)
              : (e) => setWarehouseCity(e.target.value)
          }
          name={labelThree.replace(/\s+/g, "")}
          id={labelThree.replace(/\s+/g, "")}
        />
      )}
      <ErrorMessage errorInput={ErrorInputThree} phoneError={phoneValidation} />
      <label
        htmlFor={labelFour.replace(/\s+/g, "")}
        className="formcard__label"
      >
        {labelFour}
      </label>
      {location.pathname.includes("add-new-warehouse") && (
        <input
          type="text"
          className={`formcard__input ${
            ErrorInputFour ? "formcard__error" : ""
          }`}
          placeholder={labelFour}
          name={labelFour.replace(/\s+/g, "")}
          id={labelFour.replace(/\s+/g, "")}
        />
      )}
      {location.pathname.includes("edit-warehouse") && (
        <input
          type="text"
          className={`formcard__input ${
            ErrorInputFour ? "formcard__error" : ""
          }`}
          value={title === "Contact Details" ? contactEmail : warehouseCountry}
          onChange={
            title === "Contact Details"
              ? (e) => setContactEmail(e.target.value)
              : (e) => setWarehouseCountry(e.target.value)
          }
          name={labelFour.replace(/\s+/g, "")}
          id={labelFour.replace(/\s+/g, "")}
        />
      )}

      <ErrorMessage errorInput={ErrorInputFour} emailError={emailValidation} />
    </article>
  );
};

export default FormCard;
