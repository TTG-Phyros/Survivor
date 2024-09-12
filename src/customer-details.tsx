import React, { useEffect, useState } from "react";
import "./customer-details.css";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "./api/Api.js"

const CustomerDetails: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [customerEncounters, setCustomerEncounters] = useState<Encounter[] | null>(null);
  const [customerPayments, setCustomerPayments] = useState<Payment[] | null>(null);
  const [customerInfo, setCustomerInfo] = useState<Customer | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [customerHistory, setCustomerHistory] = useState<History[] | null>(null);

  interface History {
    id: number;
    customer_id: number;
    action: string;
    date: string;
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

  const handleToggleHistory = () => {
    setShowHistory(!showHistory);
  };

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
    api.getHistoryFromClient(id).then((infos) => {
      setCustomerHistory(infos);
    })
  }, []);

  const convertRatingToStars = (rating: number): string => {
    const maxStars = 5;
    const filledStar = '★';
    const emptyStar = '☆';
    const boundedRating = Math.max(0, Math.min(rating, maxStars));
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
        <button className="history-button" onClick={handleToggleHistory}>
          {showHistory ? 'Hide modifications history ' : 'Show modifications history'}
        </button>

        {showHistory && (
          <div className="modification-history">
            <h3>Modifications history</h3>
            <ul>
              {customerHistory && customerHistory.map((history) => (
                <li>{history.date.slice(0,10)} : {history.action}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
