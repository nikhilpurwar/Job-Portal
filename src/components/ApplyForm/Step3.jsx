import './Styling/Step3.css';

const Step3 = ({ formData, handleChange, errors }) => {
  return (
    <div className="step-container">
      <h2 className="step-title">Additional Information</h2>
      
      <div className="form-group">
        <label className="form-label">Cover Letter</label>
        <textarea
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange}
          className="form-textarea"
          rows="6"
        />
        {errors.coverLetter && <p className="error-message">{errors.coverLetter}</p>}
      </div>
      
      <div className="form-group">
        <label className="form-label">Preferred Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="form-input"
        />
        {errors.startDate && <p className="error-message">{errors.startDate}</p>}
      </div>
    </div>
  );
};

export default Step3;