import React, { useEffect, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaChevronDown, FaRegUser } from 'react-icons/fa';
import { HiOutlineCog } from 'react-icons/hi';
import { LuBarChart2 } from 'react-icons/lu';
import { PiSignOut } from 'react-icons/pi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import '../../assets/styles/header.css';
import { avatersFor } from '../../constants/avaters';
import useAuth from '../../hooks/UseAuth';
import useLoading from '../../hooks/useLoading';
import HeaderSearch from '../ui/HeaderSearch';
import SignupModal from '../ui/SignupModal';
import ImageTagWithFallback from './ImageTagWithFallback';

const Header = () => {
  // For Auth
  const { handleLogout, isLoggedIn, userInfo } = useAuth();
  const { setIsLoading } = useLoading();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutButton = () => {
    handleLogout();
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
    setOpenSearchBox(!isOpenSearchBox);
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
      // outsite click of search button
      const headerSearchElement = document.querySelector('.header_search');
      const isSearchButton = event.target.classList.contains('res-search-btn');
      const isChildOfButton = event.target.closest('.res-search-btn');
      if (
        headerSearchElement &&
        !headerSearchElement.contains(event.target) &&
        !event.target.classList.contains('header_search') &&
        !(isSearchButton || isChildOfButton)
      ) {
        setOpenSearchBox(false);
      }
      // -- 
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const location = useLocation();

  const getLinkText = () => {
    if (location.pathname.startsWith('/dashboard/')) {
      return 'Home';
    } else {
      return 'Dashboard';
    }
  };
  
  useEffect(() => {
    closeDropdown();
  }, [location.pathname]);

  useEffect(() => {
    if (isLoggedIn && !userInfo) {
        setIsLoading(true);
    } else {
        setIsLoading(false);
    }
}, [isLoggedIn, setIsLoading, userInfo]);

  const avatarSrc = isLoggedIn ? (userInfo?.profileImage || avatersFor.user) : null;

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
            <HeaderSearch />
          </div>

          <div className="header_buttons">
            <button className='dropdown-button res-search-btn' onClick={handelSearchBox}>
              <BiSearch />
            </button>
            {
              isLoggedIn ? <>
                <Link to={location.pathname.startsWith('/dashboard/') ? '/' : '/dashboard/home'} className='btn btn-dark'>
                  {getLinkText()}
                </Link>
                <div className="user-dropdown" ref={dropdownRef}>

                  <button className="profile-image" onClick={toggleDropdown}>
                    <ImageTagWithFallback src={avatarSrc} fallbackSrc={avatersFor.user} alt={userInfo?.username} />

                  </button>

                  {isDropdownOpen && (
                    <div className="dropdown-content">
                      <div className="user_dropdown_menu">
                        <div className="user_dropdown_menu_itme">
                          <Link to='/dashboard/home' >
                            <span className='al_menu_icon'> <LuBarChart2 /></span>
                            <span>Dashboard</span>
                          </Link>
                          <Link to={`/${userInfo?.username}`}>
                            <span className='al_menu_icon'> <FaRegUser /> </span>
                            <span>Profile</span>
                          </Link>
                          <Link to='/dashboard/password/change' >
                            <span className='al_menu_icon'> <HiOutlineCog /> </span>

                            <span>Settings</span>
                          </Link>
                          <Link to='/login' onClick={handleLogoutButton}>
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