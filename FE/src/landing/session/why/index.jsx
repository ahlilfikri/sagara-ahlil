import React, { Fragment, useEffect, useState } from 'react';
import Gambar1 from '/why1.png';
import Gambar2 from '/why2.png';
import Gambar3 from '/why3.png';
import Gambar4 from '/why.jpeg';
import Color from '../../../shared/color';

const Why = () => {
    return (
        <Fragment>
            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <p style={{ fontSize:'40px', fontWeight:'600', color:Color.color1 }}>WHY SAGARA IT CERTIFICATION?</p>
                                <div className="item-1 d-flex">
                                    <img  style={{ height:'60px' }} src={Gambar1} alt="" />
                                    <div className="detail ps-3">
                                        <p style={{ fontSize:'20px', fontWeight:'600', color:Color.color1 }}>Global Credibility Boost</p>
                                        <p>Our certifications are globally recognized, enhancing your credibility, and opening doors to new opportunities.</p>
                                    </div>
                                </div>
                                <div className="item-2 d-flex">
                                    <img  style={{ height:'60px' }} src={Gambar2} alt="" />
                                    <div className="detail ps-3">
                                        <p style={{ fontSize:'20px', fontWeight:'600', color:Color.color1 }}>Empowering Careers</p>
                                        <p>Equipped to advance your career, secure promotions, and pursue new job opportunities in the ever-evolving tech industry. </p>
                                    </div>
                                </div>
                                <div className="item-3 d-flex">
                                <img style={{ height:'60px' }}  src={Gambar3} alt="" />
                                    <div className="detail ps-3">
                                        <p style={{ fontSize:'20px', fontWeight:'600', color:Color.color1 }}>Empowering Careers</p>
                                        <p>Equipped to advance your career, secure promotions, and pursue new job opportunities in the ever-evolving tech industry. </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <img className="img-fluid" style={{ width:'800px', maxHeight:'500px' }} src={Gambar4} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </Fragment>
    );
};

export default Why;
