import React, { Fragment, useState, useEffect } from 'react';
import Gambar1 from '/logo.png';

const Loading = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <Fragment>
            <div className="modal d-block loading-modal" tabIndex="1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content text-center">
                        <div className="modal-body p-4">
                            <div className="d-flex justify-content-center">
                                <img src={Gambar1} className="img-fluid ps-4" style={{ width: '250px' }} alt="Loading" />
                            </div>
                            <p style={{ fontSize:"18px" }}>Loading{dots}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show"></div>
        </Fragment>
    );
};

export default Loading;
