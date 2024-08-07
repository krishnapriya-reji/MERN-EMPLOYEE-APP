const Employee = require('../models/Employee');

const getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

const createEmployee = async (req, res) => {
  const { name, position, department, salary } = req.body;
  const employee = new Employee({ name, position, department, salary });

  const createdEmployee = await employee.save();
  res.status(201).json(createdEmployee);
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, position, department, salary } = req.body;

  const employee = await Employee.findById(id);

  if (employee) {
    employee.name = name;
    employee.position = position;
    employee.department = department;
    employee.salary = salary;

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  const employee = await Employee.findById(id);

  if (employee) {
    await employee.remove();
    res.json({ message: 'Employee removed' });
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
};

module.exports = { getEmployees, createEmployee, updateEmployee, deleteEmployee };
