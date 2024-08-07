import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await axios.get('/api/employees');
      setEmployees(res.data);
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/employees/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/employee/${id}`);
  };

  return (
    <div>
      <h1>Employee List</h1>
      {user && user.role === 'admin' && (
        <button onClick={() => navigate('/employee')}>Add Employee</button>
      )}
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.name} - {employee.position} - {employee.department} - {employee.salary}
            {user && user.role === 'admin' && (
              <>
                <button onClick={() => handleEdit(employee._id)}>Edit</button>
                <button onClick={() => handleDelete(employee._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
