import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./TableItem.scss";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";

function TableItem(props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  if (props.dataSet === "warehouseList") {
    return (
      <>
        <DeleteModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          id={props.data.id}
          setWarehouseListData={props.setWarehouseListData}
          warehouseName={props.data.name}
          inventoryName={props.data.itemName}
          modalType={props.modalType}
          location={props.location}
        />
        <article className="table-item__list-item">
          <div className="table-item__details">
            <div className="table-item__info">
              <h4 className="table-item__info-header">WAREHOUSE</h4>
              <NavLink
                className="table-item__name-link"
                to={`/warehouse/${props.data.id}`}
              >
                <h3 className="table-item__name">{props.data.name}</h3>
                <img src={chevron} alt="Chevron right" />
              </NavLink>
              <h4 className="table-item__info-header">CONTACT NAME</h4>
              <p className="table-item__address">{`${props.data.address}, ${props.data.city}, ${props.data.country}`}</p>
            </div>
            <div className="table-item__contact-info">
              <h4 className="table-item__info-header">ADDRESS</h4>
              <p className="table-item__contact-name">
                {props.data.contact.name}
              </p>
              <h4 className="table-item__info-header">CONTACT INFORMATION</h4>
              <div className="table-item__contact-details-container">
                <p>{props.data.contact.phone}</p>
                <p>{props.data.contact.email}</p>
              </div>
            </div>
          </div>
          <div className="table-item__actions">
            <button className="table-item__action-button" onClick={openModal}>
              <img src={deleteIcon} alt="Delete button" />
            </button>
            <NavLink to={`/warehouse/edit-warehouse/${props.data.id}`}>
              <button className="table-item__action-button">
                <img src={editIcon} alt="Edit button" />
              </button>
            </NavLink>
          </div>
        </article>
      </>
    );
  }

  if (props.dataSet === "warehouseDetails") {
    return (
      <>
        <DeleteModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          id={props.data.id}
          getWarehouseData={props.getWarehouseData}
          setWarehouseDetailsData={props.setWarehouseDetailsData}
          setWarehouseListData={props.setWarehouseListData}
          warehouseName={props.data.name}
          inventoryName={props.data.itemName}
          modalType={props.modalType}
          setInventoryListData={props.setInventoryListData}
          location={props.location}
        />
        <article className="table-item__list-item">
          <div className="table-item__details">
            <div className="table-item__info">
              <h4 className="table-item__info-header">INVENTORY ITEM</h4>
              <NavLink
                className="table-item__name-link"
                to={`/inventory/${props.data.id}`}
              >
                <h3 className="table-item__name">{props.data.itemName}</h3>
                <img src={chevron} alt="Chevron right" />
              </NavLink>
              <h4 className="table-item__info-header">CATEGORY</h4>
              <p className="table-item__address">{props.data.category}</p>
            </div>
            <div className="table-item__contact-info">
              <h4 className="table-item__info-header">STATUS</h4>
              <div className="table-item__status-container">
                <p
                  className={`table-item__status ${
                    props.data.quantity > 0
                      ? "table-item__status--instock"
                      : "table-item__status--outstock"
                  }`}
                >
                  {props.data.status}
                </p>
              </div>
              <h4 className="table-item__info-header">QTY</h4>
              <div className="table-item__contact-details-container">
                <p>{props.data.quantity}</p>
              </div>
            </div>
          </div>
          <div className="table-item__actions">
            <button className="table-item__action-button" onClick={openModal}>
              <img src={deleteIcon} alt="Delete button" />
            </button>

            <Link to={`/inventory/edit-item/${props.data.id}`}>
              <button className="table-item__action-button">
                <img src={editIcon} alt="Edit button" />
              </button>
            </Link>
          </div>
        </article>
      </>
    );
  }

  if (props.dataSet === "inventoryList") {
    return (
      <>
        <DeleteModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          id={props.data.id}
          getWarehouseData={props.getWarehouseData}
          setInventoryListData={props.setInventoryListData}
          warehouseName={props.data.name}
          inventoryName={props.data.itemName}
          modalType={props.modalType}
          location={props.location}
        />
        <article className="table-item__list-item">
          <div className="table-item__details table-item__details--inventory">
            <div className="table-item__info table-item__info--inventory">
              <h4 className="table-item__info-header">INVENTORY ITEM</h4>
              <NavLink
                className="table-item__name-link"
                to={`/inventory/${props.data.id}`}
              >
                <h3 className="table-item__name">{props.data.itemName}</h3>
                <img src={chevron} alt="Chevron right" />
              </NavLink>
              <h4 className="table-item__info-header">CATEGORY</h4>
              <p className="table-item__address">{props.data.category}</p>
            </div>
            <div className="table-item__status-info">
              <h4 className="table-item__info-header">STATUS</h4>
              <div
                className={`table-item__status-container ${
                  props.dataSet === "inventoryList" &&
                  "table-item__status-container--inventory"
                }`}
              >
                <p
                  className={`table-item__status ${
                    props.data.quantity > 0
                      ? "table-item__status--instock"
                      : "table-item__status--outstock"
                  }`}
                >
                  {props.data.status}
                </p>
              </div>
              <h4 className="table-item__info-header">QTY</h4>
              <div className="table-item__quantity-container">
                <p className="table-item__quantity">{props.data.quantity}</p>
                <h4 className="table-item__info-header">WAREHOUSE</h4>
              </div>
              <div className="table-item__warehouse-container">
                <p>{props.data.warehouseName}</p>
              </div>
            </div>
          </div>
          <div className="table-item__actions">
            <button className="table-item__action-button" onClick={openModal}>
              <img src={deleteIcon} alt="Delete button" />
            </button>
            <Link to={`/inventory/edit-item/${props.data.id}`}>
              <button className="table-item__action-button">
                <img src={editIcon} alt="Edit button" />
              </button>
            </Link>
          </div>
        </article>
      </>
    );
  }
}

export default TableItem;
