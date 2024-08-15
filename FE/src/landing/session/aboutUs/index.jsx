import React, { Fragment } from 'react';
import Color from '../../../shared/color';

const AboutUs = () => {
    return (
        <Fragment>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="row">
                            <div className="col-12 col-md-3">
                                <p style={{ fontSize:'24px',width: 'fit-content', borderTop: '3px solid black', transform: 'translate(-100%, -100%)',position: 'relative',left: '50%',top: '50%',
                                }}>
                                    About Us
                                </p>
                            </div>
                            <div className="col-12 col-md-9">
                                <p style={{ fontSize: '24px', fontWeight: 'normal', color: Color.color1 }}>
                                    SAGARA IT CERTIFICATION
                                </p>
                                <p style={{ fontSize: '40px', fontWeight: '600', color: Color.color2 }}>
                                    Join thousands of professionals who have elevated their skills and carved out success in the technology industry. Start your journey to excellence with us today!
                                </p>
                                <p style={{ fontSize: '16px', fontWeight: 'normal', color: Color.color3 }}>
                                    Boost your career prospects in the digital era with industry-recognized information technology certifications from Sagara IT Certification.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </Fragment>
    );
};

export default AboutUs;
