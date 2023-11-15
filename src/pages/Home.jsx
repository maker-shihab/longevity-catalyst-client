import React from 'react';
import { Link } from 'react-router-dom';
import '../../src/assets/styles/home.css';
import ProjectFeed from '../components/ProjectFeed';
import TradingProjectSlider from '../components/TradingProjectSlider';
import TrustSlider from '../components/TrustSlider';
import ScrollToTop from '../utils/RouteChange';


const Home = () => {
  ScrollToTop();
  return (
    <>
      {/* ST:- Banner section */}
      <section className="full_width_banner_section section_padding">
        <div className="container">
          <div className="banner_wrapper">
            <h1>Longevity Catalyst: An Open Science Platform </h1>
            <p>
              Longevity Catalyst is an open science platform that connects
              researchers, engineers, mentors, and funders in the longevity field.
              It's designed to accelerate progress in extending human lifespan by
              fostering collaboration, knowledge sharing, and problem-solving.
            </p>
            <Link to='/' className="btn btn-dark btn-lg">
              Get Started
            </Link>
          </div>
        </div>
      </section>
      {/* ED: Banner section  */}
    
      {/* ST:- trust by area */}
      <section className="full_width_trust_by_section section_padding">
        <div className="container">
          <div className="trust_by_wrapper">
            <h6>Trusted by</h6>
            <TrustSlider />
          </div>
        </div>
      </section>
      {/* ED:- trust by area */}

      {/* ST:- Trading Project area */}
      <section className="full_width_trading_project_section section_padding">
        <div className="container">
          <div className="trading_project_wrapper">
            <h6>Trending Project</h6>
            {/* <div className="trading_project_box">
              {
                data.projectCards.map((item, index) => (
                  <div className="trading_project_single" key={index} style={{ background: `url(${baseUrl}${item.bg_img}) lightgray 50% / cover no-repeat` }} >
                    <h3>{item.title}</h3>
                    <p>
                      {
                        item.desc
                      }
                    </p>
                  </div>
                ))
              }
            </div> */}
            <TradingProjectSlider />
          </div>
        </div>
      </section>
      {/* ED:- trust by area */}

      {/* ST:- Project show area */}
      <section className="project_show_section home_project_show">
        <div className="container">
          <ProjectFeed />
        </div>
      </section>
      {/* ST:- Project show area */}
    </>
  );
};

export default Home;