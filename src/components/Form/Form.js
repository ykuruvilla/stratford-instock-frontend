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
  console.log(location);

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

  // put field values in state
  //async for state onChange!!!!
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    if (Object.keys(selectedItem).length === 0) {
      axios
        .get(`${BASE_URL}inventory`)
        .then((response) => {
          setInventoryListData(response.data);

          let currentItem = response.data.find((inventory) => {
            return inventory.id === location.pathname.slice(-36);
          });

          setSelectedItem(currentItem);

          console.log("current", currentItem.itemName);

          // wrong because response.data is an array
          setItemName(currentItem.itemName);
          setDescription(currentItem.description);
          setStatus(currentItem.status);
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

  const history = useHistory();

  const formSubmitHandler = (e) => {
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
    }

    e.target.reset();
    history.push("/warehouse");
  };

  const cancelSubmitHandler = (e) => {
    e.preventDefault();
    //FIXME:
    history.goBack("/warehouse");
  };

  return (
    <section className="form">
      <div className="form__container">
        <NavLink to="/warehouse" className="form__arrow-link">
          <img src={arrow} alt="arrow icon" className="form__arrow" />
        </NavLink>
        <h1 className="form__title">{title}</h1>
      </div>
      <form onSubmit={formSubmitHandler}>
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
            />
          </div>
        )}
        {location.pathname.includes("inventory") && (
          <div className="form__container-cards">
            <ItemDetailsForm
              title={"item Details"}
              labelOne={"Item Name"}
              labelTwo={"Description"}
              labelThree={"Category"}
              labelFour={"Category"}
              className=""
              ErrorInputOne={contactNameError}
              ErrorInputTwo={positionError}
              ErrorInputThree={phoneError}
              ErrorInputFour={emailError}
              phoneValidation={phoneValidation}
              emailValidation={emailValidation}
            />
            <ItemAvailabilityForm
              title={"Item Availability"}
              labelOne={"In Stock"}
              labelTwo={"Out of Stock"}
              labelThree={"Warehouse"}
              className=""
              ErrorInputOne={contactNameError}
              ErrorInputTwo={positionError}
              ErrorInputThree={phoneError}
              ErrorInputFour={emailError}
              warehouseListData={warehouseListData}
              setInventoryListData={setInventoryListData}
              inventoryListData={inventoryListData}
              location={location}
              stockStatus={status}
              selectedItem={selectedItem}
            />
          </div>
        )}
        <div className="form__buttons">
          <Button
            type="cancel button__form-cancel"
            label="Cancel"
            action={cancelSubmitHandler}
          />
          <Link to={`inventory/${location.pathname.slice(-36)}`}>
            <Button type={`${buttonType} button__edit`} label={buttonLabel} />
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Form;
