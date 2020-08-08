import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import BrandLogo from "../img/BrandLogo.png";
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from  '../actions/auth';
const Navbar = ({auth : {isAuthenticated , loading},logout}) => {
  //console.log(`loading-${loading} authenticated-${isAuthenticated}`);
    const authLinks =(
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/content">Content</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" onClick={logout} to="/">Logout</Link>
        </li>
    </ul>
    );
    const guestLinks =(
<ul className="navbar-nav ml-auto">
        <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/content">Content</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact Us</Link>
        </li>
    </ul>
    );
  return (
    <Fragment>
     <nav className="navbar navbar-expand-lg navbar-dark">
    <Link  className="navbar-brand" to="/"><img src={BrandLogo} alt="logo" className="logo"></img>Vidya Academy</Link>
     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
  {!loading &&(<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
 </div>
</nav>
    </Fragment>
  );
};

Navbar.propTypes ={
  logout : PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
};
const mapStateToProps = state =>({
  auth : state.auth
});
export default connect(mapStateToProps ,{logout})(Navbar);
