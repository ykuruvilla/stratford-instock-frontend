import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Inventory from "./pages/Inventory/Inventory";
import Warehouses from "./pages/Warehouses/Warehouses";
import { DeleteWarehouseModal } from "./components/DeleteWarehouseModal/DeleteWarehouseModal";
import WarehouseList from "./components/WarehouseList/WarehouseList";
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [warehouseListData, setwarehouseListData] = useState([]);

  const populateState = async () => {
    try {
      const result = await axios.get("http://localhost:8080/warehouse");

      setwarehouseListData(result.data);
    } catch (error) {
      window.alert(error.message);
    }
  };

  useEffect(() => {
    // initial mount (review later if condition is needed)
    // if (warehouseListData.length < 1) {
    //   populateState();
    // }
    populateState();
  });

  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          {/* <Redirect exact from="/warehouses" to="/" /> */}
          <Route
            path="/"
            render={() => (
              <WarehouseList warehouseListData={warehouseListData} />
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
