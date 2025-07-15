import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import Home from './pages/Home';
import JobDetails from './pages/JobDetails';
import Apply from './pages/Apply';
import Applications from './pages/Applications';
import ApplicationSummary from './pages/ApplicationSummary';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <Router>
          <Header />
          <main className="min-h-screen bg-gray-50">
            <div className="container mx-auto py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/job/:id" element={<JobDetails />} />
                <Route path="/apply/:id" element={<Apply />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/applications/:id" element={<ApplicationSummary />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </main>
        </Router>
      </UserProvider>
    </Provider>
  );
};

export default App;