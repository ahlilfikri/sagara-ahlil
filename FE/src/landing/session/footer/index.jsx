import React, { Fragment, useEffect, useState } from 'react';
import Color from '../../../shared/color';
import Gambar from '/logo.png';
import Gambar1 from '/sosmed.png';
import Gambar3 from '/contact1.png';
import Gambar4 from '/contact2.png';
import Gambar5 from '/contact3.png';
const Footer = () => {
    return (
        <Fragment>
            <div className="container-fluid py-5" style={{ backgroundColor: Color.color2 }}>
                <div className="row text-light">
                    <div className="col-12 col-md-5">
                        <div className="company d-flex">
                            <img src={Gambar} className='img-fluid' alt="" />
                            <div className="nama text-light ms-3" style={{ fontSize:'40px', fontWeight:'600' }}>
                                <p className='p-0 m-0'>SAGARA</p>
                                <p className='p-0 m-0'>TECH</p>
                            </div>
                        </div>
                        <p className='text-light py-3'>Plan, build, grow digital products. Continuously delivering impact.</p>
                        <img src={Gambar1} className='img-fluid' alt="" />
                    </div>
                    <div className="col-12 col-md-2 pt-5 pt-md-0">
                        <p style={{ fontWeight:'700', fontSize:'20px' }}>Pages</p>
                        <p>IT Certification</p>
                        <p>Careers</p>
                        <p>FAQ</p>
                        <p>Terms & conditions</p>
                    </div>
                    <div className="col-12 col-md-2 pt-5 pt-md-0">
                        <p style={{ fontWeight:'700', fontSize:'20px' }}>Careers</p>
                        <p>Front End Developer</p>
                        <p>Back End Developer</p>
                        <p>Quality Assurance</p>
                        <p>UI/UX Design</p>
                    </div>
                    <div className="col-12 col-md-3 pt-5 pt-md-0">
                        <p style={{ fontWeight:'700', fontSize:'20px' }}>Contact</p>
                        <div className="item1 d-flex">
                            <img className='mt-2 me-3' style={{ width:'20px', height:'15px' }} src={Gambar3} alt="" />
                            <p>+62 856-4097-7356</p>
                        </div>
                        <div className="item1 d-flex">
                            <img className='mt-2 me-3' style={{ width:'20px', height:'15px' }} src={Gambar4} alt="" />
                            <p>consult@sagara.asia</p>
                        </div>
                        <div className="item1 d-flex">
                            <img className='mt-2 me-3' style={{ width:'20px', height:'15px' }} src={Gambar5} alt="" />
                            <p>South Jakarta and Bandung, Indonesia.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Footer;
