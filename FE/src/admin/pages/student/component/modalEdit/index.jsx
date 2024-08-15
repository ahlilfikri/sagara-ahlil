import React, { useState, useEffect, Fragment } from 'react';
import Color from '../../../../../shared/color'

const ModalEdit = ({ show, handleClose, handleSave, data }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        instance: '',
        status: 'not certified',
        group: '1',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (data) {
            setFormData({
                id: data?._id || '',
                name: data?.name || '',
                email: data?.email || '',
                phone: data?.phone || '',
                instance: data?.instance || '',
                status: data?.status ? 'certified' : 'not certified',
                group: data?.group || '1',
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        const fieldNames = {
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            instance: 'Instance',
            status: 'Status',
            group: 'Group',
        };

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailRegex.test(value)) {
                newErrors[name] = 'Invalid email address';
            } else {
                delete newErrors[name];
            }
        } else if (!value) {
            newErrors[name] = `${fieldNames[name]} is required`;
        } else {
            delete newErrors[name];
        }

        setErrors(newErrors);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        if (!formData.instance) newErrors.instance = 'Instance is required';
        if (!formData.status) newErrors.status = 'Status is required';
        if (!formData.group) newErrors.group = 'Group is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const updatedFormData = {
                ...formData,
                status: formData.status === 'certified',
            };
            handleSave(updatedFormData);
        }
    };

    if (!show) return null;

    return (
        <Fragment>
            <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Data</h5>
                            <button type="button" className="close" onClick={handleClose}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                            <form>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12 col-md-6 mt-2">
                                            <div className="form-group">
                                                <label>Full Name</label>
                                                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                                                {errors.name && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.name}</div>}
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 mt-2">
                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                                                {errors.email && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.email}</div>}
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 mt-2">
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
                                                {errors.phone && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.phone}</div>}
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 mt-2">
                                            <div className="form-group">
                                                <label>Instance</label>
                                                <input type="text" name="instance" className="form-control" value={formData.instance} onChange={handleChange} required />
                                                {errors.instance && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.instance}</div>}
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 mt-2">
                                            <div className="form-group">
                                                <label>Status</label>
                                                <select name="status" className="form-control" value={formData.status} onChange={handleChange} required >
                                                    <option value="certified">Certified</option>
                                                    <option value="not certified">Not Certified</option>
                                                </select>
                                                {errors.status && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.status}</div>}
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 mt-2">
                                            <div className="form-group">
                                                <label>Group</label>
                                                <select name="group" className="form-control" value={formData.group} onChange={handleChange} required  >
                                                    <option value="1">Front End Developer</option>
                                                    <option value="2">Back End Developer</option>
                                                    <option value="3">Quality Assurance</option>
                                                    <option value="4">UI/UX Design</option>
                                                </select>
                                                {errors.group && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.group}</div>}
                                            </div>
                                        </div>
                                        <div className="col-12 mt-2">
                                            <div className="form-group">
                                                <label>Image</label>
                                                <input type="file" name="instance" className="form-control"  required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn text-light" style={{ backgroundColor:Color.color3 }} onClick={handleClose}>
                                Close
                            </button>
                            <button type="button" className="btn text-light" style={{ backgroundColor:Color.color1 }} onClick={handleSubmit}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show"></div>
        </Fragment>
    );
};

export default ModalEdit;
