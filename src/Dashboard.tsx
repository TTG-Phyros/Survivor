// src/Dashboard.tsx
import React, { useState } from 'react';
import './Dashboard.css';
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  LabelList,
  Label
} from 'recharts';
import CanvasJSReact from '@canvasjs/react-charts';
import { useNavigate } from 'react-router';
import * as api from './api/Api.js'

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [days, setDays] = useState(30); // État par défaut pour le nombre de jours

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };

  const handleDaysChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDays(parseInt(event.target.value));
  };

  const barChartData = [
    { name: '01 Jul', events: 3 },
    { name: '02 Jul', events: 2 },
    { name: '03 Jul', events: 4 },
    { name: '30 Jul', events: 5 }
  ];

  const pieChartData = [
    { name: 'Dating app', value: 40 },
    { name: 'Social Media', value: 30 },
    { name: 'Referral', value: 20 },
    { name: 'Organic Search', value: 10 }
  ];

  const getChartData = () => {
    switch (timeRange) {
      case '7d':
        return [
          { x: 1, y: 64 },
          { x: 2, y: 61 },
          { x: 3, y: 60 },
          { x: 4, y: 58 },
          { x: 5, y: 59 },
          { x: 6, y: 60 },
          { x: 7, y: 62 }
        ];
      case '1m':
        return [
          { x: 1, y: 64 },
          { x: 7, y: 61 },
          { x: 14, y: 58 },
          { x: 21, y: 54 },
          { x: 28, y: 59 }
        ];
      case '3m':
        return [
          { x: 1, y: 64 },
          { x: 20, y: 61 },
          { x: 40, y: 54 },
          { x: 60, y: 59 },
          { x: 80, y: 64 },
          { x: 100, y: 59 }
        ];
      default:
        return [];
    }
  };

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: 'light2',
    title: {
      text: 'Customers Overview'
    },
    axisY: {
      title: 'Bounce Rate',
      suffix: '%'
    },
    axisX: {
      title: 'Day of Period',
      prefix: 'D'
    },
    data: [
      {
        type: 'line',
        toolTipContent: 'Day {x}: {y}%',
        dataPoints: getChartData()
      }
    ]
  };

  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <header className="navbar">
        <div className="navbar-logo">Soul Connection</div>
        <nav className="navbar-links">
          <button className="navbar-link active" onClick={() => {navigate("/dashboard"); window.location.reload()}}>Dashboard</button>
          <button className="navbar-link" onClick={() => {navigate("/coaches"); window.location.reload()}}>Coaches</button>
          <button className="navbar-link" onClick={() => {navigate("/customers"); window.location.reload()}}>Customers</button>
          <button className="navbar-link" onClick={() => {navigate("/tips"); window.location.reload()}}>Tips</button>
          <button className="navbar-link" onClick={() => {navigate("/events"); window.location.reload()}}>Events</button>
        </nav>
        <div className="navbar-actions">
          <button className="navbar-icon">🔔</button>
          <button className="navbar-icon">🇺🇸</button>
          <button className="navbar-icon" onClick={() => {api.disconnectEmployee(); window.location.reload()}}>👤</button>
        </div>
      </header>
      <header className="header">
        <div className="header-title">
          <h1>Dashboard</h1>
          <p>Welcome!</p>
        </div>
        <div className="header-buttons">
          <button
            className="button"
            onClick={() => handleTimeRangeChange('1m')}
          >
            Last 30 Days
          </button>
          <button className="button button-primary">Reports</button>
        </div>
      </header>

      <div className="main-content">
        <div className="chart line-chart">
          <div className="chart-title">Customers Overview</div>
          <div className="chart-subtitle">
            When customers have joined in the time.
          </div>

          <div className="button-group-right">
            <button
              className={`button ${timeRange === '7d' ? 'button-primary' : ''}`}
              onClick={() => handleTimeRangeChange('7d')}
            >
              7d
            </button>
            <button
              className={`button ${timeRange === '1m' ? 'button-primary' : ''}`}
              onClick={() => handleTimeRangeChange('1m')}
            >
              1m
            </button>
            <button
              className={`button ${timeRange === '3m' ? 'button-primary' : ''}`}
              onClick={() => handleTimeRangeChange('3m')}
            >
              3m
            </button>
          </div>

          <div className="stat-container">
            <div className="stat-item">
              <h2>932</h2>
              <p>Customers</p>
              <span>↑ 12.37%</span>
            </div>
            <div className="stat-item">
              <h2>28.49%</h2>
              <p>Doing meetings</p>
              <span className="negative">↓ 12.37%</span>
            </div>
            <div className="stat-item">
              <h2>34</h2>
              <p>Customers by coach</p>
            </div>
          </div>
          <CanvasJSChart options={options} width={600} height={300} />
        </div>

        <div className="chart bar-chart">
          <div className="chart-title">Events</div>
          <div className="chart-subtitle">Our events and their status.</div>

          <div className="stat-container">
            <div className="stat-item">
              <p>Monthly</p>
              <h2>83</h2>
              <span>↑ 4.63%</span>
            </div>
            <div className="stat-item">
              <p>Weekly</p>
              <h2>20%</h2>
              <span className="negative">↓ 1.92%</span>
            </div>
            <div className="stat-item">
              <p>Daily(avg)</p>
              <h2>3</h2>
              <span>↑ 3.45%</span>
            </div>
          </div>

          <BarChart
            width={850}
            height={540}
            data={barChartData}
            margin={{
              top: 100,
              right: 30,
              left: 20,
              bottom: 30
            }}
            barSize={30}
          >
            <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }}>
              <Label value="Days of the Month" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis>
              <Label value="Number of Events" angle={-90} position="insideLeft" />
            </YAxis>
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="events" fill="#8884d8" background={{ fill: '#eee' }}>
              <LabelList dataKey="events" position="top" />
            </Bar>
          </BarChart>
        </div>

        <div className="chart map-chart">
          <div className="chart-title">Customers by Country</div>
          <div className="chart-subtitle">Distribution of customers by country.</div>
        </div>

        <div className="chart pie-chart">
          <div className="chart-title">Meetings top sources</div>

          <div className="day-selector">
            <select value={days} onChange={handleDaysChange} className="select-box">
              <option value={7}>7 Days</option>
              <option value={30}>30 Days</option>
              <option value={60}>60 Days</option>
            </select>
          </div>

          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={pieChartData}
              cx={200}
              cy={200}
              outerRadius={160}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
