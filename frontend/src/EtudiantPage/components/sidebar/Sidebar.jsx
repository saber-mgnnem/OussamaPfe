import React from 'react';
import { Link } from 'react-router-dom';
import { FaCertificate,FaChartLine, FaUserCircle, FaUsers, FaPlusCircle, FaListAlt, FaGraduationCap, FaSignOutAlt } from 'react-icons/fa';
import logo from "../../../assets/logo.png"
import { useState,useEffect } from 'react';
const Sidebar = () => {
  const [useName, setUserName] = useState(null);

  // useEffect hook to run once when the component mounts
   // useEffect hook to run once when the component mounts
   useEffect(() => {
    // Retrieve data from local storage
    const storedData = localStorage.getItem('auth_USER');
    // Check if data exists in local storage
    if (storedData) {
      // Parse the data if it exists
      const parsedData = JSON.parse(storedData);
      // Update the state with the retrieved data
      const name =parsedData.fisrtname + " "+parsedData.lastname 
      setUserName(name);
    }
  }, []);
  return (
    <div>
    <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ maxHeight: '200vh', overflowY: 'auto' }}>
      <Link to="/eleve" className="brand-link" style={{ textDecoration: "none" }}>
        <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
        <span className="brand-text font-weight-light">{useName}</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex" >
          <ul > {/* Add paddingTop here */}
            <li className="nav-item" style={{display: 'flex', alignItems: 'center'}}>
              <Link to="/eleve/profile" className="nav-link" style={{display: 'flex', alignItems: 'center'}}>
                <FaUserCircle className="nav-icon" />
                <p style={{marginBottom: 9, marginLeft: 5}}>Profile </p>
              </Link>
            </li>
            <li className="nav-item" style={{display: 'flex', alignItems: 'center'}}>
              <Link to="/eleve/liste_formation" className="nav-link" style={{display: 'flex', alignItems: 'center'}}>
                <FaGraduationCap className="nav-icon" />
                <p style={{marginBottom: 9, marginLeft: 5}}>Liste de formation</p>
              </Link>
            </li>
            <li className="nav-item" style={{display: 'flex', alignItems: 'center'}}>
              <Link to="/eleve/votre_cours" className="nav-link" style={{display: 'flex', alignItems: 'center'}}>
                <FaCertificate className="nav-icon" />
                <p style={{marginBottom: 9, marginLeft: 5}}>Votre Cours</p>
              </Link>
            </li>
            <li className="nav-item" style={{display: 'flex', alignItems: 'center'}}>
              <Link to="/eleve/Certificate_liste" className="nav-link" style={{display: 'flex', alignItems: 'center'}}>
                <FaCertificate className="nav-icon" />
                <p style={{marginBottom: 9, marginLeft: 5}}>Votre Certificate</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  </div>
  


  );
};

export default Sidebar;
