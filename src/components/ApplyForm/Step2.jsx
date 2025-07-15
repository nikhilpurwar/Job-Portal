import { useState } from 'react';
import './Styling/Step2.css';

const Step2 = ({ formData, handleChange, errors, setFormData }) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="step-container">
      <h2 className="step-title">Experience</h2>
      
      <div className="form-group">
        <label className="form-label">Years of Experience</label>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="form-input"
          min="0"
        />
        {errors.experience && <p className="error-message">{errors.experience}</p>}
      </div>
      
      <div className="form-group">
        <label className="form-label">Skills</label>
        <div className="skills-input-group">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="skills-input"
            placeholder="Add a skill"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="add-skill-btn"
          >
            Add
          </button>
        </div>
        <div className="skills-list">
          {formData.skills.map((skill, index) => (
            <div key={index} className="skill-tag">
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="remove-skill-btn"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        {errors.skills && <p className="error-message">{errors.skills}</p>}
      </div>
    </div>
  );
};

export default Step2;