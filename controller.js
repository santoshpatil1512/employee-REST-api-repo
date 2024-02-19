const db = require('./database');

  const createEmployee= async(req, res) => {
    try {
        const { employee_id, first_name, last_name, department, Address, dob, salary } = req.body;

        const insertQuery = `INSERT INTO employees (employee_id, first_name, last_name, department, Address, dob, salary)
                             VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const values = [employee_id, first_name, last_name, department, Address, dob, salary];

        // await db.query(insertQuery, values);
        const result = await db.query(insertQuery, values);
        res.json({ message: 'Employee created successfully.', result });
    } catch (error) {
        res.status(500).json({ error: 'Error creating employee.' });
    }
}

const getAllEmployees = async (req, res) => {
    try {
        const selectQuery = `SELECT * FROM employees`;
        const [rows] = await db.query(selectQuery);
        res.json(rows);
        console.log(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching employees.' });
    }
}

const updateEmployee = async (req, res) => {
    try {
        const { employee_id } = req.params;
        const { first_name, last_name, department, Address, dob, salary } = req.body;

        const updateQuery = `UPDATE employees 
                             SET first_name = ?, last_name = ?, department = ?, Address = ?, dob = ?, salary = ?
                             WHERE employee_id = ?`;

        const values = [first_name, last_name, department, Address, dob, salary, employee_id];

        const result = await db.query(updateQuery, values);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found.' });
        }
        res.json({ message: 'Employee updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating employee.' });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const { employee_id } = req.params;
        const deleteQuery = `DELETE FROM employees WHERE employee_id = ?`;

        const result = await db.query(deleteQuery, [ ]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found.' });
        }

        res.json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting employee.' });
    }
}

const getEmployeeById = async (req, res) => {
    try {
        const { employee_id } = req.params;
        const selectQuery = `SELECT * FROM employees WHERE employee_id = ?`;
        const [rows] = await db.query(selectQuery, [employee_id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Employee not found.' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching for employee.' });
    }
}

const searchByDept = async (req, res) => {
    try {
        const { department } = req.params;
        const selectQuery = `SELECT * FROM employees WHERE department = ?`;
        const [rows] = await db.query(selectQuery, [department]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error filtering employees by department.' });
    }
}

const salarySort = async (req, res) => {
    try {
        const selectQuery = `SELECT * FROM employees ORDER BY salary DESC`;
        const rows = await db.query(selectQuery);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sorting employees by salary.' });
    }
}

module.exports = { 
                   getAllEmployees, 
                   getEmployeeById, 
                   createEmployee, 
                   updateEmployee, 
                   deleteEmployee,
                   searchByDept,
                   salarySort 
                };