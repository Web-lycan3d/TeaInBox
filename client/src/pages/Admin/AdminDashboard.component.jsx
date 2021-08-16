import React, {Component } from 'react'
import SearchBar from "material-ui-search-bar";
import './AdminDashboard.styles.scss'



const doSomethingWith = value => {
    console.log(value)
}
class AdminDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            option: null,
        }
    }

    render() {
        return (
            <div className="admin-dashboard-container">
                <div className="admin-dsahboard-header">
                    <div className="admin-dashboard-heading">
                        <h1>Admin Dashboard</h1>
                    </div>
                    <div className="admin-dashboard-search">
                        <SearchBar
                            value={this.state.value}
                            onChange={(newValue) => this.setState({ value: newValue })}
                            onRequestSearch={() => doSomethingWith(this.state.value)}
                        />
                    </div>
                    <div className="admin-dashboard-nav">
                        <span onClick={() => this.setState({ option: true })} className={this.state.option ? "admin-dashboard-navlist active" : "admin-dashboard-navlist"}>Users</span>
                        <span onClick={() => this.setState({ option: false })} className={this.state.option ? "admin-dashboard-navlist" : "admin-dashboard-navlist active"}>Orders</span>
                    </div>
                </div>
                <div className="admin-dashboard-content">
                    {this.state.option ? (<h1>Users</h1>) : (<h1>Orders</h1>)}
                </div>
            </div>
        )
    }
}

export default AdminDashboard
