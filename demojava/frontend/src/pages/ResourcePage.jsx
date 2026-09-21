import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ErrorMessage, Loading, EmptyState } from '../components/Status'

const config = {
  authors: { singular: 'Author', plural: 'Authors', fields: [['name', 'Name'], ['country', 'Country']] },
  members: { singular: 'Member', plural: 'Members', fields: [['name', 'Name'], ['mail', 'Email'], ['phoneNumber', 'Phone Number']] },
}

export function ResourceList({ type, api }) {
  const details = config[type]; const [items, setItems] = useState(null); const [error, setError] = useState('')
  const load = () => { setError(''); api.getAll().then(r => setItems(r.data)).catch(() => setError(`Could not load ${details.plural.toLowerCase()}.`)) }
  useEffect(load, [])
  const remove = async item => { if (!window.confirm(`Delete “${item.name}”?`)) return; try { await api.remove(item.id); load() } catch { setError(`Could not delete this ${details.singular.toLowerCase()}.`) } }
  return <section className="panel"><div className="panel-title"><div><h2>{details.plural}</h2><p>Manage library {details.plural.toLowerCase()}</p></div><Link className="button" to={`/${type}/new`}>+ Add {details.singular}</Link></div>{error && <ErrorMessage message={error} />}{!items ? <Loading /> : items.length === 0 ? <EmptyState label={details.plural.toLowerCase()} /> : <div className="table-wrap"><table><thead><tr><th>ID</th>{details.fields.map(([, label]) => <th key={label}>{label}</th>)}<th>Actions</th></tr></thead><tbody>{items.map(item => <tr key={item.id}><td>{item.id}</td>{details.fields.map(([field]) => <td key={field}>{item[field]}</td>)}<td className="actions"><Link to={`/${type}/${item.id}/edit`}>Edit</Link><button onClick={() => remove(item)}>Delete</button></td></tr>)}</tbody></table></div>}</section>
}

export function ResourceForm({ type, api }) {
  const details = config[type]; const { id } = useParams(); const editing = Boolean(id); const navigate = useNavigate()
  const empty = Object.fromEntries(details.fields.map(([field]) => [field, ''])); const [form, setForm] = useState(empty); const [loading, setLoading] = useState(editing); const [error, setError] = useState(''); const [saving, setSaving] = useState(false)
  useEffect(() => { if (!editing) return; api.getById(id).then(r => setForm(Object.fromEntries(details.fields.map(([field]) => [field, r.data[field] ?? ''])))).catch(() => setError(`Could not load this ${details.singular.toLowerCase()}.`)).finally(() => setLoading(false)) }, [api, details.fields, details.singular, editing, id])
  const submit = async e => { e.preventDefault(); setSaving(true); setError(''); try { editing ? await api.update(id, form) : await api.create(form); navigate(`/${type}`) } catch { setError(`Could not save this ${details.singular.toLowerCase()}. Please try again.`) } finally { setSaving(false) } }
  if (loading) return <Loading />
  return <section className="form-panel"><h2>{editing ? `Edit ${details.singular}` : `Add ${details.singular}`}</h2><p>Enter the {details.singular.toLowerCase()} details below.</p>{error && <ErrorMessage message={error} />}<form onSubmit={submit}>{details.fields.map(([field, label]) => <label key={field}>{label}<input required type={field === 'mail' ? 'email' : 'text'} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} /></label>)}<div className="form-actions"><button type="button" className="button secondary" onClick={() => navigate(`/${type}`)}>Cancel</button><button className="button" disabled={saving}>{saving ? 'Saving…' : `Save ${details.singular}`}</button></div></form></section>
}
