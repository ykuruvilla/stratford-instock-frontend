import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import BASE_URL from "../../api/api";
import editIcon from "../../assets/icons/edit-24px.svg";
import backIcon from "../../assets/icons/arrow_back-24px.svg";
import "./InventoryItemDetails.scss";

const InventoryItemDetails = ({ location }) => {
  const [inventoryDetailsData, setInventoryDetailsData] = useState([]);

  const getInventoryDetailsData = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}${location.pathname.slice(1)}`
      );
      setInventoryDetailsData(result.data);
    } catch (error) {
      window.alert(error.message);
    }
  };

  useEffect(() => {
    console.log("Hello");
    if (!location.pathname.includes("add")) {
      getInventoryDetailsData();
    }
  }, []);
  return (
    <div className="inventory-details">
      <div className="inventory-details__header-container">
        <NavLink to="/inventory" className="inventory-details__back-button">
          <img src={backIcon} alt="Back icon" />
        </NavLink>
        <h1 className="inventory-details__header-title">
          {inventoryDetailsData.itemName}
        </h1>
        {/* FIXME: navlink to missing  */}
        <NavLink
          to={`/inventory/edit-item/${location.pathname.slice(-36)}`}
          className="inventory-details__link"
        >
          <img
            className="inventory-details__link-image"
            src={editIcon}
            alt="Edit icon"
          />
          <h3 className="inventory-details__link-text">Edit</h3>
        </NavLink>
      </div>
      <div className="inventory-details__card">
        <div className="inventory-details__card-left">
          <h4 className="inventory-details__table-header">ITEM DESCRIPTION:</h4>
          <p className="inventory-details__table-text">
            {inventoryDetailsData.description}
          </p>
          <h4 className="inventory-details__table-header">CATEGORY:</h4>
          <p className="inventory-details__table-text">
            {inventoryDetailsData.category}
          </p>
        </div>
        <div className="inventory-details__card-right">
          <div className="inventory-details__card-right--upper">
            <div className="inventory-details__status-container">
              <h4 className="inventory-details__table-header">STATUS:</h4>
              <p
                className={`inventory-details__status ${
                  inventoryDetailsData.quantity
                    ? "inventory-details__status--instock"
                    : "inventory-details__status--outstock"
                }`}
              >
                {inventoryDetailsData.status}
              </p>
            </div>
            <div className="inventory-details__quantity-container">
              <h4 className="inventory-details__table-header">QUANTITY:</h4>
              <p className="inventory-details__table-text">
                {inventoryDetailsData.quantity}
              </p>
            </div>
          </div>
          <div className="inventory-details__card-right--lower">
            <h4 className="inventory-details__table-header">WAREHOUSE:</h4>
            <p className="inventory-details__table-text">
              {inventoryDetailsData.warehouseName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryItemDetails;
