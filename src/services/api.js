const API_BASE_URL = 'http://96.30.198.16:3000/api';  // URL Vultr

const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// CRUD
export const createBusiness = (data) => apiRequest('/businesses', {  // Create
  method: 'POST',
  body: JSON.stringify(data),
});
export const createUser = (data) => apiRequest('/user', {  // Create
  method: 'POST',
  body: JSON.stringify(data),
});
export const getBusiness = (id) => apiRequest(`/businesses/${id}`);  // Read
export const updateBusiness = (id, data) => apiRequest(`/businesses/${id}`, {  // Update
  method: 'PUT',
  body: JSON.stringify(data),
});
export const deleteBusiness = (id) => apiRequest(`/businesses/${id}`, {  // Delete
  method: 'DELETE',
});