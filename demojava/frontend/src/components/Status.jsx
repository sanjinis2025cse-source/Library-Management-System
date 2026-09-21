export function Loading() { return <p className="status">Loading data…</p> }
export function ErrorMessage({ message }) { return <p className="status error">{message}</p> }
export function EmptyState({ label }) { return <p className="status">No {label} found yet.</p> }
