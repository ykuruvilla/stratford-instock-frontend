import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
// import Inventory from "./pages/Inventory/Inventory";
// import Warehouses from "./pages/Warehouses/Warehouses";
import Table from "./components/Table/Table";
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "./api/api";
import "./App.scss";

const App = (props) => {
  const [warehouseListData, setwarehouseListData] = useState([]);
  const [warehouseDetailsData, setwarehouseDetailsData] = useState([]);

  const getWarehouseData = async () => {
    try {
      const result = await axios.get(`${BASE_URL}warehouse`);

      setwarehouseListData(result.data);
    } catch (error) {
      window.alert(error.message);
    }
  };

  useEffect(() => {
    // initial mount
    if (warehouseListData.length < 1) {
      getWarehouseData();
    }
  }, [warehouseListData.length]);

  // Component did update (on warehouse list click)
  useEffect(() => {
    axios
      .get(`${BASE_URL}${props.location.pathname.slice(1)}`)
      .then((response) => {
        setwarehouseDetailsData(response.data);
      })
      .catch((error) => console.log(error));
  }, [props.location.pathname]);

  return (
    <>
      <Header />
      <Switch>
        <Redirect exact from="/warehouse" to="/" />
        <Route
          exact
          path="/"
          render={(routerProps) => (
            <Table
              {...routerProps}
              data={warehouseListData}
              getWarehouseData={getWarehouseData}
              title="Warehouses"
              hasSearch={true}
              buttonType="add"
              buttonLabel="+ Add New Warehouse"
              colOneTitle="WAREHOUSE"
              colTwoTitle=" ADDRESS"
              colThreeTitle="CONTACT NAME"
              colFourTitle="CONTACT INFORMATION"
            />
          )}
        />
        <Route
          path="/warehouse/:warehouseID"
          render={(routerProps) => (
            <Table
              {...routerProps}
              data={warehouseDetailsData}
              title={warehouseDetailsData.name}
              setwarehouseDetailsData={setwarehouseDetailsData}
              hasSearch={false}
              buttonType="edit"
              buttonLabel="Edit"
              colOneTitle="INVENTORY ITEM"
              colTwoTitle=" CATEGORY"
              colThreeTitle="STATUS"
              colFourTitle="QUANTITY"
            />
          )}
        />
        <Route path="/inventory" component={""} />
      </Switch>
      <Footer />
    </>
  );
};

export default withRouter(App);
