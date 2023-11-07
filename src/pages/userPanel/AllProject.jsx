<<<<<<< HEAD
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> main
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import '../../assets/styles/dashboard.css';
import DashboardMenu from '../../components/userPanel/DashboardMenu';
import ScrollToTop from '../../utils/RouteChange';

const AllProject = () => {
    ScrollToTop();
<<<<<<< HEAD
    const navigate = useNavigate();
    const [getAuthF, setAuthF] = useState(checkAuth());

    useEffect(() => {
        if (!getAuthF) {
            navigate('/login');
        }
    }, [navigate, getAuthF]);
=======
>>>>>>> main

    const [isActiveMenu, setIsActiveMenu] = useState(false);

    const handelDashMenu = () => {
        setIsActiveMenu(!isActiveMenu);
    }



    return (
        <section className="full_widht_auth_section">
            <div className="container">
                <div className="dashboard">
                    <DashboardMenu isActiveMenu={isActiveMenu} />
                    <div className="dashboard_add_project">
                        {/* <!-- Add Project head --> */}
                        <div className="add_project_head">
                            <button className='dasMenuBtn' onClick={handelDashMenu}>
                                <AiOutlineMenuUnfold />
                            </button>
                            <h3 className="title">All Projects</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllProject;