import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Import the new CSS here


function Sidebar() {
  return (
    <div className="admin-sidebar" data-background-color="dark">
      <div className="admin-sidebar-logo">
        {/* Logo Header */}
        <div className="admin-logo-header" data-background-color="dark">
          <Link to="/dashboard" className="admin-logo">
            <div className="admin-navbar-brand">
              <h1 style={{ color: "white" }}>Admin Page</h1>
            </div>
          </Link>
        </div>
        {/* End Logo Header */}
      </div>
  
      <div className="admin-sidebar-wrapper admin-scrollbar admin-scrollbar-inner">
        <div className="admin-sidebar-content">
          <ul className="admin-nav admin-nav-secondary">
            <li className="admin-nav-item admin-active">
              <Link to="/dashboard">
                <i className="fas fa-home"></i>
                <p>Dashboard</p>
              </Link>
            </li>
  
            <li className="admin-nav-item">
              <Link to="/admin/data">
                <p>Data</p>
              </Link>
            </li>
  
            <li className="admin-nav-item">
              <Link to="/banners">
                <p>Banner Image</p>
              </Link>
            </li>
  
            <li className="admin-nav-item">
              <Link to="/testimonial">
                <p>Testimonial</p>
              </Link>
            </li>
  
            <li className="admin-nav-item">
              <Link to="/adminService">
                <p>Services</p>
              </Link>
            </li>
  
            <li className="admin-nav-item">
              <Link to="/galleryImage">
                <p>Gallery Image</p>
              </Link>
            </li>
  
            <li className="admin-nav-item">
              <Link to="/adminContact">
                <p>Messages</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );  
}

export default Sidebar;
 