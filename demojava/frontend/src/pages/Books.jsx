import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { booksApi } from '../services/api'
import { ErrorMessage, Loading, EmptyState } from '../components/Status'

export default function Books() {
  const [books, setBooks] = useState(null); const [error, setError] = useState('')
  const load = () => { setError(''); booksApi.getAll().then(r => setBooks(r.data)).catch(() => setError('Could not load books.')) }
  useEffect(load, [])
  const remove = async (book) => { if (!window.confirm(`Delete “${book.bookName}”?`)) return; try { await booksApi.remove(book.id); load() } catch { setError('Could not delete this book.') } }
  return <section className="panel"><div className="panel-title"><div><h2>Books</h2><p>Manage your library collection</p></div><Link className="button" to="/books/new">+ Add Book</Link></div>{error && <ErrorMessage message={error} />}{!books ? <Loading /> : books.length === 0 ? <EmptyState label="books" /> : <div className="table-wrap"><table><thead><tr><th>ID</th><th>Book Name</th><th>Author</th><th>Price</th><th>Actions</th></tr></thead><tbody>{books.map(book => <tr key={book.id}><td>{book.id}</td><td>{book.bookName}</td><td>{book.author?.name ?? '—'}</td><td>{book.price}</td><td className="actions"><Link to={`/books/${book.id}/edit`}>Edit</Link><button onClick={() => remove(book)}>Delete</button></td></tr>)}</tbody></table></div>}</section>
}
