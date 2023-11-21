import React from 'react';
import '../../assets/styles/Loader.css';
import useLoading from '../../hooks/useLoading';

const Loader = () => {
  const { isLoading } = useLoading();

  return isLoading ? <div className='loader_container'><div className="loader"></div></div> : null;
};

export default Loader;
