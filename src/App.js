import { Route, Switch, withRouter } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
// import Inventory from "./pages/Inventory/Inventory";
// import Warehouses from "./pages/Warehouses/Warehouses";
import Table from "./components/Table/Table";
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
import Form from "./components/Form/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "./api/api";
import "./App.scss";

const App = ({ location }) => {
  const [warehouseListData, setWarehouseListData] = useState([]);

  const getWarehouseData = async () => {
    try {
      const result = await axios.get(`${BASE_URL}warehouse`);

      setWarehouseListData(result.data);
    } catch (error) {
      window.alert(error.message);
    }
  };

  useEffect(() => {
    // initial mount
    if (warehouseListData.length < 1) {
      getWarehouseData();
    }
  }, [warehouseListData]);

  // Note to myself: order the routes from most specific to least specific
  return (
    <>
      <div className="body">
        <div className="app__container">
          <Header />
          <Switch>
            <Route
              exact
              path="/warehouse/add-new-warehouse"
              render={() => (
                <Form
                  title="Add New Warehouse"
                  setWarehouseListData={setWarehouseListData}
                  buttonType="add"
                  buttonLabel="+ Add Warehouse"
                  view="add"
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
                />
              )}
            />
            <Route
              path="/warehouse/:warehouseId"
              component={WarehouseDetails}
            />
            <Route
              exact
              path="/warehouse"
              render={() => (
                <WarehouseList
                  warehouseListData={warehouseListData}
                  setWarehouseListData={setWarehouseListData}
                />
              )}
            />
            <Route exact path="/inventory" component={""} />
          </Switch>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default withRouter(App);
