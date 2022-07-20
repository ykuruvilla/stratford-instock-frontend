import React from "react";
import { Link } from "react-router-dom";
import "./WarehouseListItem.scss";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";

function WarehouseListItem({ warehouseInfo }) {
  console.log(warehouseInfo);
  return (
    <article className="warehouse__list-item">
      <div className="warehouse__info">
        <h4 className="warehouse__info-header">WAREHOUSE</h4>
        <Link to={`warehouse/${warehouseInfo.id}`}>
          <h3 className="warehouse__name">{warehouseInfo.name}</h3>
        </Link>
        <h4 className="warehouse__infor-header">ADDRESS</h4>
        <p>{warehouseInfo.address}</p>
      </div>
      <div className="warehouse__contact-info">
        <h4 className="warehouse__info-header">CONTACT NAME</h4>
        <p>{warehouseInfo.contactName}</p>
        <h4 className="warehouse__info-header">CONTACT INFORMATION</h4>
        <div className="warehouse__contact-details-container">
          <p>{warehouseInfo.phone}</p>
          <p>{warehouseInfo.email}</p>
        </div>
      </div>
      <div className="warehouse__actions">
        <button>
          <img src={deleteIcon} alt="Delete button" />
        </button>
        <button>
          <img src={editIcon} alt="Delete button" />
        </button>
      </div>
    </article>
  );
}

export default WarehouseListItem;
