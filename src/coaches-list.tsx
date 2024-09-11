import "./coaches-list.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "./api/Api";
import Navbar from "./Navbar";

interface Coach {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  numberOfCustomers?: number;
}

interface Customer {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  astrological_sign: string;
}

interface Relation {
  id: number;
  customer_id: number;
  coach_id: number;
  update_date: string;
}

const CoachesList: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState<number | null>(null);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isRemoveCustomerModalOpen, setIsRemoveCustomerModalOpen] = useState<boolean>(false);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState<boolean>(false);
  const [isRemoveEmployeeModalOpen, setIsRemoveEmployeeModalOpen] = useState<boolean>(false);
  const [isRemoveEmployeeModalConfirmationOpen, setIsRemoveEmployeeModalConfirmationOpen] = useState<boolean>(false);
  const [newCoach, setNewCoach] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    birthdate: "",
    phone:"",
    gender: "",
    job : ""
  });
  const [currentCoachRelationList, setCurrentCoachRelationList] = useState<Relation[] | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [selectedEmployee, setSelectedEmployee] = useState<Coach | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [customerSearchQuery, setCustomerSearchQuery] = useState<string>("");
  const [sortType, setSortType] = useState<"alphabetical" | "byCustomers">(
    "alphabetical"
  );
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoaches = async () => {
    try {
      const response = await api.getCoaches();
      if (response && response.value) {
        const coachesList: [] = response.value;
        await coachesList.map(async (coach: Coach) => {
          const relations = await api.getEmployeeRelations(coach.id);
          coach.numberOfCustomers = relations.length;
          return coach;
        });
        setCoaches(response.value);
        setLoading(false);
      } else {
        setError("Aucune donnée de coach disponible");
        setLoading(false);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des coachs:", error);
      setError("Erreur lors de la récupération des coachs");
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await api.getCustomersBasicInfos();
      if (response) {
        setCustomers(response);
      } else {
        setError("Aucune donnée de customers disponible");
      }
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des customers:", error);
      setError("Erreur lors de la récupération des customers");
      setLoading(false);
    }
  };

  const fetchCurrentCoachRelations = async (coach: Coach | null) => {
    if (!coach) {
      return;
    }
    try {
      const response = await api.getEmployeeRelations(coach.id);
      console.log(response);
      if (response) {
        setCurrentCoachRelationList(response);
      } else {
        setError("Aucune donnée de relations disponible");
      }
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des customers:", error);
      setError("Erreur lors de la récupération des customers");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoaches()
    fetchCustomers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".actions-cell")) {
        setMenuVisible(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSortChange = () => {
    setSortType((prev) =>
      prev === "alphabetical" ? "byCustomers" : "alphabetical"
    );
  };

  const handleMenuClick = (id: number) => {
    setMenuVisible(menuVisible === id ? null : id);
  };

  const handleCustomerModalClose = () => {
    setIsCustomerModalOpen(false);
  };

  const handleRemoveCustomerModalClose = () => {
    setIsRemoveCustomerModalOpen(false);
  };

  const handleAddedEmployeeConfirmation = () => {
    setIsAddEmployeeModalOpen(false);
  };

  const handleRemoveEmployeeModalClose = () => {
    setIsRemoveEmployeeModalOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCustomerSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerSearchQuery(event.target.value);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      (customer.firstname + " " + customer.lastname).toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
      customer.email
        .toLowerCase()
        .includes(customerSearchQuery.toLowerCase()) ||
      customer.phone_number.includes(customerSearchQuery)
  );

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setNewCoach((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("New coach data:", newCoach);
    api.addEmployee(newCoach)
    setIsFormOpen(false);
    setIsAddEmployeeModalOpen(true);
    fetchCoaches();
  };

  const handleAddCustomerClick = (coach: Coach) => {
    fetchCurrentCoachRelations(coach);
    setSelectedEmployee(coach);
    setIsCustomerModalOpen(true);
    setMenuVisible(null);
  };

  const handleRemoveEmployeeClick = (employee: Coach) => {
    setSelectedEmployee(employee);
    setIsRemoveEmployeeModalOpen(true);
  };

  const handleRemoveEmployeeClickConfirmed = (employee: Coach) => {
    api.removeEmployee(employee.id);
    setSelectedEmployee(null);
    setIsRemoveEmployeeModalOpen(false);
    setIsRemoveEmployeeModalConfirmationOpen(true);
    fetchCoaches();
  };

  const handleRemoveCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsRemoveCustomerModalOpen(true);
  };

  const handleAddCustomerToCoachClick = (customer: Customer) => {
    api.addEmployeeCustomerRelation(selectedEmployee?.id, customer?.id).then(() => {
      fetchCurrentCoachRelations(selectedEmployee);
    });
  };

  const handleRemoveCustomerSubmit = () => {
    api.removeEmployeeCustomerRelation(selectedEmployee?.id, selectedCustomer?.id).then(() => {
      fetchCurrentCoachRelations(selectedEmployee);
    });
    setIsRemoveCustomerModalOpen(false);
  };

  const handleActionClick = (action: string, coach: Coach) => {
    if (action === "Delete Coach") {
      handleRemoveEmployeeClick(coach)
    }
  };

  const sortedCoaches = [...coaches].sort((a, b) => {
    if (sortType === "alphabetical") {
      return a.firstname.localeCompare(b.firstname);
    } else if (
      sortType === "byCustomers" &&
      a.numberOfCustomers &&
      b.numberOfCustomers
    ) {
      return b.numberOfCustomers - a.numberOfCustomers;
    }
    return 0;
  });

  const filteredCoaches = sortedCoaches.filter(
    (coach) =>
      coach.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="container">
      <Navbar />
      <main className="coaches-list-main">
        <h1 className="title-of-page">Coaches List</h1>
        <p className="coaches-list-subtitle">
          You have a total of {filteredCoaches.length} coaches.
        </p>

        <div className="coaches-list-actions">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <div className="alinbuttondt">
            <button className="add-button" onClick={() => setIsFormOpen(true)}>
              Add new coach +
            </button>
            <button className="sort-button" onClick={handleSortChange}>
              Sort by{" "}
              {sortType === "alphabetical"
                ? "Number of Customers"
                : "Alphabetical"}
            </button>
          </div>
        </div>

        <table className="coaches-list-table">
          <thead>
            <tr>
              <th>Coach</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Number of customers</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoaches.map((coach) => (
              <tr key={coach.id}>
                <td>
                  {coach.firstname} {coach.lastname}
                </td>
                <td>{coach.email}</td>
                <td>{coach.phone || "N/A"}</td>
                <td>{coach.numberOfCustomers || "0"}</td>
                <td className="actions-cell">
                  <button
                    className="actions-button"
                    onClick={() => handleMenuClick(coach.id)}
                  >
                    ⋮
                  </button>
                  {menuVisible === coach.id && (
                    <div className="actions-menu">
                      <button onClick={() => handleAddCustomerClick(coach)}>
                        Add / Remove Customer
                      </button>
                      <button
                        onClick={() => handleActionClick("Delete Coach", coach)}
                      >
                        Delete Coach
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isCustomerModalOpen && (
          <div className="modal2">
            <div className="modal-content2">
              <h2>Customer List</h2>

              <input
                type="text"
                placeholder="Search customers..."
                value={customerSearchQuery}
                onChange={handleCustomerSearchChange}
                className="search-input2"
              />

              <ul>
                {filteredCustomers.map((customer) => (
                  <li key={customer.id}>
                    <div className="customer-info">
                      <div className="customer-name">{customer.firstname + " " + customer.lastname}</div>
                      <div className="customer-email">{customer.email}</div>
                      <div className="customer-phone">{customer.phone_number}</div>
                    </div>
                    <div className="customer-actions">
                      {currentCoachRelationList?.some((relation: Relation) => relation.customer_id === customer.id) ? (
                        <button
                          onClick={() => handleRemoveCustomerClick(customer)}
                        >
                          Remove
                        </button>
                      ): (
                        <button
                          onClick={() => handleAddCustomerToCoachClick(customer)}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <button className="close-button" onClick={handleCustomerModalClose}>
              X
            </button>
          </div>
        )}

        {isFormOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add New Coach</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={newCoach.firstname}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={newCoach.lastname}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newCoach.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone number</label>
                  <input
                    type="text"
                    name="phone"
                    value={newCoach.phone}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={newCoach.address}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Birthdate</label>
                  <input
                    type="date"
                    name="birthdate"
                    value={newCoach.birthdate}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>job</label>
                  <select
                    name="job"
                    value={newCoach.job}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select Job</option>
                    <option value="Coach">Coach</option>
                    <option value="COO">COO</option>
                    <option value="Sales Representative">Sales Representative</option>
                    <option value="Sales Manager">Sales Manager</option>
                    <option value="Marketing Specialist">Marketing Specialist</option>
                    <option value="Financial Analyst">Financial Analyst</option>
                    <option value="VP of Marketing">VP of Marketing</option>
                    <option value="CTO">CTO</option>
                    <option value="CEO">CEO</option>
                    <option value="Finance Manager">Finance Manager</option>
                    <option value="Marketing Manager">Marketing Manager</option>
                  </select>
                  </div>
                <div className="form-group">
                  <label>gender</label>
                  <textarea
                    name="gender"
                    value={newCoach.gender}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-actions">
                  <button type="button" onClick={() => setIsFormOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit">Add Coach</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isRemoveCustomerModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Remove Customer</h2>
              {selectedCustomer && (
                <div>
                  <p>
                    Are you sure you want to remove {selectedCustomer.firstname + " " + selectedCustomer.lastname}?
                  </p>
                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={handleRemoveCustomerModalClose}
                    >
                      Cancel
                    </button>
                    <button type="button" onClick={handleRemoveCustomerSubmit}>
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {isAddEmployeeModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Employee Added</h2>
                <div>
                  <p>
                    Employee has been added
                  </p>
                  <div className="form-actions">
                    <button type="button" onClick={handleAddedEmployeeConfirmation}>
                      Ok
                    </button>
                  </div>
                </div>
            </div>
          </div>
        )}

        {isRemoveEmployeeModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Remove Employee</h2>
              {selectedEmployee && (
                <div>
                  <p>
                    Are you sure you want to remove {selectedEmployee.firstname} {selectedEmployee.lastname} ?
                  </p>
                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={handleRemoveEmployeeModalClose}
                    >
                      Cancel
                    </button>
                    <button type="button" onClick={() => handleRemoveEmployeeClickConfirmed(selectedEmployee)}>
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {isRemoveEmployeeModalConfirmationOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Employee Removed</h2>
                <div>
                  <p>
                    Employee has been removed
                  </p>
                  <div className="form-actions">
                    <button type="button" onClick={() => setIsRemoveEmployeeModalConfirmationOpen(false)}>
                      Ok
                    </button>
                  </div>
                </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CoachesList;
