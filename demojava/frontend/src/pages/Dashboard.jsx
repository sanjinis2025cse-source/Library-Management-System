import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import { ErrorMessage, Loading, EmptyState } from '../components/Status'
import { authorsApi, booksApi, membersApi } from '../services/api'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { Promise.all([booksApi.getAll(), authorsApi.getAll(), membersApi.getAll()])
    .then(([books, authors, members]) => setData({ books: books.data, authors: authors.data, members: members.data }))
    .catch(() => setError('Could not load dashboard data. Check that the backend is running on port 8081.')) }, [])
  if (error) return <ErrorMessage message={error} />
  if (!data) return <Loading />
  return <>
    <section className="stats"><StatCard icon="📚" label="Total Books" value={data.books.length} /><StatCard icon="✍️" label="Total Authors" value={data.authors.length} /><StatCard icon="👥" label="Total Members" value={data.members.length} /></section>
    <section className="panel"><div className="panel-title"><div><h2>Recent Books</h2><p>The latest books in your library</p></div><Link className="button secondary" to="/books">View All Books</Link></div>
      {data.books.length === 0 ? <EmptyState label="books" /> : <div className="table-wrap"><table><thead><tr><th>ID</th><th>Book Name</th><th>Author</th><th>Price</th></tr></thead><tbody>{data.books.slice(-5).reverse().map(book => <tr key={book.id}><td>{book.id}</td><td>{book.bookName}</td><td>{book.author?.name ?? '—'}</td><td>{book.price}</td></tr>)}</tbody></table></div>}
    </section>
  </>
}
