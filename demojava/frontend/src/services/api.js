import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8081',
  headers: { 'Content-Type': 'application/json' },
})

export const booksApi = {
  getAll: () => api.get('/books'),
  getById: (id) => api.get(`/books/${id}`),
  create: (data) => api.post('/books', data),
  update: (id, data) => api.put(`/books/${id}`, data),
  remove: (id) => api.delete(`/books/${id}`),
}

export const authorsApi = {
  getAll: () => api.get('/authors'),
  getById: (id) => api.get(`/authors/${id}`),
  create: (data) => api.post('/authors', data),
  update: (id, data) => api.put(`/authors/${id}`, data),
  remove: (id) => api.delete(`/authors/${id}`),
}

export const membersApi = {
  getAll: () => api.get('/members'),
  getById: (id) => api.get(`/members/${id}`),
  create: (data) => api.post('/members', data),
  update: (id, data) => api.put(`/members/${id}`, data),
  remove: (id) => api.delete(`/members/${id}`),
}

export default api
