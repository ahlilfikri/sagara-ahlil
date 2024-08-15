import React from 'react';
import Color from '../color'
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="d-flex justify-content-between align-items-center">
            <button
                className="btn text-light"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ fontSize: '18px', backgroundColor:Color.color1 }}
            >
                Previous
            </button>
            <div >
                {pages.map(page => (
                    <button
                        key={page}
                        className={`btn`}
                        onClick={() => onPageChange(page)}
                        style={{ margin: '0 5px', fontSize: '18px', backgroundColor: currentPage === page ? Color.color1 : 'white', color: currentPage === page ? 'white' : Color.color2   }}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <button
                className="btn text-light"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ fontSize: '18px', backgroundColor:Color.color1 }}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
