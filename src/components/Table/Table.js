import React from "react";
import TableItem from "../TableItem/TableItem";
import "./Table.scss";
import searchIcon from "../../assets/icons/search-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { filterInventory, filterWarehouse } from "../../utils/helper";

const Table = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className="table">
      <div className="table__header">
        <h1 className="table__title">{props.title}</h1>
        {props.hasSearch && (
          <form className="table__search">
            <input
              onChange={(event) => setSearchTerm(event.target.value)}
              type="search"
              className="table__search-field"
              placeholder="Search..."
            />
            <p className="table__search-button">
              <img src={searchIcon} alt="Search icon" />
            </p>
          </form>
        )}
        <NavLink
          className="table__link"
          to={
            props.buttonLabel.includes("Add New Warehouse")
              ? "/warehouse/add-new-warehouse"
              : props.dataSet === "warehouseDetails"
              ? `/warehouse/edit-warehouse/${props.location.pathname.slice(
                  -36
                )}`
              : props.buttonLabel.includes("Add New Item")
              ? "/inventory/add-new-item"
              : `/inventory/edit/${props.location.pathname.slice(-36)}`
          }
        >
          <Button type={props.buttonType} label={props.buttonLabel} />
        </NavLink>
      </div>
      <div
        className={`table__table-headers ${
          props.colFiveTitle && "table__table-headers--inventory"
        }`}
      >
        <div
          className={`table__info-headers ${
            props.colFiveTitle && "table__info-headers--inventory"
          }`}
        >
          <div className="table__table-header-item">
            <h4 className="table__table-heading">{props.colOneTitle}</h4>
            <button className="table__sort-button">
              <img src={sortIcon} alt="Sort icon" />
            </button>
          </div>
          <div className="table__table-header-item">
            <h4 className="table__table-heading">{props.colTwoTitle}</h4>
            <button className="table__sort-button">
              <img src={sortIcon} alt="Sort icon" />
            </button>
          </div>
          <div className="table__table-header-item">
            <h4 className="table__table-heading">{props.colThreeTitle}</h4>
            <button className="table__sort-button">
              <img src={sortIcon} alt="Sort icon" />
            </button>
          </div>
          <div className="table__table-header-item">
            <h4 className="table__table-heading">{props.colFourTitle}</h4>
            <button className="table__sort-button">
              <img src={sortIcon} alt="Sort icon" />
            </button>
          </div>
          {props.colFiveTitle && (
            <div className="table__table-header-item">
              <h4 className="table__table-heading">{props.colFiveTitle}</h4>
              <button className="table__sort-button">
                <img src={sortIcon} alt="Sort icon" />
              </button>
            </div>
          )}
        </div>
        <div className="warehouse-action-headers">
          <div className="table__table-header-item table__table-header-item--actions">
            <h4 className="table__table-heading">ACTIONS</h4>
          </div>
        </div>
      </div>
      <section className="table__container">
        {props.dataSet === "warehouseList" &&
          props.data
            .filter((warehouse) => filterWarehouse(warehouse, searchTerm))
            .map((warehouse) => {
              return (
                <TableItem
                  data={warehouse}
                  dataSet={props.dataSet}
                  key={warehouse.id}
                  location={props.location}
                  setWarehouseListData={props.setWarehouseListData}
                  modalType={props.modalType}
                  // below is undefined
                  setWarehouseDetailsData={props.setWarehouseDetailsData}
                />
              );
            })}

        {props.data.inventoryData &&
          props.dataSet === "warehouseDetails" &&
          props.data.inventoryData.map((inventory) => {
            return (
              <TableItem
                data={inventory}
                dataSet={props.dataSet}
                key={inventory.id}
                location={props.location}
                setWarehouseDetailsData={props.setWarehouseDetailsData}
                modalType={props.modalType}
                setInventoryListData={props.setInventoryListData}
              />
            );
          })}

        {props.dataSet === "inventoryList" &&
          props.data
            .filter((inventory) => filterInventory(inventory, searchTerm))
            .map((inventory) => {
              return (
                <TableItem
                  data={inventory}
                  dataSet={props.dataSet}
                  key={inventory.id}
                  location={props.location}
                  modalType={props.modalType}
                  setWarehouseListData={props.setWarehouseListData}
                  setInventoryListData={props.setInventoryListData}
                />
              );
            })}
      </section>
    </section>
  );
};

export default Table;
