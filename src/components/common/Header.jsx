import React, { useEffect, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaChevronDown, FaRegUser } from 'react-icons/fa';
import { HiOutlineCog } from 'react-icons/hi';
import { LuBarChart2 } from 'react-icons/lu';
import { PiSignOut } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import '../../assets/styles/header.css';
import { baseUrl } from '../../globals';
import useAuth from '../../hooks/UseAuth';
import { isLoggdIn } from '../../services/auth.service';
import CustomSelect from '../CustomSelect';
import SignupModal from '../SignupModal';

const Header = () => {
  const { logout } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = isLoggdIn();

  // For testing
  const handleLogout = () => {
    logout();
    navigate('/login');
  }
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCreateAccountClick = (selectedRole) => {
    if (selectedRole === 'researcher') {
      navigate('/sign-up/researcher');
    } else if (selectedRole === 'contributor') {
      navigate('/sign-up/contributor');
    } else if (selectedRole === 'user') {
      navigate('/sign-up/user');
    }
    closeModal();
  };

  const [isOpenSearchBox, setOpenSearchBox] = useState(false);
  const handelSearchBox = () => {
    console.log("Before state update:", isOpenSearchBox);
    setOpenSearchBox(!isOpenSearchBox);
    console.log("After state update:", isOpenSearchBox);
  }


  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <header>
      <div className='container'>
        <div className='header_wrapper'>
          <div className='logo'>
            <Link to='/'>
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className={`header_search ${isOpenSearchBox ? 'active_header_search' : ''}`}>
            <form action="#" method="post">
              <span className='header_search_icon'>
                <BiSearch />
              </span>
              <input
                type="text"
                name="search-text"
                placeholder="Project titles"
              />
              <div className="search_category custom-select">
                <CustomSelect />
              </div>
            </form>
          </div>
          <div className="header_buttons">
            <button className='dropdown-button res-search-btn' onClick={handelSearchBox}>
              <BiSearch />
            </button>
            {
              isLoggedIn ? <>
                <Link to='/user/dashboard' className='btn btn-dark'>
                  Dashboard
                </Link>
                <div className="user-dropdown" ref={dropdownRef}>
                  <img
                    src={`${baseUrl}assets/img/demo-user-3.png`}
                    alt="Avater"
                    className="profile-image"
                    onClick={toggleDropdown}
                  />
                  {isDropdownOpen && (
                    <div className="dropdown-content">
                      <div className="user_dropdown_menu">
                        <div className="user_dropdown_menu_itme">
                          <Link to='/user/dashboard' >
                            <span className='al_menu_icon'> <LuBarChart2 /></span>
                            <span>Dashboard</span>
                          </Link>
                          <Link to='/user/profile/update' >
                            <span className='al_menu_icon'> <FaRegUser /> </span>
                            <span>Profile</span>
                          </Link>
                          <Link to='/user/password/change' >
                            <span className='al_menu_icon'> <HiOutlineCog /> </span>

                            <span>Settings</span>
                          </Link>
                          <Link to='#' onClick={handleLogout}>
                            <span className='al_menu_icon'> <PiSignOut /> </span>
                            <span>Log Out</span>
                          </Link>
                        </div>

                        <div className="idicator_icondiv"></div>
                      </div>
                    </div>
                  )}
                </div>
              </>
                :
                <>
                  <Link to='/login' className='btn btn-dark'>
                    Login
                  </Link>
                  <div className="custom-dropdown">
                    <button className="dropdown-button" onClick={openModal}>
                      <FaRegUser />
                      <FaChevronDown />
                    </button>

                    <SignupModal open={modalOpen} onClose={closeModal} onSignUp={handleCreateAccountClick} />
                  </div>
                </>
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;