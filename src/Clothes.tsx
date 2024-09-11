import React, { useState, useEffect } from 'react';
import './Clothes.css';
import * as api from './api/Api';
import Navbar from './Navbar';

let hats: any = [""];
let tops: any = [""];
let bottoms: any = [""];
let shoes: any = [""];

const processClothes = async (id: number) => {
  try {
      const clothes = await api.getCustomerClothes(id);

      clothes.forEach((item: { type: string; }) => {
          switch(item.type) {
              case 'hat/cap':
                  hats.push(item);
                  break;
              case 'top':
                  tops.push(item);
                  break;
              case 'bottom':
                  bottoms.push(item);
                  break;
              case 'shoes':
                  shoes.push(item);
                  break;
              default:
                  console.warn(`Unknown type: ${item.type}`);
          }
      });
      console.log(`image : ${tops[1].image}`);
  } catch (error) {
      console.error('Failed to fetch or process clothes:', error);
  }
};

const Clothes: React.FC = () => {
  const [hatCount, setHatCount] = useState(0);
  const [topCount, setTopCount] = useState(0);
  const [bottomCount, setBottomCount] = useState(0);
  const [shoesCount, setShoesCount] = useState(0);
  const [selectedClient, setSelectedClient] = useState(0);
  const [customersInfo, setCustomersInfo] = useState([
    {
      id: 0,
      email: '',
      firstname: '',
      lastname: '',
      birth_date: '',
      gender: '',
      description: '',
      astrological_sign: '',
      phone_number: '',
      address: '',
      image: ''
    }
  ]);

  useEffect(() => {
    api.getCustomers().then(infos => {
        setCustomersInfo(infos);
      }).catch(error => {
        console.error('Failed to fetch customer count:', error);
      });
  }, []);

  const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    setSelectedClient(value)
    console.log(customersInfo.find(customer => customer.id === value));
    hats = [""];
    tops = [""];
    bottoms = [""];
    shoes = [""];
    processClothes(value);
    setHatCount(0);
    setTopCount(0);
    setBottomCount(0);
    setShoesCount(0);
  };

  function increase_count(list : any, index : number) {
      if (!list[index + 1]) {
        return 0;
      } else {
        return index + 1;
      }
  }

  function decrease_count(list : any, index : number) {
    if (!list[index - 1]) {
      return 0;
    } else {
      return index - 1;
    }
}

  return (
    <div>
      <div className="container">
        <Navbar />
      </div>
      <div className="clothes">
        <h1>Clothes Page</h1>
        <p>Welcome to the clothes section! Here you can find various clothing items.</p>


        <div className="dropdown-container">
          <label htmlFor="client-select">Sélectionnez un client</label>
          <select id="client-select" value={selectedClient} onChange={handleClientChange}>
            <option value={0}>Sélectionnez un client</option>
            {customersInfo.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.firstname} {customer.lastname}
                </option>
              ))}
          </select>
        </div>


        <div className="navigation-container">
          <button className="arrow-button" onClick={() => setHatCount(decrease_count(hats, hatCount))}>
            ←
          </button>
          <div className="clothing-item-container">
            <img src={hatCount !== 0 ? `data:image/png;base64,${hats[hatCount].image}` : ''} alt="Chapeau" className="clothing-image" />
          </div>
          <button className="arrow-button" onClick={() => setHatCount(increase_count(hats, hatCount))}>
            →
          </button>
        </div>

        <div className="navigation-container">
          <div className="arrow-button"></div>
          <div className="clothing-item-container">
          <img
            src={selectedClient !== 0 ? (() => {
                    const customer = customersInfo.find(customer => customer.id === selectedClient);
                    return customer ? `data:image/png;base64,${customer.image}` : '';
                  })() : ''}
            alt="Client" className="clothing-image"
          />
          </div>
          <div className="arrow-button"></div>
        </div>


        <div className="navigation-container">
          <button className="arrow-button" onClick={() => setTopCount(decrease_count(tops, topCount))}>
            ←
          </button>
          <div className="clothing-item-container">
            <img src={topCount !== 0 ? `data:image/png;base64,${tops[topCount].image}` : ''} alt="Haut" className="clothing-image" />
          </div>
          <button className="arrow-button" onClick={() => setTopCount(increase_count(tops, topCount))}>
            →
          </button>
        </div>


        <div className="navigation-container">
          <button className="arrow-button" onClick={() => setBottomCount(decrease_count(bottoms, bottomCount))}>
            ←
          </button>
          <div className="clothing-item-container">
            <img src={bottomCount !== 0 ? `data:image/png;base64,${bottoms[bottomCount].image}` : ''} alt="Bas" className="clothing-image" />
          </div>
          <button className="arrow-button" onClick={() => setBottomCount(increase_count(bottoms, bottomCount))}>
            →
          </button>
        </div>


        <div className="navigation-container">
          <button className="arrow-button" onClick={() => setShoesCount(decrease_count(shoes, shoesCount))}>
            ←
          </button>
          <div className="clothing-item-container">
            <img src={shoesCount !== 0 ? `data:image/png;base64,${shoes[shoesCount].image}` : ''} alt="Chaussures" className="clothing-image" />
          </div>
          <button className="arrow-button" onClick={() => setShoesCount(increase_count(shoes, shoesCount))}>
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clothes;
