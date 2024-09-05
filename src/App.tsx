import React, { useEffect, useState } from 'react';
import moment from 'moment';
import * as api from'./api/Api';
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
    // fetchDistantEmployees().catch(error => {
    //   console.error('Il y a eu une erreur!', error);
    // });
    // fetchDistantCustomers().catch(error => {
    //   console.error('Il y a eu une erreur!', error);
    // });
    // fetchDistantClothes().catch(error => {
    //   console.error('Il y a eu une erreur!', error);
    // });
    // fetchEmployees()
    //   .then(data => {
    //     setEmployees(data);
    //   })
    //   .catch(error => {
    //     console.error('Il y a eu une erreur!', error);
    //   });
    // connectEmployee();
    // disconnectEmployee();
    // fetchEmployees()
    // .then(data => {
    //   setEmployees(data);
    // })
    // .catch(error => {
    //   console.error('Il y a eu une erreur!', error);
    // });
    // fetchDistantEmployeesImages();
    // getEmployeeImage();   // fetchDistantEmployees().catch(error => {
    //   console.error('Il y a eu une erreur!', error);
    // });
    // fetchDistantCustomers().catch(error => {
    //   console.error('Il y a eu une erreur!', error);
    // });
    // fetchDistantClothes().catch(error => {
    //   console.error('Il y a eu une erreur!', error);
    // });
    // api.connectEmployee("jeanne.martin@soul-connection.fr", "naouLeA82oeirn");
    // api.disconnectEmployee();
    api.fetchEmployees()
      .then(data => {
        setEmployees(data);
      })
      .catch(error => {
        console.error('Il y a eu une erreur!', error);
      });
    // api.fetchDistantEvents();
    // fetchEmployees()
    // .then(data => {
    //   setEmployees(data);
    // })
    // .catch(error => {
    //   console.error('Il y a eu une erreur!', error);
    // });
    // api.fetchDistantEmployeesImages();
    // api.fetchDistantCustomersImages();
    // api.fetchDistantClothesImages();
    // getEmployeeImage();

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
