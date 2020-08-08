import React, { Fragment, useState } from "react";
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../actions/auth';
const Admin = ({login,isAuthenticated}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;
  const onChange = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const onSubmit = async(e) => {
    e.preventDefault();
     login(username, password);
  };

  if(isAuthenticated){
    return<Redirect to="/content"/>
  }
  return (
    <Fragment>
      <div className="fill">
      <div className="wrapper fadeInDown ">
        <div id="formContent" onSubmit={onSubmit}>
          <form>
            <input
              type="text"
              id="login"
              className="fadeIn second"
              name="username"
              placeholder="Username"
              value={username}
              onChange={onChange}
            />
            <input
              type="password"
              id="password"
              className="fadeIn third"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
            <input type="submit" className="fadeIn fourth" value="Admin" />
          </form>
        </div>
      </div>
      </div>
    </Fragment>
  );
};
Admin.propTypes ={
  login : PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}
const mapStateToProps = state =>({
  isAuthenticated : state.auth.isAuthenticated
})
export default connect(mapStateToProps,{login})(Admin);
