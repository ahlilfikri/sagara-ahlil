const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

require('dotenv').config();

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Database terhubung');
    }
    ).catch((err) => {
        console.log(err);
    }
    );

const userRouter = require('./routers/user');
const studentRouter = require('./routers/student');

app.use('/user', userRouter);
app.use('/student', studentRouter);

app.listen(process.env.local_port, () => {
    console.log(`Server running on port http://localhost:${process.env.local_port}`);
});
