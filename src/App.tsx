import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { fetchEmployees, fetchEmployeeByID } from './api/Api';
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
    fetchEmployeeByID(2)
      .then(data => {
        setEmployees(data);
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
            {employee.firstname} - {employee.email} - {employee.lastname} - {employee.gender} - {employee.job} - {moment(employee.birthdate).format('DD/MM/YYYY')}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
