import React from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import FormBuilder from './components/FormBuilder';

function App() {

  return (
    <div>

      <FormBuilder />
      
      <EmployeeForm />

      <EmployeeList />

     

    </div>
  );
}

export default App;