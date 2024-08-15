import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Gambar from '/logo.png';
import Gambar1 from '/profile.png';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Loading from '../../../shared/modal/loading';
import Modal from '../../../shared/modal/status';
import Color from '../../../shared/color';

const Navbar = ({ isLogin }) => {
    const navigate = useNavigate();
    const [isSignin, setIsSignin] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const port = `${import.meta.env.VITE_API_URL}`;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        handleIsSignin();
    }, []);

    const handleSignin = () => {
        navigate('/signin');
    };
    
    const handleIsSignin = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setIsSignin(decodedToken.role);
        } else {
            setIsSignin(-1);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            if (token) {
                const response = await axios.post(`${port}user/logout/${token}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                sessionStorage.removeItem('token');
                setSuccess('Berhasil Logout');
                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 1500);
            } else {
                setSuccess('Berhasil Logout');
                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 1500);
            }
        } catch (error) {
            if (error.response?.status === 400) {
                sessionStorage.removeItem('token');
                setSuccess('Berhasil Logout');
                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 1500);
            } else {
                setError('Gagal Logout');
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const handleClose = () => {
        setError('');
        setSuccess('');
    };

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light" >
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <img src={Gambar} alt="Logo" className="d-inline-block align-text-top" />
                        <div className="perusahaan">
                            <p className="p-0 m-0 ms-2" style={{ fontWeight: 'bold', fontSize: '32px', marginLeft: '10px', color: Color.color2 }}>SAGARA</p>
                            <p className="p-0 m-0 ms-2" style={{ fontWeight: 'bold', fontSize: '32px', marginLeft: '10px', color: Color.color2 }}>TECH</p>
                        </div>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-center w-100 d-flex justify-content-between">
                            <li className="nav-item d-block d-lg-flex justify-content-around align-items-center ">
                                <p className="nav-link mt-3 p-0 mx-0 mx-md-2 text-center" style={{ fontSize: '24px', fontWeight: '500', cursor: 'pointer' }}>IT Certification</p>
                                <p className="nav-link mt-3 p-0 mx-0 mx-md-2 text-center" style={{ fontSize: '24px', fontWeight: '500', cursor: 'pointer' }}>Careers</p>
                                <p className="nav-link mt-3 p-0 mx-0 mx-md-2 text-center" style={{ fontSize: '24px', fontWeight: '500', cursor: 'pointer' }}>Faq</p>
                            </li>
                            {!isLogin && (
                                <li className="nav-item">
                                    <div onClick={handleSignin} className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                                        <button className='btn' style={{ backgroundColor: Color.color1, color: 'white' }}>Sign In</button>
                                    </div>
                                </li>
                            )}
                            {isLogin && (isSignin != 1 && isSignin != 3) && (
                                <>
                                    <li className="nav-item d-flex">
                                        <div className="detail text-end">
                                            <p className="p-0 m-0" style={{ fontSize: '14px', fontWeight: '700', color: '#212B36' }}>Thomas Anree</p>
                                            <p className="p-0 m-0" style={{ fontSize: '14px', fontWeight: '700', color: '#637381' }}>Admin</p>
                                        </div>
                                        <img style={{ width: '48px' }} src={Gambar1} alt="Profile" />
                                        <div className="pt-2 ps-2 m-0" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                                            <i className="fa-solid fa-caret-down" style={{ fontSize: '16px' }}></i>
                                            {dropdownOpen && (
                                                <button onClick={handleLogout} className="btn text-light bg-danger" style={{ position: 'absolute', top: '85px', right: '20px', zIndex: '100' }}>
                                                    Logout
                                                </button>
                                            )}
                                        </div>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            {loading && <Loading />}
            {error && <Modal data={error} status={'error'} onClose={() => setError('')} />}
            {success && <Modal data={success} status={'success'} onClose={() => setSuccess('')} />}
        </Fragment>
    );
};

export default Navbar;
