import React, { useEffect, useState } from 'react';
import { IoArrowForwardSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { projectApi } from '../../api';

const MegaMenu = ({ isOpen, filters }) => {
    const [projects, setProjects] = useState([]);
    const [seaching, setSeaching] = useState(false);

    useEffect(() => {
        // Simulating fetching projects from an API
        const fetchProjects = async () => {
            setSeaching(true);
            try {
                // setIsLoading(true);
                const paginationOptions = {
                    page: 1,
                    limit: 3,
                };
                const response = await projectApi.getAllProjects(filters, paginationOptions);
                setProjects(response.data.data);
                // console.log(response);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setSeaching(false);
            }
        };

        if (isOpen) {
            fetchProjects();
        }

    }, [filters, isOpen]);




    return (
        <div className='meghamenu_header'>
            {seaching ? (
                <p style={{ padding: '10px' }}>Searching projects...</p>
            ) : (
                projects.length > 0 ? (
                    <ul>
                        {projects.map((project) => (
                            <li key={project.id}>
                                <Link to={`/project/${project.id}`} >
                                    <span className='item_info_head'>
                                        <p className='item_title'>{project?.project_name} Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque pariatur veniam cupiditate corrupti tempora ea numquam accusamus, quia quam modi dicta rem, explicabo voluptatibus blanditiis ducimus commodi placeat! Eos, unde? </p>
                                        <IoArrowForwardSharp className='item_arrow' />
                                    </span>
                                    <p className='item_description'>{project?.project_desc}</p>

                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: '#dc7123', padding: '10px' }}>No projects found.</p>
                )
            )
            }


        </div>
    );
};

export default MegaMenu;
