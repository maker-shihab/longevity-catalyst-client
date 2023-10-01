import React from 'react';

const ResearcherSignUp = () => {
    return (
        <>
            <div className="auth_box padding_top-30">
                <label htmlFor="name">Full Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                />
            </div>
            <div className="auth_box">
                <label htmlFor="Email">Email</label>
                <input type="email" name="Email" id="Email" placeholder="Email" />
            </div>
            <div className="auth_box">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Type Your password"
                />
            </div>
            <div className="auth_box">
                <label htmlFor="compay">Company / Institution</label>
                <input
                    type="text"
                    name="compay"
                    id="compay"
                    placeholder="Company"
                />
            </div>
            <div className="auth_box">
                <label htmlFor="bio">Bio</label>
                <textarea
                    name="bio"
                    id="bio"
                    rows="6"
                    placeholder="I'm a Product Designer based in Dhaka, Bangladesh. I specialize in UX/UI design, brand strategy, and Webflow development.
            "
                ></textarea>
                <p>275 characters left</p>
            </div>

            <div className="auth_box">
                <label htmlFor="propic">Profile Picture</label>
                <label htmlFor="img_up" className="drag_imge_input">
                    <input type="file" name='profile_pic' id="img_up" />
                    <img src="assets/img/Featured-icon.svg" alt="" />
                    <p><span>Click to upload</span> or drag and drop</p>
                    <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
                </label>
            </div>



        </>
    );
};

export default ResearcherSignUp;