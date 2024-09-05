import axios from 'axios';
const cookies = require('js-cookie');


// Définir l'URL de base pour l'API
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Fonction pour récupérer la liste des employés depuis l'API.
**/
export const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer un employé par ID depuis l'API.
**/
export const fetchEmployeeByID = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees/${id}`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer les informations des employés depuis l'API distante
**/
export const fetchDistantEmployees = async () => {
  try {
    await axios.get(`${API_BASE_URL}/refresh_data/employees`);
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer les informations des clients depuis l'API distante
**/
export const fetchDistantCustomers = async () => {
  try {
    await axios.get(`${API_BASE_URL}/refresh_data/customers`);
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer les informations des vêtements depuis l'API distante
**/
export const fetchDistantClothes = async () => {
  try {
    await axios.get(`${API_BASE_URL}/refresh_data/clothes`);
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer les informations des paiements depuis l'API distante
**/
export const fetchDistantPayments = async () => {
  try {
    await axios.get(`${API_BASE_URL}/refresh_data/payments`);
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer les informations des evenements depuis l'API distante
**/
export const fetchDistantEvents = async () => {
  try {
    await axios.get(`${API_BASE_URL}/refresh_data/events`);
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer les informations des rencontres depuis l'API distante
**/
export const fetchDistantEncounters = async () => {
  try {
    await axios.get(`${API_BASE_URL}/refresh_data/encounters`);
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer les informations des conseils depuis l'API distante
**/
export const fetchDistantTips = async () => {
  try {
    await axios.get(`${API_BASE_URL}/refresh_data/tips`);
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour connecter un compte employée
**/
export const connectEmployee = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/employees/login`,
      {
        email: email,
        password: password
      }
    );
    // console.log(response.data.token);
    cookies.set("ACCOUNT_TOKEN", response.data.token, { expires: 1 });
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour déconnecter un compte employée
**/
export const disconnectEmployee = async () => {
  try {
    cookies.remove("ACCOUNT_TOKEN");
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};


/**
 * Fonction pour refresh les images des employés depuis l'API distante
**/
export const fetchDistantEmployeesImages = async () => {
  try {
    await axios.get(`${API_BASE_URL}/refresh_data/employees/images`);
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer l'image d'un employé
**/
export const getEmployeeImage = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees/employee_id/image`, {
      params: {
        id: id
      }
    });
    return response.data.image;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour refresh les images des employés depuis l'API distante
**/
export const fetchDistantCustomersImages = async () => {
  try {
    await axios.get(`${API_BASE_URL}/refresh_data/customers/images`);
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour refresh les images des employés depuis l'API distante
**/
export const fetchDistantClothesImages = async () => {
  try {
    await axios.get(`${API_BASE_URL}/refresh_data/clothes/images`);
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};