import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import AddContent from './AddContent';
const Content = () => {
  const [subject, setSubject] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  useEffect(() => {
    const getSubjects = async () => {
      const res = await axios.get("/api/content/subject");
      setSubjectList(res.data);
    };
    const getTopics = async (subject) => {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      try {
        const res = await axios.get(`/api/content/topic/${subject}`, config);
        setTopicList(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    getSubjects();
    if (subject&&subject!=="* Select Subject") {
      getTopics(subject);
    }
    if(subject==="* Select Subject")
    setSubject("");
  }, [subject]);

  const [topicList, setTopicList] = useState([]);
  const [topic, setTopic] = useState("");
  const [contentList, setContentList] = useState([]);
  const onChangeS = async (e) => {
    setSubject(e.target.value);
  };
  const onChangeT = (e) => {
    setTopic(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(`/api/content/subject/${subject}/topic/${topic}`, config);
    setContentList(res.data);
    
  };
  

  const addComponent = (
    <div className="container-fluid content-table table-responsive">
      <table className="table table-striped table-primary table-bordered fadeInDown">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Link</th>
          </tr>
        </thead>
        <tbody>
        {contentList.map((item,index)=>
          (<tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.type}</td>
            <td><a href={item.link}>Click here</a></td> 
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <Fragment>
      <div className="fill">
      <AddContent></AddContent>
      <div className="jumbotron container-fluid wrap-form">
        <h1 className="center form-head">Select your Choices to see Content</h1>
        <form className="form center" onSubmit={onSubmit}>
          <div className="form-row">
            <div className="col">
              <select
                className="form-control"
                name="subject"
                value={subject}
                onChange={onChangeS}
              >
                <option value={null}>* Select Subject</option>
                {{ subject } &&
                  subjectList.map((subject, index) => (
                    <option key={index} value={subject}>{subject}</option>
                  ))}
              </select>
            </div>
            <div className="col">
              <select
                className="form-control"
                name="topic"
                value={topic}
                onChange={onChangeT}
              >
                <option>* Select Topic</option>
                {{ topic } &&
                  topicList.map((subject, index) => (
                    <option key={index} value={subject}>{subject}</option>
                  ))}
              </select>
            </div>
          </div>
          <input type="submit" className="btn btn-primary " />
        </form>
      </div>
      <div className="wrap-Table container-fluid">
     {contentList.length>0&&addComponent}
     </div>
    </div>
    </Fragment>
  );
};

export default Content;
