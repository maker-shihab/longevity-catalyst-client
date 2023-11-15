/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import DashboardMenu from '../../components/userPanel/DashboardMenu';
import ScrollToTop from '../../utils/RouteChange';

const PasswordChange = () => {
    ScrollToTop();
 
    const [isActiveMenu, setIsActiveMenu] = useState(false);
    const mes = {};
    const [errorMsg, setErrorMsg] = useState(mes);
    const formRef = useRef(null);

    const handelDashMenu = () => {
        setIsActiveMenu(!isActiveMenu);
    }

    useEffect(() => {
        if (Object.keys(errorMsg).length !== 0) {
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }

    }, [errorMsg]);
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


    const handelChangePassword = (e) => {
        e.preventDefault();
        setErrorMsg({});
        const formData = new FormData(e.target);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        console.log(formData);

        // validation 
        let isValid = true;
        if (formDataObject.oldPassword.length === 0) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                oldPassword: 'Current Password is Required',
            }));
            isValid = false;
        }
        if (formDataObject.newPassword.length === 0) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                newPassword: 'New Password is Required',
            }));
            isValid = false;
        }
        if (formDataObject.confirmPassword.length === 0) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                confirmPassword: 'Confirm Password is Required',
            }));
            isValid = false;
        }else{
            if(formDataObject.newPassword !== formDataObject.confirmPassword){
                setErrorMsg(prevErrorMsg => ({
                    ...prevErrorMsg,
                    confirmPassword: 'Confirm Password does not match',
                }));
                isValid = false;
            }
        }



        if (isValid) {
            const loadingToast = toast.loading('Changing Password...');
            try {
                setIsLoading(true);
                toast.success('Password Updated');
            } catch (error) {
                console.error('Error', error);
                toast.error('Request failed...');
                // console.log('');
            } finally {
                toast.dismiss(loadingToast);
                setIsLoading(false); // Set loading back to false after the form submission
            }
        }
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
                            <h3 className="title">Change Password</h3>
                        </div>

                        <form onSubmit={handelChangePassword} ref={formRef} className="add_project_form">

                            {/* <!-- Single Input --> */}
                            <div className="form_control list_input_box">
                                <div className='list_lebel'>
                                    <label htmlFor="oldPassword">
                                        Current Password
                                        <span>*</span>
                                    </label>
                                </div>
                                <div className='list_input'>
                                    <input
                                        className={errorMsg.oldPassword ? 'border-warring' : ''}
                                        type="password"
                                        name="oldPassword"
                                        id="oldPassword"
                                        autoComplete='off'
                                        placeholder="Type Current Password"
                                    />
                                    {errorMsg.oldPassword && <div className='error-msg'>{errorMsg.oldPassword}</div>}
                                </div>
                            </div>
                            <hr className='inputhr' />
                            {/* <!-- Single Input --> */}
                            <div className="form_control list_input_box">
                                <div className='list_lebel'>
                                    <label htmlFor="newPassword">
                                        New Password
                                        <span>*</span>
                                    </label>
                                </div>
                                <div className='list_input'>
                                    <input
                                        className={errorMsg.newPassword ? 'border-warring' : ''}
                                        type="password"
                                        name="newPassword"
                                        id="newPassword"
                                        placeholder="Type New Password"
                                    />
                                    {errorMsg.newPassword && <div className='error-msg'>{errorMsg.newPassword}</div>}
                                </div>
                            </div>
                             {/* <!-- Single Input --> */}
                             <div className="form_control list_input_box">
                                <div className='list_lebel'>
                                    <label htmlFor="confirmPassword">
                                        Confirm Password
                                        <span>*</span>
                                    </label>
                                </div>
                                <div className='list_input'>
                                    <input
                                        className={errorMsg.confirmPassword ? 'border-warring' : ''}
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        placeholder="Type Confirm Password"
                                    />
                                    {errorMsg.confirmPassword && <div className='error-msg'>{errorMsg.confirmPassword}</div>}
                                </div>
                            </div>
                         
                            <hr className='inputhr' />

                            <div className="form_submit al_submit_button">
                                <button type="reset" className="btn btn-submit btn-light">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-submit btn-dark">
                                    Save
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PasswordChange;