import React, { useState } from 'react';

interface Employee {
  id: number;
  name: string;
  email: string;
}

interface Client {
  id: number;
  name: string;
}

interface AccountManagementProps {}

const AccountManagementPage: React.FC<AccountManagementProps> = () => {
  // State for employees, clients, and form inputs
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [clients, _] = useState<Client[]>([]);
  const [newEmployee, setNewEmployee] = useState<{ name: string; email: string }>({ name: '', email: '' });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [selectedClientIds, setSelectedClientIds] = useState<number[]>([]);

  // Handle input changes for new employee
  const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  // Add new employee
  const addEmployee = () => {
    const newId = employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
    const employee = { id: newId, ...newEmployee };
    setEmployees([...employees, employee]);
    setNewEmployee({ name: '', email: '' });
  };

  // Handle client assignment to employee
  const assignClientsToEmployee = () => {
    if (selectedEmployeeId !== null) {
      console.log(`Assigning clients with IDs: ${selectedClientIds} to employee with ID: ${selectedEmployeeId}`);
      // Implement actual assignment logic here
    }
  };

  return (
    <div>
      <h1>Account Management Page</h1>

      {/* Employee Creation Section */}
      <section>
        <h2>Create Employee</h2>
        <input
          type="text"
          name="name"
          value={newEmployee.name}
          placeholder="Employee Name"
          onChange={handleEmployeeChange}
        />
        <input
          type="email"
          name="email"
          value={newEmployee.email}
          placeholder="Employee Email"
          onChange={handleEmployeeChange}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </section>

      {/* Employee List and Client Assignment Section */}
      <section>
        <h2>Assign Clients to Employee</h2>
        <select onChange={(e) => setSelectedEmployeeId(Number(e.target.value))} value={selectedEmployeeId || ''}>
          <option value="" disabled>Select Employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name} {employee.id} {employee.email}
            </option>
          ))}
        </select>

        <div>
          <h3>Select Clients</h3>
          {clients.map((client) => (
            <div key={client.id}>
              <input
                type="checkbox"
                value={client.id}
                onChange={(e) => {
                  const clientId = Number(e.target.value);
                  if (e.target.checked) {
                    setSelectedClientIds([...selectedClientIds, clientId]);
                  } else {
                    setSelectedClientIds(selectedClientIds.filter(id => id !== clientId));
                  }
                }}
              />
              <label>{client.name}</label>
            </div>
          ))}
        </div>

        <button onClick={assignClientsToEmployee}>Assign Clients</button>
      </section>
    </div>
  );
};

export default AccountManagementPage;
