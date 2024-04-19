import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.scss'; // Import CSS styles

const DetailStudent = ({ initialValues }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentID: '',
    name: '',
    dob: '',
    sex: '',
    address: '',
    phoneNumber: '',
    emailAddress: '',
    country: '',
  });

  // Update formData with initialValues when provided
  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (initialValues) {
        // Update existing student
        await axios.put(`https://localhost:7109/api/students/${formData.studentID}`, formData);
      } else {
        // Create new student
        await axios.post('https://localhost:7109/api/students/Create', formData);
      }
      // Redirect to student list after successful submission
      navigate('/Student/pages/StudentList.jsx');
    } catch (error) {
      console.error('Error submitting student data:', error);
      // Handle error if needed (e.g., show error message)
    }
  };

  return (
    <div className="detail-student-container">
      <h1>{initialValues ? 'Edit Student' : 'Add New Student'}</h1>
      <form id="studentForm" onSubmit={handleSubmit}>
        <label>
          Student ID:
          <input
            type="text"
            name="studentID"
            value={formData.studentID || ''}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            maxLength={50}
            required
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={formData.dob ? formData.dob.slice(0, 10) : ''}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Sex:
          <select name="sex" value={formData.sex || ''} onChange={handleInputChange} required>
            <option value={1}>Nữ</option>
            <option value={0}>Nam</option>
          </select>
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address || ''}
            onChange={handleInputChange}
            maxLength={350}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber || ''}
            onChange={handleInputChange}
            maxLength={11}
          />
        </label>
        <label>
          Email Address:
          <input
            type="email"
            name="emailAddress"
            value={formData.emailAddress || ''}
            onChange={handleInputChange}
            maxLength={350}
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.country || ''}
            onChange={handleInputChange}
            maxLength={350}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl || ''}
            onChange={handleInputChange}
            maxLength={300}
          />
        </label>
      </form>
    </div>
  );
};

export default DetailStudent;
