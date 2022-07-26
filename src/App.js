import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
// import Inventory from "./pages/Inventory/Inventory";
// import Warehouses from "./pages/Warehouses/Warehouses";
import Table from "./components/Table/Table";
import InventoryItemDetails from "./components/InventoryItemDetails/InventoryItemDetails";
// import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
import Form from "./components/Form/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "./api/api";
import "./App.scss";

const App = ({ location }) => {
  const [warehouseListData, setWarehouseListData] = useState([]);
  const [warehouseDetailsData, setWarehouseDetailsData] = useState([]);
  const [inventoryListData, setInventoryListData] = useState([]);

  const getWarehouseData = async () => {
    try {
      const result = await axios.get(`${BASE_URL}warehouse`);
      setWarehouseListData(result.data);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const getInventoryData = async () => {
    try {
      const result = await axios.get(`${BASE_URL}inventory`);
      setInventoryListData(result.data);
    } catch (error) {
      window.alert(error.message);
    }
  };

  // initial mount
  useEffect(() => {
    if (warehouseListData.length < 1) {
      getWarehouseData();
    }
  }, [warehouseListData.length]);

  // Component did update (on warehouse list click)
  useEffect(() => {
    // bandaid solution
    if (
      location.pathname.includes("warehouse/") &&
      !location.pathname.includes("add") &&
      !location.pathname.includes("edit")
    ) {
      console.log("useEffect did update on warehouse list click");
      axios
        .get(`${BASE_URL}${location.pathname.slice(1)}`)
        .then((response) => {
          setWarehouseDetailsData(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [location.pathname]);

  // component did mount for inventory data
  useEffect(() => {
    if (location.pathname === "/inventory") {
      getInventoryData();
    }
  }, [location.pathname]);

  // Note to myself: order the routes from most specific to least specific
  return (
    <>
      <div className="body">
        <div className="app__container">
          <Header location={location} />
          <Switch>
            <Route
              exact
              path="/inventory/:inventoryId"
              render={() => <InventoryItemDetails location={location} />}
            />
            <Route
              exact
              path="/warehouse/add-new-warehouse"
              render={() => (
                <Form
                  title="Add New Warehouse"
                  setWarehouseListData={setWarehouseListData}
                  buttonType="add"
                  buttonLabel="+ Add Warehouse"
                  location={location}
                  view="add"
                  warehouseListData={warehouseListData}
                  setInventoryListData={setInventoryListData}
                />
              )}
            />
            <Route
              exact
              path="/warehouse/edit-warehouse/:warehouseId"
              render={() => (
                <Form
                  title="Edit Warehouse"
                  setWarehouseListData={setWarehouseListData}
                  buttonType="save"
                  buttonLabel="Save"
                  view="edit"
                  location={location}
                  warehouseListData={warehouseListData}
                />
              )}
            />
            <Route
              path="/warehouse/:warehouseId"
              render={(routerProps) => (
                <Table
                  {...routerProps}
                  data={warehouseDetailsData}
                  dataSet="warehouseDetails"
                  title={warehouseDetailsData.name}
                  setWarehouseDetailsData={setWarehouseDetailsData}
                  setWarehouseListData={setWarehouseListData}
                  hasSearch={false}
                  buttonType="edit"
                  buttonLabel="Edit"
                  colOneTitle="INVENTORY ITEM"
                  colTwoTitle=" CATEGORY"
                  colThreeTitle="STATUS"
                  colFourTitle="QUANTITY"
                  modalType="inventory"
                />
              )}
            />
            <Route
              exact
              path="/warehouse"
              render={(routerProps) => (
                <Table
                  {...routerProps}
                  data={warehouseListData}
                  dataSet="warehouseList"
                  getWarehouseData={getWarehouseData}
                  setWarehouseListData={setWarehouseListData}
                  title="Warehouses"
                  hasSearch={true}
                  buttonType="add"
                  buttonLabel="+ Add New Warehouse"
                  colOneTitle="WAREHOUSE"
                  colTwoTitle=" ADDRESS"
                  colThreeTitle="CONTACT NAME"
                  colFourTitle="CONTACT INFORMATION"
                  modalType="warehouse"
                />
              )}
            />
            <Route
              exact
              path="/inventory/edit/:inventoryId"
              render={(routerProps) => (
                <Form
                  location={routerProps.location}
                  title="Edit Inventory Item"
                  setWarehouseListData={setWarehouseListData}
                  buttonType="save"
                  buttonLabel="Save"
                  view="edit"
                  warehouseListData={warehouseListData}
                  setInventoryListData={setInventoryListData}
                  inventoryListData={inventoryListData}
                />
              )}
            />
            <Route
              exact
              path="/inventory"
              render={(routerProps) => (
                <Table
                  {...routerProps}
                  data={inventoryListData}
                  dataSet="inventoryList"
                  getInventoryData={getInventoryData}
                  title="Inventory"
                  hasSearch={true}
                  buttonType="add"
                  buttonLabel="+ Add New Item"
                  colOneTitle="INVENTORY ITEM"
                  colTwoTitle="CATEGORY"
                  colThreeTitle="STATUS"
                  colFourTitle="QTY"
                  colFiveTitle="WAREHOUSE"
                  modalType="inventory"
                />
              )}
            />
            <Redirect exact from="/" to="/warehouse" />
          </Switch>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default withRouter(App);
