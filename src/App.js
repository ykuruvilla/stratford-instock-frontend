import "./App.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
// import Header from "./components/Header/Header";
// import Inventory from "./pages/Inventory/Inventory";
// import Warehouses from "./pages/Warehouses/Warehouses";
import { DeleteWarehouseModal } from "./components/DeleteWarehouseModal/DeleteWarehouseModal";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Switch>
          <Redirect exact from="/warehouses" to="/" />
          <Route path="/" component={DeleteWarehouseModal} />
          {/* <Route path="/" component={Warehouses} />
          <Route path="/inventory" component={Inventory} /> */}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
