import React, { useEffect, useState } from 'react';
import api from '../Services/api';

function EmployeeList() {

    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const response = await api.get('employees/');
        setEmployees(response.data);
    };

    const searchEmployees = async (value) => {
        setSearch(value);

        const response = await api.get(`employees/?search=${value}`);
        setEmployees(response.data);
    };

    const deleteEmployee = async (id) => {
        await api.delete(`employees/${id}/`);
        fetchEmployees();
    };
    console.log(employees)

    return (
        <div className="container mt-4">

            <h2 className="mb-4">Employee Management</h2>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search Employee"
                value={search}
                onChange={(e) => searchEmployees(e.target.value)}
            />

            <table className="table table-bordered">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Date of joining</th>
                        <th>Actions</th>
                    </tr>
                </thead>

               <tbody>

                {employees.map((emp) => (

                    <tr key={emp.id}>

                        <td>{emp.id}</td>


                        <td>{emp.values?.[0]?.value}</td>
                <td>{emp.values?.[1]?.value}</td>
                <td>{emp.values?.[2]?.value}</td>

                        <td>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteEmployee(emp.id)}
                            >
                                Delete
                            </button>
                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}

export default EmployeeList;