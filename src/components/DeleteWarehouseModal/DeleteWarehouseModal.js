import "./DeleteWarehouseModal.scss";
import Button from "../Button/Button";
import closeIcon from "../../assets/icons/close-24px.svg";
import { NavLink } from "react-router-dom";
import axios from "axios";
import React from "react";
import Modal from "react-modal";
import { useState } from "react";

const DeleteWarehouseModal = ({ modalIsOpen, closeModal }) => {
  // const warehouseId = props?.warehouse?.id || 1;
  // const deleteWarehouse = () => {
  //   axios.delete(`http:localhost:8080/warehouse/${warehouseId}`);
  // };

  return (
    <>
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <section className="delete">
          <div className="delete__container-top">
            <NavLink to="/warehouses" className="delete__link-close">
              <img
                className="delete__icon-close"
                alt="close icon"
                src={closeIcon}
              />
            </NavLink>
            <div className="delete__wrapper">
              <h1 className="delete__title">Delete Washington warehouse?</h1>
              <p className="body-large">
                Please confirm that you’d like to delete the Washington from the
                list of warehouses. You won’t be able to undo this action.
              </p>
            </div>
          </div>
          <div className="delete__buttons-container">
            <NavLink to="/" className="delete__cancel-link">
              <Button type="cancel" label={"Cancel"} />
            </NavLink>
            <Button type="delete" label={"Delete"} onClick={""} />
          </div>
        </section>
      </Modal>
    </>
  );
};

export default DeleteWarehouseModal;
