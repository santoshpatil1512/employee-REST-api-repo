const express = require('express');
const app = express();
const employeeRoutes = require('./employeeRoutes')
require('dotenv').config();

app.use(express.json());
const PORT = process.env.PORT || 3000

app.use('/emps', employeeRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})