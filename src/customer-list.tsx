import "./coaches-list.css";
import React, { useState, useEffect } from "react";
import * as api from "./api/Api";
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';

interface Customer {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  image?: string;
}

const CustomersList: React.FC = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isRemoveCustomerModalOpen, setIsRemoveCustomerModalOpen] =
    useState<boolean>(false);
  const [isRemoveCustomerConfirmationModalOpen, setIsRemoveCustomerConfirmationModalOpen] =
    useState<boolean>(false);
  const [isAddCustomerConfirmationModalOpen, setIsAddCustomerConfirmationModalOpen] =
    useState<boolean>(false);
  const [newCustomer, setNewCoach] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    birthdate: "",
    description: "",
    gender: "",
    astrological_sign: "",
    phone_number: "",
  });
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortType, setSortType] = useState<"alphabetical" | "byCustomers">(
    "alphabetical"
  );
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = async () => {
    try {
      const response = await api.getCustomers();
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

  useEffect(() => {
    fetchCustomers();
    setFilteredCustomers(filterCustomerSearch());
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

  const handleRemoveCustomerModalClose = () => {
    setIsRemoveCustomerModalOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setFilteredCustomers(filterCustomerSearch());
  };

  const sortCustomerSearch = () => {
    return customers.sort((a, b) => {
      if (sortType === "alphabetical") {
        return (a.firstname + " " + a.lastname).localeCompare(b.firstname);
      }
      return 0;
    });
  };

  const filterCustomerSearch = () => {
    return sortCustomerSearch().filter(
    (customer) =>
      customer.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  )};

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewCoach((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await api.addCustomer(newCustomer);
    setIsFormOpen(false);
    fetchCustomers();
    setIsAddCustomerConfirmationModalOpen(true);
  };

  const handleRemoveCustomerSubmit = async () => {
    if (selectedCustomer) {
      try {
        await api.removeCustomer(selectedCustomer.id);
        setSelectedCustomer(null);
        setIsRemoveCustomerModalOpen(false);
        setIsRemoveCustomerConfirmationModalOpen(true);
        fetchCustomers();
      } catch (error) {
        console.error("Error removing customer:", error);
      }
    }
  };

  const handleActionClick = (action: string, customer: Customer) => {
    if (action === "Delete Customers") {
      setMenuVisible(null);
      setIsRemoveCustomerModalOpen(true);
      setSelectedCustomer(customer);
    }
  };

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
        <h1 className="title-of-page">Customers List</h1>
        <p className="coaches-list-subtitle">
          You have a total of {customers.length} Customers.
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
              Add new Customers +
            </button>
            <button className="sort-button" onClick={handleSortChange}>
              Sort by{" "}
              {sortType === "alphabetical" ? "Payment method" : "Alphabetical"}
            </button>
          </div>
        </div>

        <table className="coaches-list-table">
          <thead>
            <tr>
              <th>Customers</th>
              <th>Profile</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Payment method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(filteredCustomers.length > 0 ? filteredCustomers : sortCustomerSearch()).map((customer) => (
              <tr key={customer.id}>
                <td className="coach-info">
                  <img
                    src={`data:image/jpeg;base64,${customer.image}`}
                    alt={`${customer.firstname} ${customer.lastname}`}
                    className="coach-image"
                  />
                  <span className="coach-name">{customer.firstname} {customer.lastname}</span>
                </td>
                <td>
                  <a
                    href="#"
                    onClick={() => {
                      navigate(`/customer-details/${customer.id}`);
                      console.log(`Clicked on customer: ${customer.firstname} ${customer.lastname}`);
                    }}
                  >
                    {customer.firstname} {customer.lastname}
                  </a>
                </td>
                <td>{customer.email}</td>
                <td>{customer.phone_number || "N/A"}</td>
                <td>Paypal</td>
                <td className="actions-cell">
                  <button
                    className="actions-button"
                    onClick={() => handleMenuClick(customer.id)}
                  >
                    ⋮
                  </button>
                  {menuVisible === customer.id && (
                    <div className="actions-menu">
                      <button
                        onClick={() =>
                          handleActionClick("Delete Customers", customer)
                        }
                      >
                        Delete Customers
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isFormOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add New Customers</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={newCustomer.firstname}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={newCustomer.lastname}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone_number"
                    value={newCustomer.phone_number}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newCustomer.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={newCustomer.address}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Birthdate</label>
                  <input
                    type="date"
                    name="birthdate"
                    value={newCustomer.birthdate}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={newCustomer.description}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <textarea
                    name="gender"
                    value={newCustomer.gender}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-group">
                  <label>Astrological sign</label>
                  <select
                    name="astrological_sign"
                    value={newCustomer.astrological_sign}
                    onChange={(event) => setNewCoach((prevState) => ({
                      ...prevState,
                      astrological_sign: event.target.value,
                    }))}
                    required
                  >
                    <option value="">Select Astrological Sign</option>
                    <option value="Aries">Aries</option>
                    <option value="Taurus">Taurus</option>
                    <option value="Gemini">Gemini</option>
                    <option value="Cancer">Cancer</option>
                    <option value="Leo">Leo</option>
                    <option value="Virgo">Virgo</option>
                    <option value="Libra">Libra</option>
                    <option value="Scorpio">Scorpio</option>
                    <option value="Sagittarius">Sagittarius</option>
                    <option value="Capricorn">Capricorn</option>
                    <option value="Aquarius">Aquarius</option>
                    <option value="Pisces">Pisces</option>
                  </select>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => setIsFormOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit">Add Customers</button>
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

        {isRemoveCustomerConfirmationModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Customer Removed</h2>
                <div>
                  <p>
                    Customer has been removed
                  </p>
                  <div className="form-actions">
                    <button type="button" onClick={() => {setFilteredCustomers(filterCustomerSearch()); setIsRemoveCustomerConfirmationModalOpen(false)}}>
                      Ok
                    </button>
                  </div>
                </div>
            </div>
          </div>
        )}

        {isAddCustomerConfirmationModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Customer Added</h2>
                <div>
                  <p>
                    Customer has been added
                  </p>
                  <div className="form-actions">
                    <button type="button" onClick={() => {setFilteredCustomers(filterCustomerSearch()); setIsAddCustomerConfirmationModalOpen(false)}}>
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

export default CustomersList;
