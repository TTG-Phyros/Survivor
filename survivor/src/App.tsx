import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Employee {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  gender: string;
  job: string;
  birthdate: Date;
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Il y a eu une erreur!', error);
      });
  }, []);

  return (
    <main>
      <h1>Liste des employés</h1>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            {employee.firstname} - {employee.email} - {employee.lastname} - {employee.gender} - {employee.job} - {employee.birthdate.toString()}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
