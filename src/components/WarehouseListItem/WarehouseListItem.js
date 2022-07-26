import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./WarehouseListItem.scss";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";

function WarehouseListItem({ warehouseInfo, setWarehouseListData }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <DeleteModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        warehouseId={warehouseInfo.id}
        setWarehouseListData={setWarehouseListData}
      />
      <article className="warehouse__list-item">
        <div className="warehouse__details">
          <div className="warehouse__info">
            <h4 className="warehouse__info-header">WAREHOUSE</h4>
            <NavLink
              className="warehouse__name-link"
              to={`warehouse/${warehouseInfo.id}`}
            >
              <h3 className="warehouse__name">{warehouseInfo.name}</h3>
              <img src={chevron} alt="Chevron right" />
            </NavLink>
            <h4 className="warehouse__info-header">ADDRESS</h4>
            <p className="warehouse__address">{`${warehouseInfo.address}, ${warehouseInfo.city}, ${warehouseInfo.country}`}</p>
          </div>
          <div className="warehouse__contact-info">
            <h4 className="warehouse__info-header">CONTACT NAME</h4>
            <p className="warehouse__contact-name">
              {warehouseInfo.contact.name}
            </p>
            <h4 className="warehouse__info-header">CONTACT INFORMATION</h4>
            <div className="warehouse__contact-details-container">
              <p>{warehouseInfo.contact.phone}</p>
              <p>{warehouseInfo.contact.email}</p>
            </div>
          </div>
        </div>
        <div className="warehouse__actions">
          <button className="warehouse__action-button" onClick={openModal}>
            <img src={deleteIcon} alt="delete icon" />
          </button>
          <button className="warehouse__action-button">
            <Link to={`/warehouse/edit-warehouse/${warehouseInfo.id}`}>
              <img src={editIcon} alt="edit icon" />
            </Link>
          </button>
        </div>
      </article>
    </>
  );
}

export default WarehouseListItem;
