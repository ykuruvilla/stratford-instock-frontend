import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
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

const App = () => {
  const [warehouseListData, setwarehouseListData] = useState([]);

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

  // useEffect(() => {
  //   // inventory axios call
  // }, [warehouseId]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Redirect exact from="/warehouses" to="/" />
          <Route
            path="/"
<<<<<<< HEAD
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
=======
            render={() => (
              <WarehouseList
                warehouseListData={warehouseListData}
                setwarehouseListData={setwarehouseListData}
>>>>>>> develop
              />
            )}
          />
          <Route path="/warehouse/:warehouseID" component={WarehouseDetails} />
          <Route path="/inventory" component={""} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
