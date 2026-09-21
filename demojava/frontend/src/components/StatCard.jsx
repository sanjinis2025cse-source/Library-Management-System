export default function StatCard({ icon, label, value }) {
  return <article className="stat-card"><span className="stat-icon">{icon}</span><div><p>{label}</p><strong>{value}</strong></div></article>
}
