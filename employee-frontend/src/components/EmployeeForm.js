import React, { useState, useEffect } from 'react';
import api from '../Services/api';

function EmployeeForm({ refreshEmployees }) {

    const [fields, setFields] = useState([]);
const [formData, setFormData] = useState({});
 useEffect(() => {
        fetchFields();
    }, []);

    const fetchFields = async () => {

    const response = await api.get('employees/forms/');

    if (response.data.length > 0) {

        setFields(
            response.data[
                response.data.length - 1
            ].fields
        );

    }
};

    const handleChange = (fieldId, value) => {

    setFormData({
        ...formData,
        [fieldId]: value
    });
};


    const handleSubmit = async (e) => {

    e.preventDefault();

    const values = fields.map((field) => ({
        field: field.id,
        value: formData[field.id] || ''
    }));

    const data = {
        values
    };

    await api.post('employees/', data);

    window.location.reload();
};

    return (

    <div className="container mt-4">

        <h2>Create Employee</h2>

        <form onSubmit={handleSubmit}>

            {
            fields.map((field) => (

                <div key={field.id}>

                    <label>{field.label}</label>

                    <input
                        type={field.field_type}
                        className="form-control mb-2"
                        onChange={(e) =>
                            handleChange(
                                field.id,
                                e.target.value
                            )
                        }
                    />

                </div>

            ))
            }

            <button className="btn btn-primary">

                Add Employee

            </button>

        </form>

    </div>

);
}
export default EmployeeForm;