import React, { useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { projectApi } from '../../api';
import DatePickerInput from '../../components/DatePickerInput';
import ListInput from '../../components/common/ListInput';
import RadioButton from '../../components/common/RadioButton';
import DashboardMenu from '../../components/userPanel/DashboardMenu';
import ScrollToTop from '../../utils/RouteChange';

const AddProject = () => {
    ScrollToTop();

    const onsiteOption = [
        {
            key: 'onsite-1',
            value: 'on',
            label: 'on',
            inputName: 'onsite_work',
        },
        {
            key: 'onsite-2',
            value: 'off',
            label: 'off',
            inputName: 'onsite_work',
            checked: true
        }
    ];
    const ProjectHardDeadlineOption = [
        {
            key: 'hardDeadline-1',
            value: 'on',
            label: 'on',
            inputName: 'hardDeadline',
        },
        {
            key: 'hardDeadline-2',
            value: 'off',
            label: 'off',
            inputName: 'hardDeadline',

        }
    ];
    const projectTypeOption = [
        {
            key: 'projectType-1',
            value: 'Individual',
            label: 'Individual',
            inputName: 'projecType',
        },
        {
            key: 'projectType-2',
            value: 'Team',
            label: 'Team',
            inputName: 'projecType',
        },
        {
            key: 'projectType-3',
            value: 'Other',
            label: 'Other',
            inputName: 'projecType',
        }
    ];
    const projectNatureOption = [
        {
            key: 'projectNature-1',
            value: 'General Programming',
            label: 'General Programming',
            inputName: 'projectNature',
        },
        {
            key: 'projectNature-2',
            value: 'Data Analysis',
            label: 'Data Analysis',
            inputName: 'projectNature',
        },
        {
            key: 'projectNature-3',
            value: 'Wet Lab',
            label: 'Wet Lab',
            inputName: 'projectNature',
        },
        {
            key: 'projectNature-4',
            value: 'Other',
            label: 'Other',
            inputName: 'projectNature',
            checked: true
        }
    ];

    const projectExperienceOption = [
        {
            key: 'projectExperience-1',
            value: 'Novice',
            label: 'Novice',
            inputName: 'projectExperience',
        },
        {
            key: 'projectExperience-2',
            value: 'Intermediate',
            label: 'Intermediate',
            inputName: 'projectExperience',
        },
        {
            key: 'projectExperience-3',
            value: 'Proficient',
            label: 'Proficient',
            inputName: 'projectExperience',
        },
        {
            key: 'projectExperience-4',
            value: 'Advanced',
            label: 'Advanced',
            inputName: 'projectExperience',
        },
        {
            key: 'projectExperience-5',
            value: 'Expert',
            label: 'Expert',
            inputName: 'projectExperience',
        }
    ];

    const expectedTimeProjectOption = [
        {
            key: 'expectedTimeProject-1',
            value: 'Less than 1 week',
            label: 'Less than 1 week',
            inputName: 'expectedTimeProject',
        },
        {
            key: 'expectedTimeProject-2',
            value: 'Less than 1 month',
            label: 'Less than 1 month',
            inputName: 'expectedTimeProject',
            checked: true
        },
        {
            key: 'expectedTimeProject-3',
            value: 'Less than 3 months',
            label: 'Less than 3 months',
            inputName: 'expectedTimeProject',
        },
        {
            key: 'expectedTimeProject-4',
            value: 'Greater than 3 months',
            label: 'Greater than 3 months',
            inputName: 'expectedTimeProject',
        },
        {
            key: 'expectedTimeProject-5',
            value: 'Other',
            label: 'Other',
            inputName: 'expectedTimeProject',
        }
    ];

    const haveProjectBudgetOption = [
        {
            key: 'haveProjectBudget-1',
            value: 'I have a budget',
            label: 'I have a budget',
            inputName: 'haveProjectBudget',
        },
        {
            key: 'haveProjectBudget-2',
            value: 'I will require a volunteer / sponsorship',
            label: 'I will require a volunteer sponsorship',
            inputName: 'haveProjectBudget',
        }
    ];


    const readyToStartOption = [
        {
            key: 'readyToStart-1',
            value: 'Immediately',
            label: 'Immediately',
            inputName: 'readyToStart',
            checked: true
        },
        {
            key: 'readyToStart-2',
            value: 'Within 1 week',
            label: 'Within 1 week',
            inputName: 'readyToStart',
        },
        {
            key: 'readyToStart-3',
            value: 'Within 2 week',
            label: 'Within 2 week',
            inputName: 'readyToStart',
        },
        {
            key: 'readyToStart-4',
            value: 'Other',
            label: 'Other',
            inputName: 'readyToStart',
        }

    ];
 




    const mes = {};
    const [errorMsg, setErrorMsg] = useState(mes);
    const formRef = useRef(null);




    useEffect(() => {
        if (Object.keys(errorMsg).length !== 0) {
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }

    }, [errorMsg]);

    const [isActiveMenu, setIsActiveMenu] = useState(false);

    const handelDashMenu = () => {
        setIsActiveMenu(!isActiveMenu);
    }

    const [isLoading, setIsLoading] = useState(false);

    const handleLoadingState = () => {
        const body = document.querySelector('body');
        if (isLoading) {
            body.classList.add('loading_BG');
            // Add your custom code here for the loading state
        } else {
            body.classList.remove('loading_BG');
            // Add your custom code here for when loading is finished
        }
    };


    useEffect(() => {
        handleLoadingState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);


    const [project_keywords, set_project_keywords] = useState({});


    const handelProjectSubmit = async (event) => {
        event.preventDefault();
        setErrorMsg({});
        const formData = new FormData(event.target);
        const formDataObject = {};
        console.log(project_keywords.lists);
        if(project_keywords.lists.length !== 0){
            formData.append('project_keywords', JSON.stringify(project_keywords.lists));
        }
        console.log(formData);

        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        console.log(formDataObject);
        // validation 
        let isValid = true;
        if (formDataObject.project_name.length === 0) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                project_name: 'Project Name is Required',
            }));
            isValid = false;
        }
        if (formDataObject.user_name.length === 0) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                user_name: 'User Name is Required',
            }));
            isValid = false;
        }
        if (formDataObject.user_email.length === 0) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                user_email: 'User Email is Required',
            }));
            isValid = false;
        }
        if (formDataObject.affiliation.length === 0) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                affiliation: 'Affiliation is Required',
            }));
            isValid = false;
        }
        if (formDataObject.project_desc.length < 40) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                project_desc: 'Enter at least 40 characters',
            }));
            isValid = false;
        }
        if (!('project_keywords' in formDataObject)) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                project_keywords: 'Project Keywords is Required',
            }));
            console.log('get errror');
            isValid = false;
        }
        if (!('projecType' in formDataObject)) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                projecType: 'Project Type is Required',
            }));
            isValid = false;
        }
        if (!('projectExperience' in formDataObject)) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                projectExperience: 'Project Experience is Required',
            }));
            isValid = false;
        }
        if (!('hardDeadline' in formDataObject)) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                hardDeadline: 'Project hard deadline is Required',
            }));
            isValid = false;
        }





        if (isValid) {
            try {
                setIsLoading(true);
                const promise = projectApi.createProject(formDataObject);
                await toast.promise(promise, {
                    loading: 'Submiting Project...', // Display a loading message
                    success: (response) => {
                        if (response.data.success) {
                            event.target.reset();
                            setIsLoading(false);
                            return 'Project Successfully Submitted !';
                        } else {
                            return 'Unexpected error occurred';
                        }
                    },
                    error: (error) => {
                        if (error.response) {
                            if (error.response.status === 409) {
                                const resMsg = error.response.data.message.replace('Error: ', '');
                                const [field, msg] = resMsg.split('.');
                                setErrorMsg(prevErrorMsg => ({
                                    ...prevErrorMsg,
                                    [field]: msg,
                                }));
                                return `Submiting Project failed: ${msg}`;
                            } else {
                                console.error('Request failed with status code', error.response.status);
                                return 'Request failed';
                            }
                        } else {
                            console.error('Error', error.message);
                            return `Error: ${error.message}`;
                        }
                    },
                    style: {
                        duration: 6000,
                        position: 'top-right', // Set the position to top-right
                    },
                });
                // console.log(responseApi);
            } catch (error) {
                // console.error('Error', error);
                console.log('');
            } finally {
                setIsLoading(false); // Set loading back to false after the form submission
            }
            // console.log(formDataObject);
        }




    }

    return (
        <section className="full_widht_auth_section">
            <div className="container">
                <div className="dashboard">
                    {/* <!-- Dashboard Menu --> */}
                    <DashboardMenu isActiveMenu={isActiveMenu} />
                    {/* <!-- Add Project --> */}
                    <div className="dashboard_add_project">
                        {/* <!-- Add Project head --> */}
                        <div className="add_project_head">
                            <button className='dasMenuBtn' onClick={handelDashMenu}>
                                <AiOutlineMenuUnfold />
                            </button>
                            <h3 className="title">Add Project</h3>
                        </div>
                        <form onSubmit={handelProjectSubmit} ref={formRef} className="add_project_form">
                            <div className="two_columns">
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label htmlFor="project_name">
                                        What is the name of your project?<span>*</span>
                                    </label>
                                    <input
                                        className={errorMsg.project_name ? 'border-warring' : ''}
                                        type="text"
                                        name="project_name"
                                        id="project_name"
                                        placeholder="Project Name"
                                    />
                                    {errorMsg.project_name && <div className='error-msg'>{errorMsg.project_name}</div>}
                                </div>
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label htmlFor="user_name"> What is your name?<span>*</span> </label>
                                    <input className={errorMsg.user_name ? 'border-warring' : ''} type="text" name="user_name" id="user_name" placeholder="Name" />
                                    {errorMsg.user_name && <div className='error-msg'>{errorMsg.user_name}</div>}
                                </div>
                            </div>
                            <div className="two_columns">
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label htmlFor="user_email"> What is your email?<span>*</span> </label>
                                    <input
                                        className={errorMsg.user_email ? 'border-warring' : ''}
                                        type="email"
                                        name="user_email"
                                        id="user_email"
                                        placeholder="Email"
                                    />
                                    {errorMsg.user_email && <div className='error-msg'>{errorMsg.user_email}</div>}
                                </div>
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label htmlFor="affiliation">
                                        What is your affiliation?<span>*</span>
                                    </label>
                                    <input
                                        className={errorMsg.affiliation ? 'border-warring' : ''}
                                        type="text"
                                        name="affiliation"
                                        id="affiliation"
                                        placeholder="Affiliation"
                                    />
                                    {errorMsg.affiliation && <div className='error-msg'>{errorMsg.affiliation}</div>}
                                </div>
                            </div>
                            {/* <!-- Single Input --> */}
                            <div className="form_control">
                                <label htmlFor="project_desc">
                                    Provide a brief description of your project.<span>*</span>
                                </label>
                                <textarea
                                    className={errorMsg.project_desc ? 'border-warring' : ''}
                                    name="project_desc"
                                    id="project_desc"
                                    rows="2"
                                    placeholder="Description"
                                ></textarea>
                                {errorMsg.project_desc && <div className='error-msg'>{errorMsg.project_desc}</div>}
                            </div>
                            <div className="two_columns">
                                {/* <!-- Single Input --> */}
                                {/* <div className="form_control">
                                    <label htmlFor="project_keywords">
                                        Provide up to (5) keywords engineers can use to find your
                                        project.<span>*</span>
                                    </label>
                                    <input
                                        className={errorMsg.project_keywords ? 'border-warring' : ''}
                                        type="text"
                                        name="project_keywords"
                                        id="project_keywords"
                                        placeholder="keywords"
                                    />
                                    {errorMsg.project_keywords && <div className='error-msg'>{errorMsg.project_keywords}</div>}
                                </div> */}
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label htmlFor="project_keywords">
                                        Provide up to (5) keywords engineers can use to find your
                                        project.<span>*</span>
                                    </label>
                                    <ListInput list_keywords={project_keywords} set_list_keyword={set_project_keywords}/>
                                    {errorMsg.project_keywords && <div className='error-msg'>{errorMsg.project_keywords}</div>}
                                </div>





                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label>
                                        Will this project require any onsite work?
                                    </label>
                                    <div className="onsite_check">

                                        {
                                            onsiteOption.map(singleData => <RadioButton key={singleData.key} radionData={singleData} />)
                                        }


                                    </div>
                                </div>
                            </div>
                            {/* <!-- Form Sub Title Text --> */}
                            <p className="form_subtitle">
                                Please provide your affiliation's address.
                            </p>
                            {/* <!-- Single Input --> */}
                            <div className="two_columns">
                                <div className="form_control">
                                    <label htmlFor="address"> Address </label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        placeholder="65 Hansen Way"
                                    />
                                </div>
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label htmlFor="address_line">Address Line 2 </label>
                                    <input
                                        type="text"
                                        name="address_line"
                                        id="address_line"
                                        placeholder="Apartment 4"
                                    />
                                </div>
                            </div>
                            <div className="two_columns">
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label htmlFor="city_town">City / Town </label>
                                    <input
                                        type="text"
                                        name="city_town"
                                        id="city_town"
                                        placeholder="Palo Alto"
                                    />
                                </div>
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label htmlFor="state_region_province">State / Region / Province </label>
                                    <input
                                        type="text"
                                        name="state_region_province"
                                        id="testate_region_provincext"
                                        placeholder="California"
                                    />
                                </div>
                            </div>
                            <div className="two_columns">
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label htmlFor="zip_code">Zip / Post Code </label>
                                    <input
                                        type="number"
                                        name="zip_code"
                                        id="zip_code"
                                        placeholder="94304"
                                    />
                                </div>
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label htmlFor="country">Country </label>
                                    <input
                                        type="text"
                                        name="country"
                                        id="country"
                                        placeholder="United States"
                                    />
                                </div>
                            </div>
                            <div className="two_columns">
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label >
                                        Is this an individual or team project?
                                        <span>*</span>
                                    </label>


                                    {
                                        projectTypeOption.map(singleData => <RadioButton key={singleData.key} radionData={singleData} />)
                                    }
                                    {errorMsg.projecType && <div className='error-msg'>{errorMsg.projecType}</div>}





                                </div>
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label > Describe the nature of your project. </label>

                                    {
                                        projectNatureOption.map(singleData => <RadioButton key={singleData.key} radionData={singleData} />)
                                    }




                                </div>
                            </div>

                            <div className="two_columns">
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label >
                                        How much experience will this project require? <span>*</span>
                                    </label>

                                    {
                                        projectExperienceOption.map(singleData => <RadioButton key={singleData.key} radionData={singleData} />)
                                    }
                                    {errorMsg.projectExperience && <div className='error-msg'>{errorMsg.projectExperience}</div>}

                                </div>


                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label htmlFor="required_skill_list"
                                    >List the skills that this project will require.
                                    </label>
                                    <textarea
                                        name="required_skill_list"
                                        id="required_skill_list"
                                        rows="2"
                                        placeholder="Answer here.."
                                    >
                                    </textarea>
                                </div>


                            </div>



                            <div className="two_columns">
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label htmlFor="p_deadline"> What is your project deadline? </label>
                                    <DatePickerInput id='p_deadline' name='p_deadline' />
                                </div>





                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label>
                                        Is there a hard deadline for this project ? <span>*</span>
                                    </label>

                                    {
                                        ProjectHardDeadlineOption.map(singleData => <RadioButton key={singleData.key} radionData={singleData} />)
                                    }
                                    {errorMsg.hardDeadline && <div className='error-msg'>{errorMsg.hardDeadline}</div>}

                                </div>
                            </div>


                            <div className="two_columns">

                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label >
                                        How long do you expect this project to take ?
                                    </label>
                                    {
                                        expectedTimeProjectOption.map(singleData => <RadioButton key={singleData.key} radionData={singleData} />)
                                    }

                                </div>
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label >
                                        Do you have a budget for this project or will it rely on
                                        volunteer work / platform sponsorship?<span>*</span>
                                    </label>

                                    {
                                        haveProjectBudgetOption.map(singleData => <RadioButton key={singleData.key} radionData={singleData} />)
                                    }
                                    {errorMsg.haveProjectBudget && <div className='error-msg'>{errorMsg.haveProjectBudget}</div>}


                                </div>

                            </div>

                            <div className="two_columns">
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label htmlFor="expected_cost"
                                    >What is your budget or the expected cost of this project ?
                                    </label>
                                    <textarea
                                        name="answer"
                                        id="expected_cost"
                                        rows="2"
                                        placeholder="Answer here.."
                                    >
                                    </textarea>
                                </div>
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label >
                                        What will you be ready to start this project?
                                    </label>
                                    {
                                        readyToStartOption.map(singleData => <RadioButton key={singleData.key} radionData={singleData} />)
                                    }

                                </div>
                            </div>
                            <div className="two_columns">
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label htmlFor="final_deliverable_details">
                                        Please describe the final deliverable in as much detail as
                                        possible.
                                    </label>
                                    <textarea
                                        name="final_deliverable_details"
                                        id="final_deliverable_details"
                                        rows="2"
                                        placeholder="Answer here.."
                                    >
                                    </textarea>
                                </div>
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label htmlFor="relevant_link"> Provide a link to any relevant data. </label>
                                    <input name="relevant_link" id="relevant_link" placeholder="https://" />
                                </div>
                            </div>
                            <div className="two_columns">
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label htmlFor="relevant_literature_link">
                                        Provide links to any relevant literature that may help your
                                        project match.
                                    </label>
                                    <textarea
                                        name="relevant_literature_link"
                                        id="relevant_literature_link"
                                        rows="2"
                                        placeholder="Answer here.."
                                    >
                                    </textarea>
                                </div>
                                {/* <!-- Single Input --> */}
                                <div className="form_control">
                                    <label htmlFor="other_included">
                                        Anything else that should be included with your project’s
                                        description?
                                    </label>
                                    <textarea
                                        name="other_included"
                                        id="other_included"
                                        rows="2"
                                        placeholder="Answer here.."
                                    >
                                    </textarea>
                                </div>
                            </div>
                            <hr className='inputhr' />
                            <div className="form_submit al_submit_button">
                                <button type="reset" className="btn btn-submit btn-light">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-submit btn-dark">
                                    Submit
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddProject;