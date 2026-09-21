import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { authorsApi, booksApi } from '../services/api'
import { ErrorMessage, Loading } from '../components/Status'

export default function BookForm() {
  const { id } = useParams(); const editing = Boolean(id); const navigate = useNavigate()
  const [authors, setAuthors] = useState(null); const [form, setForm] = useState({ bookName: '', price: '', authorId: '' }); const [error, setError] = useState(''); const [saving, setSaving] = useState(false)
  useEffect(() => { Promise.all([authorsApi.getAll(), editing ? booksApi.getById(id) : Promise.resolve(null)]).then(([authorRes, bookRes]) => { setAuthors(authorRes.data); if (bookRes) setForm({ bookName: bookRes.data.bookName ?? '', price: bookRes.data.price ?? '', authorId: String(bookRes.data.author?.id ?? '') }) }).catch(() => setError('Could not load form data.')) }, [id, editing])
  const submit = async e => { e.preventDefault(); setSaving(true); setError(''); const payload = { bookName: form.bookName, price: form.price, author: { id: Number(form.authorId) } }; try { editing ? await booksApi.update(id, payload) : await booksApi.create(payload); navigate('/books') } catch { setError('Could not save the book. Please check the fields and try again.') } finally { setSaving(false) } }
  if (!authors) return <Loading />
  return <section className="form-panel"><h2>{editing ? 'Edit Book' : 'Add Book'}</h2><p>{editing ? 'Update the selected book details.' : 'Add a new book to your collection.'}</p>{error && <ErrorMessage message={error} />}<form onSubmit={submit}><label>Book Name<input required value={form.bookName} onChange={e => setForm({ ...form, bookName: e.target.value })} /></label><label>Price<input required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></label><label>Author<select required value={form.authorId} onChange={e => setForm({ ...form, authorId: e.target.value })}><option value="">Select an author</option>{authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)}</select></label><div className="form-actions"><button type="button" className="button secondary" onClick={() => navigate('/books')}>Cancel</button><button className="button" disabled={saving}>{saving ? 'Saving…' : 'Save Book'}</button></div></form></section>
}
