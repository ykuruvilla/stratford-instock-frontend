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
  location,
}) => {
  const [singleItem, setSingleItem] = useState("");
  const [itemStatus, setItemStatus] = useState("");

  useEffect(() => {
    if (!location.pathname.includes("add-new-item")) {
      console.log("useEffect in ItemAvailabilityForm:");
      axios
        .get(`${BASE_URL}inventory/${location.pathname.slice(-36)}`)
        .then((response) => {
          console.log("get inventory by ID success");
          setSingleItem(response.data);
          setItemStatus(response.data.status);
          console.log(response);
        })
        .catch((error) =>
          console.log("ItemAvailabilityForm get inventory data error", error)
        );
    }
  }, []);

  //FIXME:
  // const onChangeHandler = (e, setState) => {
  //   e.preventDefault();
  //   console.log("onChange");
  //   console.log(e.target.value);
  //   setState(e.target.value);
  // };

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
            value="In Stock"
            // defaultChecked={itemStatus === "In Stock"}
            onChange={(e) => setItemStatus(e.target.value)}
            // checked
          />
          <label
            htmlFor={labelOne.replace(/\s+/g, "")}
            className={`formcard__label`}
            id={`${itemStatus === "In Stock" ? "" : "formcard__label--grey"}`}
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
            value={"Out of Stock"}
            defaultChecked={itemStatus === "Out of Stock"}
            onChange={(e) => setItemStatus(e.target.value)}
          />
          <label
            htmlFor={labelTwo.replace(/\s+/g, "")}
            className={`formcard__label `}
            id={`${
              itemStatus === "Out of Stock" ? "" : "formcard__label--grey"
            }`}
          >
            {labelTwo}
          </label>
        </div>
      </div>
      {/* QUANTITY FIELD  */}
      {itemStatus === "In Stock" && (
        <>
          <label htmlFor={labelThree} className="formcard__label">
            {labelThree}
          </label>
          <input
            type="number"
            className="formcard__input formcard__input--qty"
            id={labelThree.replace(/\s+/g, "")}
            defaultValue={singleItem.quantity}
          ></input>
        </>
      )}
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
          defaultValue={singleItem.warehouseName}
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
          <option selected disabled hidden>
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
