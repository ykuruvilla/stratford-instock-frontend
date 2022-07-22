import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
// import Inventory from "./pages/Inventory/Inventory";
// import Warehouses from "./pages/Warehouses/Warehouses";
import WarehouseList from "./components/WarehouseList/WarehouseList";
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
  }, [warehouseListData]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Redirect exact from="/warehouses" to="/" />
          <Route
            path="/"
            render={() => (
              <WarehouseList
                warehouseListData={warehouseListData}
                getWarehouseData={getWarehouseData}
              />
            )}
          />
          <Route path="/warehouse/:warehouseID" component={WarehouseDetails} />
          <Route path="/inventory" component={""} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
