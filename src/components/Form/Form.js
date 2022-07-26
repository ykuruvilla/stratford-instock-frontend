import { useState, useEffect } from "react";
import { useHistory, NavLink, Link } from "react-router-dom";
import arrow from "../../assets/icons/arrow_back-24px.svg";
import Button from "../Button/Button";
import FormCard from "../FormCard/FormCard";
import "./Form.scss";
import { validateInput } from "../../utils/helper";
import axios from "axios";
import BASE_URL from "../../api/api";
import ItemAvailabilityForm from "../ItemAvailabilityForm/ItemAvailabilityForm";
import ItemDetailsForm from "../ItemDetailsForm/ItemDetailsForm";

const Form = ({
  title,
  setWarehouseListData,
  warehouseListData,
  setInventoryListData,
  inventoryListData,
  buttonType,
  buttonLabel,
  view,
  location,
}) => {
  // left/up details inputs
  const [warehouseNameError, setWarehouseNameError] = useState(false);
  const [streetAddressError, setstreetAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [countryError, setCountryError] = useState(false);

  // right/down details Error
  const [contactNameError, setContactNameError] = useState(false);
  const [positionError, setPositionError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // email validators
  const [phoneValidation, setPhoneValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);

  // EDIT inventory items
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (
      location.pathname.includes("add-new-warehouse") &&
      inventoryListData.length < 1
    ) {
      axios
        .get(`${BASE_URL}inventory`)
        .then((response) => {
          setInventoryListData(response.data);

          if (!location.pathname.includes("inventory/add")) {
            let currentItem = response.data.find((inventory) => {
              return inventory.id === location.pathname.slice(-36);
            });

            setSelectedItem(currentItem);
            setItemName(currentItem.itemName);
            setDescription(currentItem.description);
            setStatus(currentItem.status);
          }
        })
        .catch((error) =>
          console.log("ItemAvailabilityForm get inventory data error", error)
        );
    }
  }, [inventoryListData, itemName, description, status, selectedItem]);

  const resets = () => {
    setWarehouseNameError(false);
    setstreetAddressError(false);
    setCityError(false);
    setCountryError(false);
    setContactNameError(false);
    setPositionError(false);
    setPhoneError(false);
    setEmailError(false);
    setPhoneValidation(false);
    setEmailValidation(false);
  };

  // INVENTORY
  const inventoryFormSubmitHandler = (e) => {
    e.preventDefault();

    let selectedWarehouse = warehouseListData.find(
      (warehouse) => warehouse.name === e.target.Warehouse.value
    );

    const newItemObj = {
      warehouseID: selectedWarehouse.id,
      warehouseName: e.target.Warehouse.value,
      itemName: e.target.ItemName.value,
      description: e.target.Description.value,
      category: e.target.Category.value,
      status: !e.target.status.value ? "Out of Stock" : e.target.status.value,
      quantity: !e.target.status.value ? 0 : e.target.Quantity.value,
    };

    if (view === "add") {
      axios
        .post(`${BASE_URL}inventory`, newItemObj)
        .then((response) => {
          history.goBack();
          // add new warehouse to state to trigger re-render
          setInventoryListData((prevData) => [
            ...prevData,
            response.data.resourceCreated,
          ]);
        })
        .catch((error) => console.log("POST new item error", error));
    } else if (view === "edit") {
      axios
        .put(`${BASE_URL}inventory/${location.pathname.slice(-36)}`, newItemObj)
        .then((response) => {
          // add edited item to state to trigger re-render
          setInventoryListData((prevData) =>
            prevData.map((item) =>
              item.id === location.pathname.slice(-36)
                ? response.data.resourceUpdated
                : item
            )
          );
        })
        .catch((error) => console.log("PUT new item error", error));
      history.goBack();
    }
    e.target.reset();
  };

  const warehouseFormSubmitHandler = (e) => {
    e.preventDefault();

    // resets
    resets();

    // input validation
    let errorArray = [
      validateInput(e.target.WarehouseName.value, setWarehouseNameError),
      validateInput(e.target.StreetAddress.value, setstreetAddressError),
      validateInput(e.target.City.value, setCityError),
      validateInput(e.target.Country.value, setCountryError),
      validateInput(e.target.ContactName.value, setContactNameError),
      validateInput(e.target.Position.value, setPositionError),
      validateInput(
        e.target.PhoneNumber.value,
        setPhoneError,
        setPhoneValidation,
        false
      ),
      validateInput(
        e.target.Email.value,
        setEmailError,
        false,
        setEmailValidation
      ),
    ];

    for (let error of errorArray) {
      if (error) {
        return;
      }
    }
    // if no input error -> POST data to backend
    const newWarehouseObj = {
      name: e.target.WarehouseName.value,
      address: e.target.StreetAddress.value,
      city: e.target.City.value,
      country: e.target.Country.value,
      contact: {
        name: e.target.ContactName.value,
        position: e.target.Position.value,
        phone: e.target.PhoneNumber.value,
        email: e.target.Email.value,
      },
    };

    if (view === "add") {
      axios
        .post(`${BASE_URL}warehouse`, newWarehouseObj)
        .then((response) => {
          // add new warehouse to state to trigger re-render
          setWarehouseListData((prevData) => [
            ...prevData,
            response.data.resourceCreated,
          ]);
        })
        .catch((error) => console.log("POST new warehouse error", error));
      // return to /warehouse
      history.push("/warehouse");
    } else if (view === "edit") {
      axios
        .put(
          `${BASE_URL}warehouse/${location.pathname.slice(-36)}`,
          newWarehouseObj
        )
        .then((response) => {
          // add edited warehouse to state to trigger re-render
          setWarehouseListData((prevData) =>
            prevData.map((warehouse) =>
              warehouse.id === location.pathname.slice(-36)
                ? response.data.resourceUpdated
                : warehouse
            )
          );
        })
        .catch((error) => console.log("POST new warehouse error", error));
      history.goBack();
    }
    e.target.reset();
  };

  const cancelSubmitHandler = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <section className="form">
      <div className="form__container">
        <NavLink
          to={
            location.pathname.includes("add-new-item") ||
            location.pathname.includes("edit-item")
              ? "/inventory"
              : "/warehouse"
          }
          className="form__arrow-link"
        >
          <img src={arrow} alt="arrow icon" className="form__arrow" />
        </NavLink>
        <h1 className="form__title">{title}</h1>
      </div>
      <form
        onSubmit={
          location.pathname.includes("add-new-item") ||
          location.pathname.includes("edit-item")
            ? inventoryFormSubmitHandler
            : warehouseFormSubmitHandler
        }
      >
        {location.pathname.includes("warehouse") && (
          <div className="form__container-cards">
            <FormCard
              title={"Warehouse Details"}
              labelOne={"Warehouse Name"}
              labelTwo={"Street Address"}
              labelThree={"City"}
              labelFour={"Country"}
              borderClass="formcard__border"
              ErrorInputOne={warehouseNameError}
              ErrorInputTwo={streetAddressError}
              ErrorInputThree={cityError}
              ErrorInputFour={countryError}
              location={location}
            />
            <FormCard
              title={"Contact Details"}
              labelOne={"Contact Name"}
              labelTwo={"Position"}
              labelThree={"Phone Number"}
              labelFour={"Email"}
              className=""
              ErrorInputOne={contactNameError}
              ErrorInputTwo={positionError}
              ErrorInputThree={phoneError}
              ErrorInputFour={emailError}
              phoneValidation={phoneValidation}
              emailValidation={emailValidation}
              location={location}
            />
          </div>
        )}
        {location.pathname.includes("add-new-item") && (
          <div className="form__container-cards">
            <ItemDetailsForm
              title={"Item Details"}
              labelOne={"Item Name"}
              labelTwo={"Description"}
              labelThree={"Category"}
              labelFour={"Category"}
              ErrorInputOne={contactNameError}
              ErrorInputTwo={positionError}
              ErrorInputThree={phoneError}
              purpose={"add"}
              itemName={"Please enter an item name"}
              description={"Please enter a brief description"}
              inventoryListData={inventoryListData}
              selectedItem={selectedItem}
              warehouseListData={warehouseListData}
              location={location}
            />
            <ItemAvailabilityForm
              title={"Item Availability"}
              labelOne={"In Stock"}
              labelTwo={"Out of Stock"}
              labelThree={"Quantity"}
              labelFour={"Warehouse"}
              ErrorInputOne={contactNameError}
              ErrorInputTwo={positionError}
              ErrorInputThree={phoneError}
              ErrorInputFour={emailError}
              warehouseListData={warehouseListData}
              stockStatus={status}
              setStatus={setStatus}
              purpose={"add"}
              selectedItem={[]}
              location={location}
            />
          </div>
        )}
        {location.pathname.includes("/inventory/edit-item") && (
          <div className="form__container-cards">
            <ItemDetailsForm
              title={"Item Details"}
              labelOne={"Item Name"}
              labelTwo={"Description"}
              labelThree={"Category"}
              labelFour={"Category"}
              ErrorInputOne={contactNameError}
              ErrorInputTwo={positionError}
              ErrorInputThree={phoneError}
              itemName={itemName}
              purpose="edit"
              description={description}
              inventoryListData={inventoryListData}
              selectedItem={selectedItem}
              warehouseListData={warehouseListData}
              location={location}
            />
            <ItemAvailabilityForm
              title={"Item Availability"}
              labelOne={"In Stock"}
              labelTwo={"Out of Stock"}
              labelThree={"Quantity"}
              labelFour={"Warehouse"}
              ErrorInputOne={contactNameError}
              ErrorInputTwo={positionError}
              ErrorInputThree={phoneError}
              ErrorInputFour={emailError}
              warehouseListData={warehouseListData}
              stockStatus={status}
              purpose="edit"
              setStatus={setStatus}
              selectedItem={selectedItem}
              location={location}
            />
          </div>
        )}
        <div className="form__buttons">
          <Button
            type="cancel button__form-cancel"
            label="Cancel"
            action={cancelSubmitHandler}
          />
          <Button type={`${buttonType} button__edit`} label={buttonLabel} />
        </div>
      </form>
    </section>
  );
};

export default Form;
