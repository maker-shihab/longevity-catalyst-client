/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '../../api';
import '../../assets/styles/authPages.css';
import SignupModal from '../../components/SignupModal';
import AuthHeader from '../../components/auth/AuthHeader';
import useAuth from '../../hooks/UseAuth';
import ScrollToTop from '../../utils/RouteChange';
const Login = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/user/dashboard';
    const mes = {};
    const [errorMsg, setErrorMsg] = useState(mes);
    const formRef = useRef(null);




    ScrollToTop();

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
    }, [isLoading]);



    const handalSubmitLogin = async (e) => {
        e.preventDefault();

        setErrorMsg({});
        const formData = new FormData(e.target);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        // setUserData(formDataObject);
        let isValid = true;
        if (formDataObject.username.length === 0) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                username: 'Username is Required',
            }));
            isValid = false;
        }
        if (formDataObject.password.length === 0) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                password: 'Password is Required',
            }));
            isValid = false;
        }
        formDataObject.identifier = formDataObject.username;
        delete formDataObject.username;


        // After validation, perform the form submission with loading message
        if (isValid) {
            try {
                setIsLoading(true);
                const promise = authApi.login(formDataObject,{
                    withCredentials : true
                });
                await toast.promise(promise, {
                    loading: 'Login...', // Display a loading message
                    success: (response) => {
                        if (response.data.success) {
                            // document.querySelector('body').classList.remove('loading_BG');
                           
                            setIsLoading(false);
                            setAuth({accessToken:response.data.data.accessToken});
                            navigate(from, { replace: true });
                          
                            return 'Sign In Successfully Done !';
                            
                        } else {
                            return 'Unexpected error occurred';
                        }
                    },
                    error: (error) => {
                        if (error.response) {
                            if (error.response.status === 401) {
                                const resMsg = error.response.data.message.replace('Error: ', '');
                                const [msg] = resMsg.split('.');
                                setErrorMsg(prevErrorMsg => ({
                                    ...prevErrorMsg,
                                    username: 'Invalid Username',
                                }));
                                setErrorMsg(prevErrorMsg => ({
                                    ...prevErrorMsg,
                                    password: 'Invalid Password',
                                }));
                                return `Sign In failed: ${msg}`;
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
        <>
            {/* <!-- ST:- Auth header menu  --> */}
            <AuthHeader />


            {/* <!-- ST:- login form  --> */}
            <section className="full_widht_auth_section">
                <div className="container">
                    <div className="auth_area">
                        <form onSubmit={handalSubmitLogin} ref={formRef}>
                            <h4>Log In</h4>
                            <p>Welcome back! Please enter your details.</p>
                            <div className="auth_box padding_top-30">
                                <label htmlFor="username">Username*</label>
                                <input
                                    className={errorMsg.username ? 'border-warring' : ''}
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Username"
                                    autoComplete="off"
                                />
                                {errorMsg.username && <div className='error-msg'>{errorMsg.username}</div>}
                            </div>
                            <div className="auth_box">
                                <label htmlFor="password">Password*</label>
                                <input
                                    className={errorMsg.password ? 'border-warring' : ''}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Type Your password"
                                    autoComplete="off"
                                />
                                {errorMsg.password && <div className='error-msg'>{errorMsg.password}</div>}
                            </div>
                            <p>Must be at least 8 characters.</p>
                            <button type="submit" className="auth_submit btn btn-dark btn-full">
                                Log In
                            </button>

                        </form>
                        <p className="have_auth_msg">
                            Not a Member?
                            <button onClick={openModal}> &nbsp; Sign Up</button>
                            <SignupModal open={modalOpen} onClose={closeModal} onSignUp={handleCreateAccountClick} />
                      
                        </p>
                    </div>
                </div>
            </section>
            {/* <!-- ED:- login form  --> */}
        </>
    );
};

export default Login;