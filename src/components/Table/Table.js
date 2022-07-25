import React from "react";
import TableItem from "../TableItem/TableItem";
import "./Table.scss";
import searchIcon from "../../assets/icons/search-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";

const Table = (props) => {
  // console.log("Table props", props);
  console.log("current id:", props.location.pathname.slice(-36));
  // if (!props.data.inventoryData) {
  //   return <h1>Page loading...</h1>;
  // }
  return (
    <section className="table">
      <div className="table__header">
        <h1 className="table__title">{props.title}</h1>
        {/* Will this work? */}
        {props.hasSearch && (
          <form className="table__search">
            <input
              type="search"
              className="table__search-field"
              placeholder="Search..."
            />
            <button type="submit" className="table__search-button">
              <img src={searchIcon} alt="Search icon" />
            </button>
          </form>
        )}
        <NavLink
          to={
            props.location.pathname === "/warehouse"
              ? "/warehouse/add-new-warehouse"
              : `/warehouse/edit-warehouse/${props.location.pathname.slice(
                  -36
                )}`
          }
        >
          <Button type={props.buttonType} label={props.buttonLabel} />
        </NavLink>
      </div>
      <div className="table__table-headers">
        <div className="table__info-headers">
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
        </div>
        <div className="warehouse-action-headers">
          <div className="table__table-header-item table__table-header-item--actions">
            <h4 className="table__table-heading">ACTIONS</h4>
          </div>
        </div>
      </div>
      <section className="table__container">
        {props.location.pathname === "/warehouse" &&
          props.data.map((warehouse) => {
            return (
              <TableItem
                data={warehouse}
                key={warehouse.id}
                location={props.location}
                setWarehouseData={props.settWarehouseData}
                modalType={props.modalType}
              />
            );
          })}

        {props.data.inventoryData &&
          Object.keys(props.data).includes("inventoryData") &&
          props.data.inventoryData.map((inventory) => {
            return (
              <TableItem
                data={inventory}
                key={inventory.id}
                location={props.location}
                setWarehouseDetailsData={props.setWarehouseDetailsData}
                modalType={props.modalType}
              />
            );
          })}
      </section>
    </section>
  );
};

export default Table;
