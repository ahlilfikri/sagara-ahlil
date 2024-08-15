import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Gambar from '/calendar.png';
import Gambar1 from '/dashboard1.png';
import Gambar2 from '/dashboard2.png';
import Gambar3 from '/dashboard3.png';
import Gambar4 from '/dashboard4.png';
import Loading from '../../../shared/modal/loading';
import Modal from '../../../shared/modal/status';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);
    const [success, setSuccess] = useState('');
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalCertifiedStudents, setTotalCertifiedStudents] = useState(0);
    const [groupData, setGroupData] = useState({});

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const token = sessionStorage.getItem('token');
    const port = import.meta.env.VITE_API_URL;

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${port}student`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.data.status === 500) {
                setError('Tidak dapat mengambil data Student, coba muat ulang laman');
            } else {
                const students = response.data.data;
                setData(students);
                setTotalStudents(students.length);
                setTotalCertifiedStudents(students.filter(student => student.status === true).length);

                const groupCounts = {
                    'Front End': 0,
                    'Back End': 0,
                    'Quality Assurance': 0,
                    'UI/UX': 0,
                };

                students.forEach(student => {
                    switch (student.group) {
                        case '1':
                            groupCounts['Front End']++;
                            break;
                        case '2':
                            groupCounts['Back End']++;
                            break;
                        case '3':
                            groupCounts['Quality Assurance']++;
                            break;
                        case '4':
                            groupCounts['UI/UX']++;
                            break;
                        default:
                            break;
                    }
                });

                setGroupData(groupCounts);
            }
        } catch (error) {
            setError('Tidak dapat mengambil data, coba muat ulang laman');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const chartData = {
        labels: ['Back End', 'Front End', 'Quality Assurance', 'UI/UX'],
        datasets: [
            {
                label: 'Number of Students',
                data: Object.values(groupData),
                backgroundColor: '#A41517',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#000', 
                titleColor: '#fff',
                titleFont: {
                    size: 16,
                },
                bodyColor: '#fff',
                bodyFont: {
                    size: 14,
                },
                borderColor: '#fff',
                borderWidth: 1,
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    drawBorder: true,
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };


    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row pt-3">
                    <div className="col-12 col-md-6">
                        <div className="card d-flex align-items-center p-2" style={{ width: "max-content", height: "max-content", flexDirection: 'row' }}>
                            <img className='me-2' src={Gambar} alt="Calendar" style={{ width: '15px', height: '15px' }} />
                            <p className="m-0">Dec 29, 2023 -</p>
                            <p className="m-0 ms-2">{currentDate}</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-end">
                        <div className="card d-flex align-items-center justify-content-end p-2" style={{ width: "max-content", height: "max-content", flexDirection: 'row' }}>
                            <p className="m-0 me-2">Daily</p>
                            <i className="fa-solid fa-caret-down" style={{ fontSize: '16px' }}></i>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-lg-4">
                        <div className="card mt-4">
                            <div className="d-flex justify-content-around p-3">
                                <div className="detail" style={{ width: 'fit-content' }}>
                                    <p style={{ fontSize: '16px', fontWeight: '700' }}>Total Students</p>
                                    <p style={{ fontSize: '24px', fontWeight: '700' }}>{totalStudents}</p>
                                    <div className="d-flex align-items-center">
                                        <img src={Gambar4} className="img-fluid" style={{ width: '20px', height: '12px' }} />
                                        <p className='ps-2 pt-2'><span style={{ color: '#00B69B' }}>8.5%</span> Up from yesterday</p>
                                    </div>
                                </div>
                                <img src={Gambar1} className="img-fluid" style={{ width: '40px', height: '40px' }} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <div className="card mt-4">
                            <div className="d-flex justify-content-around p-3">
                                <div className="detail" style={{ width: 'fit-content' }}>
                                    <p style={{ fontSize: '16px', fontWeight: '700' }}>Total Certified Students</p>
                                    <p style={{ fontSize: '24px', fontWeight: '700' }}>{totalCertifiedStudents}</p>
                                    <div className="d-flex align-items-center">
                                        <img src={Gambar4} className="img-fluid" style={{ width: '20px', height: '12px' }} />
                                        <p className='ps-2 pt-2'><span style={{ color: '#00B69B' }}>8.5%</span> Up from yesterday</p>
                                    </div>
                                </div>
                                <img src={Gambar2} className="img-fluid" style={{ width: '40px', height: '40px' }} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <div className="card mt-4">
                            <div className="d-flex justify-content-around p-3">
                                <div className="detail" style={{ width: 'fit-content' }}>
                                    <p style={{ fontSize: '16px', fontWeight: '700' }}>Average Certification Score</p>
                                    <p style={{ fontSize: '24px', fontWeight: '700' }}>{data.length > 0 ? (totalCertifiedStudents / totalStudents).toFixed(2) : '-'}</p>
                                    <div className="d-flex align-items-center">
                                        <img src={Gambar4} className="img-fluid" style={{ width: '20px', height: '12px' }} />
                                        <p className='ps-2 pt-2'><span style={{ color: '#00B69B' }}>8.5%</span> Up from yesterday</p>
                                    </div>
                                </div>
                                <img src={Gambar3} className="img-fluid" style={{ width: '40px', height: '40px' }} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5 pb-5">
                    <div className="col-12">
                        <div className="card p-4">
                            <p style={{ fontSize: '22px', fontWeight: '700' }}>Student</p>
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Loading />}
            {error && <Modal data={error} status="error" onClose={() => setError('')} />}
            {success && <Modal data={success} status="success" onClose={() => setSuccess('')} />}
        </Fragment>
    );
};

export default Dashboard;
