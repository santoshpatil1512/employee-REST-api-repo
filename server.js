const express = require('express');
const app = express();
const employeeRoutes = require('./employeeRoutes')
require('dotenv').config();

app.use(express.json());
const PORT = process.env.PORT || 3000

app.get('/home', (req, res)=>{
    res.json('Welcome to home home');
});

app.get('/about', (req, res)=>{
    res.json('Welcome to about page');
});

app.use('/emps', employeeRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});  