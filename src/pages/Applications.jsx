import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Applications = () => {
  const applications = useSelector(state => state.applications);
  
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1rem'
    }}>
      <h1 style={{
        fontSize: '1.875rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        color: '#111827'
      }}>
        My Applications
      </h1>
      
      {applications.length === 0 ? (
        <p style={{ color: '#6b7280' }}>You haven't submitted any applications yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {applications.map(app => (
            <div key={app.id} style={{
              border: '1px solid #e5e7eb',
              padding: '1rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#111827'
              }}>
                {app.applicantName}'s Application
              </h2>
              <p style={{
                color: '#6b7280',
                marginBottom: '0.5rem',
                fontSize: '0.875rem'
              }}>
                Applied on: {new Date(app.appliedAt).toLocaleDateString()}
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                Skills: {app.skills.join(', ')}
              </p>
              <Link
                to={`/applications/${app.id}`}
                style={{
                  color: '#3b82f6',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;