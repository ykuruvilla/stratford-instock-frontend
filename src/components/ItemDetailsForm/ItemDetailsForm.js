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
  itemName,
  description,
  inventoryListData,
  selectedItem,
  purpose,
}) => {
  const uniqueCategories = [
    ...new Set(inventoryListData.map((item) => item.category)),
  ];

  console.log("unique", uniqueCategories);

  if (selectedItem.length === 0) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <article className={`formcard ${borderClass}`}>
        <h2 className="formcard__title">{title}</h2>
        <label
          htmlFor={labelOne.replace(/\s+/g, "")}
          className="formcard__label"
        >
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
            defaultValue={itemName}
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
            placeholder={itemName}
          />
        )}
        <ErrorMessage errorInput={ErrorInputOne} />

        <label
          htmlFor={labelTwo.replace(/\s+/g, "")}
          className="formcard__label"
        >
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
            defaultValue={description}
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
            placeholder={description}
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
            defaultValue={selectedItem.category}
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
  }
};

export default ItemDetailsForm;
