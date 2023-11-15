import React, { useState } from 'react';
import { LuBarChart2, LuLock, LuUsers } from 'react-icons/lu';
import { PiSignOut } from 'react-icons/pi';
import { RxLayers } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import '../../assets/styles/dashboardMenu.css';
import { baseUrl } from '../../globals';
import useAuth from '../../hooks/UseAuth';
import RanderNav from './RanderNav';

const DashboardMenu = ({isActiveMenu}) => {
    const {setAuth} = useAuth();
    const LogOuthandel = (event) => {
        event.preventDefault();
       setAuth({});
      
    }


    // Your menu data (you can replace this with your actual data)
    const menuData = [
        {
            id: 1,
            title: 'Dashboard',
            icon: <LuBarChart2 />,
            route: '/user/dashboard'
        },
        {
            id: 2,
            title: 'Projects',
            icon: <RxLayers />,
            submenu: [
                {
                    id: 2.1,
                    title: 'All Project',
                    route: '/user/project/all',
                },
                {
                    id: 2.2,
                    title: 'Add Project',
                    route: '/user/project/add',
                },
            ],
        },
        {
            id: 3,
            title: 'Profile',
            icon: <LuUsers />,
            route: '/user/profile/update'
        },
        {
            id: 4,
            title: 'Change Password',
            icon: <LuLock />,
            route: '/user/password/change'
        },
        {
            id: 5,
            title: 'Logout',
            icon: <PiSignOut />,
            route: '/login',
            clickHandel: LogOuthandel,
        }
    ];



    // Initialize isOpenState with an array of the same length as menuData
    const [isOpenState, setIsOpenState] = useState(new Array(menuData.length).fill(false));

    // Function to toggle the menu item's open/close state
    const toggleDropdown = (itemId) => {
        setIsOpenState((prevState) => ({
            ...prevState,
            [itemId]: !prevState[itemId],
        }));
    };





    return (
        <div className={`dashboard_menu ${ isActiveMenu ? 'activemenu' : ''} `}>
            {/* <!-- Menu Profile --> */}
            <div className="dashboard_menu_profile">
                <div className="profile_img">
                    <img src={`${baseUrl}assets/img/demo-user-3.png`} alt="profile_img" />
                </div>
                <div className="profile_text">
                    <Link to='/user/username'> Annette Black </Link>
                    <p>debra.holt@example.com</p>
                </div>
            </div>
            {/* <!-- Navigation --> */}
            <div className="dashboard_nav">
                <ul>

                    {menuData.map(item => (
                        <RanderNav
                            key={item.id}
                            item={item}
                            isOpenState={isOpenState} // Pass isOpenState to RanderNav
                            setIsOpenState={setIsOpenState} // Pass setIsOpenState to RanderNav
                            toggleDropdown={() => toggleDropdown(item.id)}
                        />
                    ))}





                </ul>
            </div>
        </div>
    );
};

export default DashboardMenu;