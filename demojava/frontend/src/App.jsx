import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'
import BookForm from './pages/BookForm'
import { ResourceForm, ResourceList } from './pages/ResourcePage'
import { authorsApi, membersApi } from './services/api'

export default function App() {
  return <BrowserRouter><div className="app-layout"><Sidebar /><main className="main"><Header /><div className="content"><Routes>
    <Route path="/" element={<Dashboard />} /><Route path="/books" element={<Books />} /><Route path="/books/new" element={<BookForm />} /><Route path="/books/:id/edit" element={<BookForm />} />
    <Route path="/authors" element={<ResourceList type="authors" api={authorsApi} />} /><Route path="/authors/new" element={<ResourceForm type="authors" api={authorsApi} />} /><Route path="/authors/:id/edit" element={<ResourceForm type="authors" api={authorsApi} />} />
    <Route path="/members" element={<ResourceList type="members" api={membersApi} />} /><Route path="/members/new" element={<ResourceForm type="members" api={membersApi} />} /><Route path="/members/:id/edit" element={<ResourceForm type="members" api={membersApi} />} />
  </Routes></div></main></div></BrowserRouter>
}
