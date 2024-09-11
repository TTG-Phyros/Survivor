import React, { useState, useEffect } from "react";
import "./astro-test.css";
import * as api from './api/Api.js'
import compatibilityData from './compatibilityData';
import Navbar from "./Navbar";

const AstroTest: React.FC = () => {
  const [selectedCustomer1, setSelectedCustomer1] = useState<number | null>(null);
  const [selectedCustomer2, setSelectedCustomer2] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [customersInfo, setCustomersInfo] = useState([
    {
        id: 0,
        firstname: '',
        lastname: '',
        email: '',
        phone_number: '',
        astrological_sign: ''
    }
  ]);

  interface CustomerSelectProps {
    selectedCustomer: number | null;
    onChange: (id: number) => void;
    customersInfo: Array<{
      id: number;
      firstname: string;
      lastname: string;
      astrological_sign: string;
    }>;
    label: string;
  }

  const CustomerSelect: React.FC<CustomerSelectProps> = ({ selectedCustomer, onChange, customersInfo, label }) => (
    <div>
      <label>{label}</label>
      <select
        onChange={(e) => onChange(Number(e.target.value))}
        value={selectedCustomer ?? ''}
      >
        <option value="">Sélectionnez un client</option>
        {customersInfo.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.firstname} {customer.lastname} ({customer.astrological_sign})
          </option>
        ))}
      </select>
    </div>
  );

  useEffect(() => {
    api.getCustomersBasicInfos().then(infos => {
        const astrologicalSignMap: { [key: string]: string } = {
          'Aries': 'Bélier',
          'Taurus': 'Taureau',
          'Gemini': 'Gémeaux',
          'Cancer': 'Cancer',
          'Leo': 'Lion',
          'Virgo': 'Vierge',
          'Libra': 'Balance',
          'Scorpio': 'Scorpion',
          'Sagittarius': 'Sagittaire',
          'Capricorn': 'Capricorne',
          'Aquarius': 'Verseau',
          'Pisces': 'Poissons'
        };

        infos = infos.map((row: { astrological_sign: string; }) => ({
          ...row,
          astrological_sign: astrologicalSignMap[row.astrological_sign]
        }));
        setCustomersInfo(infos);
      }).catch(error => {
        console.error('Failed to fetch customer count:', error);
      });
  }, []);

  const handleCompatibilityCheck = () => {
    if (selectedCustomer1 === null || selectedCustomer2 === null) {
      return;
    }

    const customer1 = customersInfo.find(customer => customer.id === selectedCustomer1);
    const customer2 = customersInfo.find(customer => customer.id === selectedCustomer2);

    if (!customer1 || !customer2) {
      return;
    }

    const key = `${customer1.astrological_sign}&${customer2.astrological_sign}`;
    const reversedKey = `${customer2.astrological_sign}&${customer1.astrological_sign}`;
    const compatibilityResult = compatibilityData[key] || compatibilityData[reversedKey] || "Aucune compatibilité définie pour cette combinaison.";

    setResult(compatibilityResult);
  };

  return (
    <div className="container ">
      <Navbar />
      <div className="astro-test">
        <div className="astro-test2">

          <h1>Test de Compatibilité</h1>
          <div className="customer-selection">
            <CustomerSelect
                selectedCustomer={selectedCustomer1}
                onChange={setSelectedCustomer1}
                customersInfo={customersInfo}
                label="Choisissez le premier client"
                aria-label="First Customer"
            />
            <CustomerSelect
                selectedCustomer={selectedCustomer2}
                onChange={setSelectedCustomer2}
                customersInfo={customersInfo}
                label="Choisissez le deuxième client"
                aria-label="Second Customer"
            />

            <button onClick={handleCompatibilityCheck} disabled={selectedCustomer1 === null || selectedCustomer2 === null}>
              Tester la compatibilité
            </button>
          </div>

          {result && (
            <div className="result">
              <h2>{result}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AstroTest;
