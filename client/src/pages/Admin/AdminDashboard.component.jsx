/** @format */

import React, { useState, useEffect } from "react";
import SearchBar from "material-ui-search-bar";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom"
import "./AdminDashboard.styles.scss";
import Dropdown from "../../components/dropdown/Dropdown";
import axios from "axios";
import apiUrl from "../../apiUrl/api";

const backendUrl = apiUrl();
const doSomethingWith = (value) => {
  console.log(value);
};
const AdminDashboard = (isAdmin) => {
  const [value, setValue] = useState("");
  const [option, setOption] = useState(null);
  const [userData, setUserData] = useState([]);
  
  useEffect(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/admin/userdata");
      data && setUserData(data);
      
    } catch (error) {
      console.log(error);
    }
  }, [])
  
  if(!isAdmin.isAdmin){
    // return <Redirect to="/" />
  }

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dsahboard-header">
        <div className="admin-dashboard-heading">
          <h1>Admin Dash</h1>{" "}
          <div className="admin-dashboard-search">
            <SearchBar
              className="dashboard-search-bar"
              value={value}
              onChange={(newValue) => setValue({ value: newValue })}
              onRequestSearch={() => doSomethingWith(value)}
            />
          </div>
        </div>

        <div className="admin-dashboard-nav">
          <span
            onClick={() => setOption({ option: true })}
            className={
              option
                ? "admin-dashboard-navlist active"
                : "admin-dashboard-navlist"
            }>
            New Orders
          </span>
          <span
            onClick={() => setOption({ option: false })}
            className={
              option
                ? "admin-dashboard-navlist"
                : "admin-dashboard-navlist active"
            }>
            Orders
          </span>
        </div>
      </div>
      <div className="admin-dashboard-content">
        {userData &&
          userData.map((item, index) => (
            <Dropdown value={item} key={index} />
          ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAdmin : state.user.isAdmin
})

export default connect(mapStateToProps)(AdminDashboard);
