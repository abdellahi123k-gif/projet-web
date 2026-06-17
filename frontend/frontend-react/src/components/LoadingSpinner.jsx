export default function LoadingSpinner({ text = 'Chargement...' }) {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">{text}</span>
        </div>
        <p className="text-muted">{text}</p>
      </div>
    </div>
  );
}
