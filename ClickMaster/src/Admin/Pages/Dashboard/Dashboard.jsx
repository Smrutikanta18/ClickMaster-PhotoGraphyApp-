import React from "react";
import Sidebar from "../../Component/Sidebar/Sidebar";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-content">
        <div className="dashboard-container">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="cards-container">
            <div className="card yellow">PROFILE</div>
            <div className="card yellow">DATA</div>
            <div className="card blue">BANNERIMAGE</div>
            <div className="card blue">GALLERYIMAGE</div>
            <div className="card green">SERVICES</div>
            <div className="card green">PROJECTS</div>
            <div className="card pink">QUOTE</div>
            <div className="card pink">CONTACT</div>
          </div>
        </div>  
      </div>
    </div>
  );
}

export default Dashboard;