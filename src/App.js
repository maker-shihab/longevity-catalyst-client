import React from 'react';
import 'react-responsive-modal/styles.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './assets/styles/global.css';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import ProfileShow from './pages/ProfileShow';
import ProjectDetails from './pages/ProjectDetails';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import AddProject from './pages/userPanel/AddProject';
import EditUserProfile from './pages/userPanel/EditUserProfile';

const App = () => {
  return (
    <HashRouter>
    <Header/>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/faqs' element={<FAQ />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up/:type' element={<SignUp />}></Route>
        <Route path='/single-project' element={<ProjectDetails />} />
        <Route path='/user/:profile' element={<ProfileShow/>} />
        <Route path='/user/profile/update' element={<EditUserProfile/>} />
        <Route path='/add-project' element={<AddProject/>} />
        <Route path='*' element={<PageNotFound />} /> {/* Catch-all route for all other paths */}
      </Routes>
      <Footer/>
    </HashRouter>
  );
};

export default App;