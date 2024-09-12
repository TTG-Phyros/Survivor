import React, { useEffect, useState } from "react";
import "./customer-details.css";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "./api/Api.js"
const ModificationHistory: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);

  const handleToggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div>
      <button className="history-button" onClick={handleToggleHistory}>
        {showHistory ? 'hide ' : 'Afficher l\'historique des modifications'}
      </button>

      {showHistory && (
        <div className="modification-history">
          <h3>modification history</h3>
          <ul>
            <li>Nom modifié de "Jean Dupont" à "Jean Durand" (01/09/2023)</li>
            <li>Numéro de téléphone modifié (15/08/2023)</li>
            <li>Genre modifié de "Homme" à "Non spécifié" (10/07/2023)</li>
          </ul>
        </div>
      )}
    </div>
  );
};

const CustomerDetails: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [customerInfo, setCustomerInfo] = useState<Customer | null>(null);
  const [customerEncounters, setCustomerEncounters] = useState<Encounter[] | null>(null);
  const [customerPayments, setCustomerPayments] = useState<Payment[] | null>(null);

  interface Payment {
    id: number;
    date: string;
    payment_method: number;
    amount: number;
    comment: string;
  }

  interface Encounter {
    id: number;
    customer_id: number;
    date: string;
    rating: number;
    comment: string;
    source: string;
  }

  interface Customer {
    id: number,
    email: string,
    firstname: string,
    lastname: string,
    birthdate: string,
    gender: string,
    description: string,
    astrological_sign: string,
    phone_number: string,
    address: string,
    image: string,
  }

  useEffect(() => {
    api.getCustomerById(id).then(infos => {
      setCustomerInfo(infos);
    }).catch(error => {
      console.error('Failed to fetch customer:', error);
    });
    api.getEncountersViaCustomerId(id).then(infos => {
      setCustomerEncounters(infos);
    }).catch(error => {
      console.error('Failed to fetch customer encounters:', error);
    });
    api.getCustomerPayments(id).then(infos => {
      setCustomerPayments(infos);
    }).catch(error => {
      console.error('Failed to fetch customer encounters:', error);
    });
  }, []);

  const convertRatingToStars = (rating: number): string => {
    const maxStars = 5;
    const filledStar = '★';
    const emptyStar = '☆';
    
    // Ensure the rating is within the bounds (0 to 5)
    const boundedRating = Math.max(0, Math.min(rating, maxStars));
    
    // Create the string of stars
    const filledStars = filledStar.repeat(boundedRating);
    const emptyStars = emptyStar.repeat(maxStars - boundedRating);
    
    return filledStars + emptyStars;
  }

  return (
    <div className="container">
      <Navbar />
      <div className="all">
        <div>
          <button className="back-button" onClick={() => {navigate("/customers")}}>back</button>
        <h1 className="title-of-page">Customer Details</h1>
        <div className="details-section">
          <div className="sidebar">
            <div className="profile-section">
              <div className="sidebara">
                <img
                  src={`data:image/jpeg;base64,${customerInfo?.image}`}
                  alt={`${customerInfo?.firstname} ${customerInfo?.lastname}`}
                  className="profile-picture"
                />
                <div className="peater">{customerInfo?.firstname + " " + customerInfo?.lastname}</div>
              </div>
              <div className="contact-info">
                <p>
                  User ID: <span>{customerInfo?.id}</span>
                </p>
                <p>
                  Email: <span>{customerInfo?.email}</span>
                </p>
                <p>
                  Address :{" "}
                  <span>
                    {customerInfo?.address}
                  </span>
                </p>
                <p>
                  Last Activity: <span>15 Feb, 2024</span>
                </p>
                <p>
                  Coach: <span>Nicolas Latourne</span>
                </p>
                <p>
                  Description: <span>{customerInfo?.description}</span>
                </p>
              </div>
            </div>
            <div className="statistics">
              <div>
                <p>Total Encounters</p>
                <span>{customerEncounters?.length}</span>
              </div>
              <div>
                <p>Positives</p>
                <span>{customerEncounters?.filter(item => item.rating >= 3).length}</span>
              </div>
              <div>
                <p>In Progress</p>
                <span>{customerEncounters?.filter(item => item.rating < 3).length}</span>
              </div>
            </div>
          </div>
          <div className="meeting-paymentbox">
            <div className="recent-meetings">
              <h3>Recent Meetings</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Rating</th>
                    <th>Report</th>
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {customerEncounters && customerEncounters.map((encounter) => (
                    <tr key={encounter.id}>
                      <td>{encounter.date.slice(0, 10)}</td>
                      <td>{convertRatingToStars(encounter.rating)}</td>
                      <td>{encounter.comment}</td>
                      <td className="source">{encounter.source}</td>
                    </tr>
                  ))}
                  {/* <tr>
                    <td>23 Jul. 2024</td>
                    <td>⭑⭑⭑⭑⭑</td>
                    <td>A very good moment!</td>
                    <td className="source">Dating App</td>
                  </tr>
                  <tr>
                    <td>21 Jul. 2024</td>
                    <td>⭑⭑⭑☆☆</td>
                    <td>She was a very good person but not my type.</td>
                    <td className="source">Friends</td>
                  </tr>
                  <tr>
                    <td>19 Jun. 2024</td>
                    <td>⭑☆☆☆☆</td>
                    <td>The meeting was not good, she was not interested.</td>
                    <td className="source">Dating App</td>
                  </tr>
                  <tr>
                    <td>02 Jun. 2024</td>
                    <td>⭑⭑☆☆☆</td>
                    <td>Not bad, but not good.</td>
                    <td className="source">Dating App</td>
                  </tr>
                  <tr>
                    <td>12 May. 2024</td>
                    <td>⭑⭑⭑☆☆</td>
                    <td>Need to see her again, she was interesting.</td>
                    <td className="source">Social Network</td>
                  </tr> */}
                </tbody>
              </table>
            </div>

            <div className="payment-history">
              <h3>Payments History</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Payment Method</th>
                    <th>Amount</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                {customerPayments && customerPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.date.slice(0, 10)}</td>
                    <td>{payment.payment_method}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.comment}</td>
                  </tr>
                ))}
                  {/* <tr>
                    <td>20 Jul. 2024</td>
                    <td>Visa</td>
                    <td>- $49.00</td>
                    <td>Monthly Subscription</td>
                  </tr>
                  <tr>
                    <td>20 Jun. 2024</td>
                    <td>Visa</td>
                    <td>- $49.00</td>
                    <td>Monthly Subscription</td>
                  </tr>
                  <tr>
                    <td>20 May. 2024</td>
                    <td>Visa</td>
                    <td>- $49.00</td>
                    <td>Monthly Subscription</td>
                  </tr>
                  <tr>
                    <td>20 Apr. 2024</td>
                    <td>Visa</td>
                    <td>- $49.00</td>
                    <td>Monthly Subscription</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
