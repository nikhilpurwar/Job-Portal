import './Styling/Step1.css';

const Step1 = ({ formData, handleChange, errors }) => {
    return (
        <div className="step-container">
            <h2 className="step-title">Personal Information</h2>

            <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                    type="text"
                    name="applicantName"
                    value={formData.applicantName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="John Doe"
                />
                {errors.applicantName && <p className="error-message">{errors.applicantName}</p>}
            </div>

            <div className="form-group">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="example@email.com"
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="+1 (123) 456-7890"
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>
        </div>
    );
};

export default Step1;