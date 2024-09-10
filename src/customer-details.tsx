import "./coaches-list.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCoaches, disconnectEmployee } from "./api/Api";

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
  name: string;
  email: string;
  phone: string;
}

const customersData: Customer[] = [
  {
    id: 7,
    name: "Ethan Hunter",
    email: "ethan@bergerpaints.com",
    phone: "+435 675-2345",
  },
  {
    id: 8,
    name: "Justine Bauwens",
    email: "justine@acstext.com",
    phone: "+978 546-2342",
  },
];

const CoachesList: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState<number | null>(null);
  const [isCustomerModalOpen, setIsCustomerModalOpen] =
    useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isRemoveCustomerModalOpen, setIsRemoveCustomerModalOpen] =
    useState<boolean>(false);
  const [newCoach, setNewCoach] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    birthdate: "",
    other: "",
  });
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [customerSearchQuery, setCustomerSearchQuery] = useState<string>("");
  const [sortType, setSortType] = useState<"alphabetical" | "byCustomers">(
    "alphabetical"
  );
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await getCoaches();
        if (response && response.value) {
          setCoaches(response.value);
        } else {
          setError("Aucune donnée de coach disponible");
        }
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des coachs:", error);
        setError("Erreur lors de la récupération des coachs");
        setLoading(false);
      }
    };

    fetchCoaches();
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCustomerSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerSearchQuery(event.target.value);
  };

  const filteredCustomers = customersData.filter(
    (customer) =>
      customer.name.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
      customer.email
        .toLowerCase()
        .includes(customerSearchQuery.toLowerCase()) ||
      customer.phone.includes(customerSearchQuery)
  );

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    setIsFormOpen(false);
  };

  const handleAddCustomerClick = () => {
    setIsCustomerModalOpen(true);
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

  const handleActionClick = (action: string, coach: Coach) => {
    if (action === "Delete Coach") {
      console.log(`Deleting coach: ${coach.firstname} ${coach.lastname}`);
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

  const navigate = useNavigate();

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <header className="navbar">
        <div className="navbar-logo">Soul Connection</div>
        <nav className="navbar-links">
          <button
            className="navbar-link"
            onClick={() => {
              navigate("/dashboard");
              window.location.reload();
            }}
          >
            Dashboard
          </button>
          <button
            className="navbar-link active"
            onClick={() => {
              navigate("/coaches");
              window.location.reload();
            }}
          >
            Coaches
          </button>
          <button
            className="navbar-link"
            onClick={() => {
              navigate("/customers");
              window.location.reload();
            }}
          >
            Customers
          </button>
          <button
            className="navbar-link"
            onClick={() => {
              navigate("/tips");
              window.location.reload();
            }}
          >
            Tips
          </button>
          <button
            className="navbar-link"
            onClick={() => {
              navigate("/events");
              window.location.reload();
            }}
          >
            Events
          </button>
          <button
            className="navbar-link"
            onClick={() => {
              navigate("/clothes");
              window.location.reload();
            }}
          >
            Clothes
          </button>
          <button
            className="navbar-link"
            onClick={() => {
              navigate("/compatibility");
              window.location.reload();
            }}
          >
            Compatibility
          </button>
        </nav>
        <div className="navbar-actions">
          <button className="navbar-icon">🔔</button>
          <button className="navbar-icon">🇺🇸</button>
          <button
            className="navbar-icon"
            onClick={() => {
              disconnectEmployee();
              window.location.reload();
            }}
          >
            👤
          </button>
        </div>
      </header>
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
                      <button onClick={() => handleAddCustomerClick()}>
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
                      <div className="customer-name">{customer.name}</div>
                      <div className="customer-email">{customer.email}</div>
                      <div className="customer-phone">{customer.phone}</div>
                    </div>
                    <div className="customer-actions">
                      <button
                        onClick={() => handleRemoveCustomerClick(customer)}
                      >
                        Remove
                      </button>
                      <button>Add</button>
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
                    name="firstName"
                    value={newCoach.firstName}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={newCoach.lastName}
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
                  <label>Other Information</label>
                  <textarea
                    name="other"
                    value={newCoach.other}
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
                    Are you sure you want to remove {selectedCustomer.name}?
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
      </main>
    </div>
  );
};

export default CoachesList;
