import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addApplication, editApplication } from '../redux/applicationSlice';
import { useForm } from '../hooks/useForm';
import Step1 from '../components/ApplyForm/Step1';
import Step2 from '../components/ApplyForm/Step2';
import Step3 from '../components/ApplyForm/Step3';

const validate = (values, step) => {
    const errors = {};

    // Common validations for all steps
    if (step >= 1 && step <= 3) {
        if (!values.applicantName?.trim()) errors.applicantName = 'Name is required';
        if (!values.email?.trim()) errors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Invalid email format';
    }

    // Step 1 specific validations
    if (step === 1) {
        if (!values.phone?.trim()) errors.phone = 'Phone is required';
        else if (!/^[\d\s+\-().]{10,}$/.test(values.phone)) errors.phone = 'Invalid phone number';
    }

    // Step 2 specific validations
    if (step >= 2) {
        if (!values.experience) errors.experience = 'Experience is required';
        else if (isNaN(values.experience) || values.experience < 0) errors.experience = 'Invalid experience value';
        if (!values.skills?.length) errors.skills = 'At least one skill is required';
    }

    // Step 3 specific validations
    if (step === 3) {
        if (!values.coverLetter?.trim()) errors.coverLetter = 'Cover letter is required';
        else if (values.coverLetter.length < 50) errors.coverLetter = 'Cover letter too short (min 50 chars)';
        if (!values.startDate) errors.startDate = 'Start date is required';
        else if (new Date(values.startDate) < new Date()) errors.startDate = 'Start date cannot be in the past';
    }

    return errors;
};

const Apply = () => {
    const { id: jobId } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // Check for edit mode
    const isEditMode = location.state?.editMode;
    const editApplicationData = location.state?.application;

    // Initialize form with empty values or edit data
    const { values, errors, handleChange, handleSubmit, setValues } = useForm({
        jobId,
        applicantName: '',
        email: '',
        phone: '',
        experience: '',
        skills: [],
        coverLetter: '',
        startDate: ''
    }, (values) => validate(values, step));

    // Set form values if in edit mode
    useEffect(() => {
        if (isEditMode && editApplicationData) {
            setValues({
                jobId: editApplicationData.jobId,
                applicantName: editApplicationData.applicantName,
                email: editApplicationData.email,
                phone: editApplicationData.phone,
                experience: editApplicationData.experience,
                skills: [...editApplicationData.skills],
                coverLetter: editApplicationData.coverLetter,
                startDate: editApplicationData.startDate
            });
        }
    }, [isEditMode, editApplicationData, setValues]);

    const nextStep = () => {
        handleSubmit(() => {
            setStep(step + 1);
        });
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const submitApplication = () => {
        handleSubmit(() => {
            const application = {
                id: isEditMode ? editApplicationData.id : Date.now().toString(),
                ...values,
                appliedAt: isEditMode ? editApplicationData.appliedAt : new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            if (isEditMode) {
                dispatch(editApplication(application));
            } else {
                dispatch(addApplication(application));
            }

            navigate(`/applications/${application.id}`, {
                state: {
                    message: isEditMode
                        ? 'Application updated successfully!'
                        : 'Application submitted successfully!'
                }
            });
        });
    };

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
                color: '#1f2937'
            }}>
                {isEditMode ? 'Edit Application' : 'Job Application'}
            </h1>

            {/* Progress indicator */}
            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                }}>
                    {[1, 2, 3].map((stepNumber) => (
                        <span
                            key={stepNumber}
                            style={{
                                fontWeight: '600',
                                color: step >= stepNumber ? '#2563eb' : '#9ca3af'
                            }}
                        >
                            Step {stepNumber}: {stepNumber === 1 ? 'Personal' : stepNumber === 2 ? 'Experience' : 'Additional'}
                        </span>
                    ))}
                </div>
                <div style={{
                    width: '100%',
                    height: '0.5rem',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '9999px',
                    overflow: 'hidden'
                }}>
                    <div
                        style={{
                            height: '100%',
                            backgroundColor: '#2563eb',
                            borderRadius: '9999px',
                            transition: 'width 300ms ease-out',
                            width: `${(step / 3) * 100}%`
                        }}
                    ></div>
                </div>
            </div>

            {/* Form steps */}
            <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
                {step === 1 && <Step1 formData={values} handleChange={handleChange} errors={errors} />}
                {step === 2 && <Step2 formData={values} handleChange={handleChange} errors={errors} setFormData={setValues} />}
                {step === 3 && <Step3 formData={values} handleChange={handleChange} errors={errors} />}

                {/* Navigation buttons */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '2rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #e5e7eb'
                }}>
                    {step > 1 ? (
                        <button
                            type="button"
                            onClick={prevStep}
                            style={{
                                backgroundColor: '#e5e7eb',
                                color: '#1f2937',
                                padding: '0.5rem 1.5rem',
                                borderRadius: '0.375rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                border: 'none',
                                transition: 'background-color 200ms ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                        >
                            Back
                        </button>
                    ) : (
                        <div></div>
                    )}

                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            style={{
                                backgroundColor: '#2563eb',
                                color: 'white',
                                padding: '0.5rem 1.5rem',
                                borderRadius: '0.375rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                border: 'none',
                                marginLeft: 'auto',
                                transition: 'background-color 200ms ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={submitApplication}
                            style={{
                                backgroundColor: '#16a34a',
                                color: 'white',
                                padding: '0.5rem 1.5rem',
                                borderRadius: '0.375rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                border: 'none',
                                marginLeft: 'auto',
                                transition: 'background-color 200ms ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                        >
                            {isEditMode ? 'Update Application' : 'Submit Application'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Apply;