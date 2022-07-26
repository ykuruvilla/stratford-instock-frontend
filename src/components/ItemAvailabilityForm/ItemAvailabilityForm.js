import "./ItemAvailabilityForm.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../api/api";

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
  warehouseListData,
  stockStatus,
  selectedItem,
  setStatus,
  purpose,
}) => {
  console.log(selectedItem);
  //FIXME:
  const onChangeHandler = (e, setState) => {
    e.preventDefault();
    console.log("onChange");
    console.log(e.target.value);
    setState(e.target.value);
  };

  // if (purpose === "") {
  //   return <h1>Loading...</h1>;
  // } else {
  return (
    <article className={`formcard ${borderClass}`}>
      <h2 className="formcard__title">{title}</h2>
      <h3 className="formcard__radio-header">Status</h3>
      <div className="formcard__wrapper">
        <div className="formcard__container-top">
          {/* <ErrorMessage errorInput={ErrorInputTwo} /> */}
          {/* radio buttons  */}
          <input
            type="radio"
            className={`formcard__radio ${
              ErrorInputTwo ? "formcard__error" : ""
            }`}
            name={"status"}
            id={labelOne.replace(/\s+/g, "")}
            value={stockStatus}
            defaultChecked={stockStatus === "In Stock"}
          />
          <label
            htmlFor={labelOne.replace(/\s+/g, "")}
            className={`formcard__label`}
            id={`${stockStatus === "In Stock" ? "" : "formcard__label--grey"}`}
          >
            {labelOne}
          </label>
        </div>
        <div className="formcard__container-bottom">
          <input
            type="radio"
            className={`formcard__radio ${
              ErrorInputTwo ? "formcard__error" : ""
            }`}
            name={"status"}
            id={labelTwo.replace(/\s+/g, "")}
            value={labelTwo.replace(/\s+/g, "")}
            defaultChecked={stockStatus === "Out of Stock"}
          />
          <label
            htmlFor={labelTwo.replace(/\s+/g, "")}
            className={`formcard__label `}
            id={`${
              stockStatus === "Out of Stock" ? "" : "formcard__label--grey"
            }`}
          >
            {labelTwo}
          </label>
        </div>
      </div>
      {stockStatus === "In Stock" ||
        (purpose === "add" && (
          <>
            <label htmlFor={labelThree} className="formcard__label">
              {labelThree}
            </label>
            <input
              type="number"
              className="formcard__input formcard__input--qty"
              id={labelThree.replace(/\s+/g, "")}
              defaultValue={selectedItem.quantity}
            ></input>
          </>
        ))}
      <label
        htmlFor={labelFour.replace(/\s+/g, "")}
        className="formcard__label"
      >
        {labelFour}
      </label>
      {purpose === "edit" && (
        <select
          className={`formcard__input ${false ? "formcard__error" : ""}`}
          name={labelFour.replace(/\s+/g, "")}
          id={labelFour.replace(/\s+/g, "")}
          defaultValue={selectedItem.warehouseName}
        >
          {warehouseListData.map((warehouse) => (
            <option key={warehouse.id}>{warehouse.name}</option>
          ))}
        </select>
      )}
      {purpose === "add" && (
        <select
          className={`formcard__input ${false ? "formcard__error" : ""}`}
          name={labelFour.replace(/\s+/g, "")}
          id={labelFour.replace(/\s+/g, "")}
        >
          <option value="" selected disabled hidden>
            Please select a warehouse
          </option>
          {warehouseListData.map((warehouse) => (
            <option key={warehouse.id}>{warehouse.name}</option>
          ))}
        </select>
      )}
      {/* <ErrorMessage errorInput={ErrorInputFour} emailError={emailValidation} /> */}
    </article>
  );
  // }
};

export default ItemAvailabilityForm;
