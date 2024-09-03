import axios from 'axios';

// Définir l'URL de base pour l'API
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Fonction pour récupérer la liste des employés depuis l'API.
**/
export const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees`);
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
    const response = await axios.get(`${API_BASE_URL}/employees/employee_id`, {
      params: {
        id: id
      }
    });
    return response.data;
  } catch (error) {
    console.error('Il y a eu une erreur!', error);
    throw error;
  }
};
