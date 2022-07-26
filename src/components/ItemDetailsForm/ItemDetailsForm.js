import "./ItemDetailsForm.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import axios from "axios";
import BASE_URL from "../../api/api";
import { useEffect, useState } from "react";

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
  itemName,
  description,
  inventoryListData,
  selectedItem,
  purpose,
  location,
}) => {
  const uniqueCategories = [
    ...new Set(inventoryListData.map((item) => item.category)),
  ];

  const [inventoryName, setInventoryName] = useState("");
  const [inventoryDescription, setInventoryDescription] = useState("");
  const [inventoryCategory, setInventoryCategory] = useState("");

  useEffect(() => {
    if (!location.pathname.includes("add-new-item")) {
      axios
        .get(`${BASE_URL}inventory/${location.pathname.slice(-36)}`)
        .then((response) => {
          setInventoryName(response.data.itemName);
          setInventoryDescription(response.data.description);
          setInventoryCategory(response.data.category);
        })
        .catch((error) =>
          console.log("ItemAvailabilityForm GET inventory data error", error)
        );
    }
  }, []);

  return (
    <article className={`formcard ${borderClass}`}>
      <h2 className="formcard__title">{title}</h2>
      <label htmlFor={labelOne.replace(/\s+/g, "")} className="formcard__label">
        {labelOne}
      </label>
      {purpose === "edit" && (
        <input
          type="text"
          className={`formcard__input ${
            ErrorInputOne ? "formcard__error" : ""
          }`}
          name={labelOne.replace(/\s+/g, "")}
          id={labelOne.replace(/\s+/g, "")}
          defaultValue={inventoryName}
        />
      )}
      {purpose === "add" && (
        <input
          type="text"
          className={`formcard__input ${
            ErrorInputOne ? "formcard__error" : ""
          }`}
          name={labelOne.replace(/\s+/g, "")}
          id={labelOne.replace(/\s+/g, "")}
          placeholder={inventoryName}
        />
      )}
      <ErrorMessage errorInput={ErrorInputOne} />

      <label htmlFor={labelTwo.replace(/\s+/g, "")} className="formcard__label">
        {labelTwo}
      </label>
      {purpose === "edit" && (
        <textarea
          type="text"
          className={`formcard__textarea ${
            ErrorInputTwo ? "formcard__error" : ""
          }`}
          name={labelTwo.replace(/\s+/g, "")}
          id={labelTwo.replace(/\s+/g, "")}
          defaultValue={inventoryDescription}
        />
      )}
      {purpose === "add" && (
        <textarea
          type="text"
          className={`formcard__textarea ${
            ErrorInputTwo ? "formcard__error" : ""
          }`}
          name={labelTwo.replace(/\s+/g, "")}
          id={labelTwo.replace(/\s+/g, "")}
          placeholder={inventoryDescription}
        />
      )}
      <ErrorMessage errorInput={ErrorInputTwo} />

      <label
        htmlFor={labelFour.replace(/\s+/g, "")}
        className="formcard__label"
      >
        {labelFour}
      </label>

      {purpose === "edit" && (
        <select
          className={`formcard__input ${false ? "formcard__error" : ""}`}
          name={labelThree.replace(/\s+/g, "")}
          id={labelThree.replace(/\s+/g, "")}
          value={inventoryCategory}
          onChange={(e) => setInventoryCategory(e.target.value)}
        >
          {uniqueCategories.map((category, i) => (
            <option key={i}>{category}</option>
          ))}
        </select>
      )}
      {purpose === "add" && (
        <select
          className={`formcard__input ${false ? "formcard__error" : ""}`}
          name={labelThree.replace(/\s+/g, "")}
          id={labelThree.replace(/\s+/g, "")}
        >
          <option selected disabled hidden>
            Please select a category
          </option>
          {uniqueCategories.map((category, i) => (
            <option key={i}>{category}</option>
          ))}
        </select>
      )}
      {/* <ErrorMessage errorInput={ErrorInputFour} emailError={emailValidation} /> */}
    </article>
  );
  // }
};

export default ItemDetailsForm;
