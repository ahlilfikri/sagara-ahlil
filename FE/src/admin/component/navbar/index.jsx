import React, { Fragment, useState } from 'react';
import Gambar from '/profile.png';
import Loading from '../../../shared/modal/loading';
import Modal from '../../../shared/modal/status';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const port = import.meta.env.VITE_API_URL;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const handleClose = () => {
        setError('');
        setSuccess('');
    };
    const handleLogout = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                setSuccess('Berhasil Logout');
                setTimeout(() => {
                    navigate('/signin');
                }, 1500);
            }
                        
            await axios.post(
                `${port}user/logout/${token}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            sessionStorage.removeItem('token');
            setSuccess('Berhasil Logout');
            setTimeout(() => {
                navigate('/signin');
            }, 1500);
        } catch (error) {
            if (error.response?.status === 400) {
                sessionStorage.removeItem('token');
                setSuccess('Berhasil Logout');
                setTimeout(() => {
                    navigate('/signin');
                }, 1500);
            }
        } finally {

            setLoading(false);
        }
    };

    return (
        <Fragment>
            <div className="container-fluid d-flex align-items-center justify-content-end position-relative py-2 pt-2 pe-2 pe-sm-4 pe-md-5" style={{ backgroundColor:'white' }}>
                <div className="detail text-end">
                    <p className="p-0 m-0" style={{ fontSize: '14px', fontWeight: '700', color: '#212B36' }}>Thomas Anree</p>
                    <p className="p-0 m-0" style={{ fontSize: '14px', fontWeight: '700', color: '#637381' }}>Admin</p>
                </div>
                <img style={{ width: '48px' }} src={Gambar} alt="Profile" />
                <div className="pt-2 ps-2 m-0" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                    <i className="fa-solid fa-caret-down" style={{ fontSize: '16px' }}></i>
                    {dropdownOpen && (
                        <button onClick={handleLogout} className="btn text-light bg-danger" style={{ position: 'absolute', top: '60px', right: '20px', zIndex:'100' }}>
                            Logout
                        </button>
                    )}
                </div>
            </div>
            {loading && <Loading />}
            {error && <Modal data={error} status="error" onClose={handleClose} />}
            {success && <Modal data={success} status="success" onClose={handleClose} />}
        </Fragment>
    );
};

export default Navbar;
