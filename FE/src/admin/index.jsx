import React, { Fragment, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../shared/modal/loading';
import Modal from '../shared/modal/status';
import Dashboard from './pages/dashboard';
import Student from './pages/student';
import Navbar from './component/navbar';
import Gambar from '/logo.png';
import Gambar1 from '/dashboard.png';
import Gambar2 from '/student.png';
import './index.css';
import Color from '../shared/color';

const Index = () => {
    const port = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    
    const [clickedMenu, setClickedMenu] = useState(true);
    const [activeItem, setActiveItem] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [Content, setContent] = useState(null);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClickMenu = () => {
        setClickedMenu(!clickedMenu);
    };

    const handleItemClick = (item) => {
        setActiveItem(item);
        switch (item) {
            case 'Dashboard':
                setContent(<Dashboard />);
                break;
            case 'Student':
                setContent(<Student />);
                break;
            default:
                setContent(null);
        }
    };

    const handleHome = () => {
        navigate('/')
    }

    const handleClose = () => {
        setError('');
        setSuccess('');
    };

    return (
        <Fragment>
            <div className="container-fluid p-0 m-0" style={{ backgroundColor: Color.color2 }}>
                <div className="menu-button" 
                     onClick={handleClickMenu} 
                     style={{ width:'fit-content',position: 'absolute',  top: '0px',  left: clickedMenu ? (windowWidth < 900 ? '95%' : '23.2%') : '10px',  right: clickedMenu ? '10px' : '10px',  zIndex: 1000,  cursor: 'pointer',  fontSize: '24px',  backgroundColor: 'transparent',  border: 'none',  outline: 'none',  fontWeight: 'bold',  color: clickedMenu ? 'white' : Color.color2  }}>
                    {clickedMenu ? 'x' : <i className="fa-solid fa-bars"></i>}
                </div>
                <div className="row p-0 m-0">
                    <div className={`sidebar p-0 m-0 ${clickedMenu ? 'open' : ''}`}>
                        <div className="top d-flex align-items-center" onClick={handleHome}>
                            <div className="logo d-flex align-items-center pt-4 ps-4">
                                <img src={Gambar} className="px-0 mx-0" alt="Logo" />
                                <div className="nama p-0 m-0 ps-2">
                                    <p className="p-0 m-0 text-start" style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>SAGARA</p>
                                    <p className="p-0 m-0 text-start" style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>TECH</p>
                                </div>
                            </div>
                        </div>
                        <p className='ps-4 pt-5' style={{ color: Color.color3 }}>Menu</p>
                        <ul className="menu-list">
                            {['Dashboard', 'Student'].map((item, index) => (

                                <li key={item} 
                                    className={`mx-auto my-3 p-2 menu-item ${activeItem === item ? 'text-white' : ''}`} 
                                    style={{ width: '80%',  listStyle: 'none',  cursor: 'pointer',  background: activeItem === item ? Color.color1 : 'none',  fontSize: '20px',  fontWeight: 'bold',  color: Color.color3, }} 
                                    onClick={() => handleItemClick(item)}>
                                    {index === 0 && (<img src={Gambar1} className="me-2" alt="" />)}
                                    {index === 1 && (<img src={Gambar2} className="me-2" alt="" />)}
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`content p-0 m-0 ${clickedMenu ? 'shrink' : ''}`}>
                        <div className=" p-0 m-0" style={{ background: '#F4F4F4', minHeight: '100vh' }}>
                            <Navbar></Navbar>
                            {Content}
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Loading />}
            {error && <Modal data={error} status="error" onClose={handleClose} />}
            {success && <Modal data={success} status="success" onClose={handleClose} />}
        </Fragment>
    );
};

export default Index;
