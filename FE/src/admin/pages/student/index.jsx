import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../../shared/modal/loading';
import Modal from '../../../shared/modal/status';
import EditModal from './component/modalEdit';
import AddStudentModal from './component/modalAdd';
import DeleteModal from '../../../shared/modal/delete';
import useDebounce from '../../../shared/debouncedValue';
import Pagination from '../../../shared/pagination';
import Gambar from '/delete.png';
import Gambar1 from '/edit.png';
import Gambar2 from '/profile1.png';
import Gambar3 from '/filter.png';
import Gambar4 from '/search.png';
import Gambar5 from '/setting.png';
import Color from '../../../shared/color'

const Student = () => {
    const port = `${import.meta.env.VITE_API_URL}`;
    const [data, setData] = useState([]);
    const [filterActive, setfilterActive] = useState('phone');
    const token = sessionStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        name: '',
        email: '',
        phone: '',
        instance: '',
        status: '',
        group: '',
    });
    const debouncedSearch = useDebounce(search, 1500);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;
    const [selectedColumns, setSelectedColumns] = useState({
        name: true,
        email: true,
        phone: true,
        instance: true,
        status: true,
        createdAt: true,
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${port}student/filter`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                params: {
                    name: debouncedSearch,
                    email: filters.email,
                    phone: filters.phone,
                    instance: filters.instance,
                    page: currentPage,
                    limit: itemsPerPage
                }
            });
            if (response.data.status === 500) {
                setError('Tidak dapat mengambil data student, coba muat ulang laman');
            } else {
                setData(response.data.data.data);
                setTotalPages(response.data.data.totalPages);
            }
        } catch (error) {
            setError('Tidak dapat mengambil data, coba muat ulang laman');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token, debouncedSearch, currentPage]);

    const handleEditClick = (student) => {
        setSelectedStudent({ ...student });
        setShowEditModal(true);
    };

    const handleSaveChanges = async (updatedStudent) => {
        setShowEditModal(false);
        setLoading(true);
        try {
            const response = await axios.put(`${port}student/${updatedStudent.id}`, updatedStudent, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status === 500) {
                setError('Tidak dapat menyimpan perubahan, coba lagi');
            } else {
                setSuccess('Data berhasil diperbarui');
            }
        } catch (error) {
            setError('Tidak dapat menyimpan perubahan, coba lagi');
        } finally {
            setLoading(false);
            fetchData();
        }
    };

    const handleAddStudentClick = () => {
        setShowAddStudentModal(true);
    };

    const handleSaveNewStudent = async (NewStudent) => {
        setShowAddStudentModal(false);
        setLoading(true);

        try {
            const response = await axios.post(`${port}student`, NewStudent, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status === 500) {
                setError('Tidak dapat menambahkan student, coba lagi');
            } else {
                setSuccess('Student berhasil ditambahkan');
            }
        } catch (error) {
            setError('Tidak dapat menambahkan student, coba lagi');
        } finally {
            setLoading(false);
            fetchData();
        }
    };

    const handleDeleteClick = (student) => {
        setSelectedStudent(student);
        setShowDeleteModal(true);
    };

    const handleDeleteStudent = async () => {
        setShowDeleteModal(false);
        setLoading(true);
        try {
            const response = await axios.delete(`${port}student/${selectedStudent._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.status === 500) {
                setError('Tidak dapat menghapus student, coba lagi');
            } else {
                setSuccess('Student berhasil dihapus');
            }
        } catch (error) {
            setError('Tidak dapat menghapus student, coba lagi');
        } finally {
            setLoading(false);
            fetchData();
        }
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setError('');
        setSuccess('');
    };

    const handleCloseAddStudentModal = () => {
        setShowAddStudentModal(false);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleInputChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleFilterApply = () => {
        fetchData();
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFilterActiveChange = (e) => {
        setfilterActive(e.target.value);
    };

    const handleColumnToggle = (e) => {
        setSelectedColumns({
            ...selectedColumns,
            [e.target.name]: e.target.checked
        });
    };

    return (
        <Fragment>
            <div className="container-fluid pt-4">
                <div className="row">
                    <div className="col-12">
                        <div className="p-4">
                            <h1 className="mb-4">Daftar Student</h1>
                            <div className="row">
                                <div className="col-12 col-md-6 d-flex align-items-center">
                                    <div className="dropdown me-2">
                                        <button className="btn" style={{ border: '1px solid #D0D5DD' }} type="button" id="filterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src={Gambar3} style={{ width: '24px', height: '24px' }} alt="" />
                                            Filters
                                        </button>
                                        <div className="dropdown-menu p-3" aria-labelledby="filterDropdown" style={{ width: '215px' }}>
                                            <div className="col-12">
                                                <div className="mb-3">
                                                    <select name="status" className="form-control" onChange={e => handleFilterActiveChange(e)} >
                                                        <option value="phone">phone</option>
                                                        <option value="email">email</option>
                                                        <option value="instance">instance</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="mb-3">
                                                    <input type="text" className="form-control" placeholder="Is" name="group" vlaue="is" disabled />
                                                </div>
                                            </div>
                                            {filterActive == 'email' &&
                                                (<div className="col-12">
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" placeholder="Enter Condition" name="email" value={filters.email} onChange={handleInputChange} />
                                                    </div>
                                                </div>)
                                            }
                                            {filterActive == 'phone' &&
                                                (<div className="col-12">
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" placeholder="Enter Condition" name="phone" value={filters.phone} onChange={handleInputChange} />
                                                    </div>
                                                </div>)
                                            }
                                            {filterActive == 'instance' &&
                                                (<div className="col-12">
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" placeholder="Enter Condition" name="instance" value={filters.instance} onChange={handleInputChange} />
                                                    </div>
                                                </div>)
                                            }
                                            <button className="btn text-light w-100" style={{ backgroundColor: Color.color1 }} onClick={handleFilterApply}>Add Filter</button>
                                        </div>
                                    </div>
                                    <button className="btn text-light" style={{ backgroundColor: Color.color1 }} onClick={handleAddStudentClick}>Tambah Student</button>
                                </div>
                                <div className="col-12 col-md-6 d-flex align-items-center justify-content-end">
                                    <div className="me-2 d-flex align-items-center px-2" style={{ backgroundColor: '#fff', border: '1px solid #ced4da', borderRadius: '.25rem' }}>
                                        <img src={Gambar4} style={{ width: '24px', height: '24px', marginRight: '8px' }} alt="" />
                                        <input type="text" className="form-control border-0" placeholder="Search" value={search} onChange={handleSearchChange} />
                                    </div>

                                    <div className="dropdown">
                                        <button className="btn " style={{ border: '1px solid #D0D5DD' }} type="button" id="filterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src={Gambar5} style={{ width: '24px', height: '24px' }} alt="" />
                                        </button>
                                        <div className="dropdown-menu p-3" aria-labelledby="filterDropdown">
                                            {Object.keys(selectedColumns).map((column) => (
                                                <div className="form-check" key={column}>
                                                    <input className="form-check-input" type="checkbox" name={column} checked={selectedColumns[column]} onChange={handleColumnToggle} />
                                                    <label className="form-check-label">
                                                        {column.charAt(0).toUpperCase() + column.slice(1)}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="p-4 bg-white rounded shadow-sm">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            {selectedColumns.name && <th>Full Name</th>}
                                            {selectedColumns.email && <th>Email Address</th>}
                                            {selectedColumns.phone && <th>Phone Number</th>}
                                            {selectedColumns.instance && <th>Instance</th>}
                                            {selectedColumns.status && <th>Status</th>}
                                            {selectedColumns.createdAt && <th>Created At</th>}
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((student, index) => (
                                            <tr key={student._id}>
                                                <td><img src={Gambar2} style={{ width: '40px', height: '40px' }} alt="" /></td>
                                                {selectedColumns.name && <td>{student.name}</td>}
                                                    {selectedColumns.email && <td>{student.email}</td>}
                                                    {selectedColumns.phone && <td>{student.phone}</td>}
                                                    {selectedColumns.instance && <td>{student.instance}</td>}
                                                    {selectedColumns.status && <td>{student.status ? 'certified' : 'not certified'}</td>}
                                                    {selectedColumns.createdAt && <td>{new Date(student.createdAt).toLocaleDateString()}</td>}
                                                <td>
                                                    <div className="d-flex">
                                                        <button className="btn me-2 w-fit" onClick={() => handleEditClick(student)}>
                                                            <img src={Gambar1} style={{ width: '16px', height: '16px' }} alt="" />
                                                        </button>
                                                        <button className="btn w-fit" onClick={() => handleDeleteClick(student)}>
                                                            <img src={Gambar} style={{ width: '16px', height: '16px' }} alt="" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {data.length > 0 && (
                                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Loading />}
            {error && <Modal data={error} status={'error'} onClose={handleCloseModal} />}
            {success && <Modal data={success} status={'success'} onClose={handleCloseModal} />}
            {showEditModal && (
                <EditModal show={showEditModal} handleClose={handleCloseModal} data={selectedStudent} handleSave={handleSaveChanges} />
            )}

            {showAddStudentModal && (
                <AddStudentModal show={showAddStudentModal} handleClose={handleCloseAddStudentModal} handleSave={handleSaveNewStudent} />
            )}

            {showDeleteModal && (
                <DeleteModal show={showDeleteModal} data={`${selectedStudent?.name}?`} handleDelete={handleDeleteStudent} handleClose={handleCloseDeleteModal} />
            )}
        </Fragment>
    );
};

export default Student;
