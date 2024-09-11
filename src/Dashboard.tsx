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
import { WorldMap } from 'react-svg-worldmap';
import * as api from './api/Api.js'
import Navbar from './Navbar';

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
    location_name: string
  };

  interface Customer {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    phone_number: string,
    astrological_sign: string,
    creation_date: string
  };

  interface Encounter {
    id: number,
    customer_id: number,
    date: string,
    rating: number,
    comment: string,
    source: string
  };

  const [lineChartTimeRange, setLineChartTimeRange] = useState('30');
  const [pieChartTimeRange, setPieChartTimeRange] = useState('30');
  const [barChartTimeRange, setBarChartTimeRange] = useState('30');
  const [globalTimeRange, setglobalTimeRange] = useState('30');

  const [barChartData7, setbarChartData7] = useState([{
    date: "",
    number: 0,
    array: []
  }]);
  const [barChartData30, setbarChartData30] = useState([{
    date: "",
    number: 0,
    array: []
  }]);
  const [barChartData90, setbarChartData90] = useState([{
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

  const [pieChartData7, setPieChartData7] = useState([{
    name: "",
    value: 0,
    fill: ""
  }]);
  const [pieChartData30, setPieChartData30] = useState([{
    name: "",
    value: 0,
    fill: ""
  }]);
  const [pieChartData90, setPieChartData90] = useState([{
    name: "",
    value: 0,
    fill: ""
  }]);

  const handleDaysChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPieChartTimeRange(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLineChartTimeRange(event.target.value);
    setBarChartTimeRange(event.target.value);
    setPieChartTimeRange(event.target.value);
    setglobalTimeRange(event.target.value);
  };

  function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function hashStringToNumber(string: string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  function numberToHexColor(number: number) {
    const color = ((number >> 24) & 0xFF).toString(16) +
                  ((number >> 16) & 0xFF).toString(16) +
                  ((number >> 8) & 0xFF).toString(16) +
                  (number & 0xFF).toString(16);
    return `#${color.slice(0, 6).padStart(6, '0')}`;
  }

  function stringToColor(string: string) {
    const hash = hashStringToNumber(string);
    return numberToHexColor(hash);
  }

  useEffect(() => {
    try {
      api.getEventsViaDelayInDays(7).then((events) => {
        const groupedEvents = events.reduce((groups: any, event: Event) => {
          const eventDate = new Date(event.date).toISOString().split('T')[0];
          if (!groups[eventDate]) {
            groups[eventDate] = [];
          }
          groups[eventDate].push(event);
          return groups;
        }, {});
        const endDate = new Date();
        const startDate = addDays(new Date(), -(7));
        const sortedEventGroups = [];
        const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
            const dateString = date.toISOString().split('T')[0];
            const dateName = `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()} ${month_names_short[date.getMonth()]}`
            sortedEventGroups.push(groupedEvents[dateString] ? { date : dateName, number : groupedEvents[dateString].length, array : groupedEvents[dateString] } : { date : dateName, number : 0, array : [] });
        }
        setbarChartData7(sortedEventGroups);
      });

      api.getEventsViaDelayInDays(30).then((events) => {
        const groupedEvents = events.reduce((groups: any, event: Event) => {
          const eventDate = new Date(event.date).toISOString().split('T')[0];
          if (!groups[eventDate]) {
            groups[eventDate] = [];
          }
          groups[eventDate].push(event);
          return groups;
        }, {});
        const endDate = new Date();
        const startDate = addDays(new Date(), -(30));
        const sortedEventGroups = [];
        const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
            const dateString = date.toISOString().split('T')[0];
            const dateName = `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()} ${month_names_short[date.getMonth()]}`
            sortedEventGroups.push(groupedEvents[dateString] ? { date : dateName, number : groupedEvents[dateString].length, array : groupedEvents[dateString] } : { date : dateName, number : 0, array : [] });
        }
        setbarChartData30(sortedEventGroups);
      });

      api.getEventsViaDelayInDays(90).then((events) => {
        const groupedEvents = events.reduce((groups: any, event: Event) => {
          const eventDate = new Date(event.date).toISOString().split('T')[0];
          if (!groups[eventDate]) {
            groups[eventDate] = [];
          }
          groups[eventDate].push(event);
          return groups;
        }, {});
        const endDate = new Date();
        const startDate = addDays(new Date(), -(90));
        const sortedEventGroups = [];
        const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
            const dateString = date.toISOString().split('T')[0];
            const dateName = `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()} ${month_names_short[date.getMonth()]}`
            sortedEventGroups.push(groupedEvents[dateString] ? { date : dateName, number : groupedEvents[dateString].length, array : groupedEvents[dateString] } : { date : dateName, number : 0, array : [] });
        }
        setbarChartData90(sortedEventGroups);
      });
    } catch (error) {
      console.error('Il y a eu une erreur sur le dashboard!', error);
    }
  }, []);

  useEffect(() => {
    try {
      api.getEncountersViaDelayInDays(7).then((encounters) => {
        const groupedEncounters = encounters.reduce((groups: any, encounter: Encounter) => {
          const encounterSource = encounter.source;
          if (!groups[encounterSource]) {
            groups[encounterSource] = [];
          }
          groups[encounterSource].push(encounter);
          return groups;
        }, {});

        const sortedEncounterGroups = Object.keys(groupedEncounters)
          .map((eventName: string) => ({
            name : eventName,
            value : groupedEncounters[eventName].length,
            fill : stringToColor(eventName)
          }));
        setPieChartData7(sortedEncounterGroups.length > 0 ? sortedEncounterGroups : []);
      });

      api.getEncountersViaDelayInDays(30).then((encounters) => {
        const groupedEncounters = encounters.reduce((groups: any, encounter: Encounter) => {
          const encounterSource = encounter.source;
          if (!groups[encounterSource]) {
            groups[encounterSource] = [];
          }
          groups[encounterSource].push(encounter);
          return groups;
        }, {});

        const sortedEncounterGroups = Object.keys(groupedEncounters)
          .map((eventName: string) => ({
            name : eventName,
            value : groupedEncounters[eventName].length,
            fill : stringToColor(eventName)
          }));
        setPieChartData30(sortedEncounterGroups.length > 0 ? sortedEncounterGroups : []);
      });

      api.getEncountersViaDelayInDays(90).then((encounters) => {
        const groupedEncounters = encounters.reduce((groups: any, encounter: Encounter) => {
          const encounterSource = encounter.source;
          if (!groups[encounterSource]) {
            groups[encounterSource] = [];
          }
          groups[encounterSource].push(encounter);
          return groups;
        }, {});

        const sortedEncounterGroups = Object.keys(groupedEncounters)
          .map((eventName: string) => ({
            name : eventName,
            value : groupedEncounters[eventName].length,
            fill : stringToColor(eventName)
          }))
          .sort((a, b) => (a.value - b.value) * -1);
        setPieChartData90(sortedEncounterGroups.length > 0 ? sortedEncounterGroups : []);
      });
    } catch (error) {
      console.error('Il y a eu une erreur sur le dashboard!', error);
    }
  }, []);

  const handleLineChartTimeRange = (range: string) => {
    setLineChartTimeRange(range);
  };

  useEffect(() => {
    try {
      api.getCustomersBasicInfosInInterval(7).then((customers) => {
        const groupedCustomers = customers.reduce((groups: any, customer: Customer) => {
          const customerDate = new Date(customer.creation_date).toISOString().split('T')[0];
          if (!groups[customerDate]) {
            groups[customerDate] = [];
          }
          groups[customerDate].push(customer);
          return groups;
        }, {});
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
        const endDate = new Date();
        const startDate = addDays(new Date(), -(90));
        const sortedCustomerGroups = [];
        for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
            const dateString = date.toISOString().split('T')[0];
            sortedCustomerGroups.push(groupedCustomers[dateString] ? { x : new Date(dateString), y : groupedCustomers[dateString].length } : { x : new Date(dateString), y : 0 });
        }
        setLineChartData90(sortedCustomerGroups);
      });
    } catch (error) {
      console.error('Il y a eu une erreur sur le dashboard!', error);
    }
  }, []);

  const getBarChartData = () => ({
    '7': barChartData7,
    '30': barChartData30,
    '90': barChartData90,
  }[barChartTimeRange] || []);

  const getLineChartData = () => ({
    '7': lineChartData7,
    '30': lineChartData30,
    '90': lineChartData90,
  }[lineChartTimeRange] || []);

  const getPieChartData = () => ({
    '7': pieChartData7,
    '30': pieChartData30,
    '90': pieChartData90,
  }[pieChartTimeRange] || []);

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
        dataPoints: getLineChartData()
      }
    ]
  };

  const [customerCount, setCustomerCount] = useState<number | null>(null);
  const [coachCount, setCoachCount] = useState<number | null>(null);
  const [customerWithEncountersCount, setCustomerWithEncountersCount] = useState<number | null>(null);
  const [eventsDayCount, setEventsDayCount] = useState<number | null>(null);
  const [eventsWeekCount, setEventsWeekCount] = useState<number | null>(null);
  const [eventsMonthCount, setEventsMonthCount] = useState<number | null>(null);

  useEffect(() => {
    try {
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
    } catch (error) {
      console.error('Il y a eu une erreur sur le dashboard!', error);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar />
      <header className="header">
        <div className="header-title">
          <h1>Dashboard</h1>
          <p>Welcome!</p>
        </div>
        <div className="header-buttons">
          <select value={globalTimeRange} onChange={handleTimeChange} className="select-box">
              <option value={7}>7 Days</option>
              <option value={30}>30 Days</option>
              <option value={90}>90 Days</option>
            </select>
          <button className="button" style={{backgroundColor : "#0052cc", color: "white", border : "None"}}>Reports</button>
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
              data={getBarChartData()}
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
          <WorldMap
            color="blue"
            valueSuffix=" customers"
            size="responsive"
            data={[
              { country: "US", value: 500 },
              { country: "CN", value: 300 },
              { country: "GB", value: 200 },
              { country: "FR", value: 1200 },
            ]}
          />
        </div>

        <div className="chart pie-chart">
          <div className="chart-title">Meetings top sources</div>

          <div className="day-selector">
            <select value={pieChartTimeRange} onChange={handleDaysChange} className="select-box">
              <option value={7}>7 Days</option>
              <option value={30}>30 Days</option>
              <option value={90}>90 Days</option>
            </select>
          </div>
          <div className="pie-chart-infos">
            {getPieChartData().length > 0 ?
            <ResponsiveContainer width="97%" height="39%">
              <PieChart width={400} height={400} margin={{ top: 0, left: 50, right: 0, bottom: 0 }}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={getPieChartData()}
                  cx={200}
                  cy={200}
                  outerRadius={200}
                  fill="#8884d8"
                  />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            : <span className='big-text'>NO DATA</span>}
            <div className="pie-chart-all-text">
              {getPieChartData().map(encounters => (
                <div className="pie-chart-text">
                  <div className="pie-chart-text-top">
                    <div className="square" style={{ backgroundColor: `${encounters.fill}` }}></div>
                    <span className="grey-text">{encounters.name.charAt(0).toUpperCase()+ encounters.name.slice(1)}</span>
                  </div>
                  <div className="pie-chart-text-bottom">
                    <span className="bold-text">{encounters.value} </span>
                    <span className="grey-text" style={{marginTop : 1 }}>{Math.round(encounters.value / getPieChartData().length * 10000) / 100}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
