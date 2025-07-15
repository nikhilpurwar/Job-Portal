import { useState } from 'react';
import { useUser } from '../context/UserContext';

const Profile = () => {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    alert('Profile updated successfully!');
  };

  return (
    <div style={{
      maxWidth: '28rem',
      margin: '0 auto',
      padding: '1rem'
    }}>
      <h1 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        color: '#111827'
      }}>
        User Profile
      </h1>
      
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#374151'
          }}>
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
            required
          />
        </div>
        
        <div>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#374151'
          }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
            required
          />
        </div>
        
        <button
          type="submit"
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem 1.5rem',
            borderRadius: '0.375rem',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 200ms ease',
            alignSelf: 'flex-start'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;