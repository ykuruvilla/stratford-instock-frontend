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
  borderClass,
  ErrorInputOne,
  ErrorInputTwo,
  ErrorInputThree,
  warehouseListData,
  stockStatus,
  selectedItem,
}) => {
  console.log("itemAvailabilityForm");

  if (selectedItem.length === 0) {
    return <h1>Loading...</h1>;
  } else {
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
              className="formcard__label"
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
              className="formcard__label"
            >
              {labelTwo}
            </label>
          </div>
        </div>
        <label
          htmlFor={labelThree.replace(/\s+/g, "")}
          className="formcard__label"
        >
          {labelThree}
        </label>
        <select
          className={`formcard__input ${false ? "formcard__error" : ""}`}
          placeholder={labelThree}
          name={labelThree.replace(/\s+/g, "")}
          id={labelThree.replace(/\s+/g, "")}
          defaultValue={selectedItem.warehouseName}
        >
          {warehouseListData.map((warehouse) =>
            warehouse.id === selectedItem.warehouseID ? (
              <option key={warehouse.id}>{warehouse.name}</option>
            ) : (
              <option key={warehouse.id}>{warehouse.name}</option>
            )
          )}
        </select>
        {/* <ErrorMessage errorInput={ErrorInputFour} emailError={emailValidation} /> */}
      </article>
    );
  }
};

export default ItemAvailabilityForm;
