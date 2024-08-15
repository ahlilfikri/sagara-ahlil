const mongoose = require("mongoose");
const studentModel = require("../models/student");
const response = require("../respons/response_valid");

module.exports = {
    get: async (req, res) => {
        try {
            const content = await studentModel.find();

            return response(200, content, 'Menampilkan Semua Student', res);
        } catch (err) {
            console.error(err.message);
            return response(500, err, 'Internal server error \n Gagal menampilkan Student', res);
        }
    },

    getFilter: async (req, res) => {
        try {
            const { name, email, phone, instance, page = 1, limit = 10 } = req.query;

            let filter = {};

            if (name) {
                filter.name = { $regex: name, $options: 'i' };
            }
            if (email) {
                filter.email = { $regex: email, $options: 'i' };
            }
            if (phone) {
                filter.phone = { $regex: phone, $options: 'i' };
            }
            if (instance) {
                filter.instance = { $regex: instance, $options: 'i' };
            }

            const skip = (page - 1) * limit;
            const content = await studentModel.find(filter).skip(skip).limit(parseInt(limit));
            const totalItems = await studentModel.countDocuments(filter);
            return response(200, { data: content, totalItems, currentPage: page, totalPages: Math.ceil(totalItems / limit) }, 'Menampilkan Semua Student', res);
        } catch (err) {
            console.error(err.message);
            return response(500, err, 'Internal server error \n Gagal menampilkan Student', res);
        }
    },


    getOne: async (req, res) => {
        const id = req.params._id;
        try {
            const content = await studentModel.findById(id);

            if (!content) {
                return response(404, null, 'Student Tidak Ditemukan', res);
            }
            return response(200, content, 'Menampilkan Student', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error \n gagal menampilkan Student', res);
        }
    },

    post: async (req, res) => {
        try {
            const { name, email, phone, instance, status, group } = req.body;

            const newStudent = new studentModel({
                name, email, phone, instance, status, group
            });

            await newStudent.save();
            return response(200, newStudent, 'Student Berhasil Ditambahkan', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'Internal server error', res);
        }
    },

    put: async (req, res) => {
        const id = req.params._id;
        try {
            const { name, email, phone, instance, status, group } = req.body;
            let dataUpdates = { name, email, phone, instance, status, group };
            const result = await studentModel.findByIdAndUpdate(id, dataUpdates, { new: true });
            return response(200, result, 'Student Berhasil Diupdate', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'Internal server error', res);
        }
    },


    delete: async (req, res) => {
        const id = req.params._id;
        try {
            const deleteSchema = await studentModel.findByIdAndDelete(id);
            if (!deleteSchema) {
                response(404, null, 'Student tidak ditemukan', res);
                return;
            }
            response(200, deleteSchema, 'Student berhasil dihapus', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'Internal server error', res);
        }
    }
};
