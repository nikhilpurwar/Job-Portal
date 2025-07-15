import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ApplicationSummary = () => {
  const { id } = useParams();
  const application = useSelector(state => 
    state.applications.find(app => app.id === id)
  );
  
  if (!application) return <div style={{ padding: '2rem', textAlign: 'center' }}>Application not found</div>;
  
  return (
    <div style={{
      maxWidth: '42rem',
      margin: '0 auto',
      padding: '1rem'
    }}>
      <h1 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        color: '#111827'
      }}>
        Application Summary
      </h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Personal Information Section */}
        <div>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#111827',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid #e5e7eb'
          }}>
            Personal Information
          </h2>
          <div style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
          }}>
            <div>
              <p style={{ fontWeight: '500', color: '#6b7280' }}>Name</p>
              <p style={{ marginTop: '0.25rem' }}>{application.applicantName}</p>
            </div>
            <div>
              <p style={{ fontWeight: '500', color: '#6b7280' }}>Email</p>
              <p style={{ marginTop: '0.25rem' }}>{application.email}</p>
            </div>
            <div>
              <p style={{ fontWeight: '500', color: '#6b7280' }}>Phone</p>
              <p style={{ marginTop: '0.25rem' }}>{application.phone}</p>
            </div>
          </div>
        </div>
        
        {/* Experience Section */}
        <div>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#111827',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid #e5e7eb'
          }}>
            Experience
          </h2>
          <div style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
          }}>
            <div>
              <p style={{ fontWeight: '500', color: '#6b7280' }}>Years of Experience</p>
              <p style={{ marginTop: '0.25rem' }}>{application.experience}</p>
            </div>
            <div>
              <p style={{ fontWeight: '500', color: '#6b7280' }}>Skills</p>
              <p style={{ marginTop: '0.25rem' }}>{application.skills.join(', ')}</p>
            </div>
          </div>
        </div>
        
        {/* Additional Information Section */}
        <div>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#111827',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid #e5e7eb'
          }}>
            Additional Information
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <p style={{ fontWeight: '500', color: '#6b7280' }}>Cover Letter</p>
              <p style={{ 
                marginTop: '0.25rem',
                whiteSpace: 'pre-line',
                lineHeight: '1.6'
              }}>
                {application.coverLetter}
              </p>
            </div>
            <div>
              <p style={{ fontWeight: '500', color: '#6b7280' }}>Preferred Start Date</p>
              <p style={{ marginTop: '0.25rem' }}>
                {new Date(application.startDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '1rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <Link
            to={`/apply/${application.jobId}`}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'background-color 200ms ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
            state={{ editMode: true, application }}
          >
            Edit Application
          </Link>
          <Link
            to="/applications"
            style={{
              backgroundColor: '#e5e7eb',
              color: '#374151',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'background-color 200ms ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
          >
            Back to Applications
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSummary;