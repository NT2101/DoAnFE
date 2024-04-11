import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import setting from '../../../setting.js';
import {

    CFormInput,

    CInputGroup,

    CInputGroupText,
  
  } from '@coreui/react'
import './style.scss';
import { useNavigate } from 'react-router-dom';
const ListStudentDetalt = (props) => {
  const [listStudent, setListStudent] = useState([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('');
  const [formData, setFormData] = useState({
    StudentID: '',
    Name: '',
    Dob: '',
    Sex: '',
    Address: '',
    PhoneNumber: '',
    EmailAddress: '',
    Country: '',
    ImageUrl: '',
  });
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7109/api/students/All');
      setListStudent(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };



  const create = async () => {
    try {
      await axios.post('https://localhost:7109/api/students/Create', formData);
      fetchData();
      setOpen(false);
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const update = async () => {
    try {
      await axios.put(`https://localhost:7109/api/students/Update/${formData.StudentID}`, formData);
      fetchData();
      setOpen(false);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };




  return (
    <div className="container-fluid m-0 p-0 wrap-home bg-lazy">
   <CInputGroup className="mb-3">
  <CInputGroupText id="studentID">{props.studentID}</CInputGroupText>
  <CFormInput placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
</CInputGroup>

<CInputGroup className="mb-3">
  <CInputGroupText id="name">@</CInputGroupText>
  <CFormInput placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
</CInputGroup>   
<CInputGroup className="mb-3">
  <CInputGroupText id="dob">@</CInputGroupText>
  <CFormInput placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
</CInputGroup>   
<CInputGroup className="mb-3">
  <CInputGroupText id="sex">@</CInputGroupText>
  <CFormInput placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
</CInputGroup>  
 <CInputGroup className="mb-3">
  <CInputGroupText id="address">@</CInputGroupText>
  <CFormInput placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
</CInputGroup> 
  <CInputGroup className="mb-3">
  <CInputGroupText id="phoneNumber">@</CInputGroupText>
  <CFormInput placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
</CInputGroup>  
 <CInputGroup className="mb-3">
  <CInputGroupText id="emailAddress">@</CInputGroupText>
  <CFormInput placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
</CInputGroup>
<CInputGroup className="mb-3">
  <CInputGroupText id="country">@</CInputGroupText>
  <CFormInput placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
</CInputGroup>
    </div>
  );
};

export default ListStudentDetalt;
