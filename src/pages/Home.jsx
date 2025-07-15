// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechX Pvt Ltd',
    description: 'Build modern UIs using React and Tailwind CSS.'
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'CodeCraft Inc',
    description: 'Design APIs and manage databases with Node.js and MongoDB.'
  },
  {
    id: 3,
    title: 'Full Stack Engineer',
    company: 'Innovatech Solutions',
    description: 'Work on both frontend and backend to deliver complete features.'
  }
];

const Home = () => {
  return (
    <div className="home-container" style={{ padding: '20px' }}>
      <h2>Available Job Positions</h2>
      {jobs.map(job => (
        <div key={job.id} className="job-card" style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          margin: '10px 0'
        }}>
          <h3>{job.title}</h3>
          <p><strong>Company:</strong> {job.company}</p>
          <p>{job.description}</p>
          <Link to={`job/${job.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
            View Details →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
