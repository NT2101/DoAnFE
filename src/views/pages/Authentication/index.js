import React, { useState } from 'react';
import {  Link } from 'react-router-dom';
import axios from 'axios';
import './style.scss';
import { useNavigate } from 'react-router-dom';

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

const Login = () => {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [ErrorString, setErrorString] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://localhost:7109/api/accounts/Login',
        headers: {},
        data: {
          Name: UserName,
          Password: Password,
        },
      });

      
      if (response.status === 200) {
        console.log("ss")
        // Redirect to Home or perform other actions upon successful login
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error here
    }
  };

  return (
    
     
      <div className="login-container max-vh-100 d-flex flex-row align-items-center">
      <div className="header">
      <div className="header1">
        <span className="icon">&#x260E;</span> 
        (043) 854-4264
        <span className="icon">&#x2709;</span>
        infohn@utt.edu.vn
      </div>
      <div className="header2">
        Đăng kí đồ án
      </div>
      </div>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <div>
                        <h1 className="LoginTitle">Đăng Nhập</h1>
                      </div>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Username"
                          autoComplete="username"
                          value={UserName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={Password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton color="primary" className="px-4" onClick={handleLogin}>
                            Đăng Nhập
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
        
      </div>
    
  );
};

export default Login;
