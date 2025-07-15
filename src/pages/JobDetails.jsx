// src/pages/JobDetails.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechX Pvt Ltd',
    description: 'Build modern UIs using React and Tailwind CSS.',
    requirements: 'React, HTML, CSS, Tailwind, Git',
    salary: '₹6 - ₹10 LPA'
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'CodeCraft Inc',
    description: 'Design APIs and manage databases with Node.js and MongoDB.',
    requirements: 'Node.js, Express, MongoDB, REST APIs',
    salary: '₹8 - ₹12 LPA'
  },
  {
    id: 3,
    title: 'Full Stack Engineer',
    company: 'Innovatech Solutions',
    description: 'Work on both frontend and backend to deliver complete features.',
    requirements: 'React, Node.js, MySQL, Docker',
    salary: '₹10 - ₹15 LPA'
  }
];

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find(job => job.id === parseInt(id));

  if (!job) {
    return <div style={{ padding: 20 }}>❌ Job not found.</div>;
  }

  return (
    <div style={{ padding: '30px' }}>
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Requirements:</strong> {job.requirements}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <button
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
        onClick={() => navigate(`/apply/${job.id}`)}
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;
