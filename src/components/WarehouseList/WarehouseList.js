import React from "react";
import WarehouseListItem from "../WarehouseListItem/WarehouseListItem";
import "./WarehouseList.scss";
import searchIcon from "../../assets/icons/search-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";

const WarehouseList = ({ warehouseListData, setWarehouseListData }) => {
  console.log("WarehouseList props", setWarehouseListData);
  if (warehouseListData.length < 1) {
    return <h1>Page loading...</h1>;
  }
  return (
    <section className="warehouse-list">
      <div className="warehouse-list__header">
        <h1 className="warehouse-list__title">Warehouses</h1>
        <form className="warehouse-list__search">
          <input
            type="search"
            className="warehouse-list__search-field"
            placeholder="Search..."
          />
          <button type="submit" className="warehouse-list__search-button">
            <img src={searchIcon} alt="Search icon" />
          </button>
        </form>
        <NavLink
          to="/warehouse/add-new-warehouse"
          className="warehouse-list__link"
        >
          <Button type={"add"} label={"+ Add New Warehouse"} />
        </NavLink>
      </div>
      <div className="warehouse-list__table-headers">
        <div className="warehouse-list__info-headers">
          <div className="warehouse-list__table-header-item">
            <h4 className="warehouse-list__table-heading">WAREHOUSE</h4>
            <button className="warehouse-list__sort-button">
              <img src={sortIcon} alt="Sort icon" />
            </button>
          </div>
          <div className="warehouse-list__table-header-item">
            <h4 className="warehouse-list__table-heading">ADDRESS</h4>
            <button className="warehouse-list__sort-button">
              <img src={sortIcon} alt="Sort icon" />
            </button>
          </div>
          <div className="warehouse-list__table-header-item">
            <h4 className="warehouse-list__table-heading">CONTACT NAME</h4>
            <button className="warehouse-list__sort-button">
              <img src={sortIcon} alt="Sort icon" />
            </button>
          </div>
          <div className="warehouse-list__table-header-item">
            <h4 className="warehouse-list__table-heading">
              CONTACT INFORMATION
            </h4>
            <button className="warehouse-list__sort-button">
              <img src={sortIcon} alt="Sort icon" />
            </button>
          </div>
        </div>
        <div className="warehouse-action-headers">
          <div className="warehouse-list__table-header-item warehouse-list__table-header-item--actions">
            <h4 className="warehouse-list__table-heading">ACTIONS</h4>
          </div>
        </div>
      </div>
      <section className="warehouse-list__container">
        {warehouseListData.map((warehouse) => {
          return (
            <WarehouseListItem
              warehouseInfo={warehouse}
              key={warehouse.id}
              setWarehouseListData={setWarehouseListData}
            />
          );
        })}
      </section>
    </section>
  );
};

export default WarehouseList;
