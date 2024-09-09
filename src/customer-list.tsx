import "./customer-list.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers, disconnectEmployee } from './api/Api';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const CustomersList: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isRemoveCustomerModalOpen, setIsRemoveCustomerModalOpen] = useState<boolean>(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustomers();
        if (response && response.value) {
          setCustomers(response.value);
        } else {
          console.log(response);
          setError('Aucune donnée de client disponible');
        }
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
        setError('Erreur lors de la récupération des clients');
        setLoading(false);
      }
    };

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewCustomer(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("New customer data:", newCustomer);
    setIsFormOpen(false);
  };

  const handleRemoveCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsRemoveCustomerModalOpen(true);
  };

  const handleRemoveCustomerSubmit = () => {
    if (selectedCustomer) {
      console.log(`Removing customer: ${selectedCustomer.name}`);
    }
    setIsRemoveCustomerModalOpen(false);
  };

  const navigate = useNavigate();

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="customers-list-container">
      <header className="navbar">
        <div className="navbar-logo">Soul Connection</div>
        <nav className="navbar-links">
          <button className="navbar-link" onClick={() => {navigate("/dashboard"); window.location.reload()}}>Dashboard</button>
          <button className="navbar-link" onClick={() => {navigate("/coaches"); window.location.reload()}}>Coaches</button>
          <button className="navbar-link active" onClick={() => {navigate("/customers"); window.location.reload()}}>Customers</button>
          <button className="navbar-link" onClick={() => {navigate("/tips"); window.location.reload()}}>Tips</button>
          <button className="navbar-link" onClick={() => {navigate("/events"); window.location.reload()}}>Events</button>
          <button className="navbar-link" onClick={() => {navigate("/clothes"); window.location.reload()}}>Clothes</button>
          <button className="navbar-link" onClick={() => {navigate("/compatibility"); window.location.reload()}}>Compatibility</button>
        </nav>
        <div className="navbar-actions">
          <button className="navbar-icon">🔔</button>
          <button className="navbar-icon">🇺🇸</button>
          <button className="navbar-icon" onClick={() => { disconnectEmployee(); window.location.reload()}}>👤</button>
        </div>
      </header>
      <main className="customers-list-main">
        <h1 className="title-of-page">Customers List</h1>
        <p className="customers-list-subtitle">
          You have a total of {filteredCustomers.length} customers.
        </p>

        <div className="coaches-list-actions">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input2"
          />
          <button className="add-button" onClick={() => setIsFormOpen(true)}>
            Add new customer +
          </button>
        </div>

        <ul className="customers-list">
          {filteredCustomers.map(customer => (
            <li key={customer.id} className="customer-item">
              <div className="customer-info">
                <div className="customer-name">{customer.name}</div>
                <div className="customer-email">{customer.email}</div>
                <div className="customer-phone">{customer.phone}</div>
              </div>
              <div className="customer-actions">
                <button
                  className="actions-button"
                  onClick={() => handleRemoveCustomerClick(customer)}
                >
                  ⋮
                </button>
              </div>
            </li>
          ))}
        </ul>

        {isFormOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add New Customer</h2>
              <form onSubmit={handleFormSubmit} className="customer-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newCustomer.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newCustomer.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={newCustomer.phone}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="button" onClick={() => setIsFormOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit">Add Customer</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isRemoveCustomerModalOpen && (
          <div className="modal">
            <div className="modal-content2">
              <h2>Remove Customer</h2>
              {selectedCustomer && (
                <div>
                  <p>
                    Are you sure you want to remove {selectedCustomer.name}?
                  </p>
                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={() => setIsRemoveCustomerModalOpen(false)}
                      className="close-button"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveCustomerSubmit}
                      className="close-button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CustomersList;
