import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { authApi } from '../../api';
import '../../assets/styles/authPages.css';
import AuthHeader from '../../components/auth/AuthHeader';
import ContributerSignUp from '../../components/auth/ContributerSignUp';
import ResearcherSignUp from '../../components/auth/ResearcherSignUp';
import UserSignUp from '../../components/auth/UserSignUp';
import ScrollToTop from '../../utils/RouteChange';
import { checkAuth } from '../../utils/fakeAuth';
import PageNotFound from '../PageNotFound';

const SignUp = () => {
    const { type } = useParams();
    const navigate = useNavigate();

    const [getAuthF, setAuthF] = useState(checkAuth());
    const [profilePic, setProfilePic] = useState({});
    // console.log(setAuthF);

    useEffect(() => {
        if (getAuthF) {
            navigate('/user/dashboard');
        }
    }, [getAuthF]);

    ScrollToTop();
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
    }, [isLoading])


    const handalSubmitSignUp = async (e) => {
        e.preventDefault();
        setErrorMsg({});
        const formData = new FormData(e.target);
        const formDataObject = {};

        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        // validation 
        let isValid = true;
        if (formDataObject.full_name.length === 0) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                full_name: 'Full Name is Required',
            }));
            isValid = false;
        }

        if (formDataObject.email.length === 0) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                email: 'Email is Required',
            }));
            isValid = false;
        }

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

        if (formDataObject.role.length === 0) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                role: 'User Role is Required',
            }));
            isValid = false;
        }

        // Start proccsing image 
        const profilePictureFile = formData.get("profile_pic");
        if (profilePictureFile.name.length !== 0) {
            setProfilePic(profilePictureFile);
        }
        let isImageValid = false;
        if (profilePic.name) {
            // image validation 

            if (!['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(profilePic.type)) {
                setErrorMsg(prevErrorMsg => ({
                    ...prevErrorMsg,
                    profile_pic: 'Please Select PNG/JPG/GIF/SVG file !',
                }));
                isValid = false;
            }
            else if (profilePic.size > 1048576) {
                setErrorMsg(prevErrorMsg => ({
                    ...prevErrorMsg,
                    profile_pic: 'Max 1MB file can Upload !',
                }));
                isValid = false;
            }
            else {
                isImageValid = true;
            }
        }
        if (isImageValid) {
            formDataObject.profile_photo = profilePic;
            formData.append('profile_photo', profilePic);
        }
        else {
            formDataObject.profile_photo = '';
        }
        delete formDataObject.profile_pic;
        formData.delete('profile_pic');

        // end proccsing image 


        // After validation, perform the form submission with loading message
        if (isValid) {
            try {
                setIsLoading(true);
                const promise = authApi.signup(formData);
                await toast.promise(promise, {
                    loading: 'Signing Up...', // Display a loading message
                    success: (response) => {
                        if (response.data.success) {
                            // document.querySelector('body').classList.remove('loading_BG');
                            setIsLoading(false);
                            navigate('/login');
                            return 'Sign Up Successfully Done !';
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
                                return `Sign up failed: ${msg}`;
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


    if (type === 'user' || type === 'contributor' || type === 'researcher') {
        return (
            <>
                <AuthHeader />
                <section className="full_widht_auth_section">
                    <div className="container">
                        <div className="auth_area">
                            <form onSubmit={handalSubmitSignUp} ref={formRef} encType="multipart/form-data">
                                <h4>Sign Up</h4>
                                <p>Welcome back! Please enter your details.</p>
                                <input type="hidden" name="role" value={type} />

                                {
                                    type === 'user' && <UserSignUp setProfilePic={setProfilePic} errorMsg={errorMsg} />
                                }
                                {
                                    type === 'contributor' && <ContributerSignUp setProfilePic={setProfilePic} errorMsg={errorMsg} />
                                }
                                {
                                    type === 'researcher' && <ResearcherSignUp setProfilePic={setProfilePic} errorMsg={errorMsg} />
                                }

                                <button type="submit" className="auth_submit btn btn-dark btn-full">
                                    Sign Up
                                </button>


                            </form>
                            <p className="have_auth_msg">
                                Already have an account?
                                <Link to='/login'> &nbsp; Log In.</Link>
                            </p>
                        </div>
                    </div>
                </section>

            </>
        );
    } else {
        return (
            <PageNotFound />
        );
    }

};

export default SignUp;