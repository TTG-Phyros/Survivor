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
    await axios.get(`${API_BASE_URL}/refresh_data/employees`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
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
    await axios.get(`${API_BASE_URL}/refresh_data/customers`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
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
    await axios.get(`${API_BASE_URL}/refresh_data/clothes`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
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
    await axios.get(`${API_BASE_URL}/refresh_data/payments`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
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
    await axios.get(`${API_BASE_URL}/refresh_data/events`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
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
    await axios.get(`${API_BASE_URL}/refresh_data/encounters`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
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
    await axios.get(`${API_BASE_URL}/refresh_data/tips`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
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
    if (response.data.status === 'success') {
      cookies.set("ACCOUNT_TOKEN", response.data.token, { expires: 1 });
      return true;
    } else {
      return false;
    }
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
 * Fonction pour checker si un compte employée est connecté
**/
export const checkConnexionEmployee = async () => {
  try {
    const token = cookies.get("ACCOUNT_TOKEN");
    if (!token || token === 'undefined') {
      console.log("Check : Not connected");
      return false;
    }
    console.log("Check : Connected");
    return true;
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
    await axios.get(`${API_BASE_URL}/refresh_data/employees/images`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
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
      },
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
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
    await axios.get(`${API_BASE_URL}/refresh_data/customers/images`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
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
    await axios.get(`${API_BASE_URL}/refresh_data/clothes/images`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer le nombre d'employé
**/
export const getEmployeesCount = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees/count`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data.value;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer le nombre de coach
**/
export const getCoachesCount = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees/coach/count`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data.value;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer le nombre de client
**/
export const getCustomersCount = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers/count`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data.value;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};


/**
 * Fonction pour récupérer le nombre de client qui ont eu des rencontres
**/
export const getCustomersWithEncountersCount = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers/count/encounters`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data.value;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer le nombre d'évenements
**/
export const getEventsCount = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/count`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data.value;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer le nombre d'évenements du jour
**/
export const getEventsDayCount = async (i) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/count/day`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data.value;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer le nombre d'évenements de la semaine
**/
export const getEventsWeekCount = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/count/week`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data.value;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer le nombre d'évenements du mois
**/
export const getEventsMonthCount = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/count/month`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data.value;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer les clients
**/
export const getCustomers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers`, {
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
 * Fonction pour récupérer les infos basiques des clients
**/
export const getCustomersBasicInfos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers/basic_infos`, {
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
 * Fonction pour récupérer les vếtements d'un client
**/
export const getCustomerClothes = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers/${id}/clothes`, {
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
 * Fonction pour appeler toutes les fonctions de fetch sans les images
**/
export const fetchAllRoutesWithoutImages = async () => {
  try {
    fetchDistantEmployees();
    fetchDistantCustomers();
    fetchDistantClothes();
    fetchDistantEvents();
    fetchDistantTips();
    fetchDistantEncounters();
    fetchDistantPayments();
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour appeler toutes les fonctions de fetch d'images
**/
export const fetchAllRoutesOnlyImages = async () => {
  try {
    fetchDistantEmployeesImages();
    fetchDistantCustomersImages();
    fetchDistantClothesImages();
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer les tips
**/
export const getTips = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tips`, {
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