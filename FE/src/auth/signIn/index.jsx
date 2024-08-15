import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Gambar1 from '/logo.png';
import Color from '../../shared/color';
import Loading from '../../shared/modal/loading';

const SignIn = ({ toggleLoginPopup }) => {
    const port = `${import.meta.env.VITE_API_URL}`;
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(`${port}user/login`, loginData);
            if (response.data.data) {
                const token = response.data.data;
                sessionStorage.setItem('token', token);
                navigate('/dashboard');
            } else {
                setError('Username atau Password Tidak Terdaftar');
            }
        } catch (error) {
            setError('Username atau Password Tidak Terdaftar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <div className="modal d-block" tabIndex="1" role="dialog">
                <div className="modal-dialog" role="document" style={{ minWidth: '70vw' }}>
                    <div className="modal-content">
                        <div className="modal-header d-none">
                        </div>
                        <div className="modal-body p-0">
                            <div className="container-fluid">
                                <div className="row p-0">
                                    <div className="col-0 col-md-6 py-5 px-4" style={{ background: Color.color1 }}>
                                        <p className='text-light text-center '></p>
                                        <img src={Gambar1} style={{ width: '100%' }} alt="Logo" />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <button type="button" className="btn-close p-0 m-0 pt-3" aria-label="Close" style={{ position: 'relative', left: '95%' }} onClick={toggleLoginPopup}></button>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <div className="logo d-flex align-items-center justify-content-center">
                                            <img src={Gambar1} alt="Logo" className="me-2" style={{ width: '15%' }} />
                                            <p className="mb-0" style={{ fontSize:'40px', fontWeight:'600' }}>SAGARA TECH</p>
                                        </div>
                                        <p className='py-4 text-center' style={{ fontWeight: 'bold', color: Color.color1, fontSize: '16px' }}>Sign In For Admin Page</p>
                                        <form onSubmit={handleLoginSubmit} className="d-flex flex-column align-items-center">
                                            <div className="my-3" style={{ width: '70%' }}>
                                                <input style={{ border: 'none', borderBottom: '1px solid black', borderRadius: 0 }} type="text" placeholder='Masukkan Username' className="form-control" name="username" value={loginData.username} onChange={handleLoginChange} required />
                                            </div>
                                            <div className="my-3" style={{ width: '70%' }}>
                                                <input style={{ border: 'none', borderBottom: '1px solid black', borderRadius: 0 }} type="password" placeholder='Masukkan Password' className="form-control" name="password" value={loginData.password} onChange={handleLoginChange} required />
                                            </div>
                                            <button type="submit" className="btn my-5 text-light" style={{ color: Color.color2, background: Color.color1 }} disabled={loading}>
                                                {loading ? 'Loading...' : 'Sign In'}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show" onClick={toggleLoginPopup}></div>
            {loading && <Loading></Loading>}
        </Fragment>
    );
};

export default SignIn;
