import "./DeleteModal.scss";
import Button from "../Button/Button";
import closeIcon from "../../assets/icons/close-24px.svg";
import { NavLink } from "react-router-dom";
import axios from "axios";
import React from "react";
import Modal from "react-modal";
import BASE_URL from "../../api/api";
import { useHistory } from "react-router-dom";

const DeleteModal = ({
  modalIsOpen,
  closeModal,
  id,
  setWarehouseListData,
  setWarehouseDetailsData,
  setInventoryListData,
  modalType,
  warehouseName,
  inventoryName,
  location,
}) => {
  const history = useHistory();

  const deleteWarehouse = () => {
    axios
      .delete(`${BASE_URL}warehouse/${id}`)
      .then((response) => {
        setWarehouseListData((prev) =>
          prev.filter((warehouse) => warehouse.id !== id)
        );
      })
      .catch((error) => console.log("delete error", error));
  };

  const deleteInventoryItem = () => {
    axios
      .delete(`${BASE_URL}inventory/${id}`)
      .then((_response) => {
        setInventoryListData((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((error) => console.log("delete error", error));
    history.goBack();
    // closeModal();
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
            <NavLink to={`${location.pathname}`} className="delete__link-close">
              <img
                className="delete__icon-close"
                alt="close icon"
                src={closeIcon}
                onClick={closeModal}
              />
            </NavLink>
            <div className="delete__wrapper">
              <h1 className="delete__title">
                {modalType === "warehouse"
                  ? `Delete ${warehouseName} warehouse?`
                  : `Delete ${inventoryName} inventory item?`}
              </h1>
              <p className="body-large">
                {modalType === "warehouse"
                  ? `Please confirm that you’d like to delete the ${warehouseName} from the list of warehouses. You won’t be able to undo this action.`
                  : `Please confirm that you’d like to delete ${inventoryName} from the inventory list. You won’t be able to undo this action.`}
              </p>
            </div>
          </div>
          <div className="delete__buttons-container">
            <Button
              type="cancel button__cancel-link"
              label={"Cancel"}
              action={closeModal}
            />
            <Button
              type="delete"
              label={"Delete"}
              action={
                modalType === "warehouse"
                  ? deleteWarehouse
                  : deleteInventoryItem
              }
            />
          </div>
        </section>
      </Modal>
    </>
  );
};

export default DeleteModal;
