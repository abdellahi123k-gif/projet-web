export default function StatCard({ title, value, icon, color = 'primary' }) {
  return (
    <div className={`card border-start border-4 border-${color} shadow-sm h-100`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted text-uppercase small mb-2">{title}</h6>
            <h2 className="mb-0 fw-bold">{value}</h2>
          </div>
          <div className={`text-${color} fs-1`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
