import axios from "axios";
import React, { Component } from "react";
import WarehouseListItem from "../WarehouseListItem/WarehouseListItem";
import "./WarehouseList.scss";

export default class WarehouseList extends Component {
  state = { warehouseList: [] };

  populateState = async () => {
    try {
      const result = await axios.get("http://localhost:5050/warehouse");

      this.setState({ warehouseList: result.data });
    } catch (error) {
      window.alert(error.message);
    }
  };

  componentDidMount() {
    this.populateState();
  }

  render() {
    if (!this.state.warehouseList) {
      return <h1>Page loading...</h1>;
    }
    return (
      <section className="warehouse__list-container">
        {this.state.warehouseList.map((warehouse) => {
          return (
            <WarehouseListItem warehouseInfo={warehouse} key={warehouse.id} />
          );
        })}
      </section>
    );
  }
}
