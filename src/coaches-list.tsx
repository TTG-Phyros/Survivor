import "./coaches-list.css";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"
import * as api from './api/Api.js'

interface Coach {
  id: number;
  name: string;
  email: string;
  phone: string;
  numberOfCustomers: number;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const coachesData: Coach[] = [
  {
    id: 1,
    name: "Bobby Gilbert",
    email: "bobby@softnio.com",
    phone: "+342 675-6578",
    numberOfCustomers: 12,
  },
  {
    id: 2,
    name: "Olivia Poulsen",
    email: "olivia@apple.com",
    phone: "+782 332-8328",
    numberOfCustomers: 18,
  },
  {
    id: 3,
    name: "Heather Marshall",
    email: "marshall@reakitt.com",
    phone: "+342 545-5639",
    numberOfCustomers: 9,
  },
  {
    id: 4,
    name: "Benjamin Harris",
    email: "info@mediavest.com",
    phone: "+342 675-6578",
    numberOfCustomers: 12,
  },
  {
    id: 5,
    name: "Joshua Kennedy",
    email: "joshua@softnio.com",
    phone: "+323 345-8676",
    numberOfCustomers: 8,
  },
  {
    id: 6,
    name: "Justine Bauwens",
    email: "bauwens@kline.com",
    phone: "+657 879-3214",
    numberOfCustomers: 11,
  },
  {
    id: 7,
    name: "Ethan Hunter",
    email: "ethan@bergerpaints.com",
    phone: "+435 675-2345",
    numberOfCustomers: 19,
  },
  {
    id: 8,
    name: "Justine Bauwens",
    email: "justine@acstext.com",
    phone: "+978 546-2342",
    numberOfCustomers: 21,
  },
  {
    id: 9,
    name: "Summer Powell",
    email: "info@youngone.com",
    phone: "+435 433-8767",
    numberOfCustomers: 7,
  },
  // metre les donner de la bdd
];

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
    const {name, value} = event.target;
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
      // Ajoutez ici la logique pour supprimer le client
    }
    setIsRemoveCustomerModalOpen(false);
  };

  const handleActionClick = (action: string, coach: Coach) => {
    if (action === "Delete Coach") {
      console.log(`Deleting coach: ${coach.name}`);
      // Ajoutez ici la logique pour supprimer le coach
    }
  };

  const sortedCoaches = [...coachesData].sort((a, b) => {
    if (sortType === "alphabetical") {
      return a.name.localeCompare(b.name);
    } else if (sortType === "byCustomers") {
      return b.numberOfCustomers - a.numberOfCustomers;
    }
    return 0;
  });

  const filteredCoaches = sortedCoaches.filter(
    (coach) =>
      coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.phone.includes(searchQuery)
  );

  const navigate = useNavigate();

  return (
    <div className="container">
      <header className="navbar">
        <div className="navbar-logo">Soul Connection</div>
        <nav className="navbar-links">
          <button className="navbar-link" onClick={() => {navigate("/dashboard"); window.location.reload()}}>Dashboard</button>
          <button className="navbar-link active" onClick={() => {navigate("/coaches"); window.location.reload()}}>Coaches</button>
          <button className="navbar-link" onClick={() => {navigate("/customers"); window.location.reload()}}>Customers</button>
          <button className="navbar-link" onClick={() => {navigate("/tips"); window.location.reload()}}>Tips</button>
          <button className="navbar-link" onClick={() => {navigate("/events"); window.location.reload()}}>Events</button>
          <button className="navbar-link" onClick={() => {navigate("/clothes"); window.location.reload()}}>Clothes</button>
          <button className="navbar-link" onClick={() => {navigate("/compatibility"); window.location.reload()}}>Compatibility</button>
        </nav>
        <div className="navbar-actions">
          <button className="navbar-icon">🔔</button>
          <button className="navbar-icon">🇺🇸</button>
          <button className="navbar-icon" onClick={() => {api.disconnectEmployee(); window.location.reload()}}>👤</button>
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
                <td>{coach.name}</td>
                <td>{coach.email}</td>
                <td>{coach.phone}</td>
                <td>{coach.numberOfCustomers}</td>

                <td className="actions-cell">
                  <button
                    className="actions-button"
                    onClick={() => handleMenuClick(coach.id)}
                  >
                    {" "}
                    ⋮{" "}
                  </button>
                  {menuVisible === coach.id && (
                    <div className="actions-menu">
                      <button
                        onClick={() => {
                          handleAddCustomerClick();
                        }}
                      >
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
              <button
                className="close-button"
                onClick={handleCustomerModalClose}
              >
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
