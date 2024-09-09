// src/Dashboard.tsx
import React, { useState, useEffect } from 'react';
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
    Label,
    ResponsiveContainer
} from 'recharts';
import CanvasJSReact from '@canvasjs/react-charts';
import { useNavigate } from 'react-router';
import * as api from './api/Api.js'

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Dashboard: React.FC = () => {
  interface Event {
    id: number,
    name: string,
    date: string,
    duration: number,
    birthdate: string,
    max_participants: number,
    location_x: number,
    location_y: number,
    type: string,
    employee_id: number,
    location_name: string,
  };

  interface Customer {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    phone_number: string,
    astrological_sign: string,
    creation_date: string,
  };

  const [lineChartTimeRange, setLineChartTimeRange] = useState('30');
  const [globalTimeRangeInDays, setGlobalTimeRangeInDays] = useState('30');
  const [days, setDays] = useState(30);
  const [barChartData, setbarChartData] = useState([{
    date: "",
    number: 0,
    array: []
  }]);
  const [lineChartData7, setLineChartData7] = useState([{
    x: new Date(),
    y: 0,
  }]);
  const [lineChartData30, setLineChartData30] = useState([{
    x: new Date(),
    y: 0,
  }]);
  const [lineChartData90, setLineChartData90] = useState([{
    x: new Date(),
    y: 0,
  }]);

  const handleDaysChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDays(parseInt(event.target.value));
  };
  
  function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  
  useEffect(() => {
    api.getEventsViaDelayInDays(globalTimeRangeInDays).then((weekEvents) => {
      const groupedEvents = weekEvents.reduce((groups: any, event: Event) => {
        const eventDate = new Date(event.date).toISOString().split('T')[0];
        if (!groups[eventDate]) {
          groups[eventDate] = [];
        }
        groups[eventDate].push(event);
        return groups;
      }, {});
      const endDate = new Date();
      const startDate = addDays(new Date(), -(globalTimeRangeInDays));
      const sortedEventGroups = [];
      const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
          const dateString = date.toISOString().split('T')[0];
          const dateName = `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()} ${month_names_short[date.getMonth()]}`
          sortedEventGroups.push(groupedEvents[dateString] ? { date : dateName, number : groupedEvents[dateString].length, array : groupedEvents[dateString] } : { date : dateName, number : 0, array : [] });
      }
      setbarChartData(sortedEventGroups);
    });
  }, []);

  const pieChartData = [
    { name: 'Dating app', value: 40 },
    { name: 'Social Media', value: 30 },
    { name: 'Referral', value: 20 },
    { name: 'Organic Search', value: 10 }
  ];

  const handleLineChartTimeRange = (range: string) => {
    setLineChartTimeRange(range);
  };

  useEffect(() => {
    api.getCustomersBasicInfosInInterval(7).then((customers) => {
      const groupedCustomers = customers.reduce((groups: any, customer: Customer) => {
        const customerDate = new Date(customer.creation_date).toISOString().split('T')[0];
        if (!groups[customerDate]) {
          groups[customerDate] = [];
        }
        groups[customerDate].push(customer);
        return groups;
      }, {});
      console.log(groupedCustomers)
      const endDate = new Date();
      const startDate = addDays(new Date(), -(7));
      const sortedCustomerGroups = [];
      for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
          const dateString = date.toISOString().split('T')[0];
          sortedCustomerGroups.push(groupedCustomers[dateString] ? { x : new Date(dateString), y : groupedCustomers[dateString].length } : { x : new Date(dateString), y : 0 });
      }
      setLineChartData7(sortedCustomerGroups);
    });

    api.getCustomersBasicInfosInInterval(30).then((customers) => {
      const groupedCustomers = customers.reduce((groups: any, customer: Customer) => {
        const customerDate = new Date(customer.creation_date).toISOString().split('T')[0];
        if (!groups[customerDate]) {
          groups[customerDate] = [];
        }
        groups[customerDate].push(customer);
        return groups;
      }, {});
      console.log(groupedCustomers)
      const endDate = new Date();
      const startDate = addDays(new Date(), -(30));
      const sortedCustomerGroups = [];
      for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
          const dateString = date.toISOString().split('T')[0];
          sortedCustomerGroups.push(groupedCustomers[dateString] ? { x : new Date(dateString), y : groupedCustomers[dateString].length } : { x : new Date(dateString), y : 0 });
      }
      setLineChartData30(sortedCustomerGroups);
    });

    api.getCustomersBasicInfosInInterval(90).then((customers) => {
      const groupedCustomers = customers.reduce((groups: any, customer: Customer) => {
        const customerDate = new Date(customer.creation_date).toISOString().split('T')[0];
        if (!groups[customerDate]) {
          groups[customerDate] = [];
        }
        groups[customerDate].push(customer);
        return groups;
      }, {});
      console.log(groupedCustomers)
      const endDate = new Date();
      const startDate = addDays(new Date(), -(90));
      const sortedCustomerGroups = [];
      for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
          const dateString = date.toISOString().split('T')[0];
          sortedCustomerGroups.push(groupedCustomers[dateString] ? { x : new Date(dateString), y : groupedCustomers[dateString].length } : { x : new Date(dateString), y : 0 });
      }
      setLineChartData90(sortedCustomerGroups);
    });
  }, []);

  const getChartData = () => ({
    '7': lineChartData7,
    '30': lineChartData30,
    '90': lineChartData90,
  }[lineChartTimeRange] || []);  

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: 'light2',
    axisY: {
      title: 'Customers Number'
    },
    axisX: {
      title: 'Date',
      valueFormatString: "DD MMM",
      labelAngle: -50
    },
    data: [
      {
        type: 'area',
        toolTipContent: '{x}: {y}',
        dataPoints: getChartData()
      }
    ]
  };

  const navigate = useNavigate();

  const [customerCount, setCustomerCount] = useState<number | null>(null);
  const [coachCount, setCoachCount] = useState<number | null>(null);
  const [customerWithEncountersCount, setCustomerWithEncountersCount] = useState<number | null>(null);
  const [eventsDayCount, setEventsDayCount] = useState<number | null>(null);
  const [eventsWeekCount, setEventsWeekCount] = useState<number | null>(null);
  const [eventsMonthCount, setEventsMonthCount] = useState<number | null>(null);

  useEffect(() => {
    api.getCustomersCount().then(count => {
        setCustomerCount(count);
      }).catch(error => {
        console.error('Failed to fetch customer count:', error);
      });
    api.getCoachesCount().then(count => {
        setCoachCount(count);
      }).catch(error => {
        console.error('Failed to fetch customer count:', error);
      });
    api.getCustomersWithEncountersCount().then(count => {
        setCustomerWithEncountersCount(count);
      }).catch(error => {
        console.error('Failed to fetch customer count:', error);
      });
    api.getEventsDayCount().then(count => {
        setEventsDayCount(count);
      }).catch(error => {
        console.error('Failed to fetch customer count:', error);
      });
    api.getEventsWeekCount().then(count => {
        setEventsWeekCount(count);
      }).catch(error => {
        console.error('Failed to fetch customer count:', error);
      });
    api.getEventsMonthCount().then(count => {
        setEventsMonthCount(count);
      }).catch(error => {
        console.error('Failed to fetch customer count:', error);
      });
  }, []);

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
          <button className="navbar-link" onClick={() => {navigate("/clothes"); window.location.reload()}}>Clothes</button>
          <button className="navbar-link" onClick={() => {navigate("/compatibility"); window.location.reload()}}>Compatibility</button>
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
          <button className="button" onClick={() => setLineChartTimeRange('1m')}>
            Last 30 Days
          </button>
          <button className="button button-primary">Reports</button>
        </div>
      </header>

      <div className="main-content">
        <div className="chart line-chart">
          <div className="line-chart-header">
            <div className="line-chart-title-group">
              <div className="chart-title">Customers Overview</div>
              <div className="chart-subtitle">
                When customers have joined in the time.
              </div>
            </div>

            <div className="button-group-right">
              <button
                className={`button ${lineChartTimeRange === '7' ? 'button-primary' : ''}`}
                onClick={() => handleLineChartTimeRange('7')}
              >
                7d
              </button>
              <button
                className={`button ${lineChartTimeRange === '30' ? 'button-primary' : ''}`}
                onClick={() => handleLineChartTimeRange('30')}
              >
                1m
              </button>
              <button
                className={`button ${lineChartTimeRange === '90' ? 'button-primary' : ''}`}
                onClick={() => handleLineChartTimeRange('90')}
              >
                3m
              </button>
            </div>
          </div>
          <div className="stat-container" id="statcontainer">
            <div className="stat-item">
              <h2>{customerCount !== null ? customerCount : 'Loading...'}</h2>
              <p>Customers</p>
              <span>↑ 12.37%</span>
            </div>
            <div className="stat-item">
              <h2>{customerCount !== null && customerWithEncountersCount !== null ? `${Math.round(customerWithEncountersCount / customerCount * 10000) / 100}%` : 'Loading...'}</h2>
              <p>Doing meetings</p>
              <span className="negative">↓ 12.37%</span>
            </div>
            <div className="stat-item">
              <h2>{customerCount !== null && coachCount !== null ? Math.round(customerCount / coachCount) : 'Loading...'}</h2>
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
              <h2>{eventsMonthCount !== null ? eventsMonthCount : 'Loading...'}</h2>
              <span>↑ 4.63%</span>
            </div>
            <div className="stat-item">
              <p>Weekly</p>
              <h2>{eventsWeekCount !== null ? eventsWeekCount : 'Loading...'}</h2>
              <span className="negative">↓ 1.92%</span>
            </div>
            <div className="stat-item">
              <p>Daily(avg)</p>
              <h2>{eventsDayCount !== null ? eventsDayCount : 'Loading...'}</h2>
              <span>↑ 3.45%</span>
            </div>
          </div>
          <div className="barchar-container">
          <ResponsiveContainer width="97%" height="80%">
            <BarChart
              data={barChartData}
              barSize={30}
            >
              <XAxis dataKey="date" scale="point" padding={{ left: 10, right: 10 }}>
                <Label value="Days of the Month" offset={-5} position="insideBottom" />
              </XAxis>
              <YAxis>
                <Label value="Number of Events" angle={-90} position="insideLeft" />
              </YAxis>
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="number" fill="#8884d8" background={{ fill: '#eee' }}>
                <LabelList dataKey="number" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          </div>
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
