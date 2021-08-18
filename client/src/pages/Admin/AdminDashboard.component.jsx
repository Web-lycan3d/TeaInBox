/** @format */

import React, { Component } from "react";
import SearchBar from "material-ui-search-bar";
import "./AdminDashboard.styles.scss";
import Dropdown from "../../components/dropdown/Dropdown";
import axios from "axios";
import apiUrl from "../../apiUrl/api";

const backendUrl = apiUrl();
const doSomethingWith = (value) => {
  console.log(value);
};
class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      option: null,
      userData: [],
    };
  }
  async componentDidMount() {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/admin/userdata");
      data && this.setState({ userData: data });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div className="admin-dashboard-container">
        <div className="admin-dsahboard-header">
          <div className="admin-dashboard-heading">
            <h1>Admin Dashboard</h1>{" "}
            <div className="admin-dashboard-search">
              <SearchBar
                className="dashboard-search-bar"
                value={this.state.value}
                onChange={(newValue) => this.setState({ value: newValue })}
                onRequestSearch={() => doSomethingWith(this.state.value)}
              />
            </div>
          </div>

          <div className="admin-dashboard-nav">
            <span
              onClick={() => this.setState({ option: true })}
              className={
                this.state.option
                  ? "admin-dashboard-navlist active"
                  : "admin-dashboard-navlist"
              }>
              New Orders
            </span>
            <span
              onClick={() => this.setState({ option: false })}
              className={
                this.state.option
                  ? "admin-dashboard-navlist"
                  : "admin-dashboard-navlist active"
              }>
              Orders
            </span>
          </div>
        </div>
        <div className="admin-dashboard-content">
          {this.state.userData &&
            this.state.userData.map((item, index) => (
              <Dropdown value={item} key={index} />
            ))}
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
