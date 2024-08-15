import React, { Fragment, useEffect, useState } from 'react';
import Gambar from '/how.png'
import Color from '../../../shared/color';

const How = () => {
    return (
        <Fragment>
            <div className="container-fluid pt-5">
                <p className='text-center' style={{ fontSize:'40px', fontWeight:'300', color:Color.color1 }}>HOW SAGARA</p>
                <p className='text-center' style={{ fontSize:'40px', fontWeight:'600', color:Color.color1 }}>IT-Certification Works</p>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <img src={Gambar} alt="" className='img-fluid' />
                            </div>
                            <div className="col-12 col-md-6">
                                <div className=" item-1 m-0 p-0">
                                    <p classname="" style={{ fontSize: '24px', fontWeight: '600', color: Color.color2 }}><span style={{ color: Color.color1 }}>#1</span> Register Account</p>
                                    <p classname="">Begin your journey by creating an account on Sagara IT Certification platform. Simply fill out the registration form to get started.</p>
                                </div>
                                <div className=" item-2 m-0 p-0">
                                    <p classname="" style={{ fontSize: '24px', fontWeight: '600', color: Color.color2 }}><span style={{ color: Color.color1 }}>#2</span> Select the Type </p>
                                    <p classname="">Choose from a variety of IT certification options tailored to your career goals and interests.  Select the certification that aligns with your expertise.</p>
                                </div>
                                <div className=" item-3 m-0 p-0">
                                    <p classname="" style={{ fontSize: '24px', fontWeight: '600', color: Color.color2 }}><span style={{ color: Color.color1 }}>#3</span> Register and Pay</p>
                                    <p classname="">Enroll in your chosen certification program by completing the registration process and making payment securely through our platform.</p>
                                </div>
                                <div className=" item-4 m-0 p-0">
                                    <p classname="" style={{ fontSize: '24px', fontWeight: '600', color: Color.color2 }}><span style={{ color: Color.color1 }}>#4</span> Take Test</p>
                                    <p classname="">Prepare for your certification exam and schedule a convenient time to take the test online. </p>
                                </div>
                                <div className=" item-5 m-0 p-0">
                                    <p classname="" style={{ fontSize: '24px', fontWeight: '600', color: Color.color2 }}><span style={{ color: Color.color1 }}>#5</span> Get The Certificate</p>
                                    <p classname="">Upon successful completion of the exam, receive your certification digitally, instantly validating your skills and expertise in the chosen IT field.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </Fragment>
    );
};

export default How;
