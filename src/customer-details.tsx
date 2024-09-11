import React from "react";
import "./customer-details.css";
import { useNavigate } from "react-router";
import * as api from './api/Api.js'


const CustomerDetails: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
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
          <button className="navbar-icon" onClick={() => {api.disconnectEmployee(); window.location.reload()}}>👤</button>
        </div>
      </header>
      <div className="all">
        <div>
          <button className="back-button" >back</button>
        <h1 className="title-of-page">Customer Details</h1>
        <div className="details-section">
          <div className="sidebar">
            <div className="profile-section">
              <div className="sidebara">
                <img
                  src="/test.jpg"
                  alt="Francis Mitcham"
                  className="profile-picture"
                />
                <div className="peater">Francis Mitcham</div>
              </div>
              <div className="contact-info">
                <p>
                  User ID: <span>UD003054</span>
                </p>
                <p>
                  Email: <span>francis.mitcham@tmail.com</span>
                </p>
                <p>
                  Address :{" "}
                  <span>
                    551 Swanston Street, Melbourne Victoria 3053 Australia
                  </span>
                </p>
                <p>
                  Last Activity: <span>15 Feb, 2024</span>
                </p>
                <p>
                  Coach: <span>Nicolas Latourne</span>
                </p>
                <p>
                  Description: <span>Active</span>
                </p>
              </div>
            </div>
            <div className="statistics">
              <div>
                <p>Total Encounters</p>
                <span>23</span>
              </div>
              <div>
                <p>Positives</p>
                <span>20</span>
              </div>
              <div>
                <p>In Progress</p>
                <span>3</span>
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
                  <tr>
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
                  </tr>
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
                  <tr>
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
                  </tr>
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
