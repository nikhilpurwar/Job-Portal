import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const { user } = useUser();
  
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/"><h1 className="header-title">Job Portal</h1></Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/applications" className="nav-link">My Applications</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <span className="user-greeting">Welcome, {user.username}</span>
        </nav>
      </div>
    </header>
  );
};

export default Header;