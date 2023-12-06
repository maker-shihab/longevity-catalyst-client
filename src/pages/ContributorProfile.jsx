import React, { useEffect, useState } from 'react';
import { CiLocationOn } from "react-icons/ci";
import { FaBell, FaWifi } from 'react-icons/fa';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';
import { HiDotsVertical } from 'react-icons/hi';
import { IoEyeOutline, IoHomeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { projectApi } from '../api';
import "../assets/styles/profileShow.css";
import TopFilterButtons from '../components/filter/TopFilterButtons';
import ProjectCard from '../components/project/ProjectCard';
import { avatersFor } from '../constants/avaters';
import { topFilterOptionsPage1 } from '../data/filterData';
import useAuth from '../hooks/UseAuth';
import ScrollToTop from '../utils/RouteChange';
const ContributorProfile = () => {
  useEffect(() => {
    document.title = "Contributor Profile - Longevity Catalyst";
  }, []);
  ScrollToTop();
  const { isLoggedIn, userInfo } = useAuth();
  const [selectedTopOption, setSelectedTopOption] = useState('latest');

  const handelSideBarButton = (e) => {
    e.preventDefault();
  }
  const handleTopOptionChange = (value) => {
    setSelectedTopOption(value);
  };

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLatestProjects = async () => {
      setIsLoading(true);
      try {
        const response = await projectApi.getAllProjectsByUsername(userInfo.username);
        const newProjects = response.data.data || [];
        setProjects((prevProjects) => [...prevProjects, ...newProjects]);
      } catch (error) {
        throw new Error("Error fetching projects", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLatestProjects();
  }, [userInfo.username]);
  const handleLoadMore = () => {
    alert("Processing... Project Filters, Search Terms, and Pagination!");
  };


  const avatarSrc = isLoggedIn ? (userInfo?.profileImage || avatersFor.user) : null;
  return (
    <section className="full_width_contributer_section">
      <div className="container">
        <div className="contributer_page_wrapper">

          <div className="project_side_ber_container">
            <div className="project_side_bar">
              <form method="post">

                <div className="side_bar_card">
                  <div className="profile_user_info">
                    <div className="image_block">
                      <img src={avatarSrc} alt="user" />
                    </div>
                    <div className="info_block">
                      <h3>{userInfo.full_name}</h3>
                      <div className="user_title">Programmer</div>
                      <span className="follow_st">
                        <Link to="/">5000 follower </Link> .
                        <Link to="/">200 following</Link>
                      </span>
                      <div className="profile_buttons">
                        <Link to="/" className="btn btn-dark no-shadow">
                          <FaBell />
                          Notify
                        </Link>
                        <Link to="/" className="btn btn-gray">
                          <FaWifi />
                          Follow
                        </Link>
                        <Link to="/" className="btn_more_bar">
                          <HiDotsVertical />
                        </Link>
                        {/* <button className="btn_more_bar" >
                          <HiDotsVertical />
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="side_bar_card">

                  <div className="side_bar_card_head">
                    <span className="head_title">Intro</span>
                    <Link to="/" className="btn btn-gray btn-sm">Edit</Link>
                  </div>

                  <div className="side_bar_card_body">
                    <p>
                      Software engineer, dad, husband, former video game
                      programmer, and member of The Church of Jesus Christ of
                      Latter-day Saints.
                    </p>
                    <span className="divider"></span>
                    <ul>
                      <li>
                        <div className="icon_box">
                          <CiLocationOn />
                        </div>
                        <p>
                          <span>Lives in</span>
                          <b>New York</b>
                        </p>
                      </li>
                      <li>
                        <div className="icon_box">
                          <IoHomeOutline />
                        </div>
                        <p>
                          <span>Lives in</span>
                          <b>Home state Brazil</b>
                        </p>
                      </li>
                      <li>
                        <div className="icon_box">
                          <IoEyeOutline />
                        </div>
                        <p>
                          <span>Content View</span>
                          <b>3.5M</b>
                        </p>
                      </li>
                      <li>
                        <div className="icon_box">
                          <FiBriefcase />
                        </div>
                        <p>
                          <span>Software Engineer</span>
                          <b>Present</b>
                        </p>
                      </li>
                      <li>
                        <div className="icon_box">
                          <FiCalendar />
                        </div>
                        <p>
                          <span>Joined</span>
                          <b>January 2010</b>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="side_bar_card">
                  <div className="input_box">
                    <h4>Skills : </h4>
                    <div className="input_box_keywords">
                      <p className='show_ct'>Python</p>
                      <p className='show_ct'>Machine learning</p>
                      <p className='show_ct'>Molecular modeling</p>
                      <p className='show_ct'>Cheminformatics</p>
                      <p className='show_ct'>Pharmacology</p>
                    </div>
                  </div>
                </div>

                <div className="side_bar_card">
                  <div className="input_box">
                    <h4>Protfolio :</h4>
                    <input
                      id="se-p"
                      type="text"
                      disabled
                      placeholder="https://www.protfolio.com"
                    />
                  </div>
                </div>

                <div className="side_bar_card">
                  <div className="input_box">
                    <h4>Certification :</h4>
                    <div className="side_sertification">
                      <img
                        src="https://www.figma.com/file/VYUcSJ76YkqAwXSoS8xErM/image/99ce3e4e72e3d5f19e407f5857afebd8e36a535c?fuid=1228801612906942585"
                        alt=""
                      />
                      <div className="sertification_info">
                        <div className="sertificaton_title">General Electric</div>
                        <span>Nov 2018</span>
                      </div>
                    </div>
                    <div className="side_sertification">
                      <img
                        src="https://www.figma.com/file/VYUcSJ76YkqAwXSoS8xErM/image/99ce3e4e72e3d5f19e407f5857afebd8e36a535c?fuid=1228801612906942585"
                        alt=""
                      />
                      <div className="sertification_info">
                        <div className="sertificaton_title">General Electric</div>
                        <span>Nov 2018</span>
                      </div>
                    </div>
                    <div className="side_sertification">
                      <img
                        src="https://www.figma.com/file/VYUcSJ76YkqAwXSoS8xErM/image/99ce3e4e72e3d5f19e407f5857afebd8e36a535c?fuid=1228801612906942585"
                        alt=""
                      />
                      <div className="sertification_info">
                        <div className="sertificaton_title">General Electric</div>
                        <span>Nov 2018</span>
                      </div>
                    </div>
                    <div className="side_sertification">
                      <img
                        src="https://www.figma.com/file/VYUcSJ76YkqAwXSoS8xErM/image/99ce3e4e72e3d5f19e407f5857afebd8e36a535c?fuid=1228801612906942585"
                        alt=""
                      />
                      <div className="sertification_info">
                        <div className="sertificaton_title">General Electric</div>
                        <span>Nov 2018</span>
                      </div>
                    </div>
                    <div className="side_sertification">
                      <img
                        src="https://www.figma.com/file/VYUcSJ76YkqAwXSoS8xErM/image/99ce3e4e72e3d5f19e407f5857afebd8e36a535c?fuid=1228801612906942585"
                        alt=""
                      />
                      <div className="sertification_info">
                        <div className="sertificaton_title">General Electric</div>
                        <span>Nov 2018</span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="project_show_container">

            <TopFilterButtons options={topFilterOptionsPage1}
              selectedOption={selectedTopOption}
              onOptionChange={handleTopOptionChange}
              handelSideBarButton={handelSideBarButton}
            />

            <div className="project_show_cash">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <button onClick={handleLoadMore} className='btn btn-dark' disabled={isLoading}>
                  Load More
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default ContributorProfile;