import React, { Fragment } from 'react';
import Gambar from '/welcome.png';
import Color from '../../../shared/color'
const Welcome = () => {
    return (
        <Fragment>
            <div className="container-fluid text-light" style={{
                backgroundImage: `url(${Gambar})`,
                backgroundSize: 'cover',
                height: '484px'
            }}>
                <div className="row pt-0 pt-md-5">
                    <div className="col-0 col-md-1"></div>
                    <div className="col-12 col-md-7 col-lg-8 pt-0 pt-md-5 ">
                        <p style={{fontWeight:'600', fontSize:'48px'}}>Live Your Best Life Using Your Strengths</p>
                        <p style={{fontWeight:'400', fontSize:'18px'}}>
                            Meet some of the people who have completed the Sagara Technology and use their results to maximize their potential at work and everywhere else.
                        </p>
                        <button className='btn text-light px-5' style={{ backgroundColor: Color.color1 }}>Get Certification</button>
                    </div>
                    <div className="col-0 col-md-1"></div>
                </div>
            </div>
        </Fragment>
    );
};

export default Welcome;
