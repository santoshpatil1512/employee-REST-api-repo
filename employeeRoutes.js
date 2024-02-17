const express = require('express');
const router = express.Router();
const empController = require('./controller');

router.post('/create', empController.createEmployee );

router.get('/', empController.getAllEmployees);

router.put('/update/:employee_id', empController.updateEmployee );

router.delete('/remove/:employee_id', empController.deleteEmployee );

router.get('/:employee_id', empController.getEmployeeById );

router.get('/department/:department', empController.searchByDept );

router.get('/sort/salary', empController.salarySort );

module.exports = router;
