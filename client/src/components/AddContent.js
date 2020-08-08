import React, { Fragment ,useState} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import {setAlert} from "../actions/alert";
const AddContent = ({ isAuthenticated ,setAlert }) => {
  const initialState = {
    subject: "",
    topic: "",
    name: "",
    type: "",
    link: "",
  };
  const [formData, setFormData] = useState(initialState);
  const {subject , topic , name , type , link} = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formData);
    try {
 await axios.post("/api/content", body, config);
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => setAlert(error.msg, "danger"));
      }
    }
  };
  const addForm =(<div className = "wrap-form container-fluid jumbotron">
      <h1 className="center form-head">Fill this form to submit Content</h1>
  <form className="form center" onSubmit={onSubmit}>
      <div className= "form-row">
    <input
      type="text"
      className="form-control col add-form"
      name="subject"
      placeholder="Enter Subject"
      value={subject}
      onChange={onChange}
    ></input>
    <input
      type="text"
      className="form-control col add-form"
      placeholder="Enter Topic"
      name="topic"
      value={topic}
      onChange={onChange}
    ></input>
    </div>
    <div className= "form-row">
    <input
      type="text"
      className="form-control add-form col"
      name="name"
      placeholder="Enter Name"
      value={name}
      onChange={onChange}
    ></input>
    </div>
    <div className="form-row ">
    <input
      type="text"
      className="form-control add-form col"
      name="type"
      placeholder="Enter Type"
      value={type}
      onChange={onChange}
    ></input>
    <input
      type="text"
      className="form-control col add-form"
      name="link"
      placeholder="Enter Link"
      value={link}
      onChange={onChange}
    ></input>
    </div>
    <input type="submit" className="btn btn-primary"></input>
  </form>
</div>);
  return (
  <Fragment>{isAuthenticated&&(addForm)}</Fragment>
    );
};

AddContent.propTypes = {
  isAuthenticated: PropTypes.bool,
  setAlert :PropTypes.func,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps,{setAlert})(AddContent);
