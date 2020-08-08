import React, { Fragment } from "react";
import Vijay from "../img/VijayWadhwani.jpg";
import Youtube from "./Youtube";
const Home = () => {
   
    return (
    <Fragment>
      <section id="mission" className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-xs-12">
            <h1 className="center fadeInDown" >Our Mission and Vision:-</h1>
            <ul>
              <li className="fadeIn second">To provide skill based learning to everyone</li>
              <p className="fadeIn second">
                We provide help with lot of different fields including but not
                limited to Spoken English, Nursing , G.K., Maths.
              </p>
              <li className="fadeIn third">
                To make learning accessible and understandable by everyone{" "}
              </li>
              <p className="fadeIn third">
                We provide vast varieties of video on various topics that are
                free and are available in Hindi for a better understanding of
                the topic{" "}
              </p>
            </ul>
          </div>
          <div className="col-lg-6 col-xs-12">
              <h2 className="center">Our Latest Video</h2>
              <Youtube></Youtube> 
          </div>
        </div>
      </section>
      <section id="educators" className="container-fluid">
        <h1 className="center">Our Educators</h1>
        <div className="row center">
          <img
            src={Vijay}
            className="edu-img"
            alt="Vijay Wadhwani"
            description="Vijay Wadhwani"
          ></img>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
