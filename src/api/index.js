import axios from "axios";
const BASE_URL = 'http://localhost:5000/api/v1';

// SetUp the base URL for Api
const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get the token from wherever you store it
  if (token) {
    config.headers.Authorization = `${token}`;
  }else{
    config.headers.Authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwLCJ1c2VyUm9sZSI6InJlc2VhcmNoZXIiLCJpYXQiOjE2OTk2NDcxMDAsImV4cCI6MTY5OTgxOTkwMH0.v0XgwnGWyzZLDx4e4yOareIdlk5BW3BXibpybNlHVHY";
  }
  return config;
});



// Add a response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export const authApi = {
  signup: (userData) => api.post(`${(BASE_URL)}/auth/signup`, userData),
  login: (credentials) => api.post(`${(BASE_URL)}/auth/login`, credentials)
};

export const projectApi = {
  createProject: (projectData) => api.post('/projects/create-project', projectData), // Create projects 
  getProjects: () => api.get('/projects'), // Get all projects
  getProject: (id) => api.get(`/projects/${id}`), // Get single project
  updateProject: (id, projectData) => api.patch(`/projects/${id}`, projectData), // Update project
  deleteProject: (id) => api.delete(`/projects/${id}`) // Delete project
}



export const dataApi = {
  fetchData: () => api.get('/data'),
};