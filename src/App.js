import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Inventory from "./pages/Inventory/Inventory";
import Warehouses from "./pages/Warehouses/Warehouses";
import WarehouseList from "./components/WarehouseList/WarehouseList";
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Redirect exact from="/warehouse" to="/" />
          <Route path="/" component={WarehouseList} />
          <Route path="/warehouse/:warehouseID" component={WarehouseDetails} />
          <Route path="/inventory" component={""} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
