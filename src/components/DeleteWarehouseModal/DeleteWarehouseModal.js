import "./DeleteWarehouseModal.scss";
import Button from "../Button/Button";
import closeIcon from "../../assets/icons/close-24px.svg";
import { NavLink } from "react-router-dom";
import axios from "axios";
import React from "react";

export const DeleteWarehouseModal = (props) => {
  const warehouseId = props?.warehouse?.id || 1;
  const deleteWarehouse = () => {
    axios.delete(`http:localhost:8080/warehouse/${warehouseId}`);
  };
  return (
    <section className="delete__container">
      <NavLink to="/" className="delete__link-close">
        <img className="delete__icon-close" alt="close icon" src={closeIcon} />
      </NavLink>
      <div>
        <h1 className="delete__title">Delete Washington warehouse?</h1>
        <p className="body-large">
          Please confirm that you’d like to delete the Washington from the list
          of warehouses. You won’t be able to undo this action.
        </p>
      </div>
      <div className="delete__buttons-container">
        <NavLink to="/" className="delete__cancel-link">
          <div className="delete__button-margins">
            <Button type="cancel" />
          </div>
        </NavLink>

        <Button type="delete" onClick={deleteWarehouse} />
      </div>
    </section>
  );
};
