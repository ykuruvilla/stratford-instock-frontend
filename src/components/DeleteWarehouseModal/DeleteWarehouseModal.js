import "./DeleteWarehouseModal.scss";
import { ButtonCancel, ButtonDelete } from "../Button/Button";
import closeIcon from "../../assets/icons/close-24px.svg";

import React from "react";

export const DeleteWarehouseModal = () => {
  return (
    <section className="container">
      <img className="icon-close" alt="close icon" src={closeIcon} />
      <h1 className="title">Delete Washington warehouse?</h1>
      <p>
        Please confirm that you’d like to delete the Washington from the list of
        warehouses. You won’t be able to undo this action.
      </p>
      <div className="button-container">
        <ButtonCancel />

        <ButtonDelete />
      </div>
    </section>
  );
};
