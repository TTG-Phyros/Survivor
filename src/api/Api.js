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
  }
};

/**
 * Fonction pour déconnecter un compte employée
**/
export const disconnectEmployee = async () => {
  try {
    cookies.remove("ACCOUNT_TOKEN");
    window.location.href = '/login';
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
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
  }
};

/**
 * Fonction pour récupérer l'image d'un employé
**/
export const getEmployeeImage = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees/${id}/image`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data.image;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
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
  }
};

/**
 * Fonction pour récupérer les coach
**/
export const getCoaches = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees/coach`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
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
  }
};

/**
 * Fonction pour récupérer les évenements
**/
export const getEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
  }
};

/**
 * Fonction pour récupérer les évenements du jour
**/
export const getDayEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/day`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
  }
};

/**
 * Fonction pour récupérer les évenements de la semaine
**/
export const getWeekEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/week`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
  }
};

/**
 * Fonction pour récupérer les évenements du mois
**/
export const getMonthEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/month`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
  }
};

/**
 * Fonction pour récupérer les évenements d'un delais
**/
export const getEventsViaDelayInDays = async (delay) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/delay/days/${delay}`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
  }
};

/**
 * Fonction pour récupérer les rencontres d'un delais
**/
export const getEncountersViaDelayInDays = async (delay) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/encounters/delay/days/${delay}`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
  }
};

/**
 * Fonction pour récupérer les rencontres d'un client
**/
export const getEncountersViaCustomerId = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/encounters/customer/${id}`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
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
  }
};

/**
 * Fonction pour récupérer un client par ID
**/
export const getCustomerById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers/${id}`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
  }
};

/**
 * Fonction pour récupérer l'historique de paiement client par ID
**/
export const getCustomerPayments = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers/${id}/payments_history`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
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
  }
};

/**
 * Fonction pour appeler toutes les fonctions de fetch sans les images
**/
export const fetchAllRoutesWithoutImages = async () => {
  try {
    await fetchDistantTips();
    await fetchDistantEmployees();
    await fetchDistantCustomers();
    await fetchDistantClothes();
    await fetchDistantEvents();
    await fetchDistantEncounters();
    await fetchDistantPayments();
  } catch (error) {
    console.error('Il y a eu une erreur! Fetch ALL', error);
  }
};

/**
 * Fonction pour appeler toutes les fonctions de fetch d'images
**/
export const fetchAllRoutesOnlyImages = async () => {
  try {
    await fetchDistantEmployeesImages();
    await fetchDistantCustomersImages();
    await fetchDistantClothesImages();
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
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
  }
};

/**
 * Fonction pour ajouter un employé
**/
export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/employees`, {
      email: employeeData.email,
      firstname: employeeData.firstname,
      lastname: employeeData.lastname,
      birthdate: employeeData.birthdate,
      gender: employeeData.gender,
      job: employeeData.job,
      image: employeeData.image,
      phoneNumber: employeeData.phone
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un employé :', error.response?.data || error.message);
  }
};

/**
 * Fonction pour enlever un employé
**/
export const removeEmployee = async (employeeID) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/employees/${employeeID}`);

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression d\'un employé :', error.response?.data || error.message);
  }
};

/**
 * Fonction pour ajouter un client
**/
export const addCustomer = async (customerData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/customers`, {
      email: customerData.email,
      firstname: customerData.firstname,
      lastname: customerData.lastname,
      birthdate: customerData.birthdate,
      gender: customerData.gender,
      description: customerData.description,
      astrological_sign: customerData.astrological_sign,
      phone_number: customerData.phone_number,
      address: customerData.address,
      image: customerData.image,
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un client :', error.response?.data || error.message);
  }
};

/**
 * Fonction pour récupérer l'ID de l'employé à partir du token
**/
const getEmployeeId = async () => {
  try {
    const token = `${cookies.get("ACCOUNT_TOKEN")}`;
    const response = await axios.get(`${API_BASE_URL}/employees/me`, {
      headers: {
        Authorization: token
      }
    });
    return response.data.id;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'ID de l\'employé :', error.response?.data || error.message);
    throw new Error('Erreur lors de la récupération de l\'ID de l\'employé');
  }
};

/**
 * Fonction pour ajouter un événement
**/
export const addEvent = async (eventData) => {
  try {
    const employeeId = await getEmployeeId();

    const response = await axios.post(`${API_BASE_URL}/events`, {
      name: eventData.name,
      date: eventData.date,
      duration: eventData.duration,
      max_participants: eventData.max_participants,
      location_x: eventData.location_x,
      location_y: eventData.location_y,
      type: eventData.type,
      location_name: eventData.location_name,
      employee_id: employeeId
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un événement :', error.response?.data || error.message);
  }
};

/**
 * Fonction pour récupérer les infos basiques des clients
**/
export const getCustomersBasicInfosInInterval = async (days) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers/basic_infos/${days}`, {
      headers: {
        token: `${cookies.get("ACCOUNT_TOKEN")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
  }
};

// Ajouter un intercepteur de requêtes
axios.interceptors.request.use(
  (config) => {
    const token = cookies.get('ACCOUNT_TOKEN');
    if (token) {
      config.headers['token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Ajouter un intercepteur de réponse pour vérifier l'expiration du token
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Fonction pour ajouter un client à un employé
**/
export const addEmployeeCustomerRelation = async (employeeID, customerID) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/relations/${employeeID}/${customerID}`);

    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'une relation client / employé :', error.response?.data || error.message);
  }
};

/**
 * Fonction pour retirer un client à un employé
**/
export const removeEmployeeCustomerRelation = async (employeeID, customerID) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/relations/${employeeID}/${customerID}`);

    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'une relation client / employé :', error.response?.data || error.message);
  }
};

/**
 * Fonction pour récupérer un client à un employé
**/
export const getEmployeeRelations = async (employeeID) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/relations/${employeeID}`);

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des relations d\'un employé :', error.response?.data || error.message);
  }
};

/**
 * Fonction pour supprimer un client
**/
export const removeCustomer = async (customerID) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/customers/${customerID}`);

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression d\'un client :', error.response?.data || error.message);
  }
};
