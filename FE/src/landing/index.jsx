import React, { Fragment, useEffect, useState } from 'react';
import Navbar from './session/navbar'
import Welcome from './session/welcome'
import AboutUs from './session/aboutUs'
import Why from './session/why'
import How from './session/how'
import Certification from './session/certification'
import Footer from './session/footer'

const Index = () => {
    const [isLogin, setIsLogin] = useState()
    const handleIsLogin = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsLogin(true);
        }else{
            setIsLogin(false);
        }
    };

    useEffect(() => {
        handleIsLogin();
    }, []);

    return (
        <Fragment>
            <Navbar isLogin={isLogin} />
            <Welcome></Welcome>
            <AboutUs></AboutUs>
            <Why></Why>
            <How></How>
            <Certification></Certification>
            <Footer></Footer>
        </Fragment>
    );
};

export default Index;
