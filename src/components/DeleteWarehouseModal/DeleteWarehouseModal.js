import "./DeleteWarehouseModal.scss";
import Button from "../Button/Button";
import closeIcon from "../../assets/icons/close-24px.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";

export const DeleteWarehouseModal = (props) => {
  const warehouseId = props?.warehouse?.id || 1;
  const deleteWarehouse = () => {
    axios.delete(`http:localhost:8080/warehouse/${warehouseId}`);
  };
  return (
    <section className="container">
      <Link to="/">
        <img className="icon-close" alt="close icon" src={closeIcon} />
      </Link>
      <div>
        <h1 className="title">Delete Washington warehouse?</h1>
        <p className="body-large">
          Please confirm that you’d like to delete the Washington from the list
          of warehouses. You won’t be able to undo this action.
        </p>
      </div>
      <div className="buttons-container">
        <Link to="/" className="link">
          <div className="button__margins">
            <Button type="cancel" />
          </div>
        </Link>

        <Button type="delete" onClick={deleteWarehouse} />
      </div>
    </section>
  );
};
