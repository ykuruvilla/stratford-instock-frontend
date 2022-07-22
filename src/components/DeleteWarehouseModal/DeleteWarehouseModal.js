import "./DeleteWarehouseModal.scss";
import Button from "../Button/Button";
import closeIcon from "../../assets/icons/close-24px.svg";
import { NavLink } from "react-router-dom";
import axios from "axios";
import React from "react";
import Modal from "react-modal";
import BASE_URL from "../../api/api";

const DeleteWarehouseModal = ({
  modalIsOpen,
  closeModal,
  warehouseID,
  setwarehouseListData,
}) => {
  const deleteWarehouse = () => {
    axios
      .delete(`${BASE_URL}warehouse/${warehouseID}`)
      .then((response) => {
        console.log("delete success", response);
        setwarehouseListData((prev) =>
          prev.filter((warehouse) => warehouse.id !== warehouseID)
        );
      })
      .catch((error) => console.log("delete error", error));
  };

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
                onClick={closeModal}
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
            <NavLink
              to="/"
              className="delete__cancel-link"
              onClick={closeModal}
            >
              <Button type="cancel" label={"Cancel"} action={closeModal} />
            </NavLink>
            <Button type="delete" label={"Delete"} action={deleteWarehouse} />
          </div>
        </section>
      </Modal>
    </>
  );
};

export default DeleteWarehouseModal;
