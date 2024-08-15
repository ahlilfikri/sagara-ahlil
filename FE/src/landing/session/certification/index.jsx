import React, { Fragment, useState } from 'react';
import Color from '../../../shared/color';
import Gambar from '/certification.png';
import Gambar1 from '/certification1.png';
import Gambar2 from '/certification2.png';
import Gambar3 from '/certification3.png';

const Certification = () => {
    const certifications = {
        frontEnd: {
            title: "Front End Developer Certification",
            item1: "This program equips you with the essential skills and knowledge to create visually appealing websites or applications.",
            item2: "Evaluates your proficiency in frontend programming languages and other relevant frontend technologies.",
            item3: "Gain recognition as a qualified frontend developer, enhance your career prospects, and open doors to exciting job opportunities.",
        },
        backEnd: {
            title: "Back End Developer Certification",
            item1: "Master Node.js and Express.",
            item2: "Work with databases like MongoDB.",
            item3: "Gain recognition as a qualified frontend developer, enhance your career prospects, and open doors to exciting job opportunities.",
        },
        qualityAssurance: {
            title: "Quality Assurance Certification",
            item1: "Understand software testing principles.",
            item2: "Work with testing tools.",
            item3: "Gain recognition as a qualified frontend developer, enhance your career prospects, and open doors to exciting job opportunities.",
        },
        uiUxDesign: {
            title: "UI/UX Design Certification",
            item1: "Learn design principles.",
            item2: "Master design tools like Figma.",
            item3: "Gain recognition as a qualified frontend developer, enhance your career prospects, and open doors to exciting job opportunities.",
        },
    };

    const [selectedCertification, setSelectedCertification] = useState('frontEnd');

    const handleCertificationChange = (certification) => {
        setSelectedCertification(certification);
    };

    return (
        <Fragment>
            <div className="container-fluid pt-5 mb-5">
                <div className="bordertop mx-auto" style={{ width: '40px', borderTop: '3px solid #A51535' }}></div>
                <p className='text-center' style={{ color:Color.color1, fontSize:'40px' }}>Empower Yourself with</p>
                <p className='text-center' style={{ color:Color.color1, fontSize:'40px', fontWeight:'800' }}>Our Certification</p>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="row">
                            <div className="col-6 col-md-3">
                                <button
                                    className='btn mt-2 mt-md-0'
                                    style={{
                                        border: '1px solid black',
                                        backgroundColor: selectedCertification === 'frontEnd' ? Color.color1 : 'white',
                                        color: selectedCertification === 'frontEnd' ? 'white' : 'black'
                                    }}
                                    onClick={() => handleCertificationChange('frontEnd')}
                                >
                                    FRONT END DEVELOPER
                                </button>
                            </div>
                            <div className="col-6 col-md-3">
                                <button
                                    className='btn mt-2 mt-md-0'
                                    style={{
                                        border: '1px solid black',
                                        backgroundColor: selectedCertification === 'backEnd' ? Color.color1 : 'white',
                                        color: selectedCertification === 'backEnd' ? 'white' : 'black'
                                    }}
                                    onClick={() => handleCertificationChange('backEnd')}
                                >
                                    BACK END DEVELOPER
                                </button>
                            </div>
                            <div className="col-6 col-md-3">
                                <button
                                    className='btn mt-2 mt-md-0'
                                    style={{
                                        border: '1px solid black',
                                        backgroundColor: selectedCertification === 'qualityAssurance' ? Color.color1 : 'white',
                                        color: selectedCertification === 'qualityAssurance' ? 'white' : 'black'
                                    }}
                                    onClick={() => handleCertificationChange('qualityAssurance')}
                                >
                                    QUALITY ASSURANCE
                                </button>
                            </div>
                            <div className="col-6 col-md-3">
                                <button
                                    className='btn mt-2 mt-md-0'
                                    style={{
                                        border: '1px solid black',
                                        backgroundColor: selectedCertification === 'uiUxDesign' ? Color.color1 : 'white',
                                        color: selectedCertification === 'uiUxDesign' ? 'white' : 'black'
                                    }}
                                    onClick={() => handleCertificationChange('uiUxDesign')}
                                >
                                    UI/UX DESIGN
                                </button>
                            </div>
                        </div>
                        <div className="col-12 d-flex justify-content-around pt-3">
                        </div>
                        <div className="row pt-3">
                            <div className="col-12 col-md-6">
                                <img className='img-fluid' src={Gambar} alt="" style={{ borderRadius: '1vw' }} />
                            </div>
                            <div className="col-12 col-md-6">
                                <p style={{ fontSize: '40px', fontWeight: '600', color: Color.color1 }}>{certifications[selectedCertification].title}</p>
                                <div className="item-1 d-flex">
                                    <img className='mt-2' src={Gambar1} alt="" style={{ width: '30px', height: '30px' }} />
                                    <p className="ms-4" style={{ fontSize: '16px', fontWeight: '400' }}>{certifications[selectedCertification].item1}</p>
                                </div>
                                <div className="item-2 d-flex">
                                    <img className='mt-2' src={Gambar2} alt="" style={{ width: '30px', height: '30px' }} />
                                    <p className="ms-4" style={{ fontSize: '16px', fontWeight: '400' }}>{certifications[selectedCertification].item2}</p>
                                </div>
                                <div className="item-3 d-flex">
                                    <img className='mt-2' src={Gambar3} alt="" style={{ width: '30px', height: '30px' }} />
                                    <p className="ms-4" style={{ fontSize: '16px', fontWeight: '400' }}>{certifications[selectedCertification].item3}</p>
                                </div>
                                <button className='btn px-5 text-light' style={{ backgroundColor: Color.color1 }}>Get Detail</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </Fragment>
    );
};

export default Certification;
