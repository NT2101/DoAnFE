/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import AngularImg from '../../../../assets/images/angular.jpg';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';

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
 
const LoginForm = () => {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [ErrorString, setErrorString] = useState('');
  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log(values);
    // Check account password
  }

  const handleLogin = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://localhost:7109/api/accounts/login',
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

  const validationSchema = yup.object({
      email: yup.string().required("Nhap vao email").email("Email chua dung dinh dang"),
      password: yup.string().required("Required").min(3, "Mat khau phai lon hon 3 ky tu")
  });

  const form = useForm({
      defaultValues: {
          email: '',
          password: '',
      },
      resolver: yupResolver(validationSchema),
  });

  return (
      <div className="loginContainer">
        <div className='header'>
          <div className='headerInfo'>
            <div className='InfoIcon'>
              <img src={AngularImg} className='headerInfo--Icon'></img>
            </div>
            <div className='InfoTitle'>
              <span className='headerInfo--Title'>(034) 854-4264</span>
            </div>
          </div>
          <div className='headerInfo'>
            <div className='InfoIcon'>
              <img src={AngularImg} className='headerInfo--Icon'></img>
            </div>
            <div className='InfoTitle'>
              <span className='headerInfo--Title'>infohn@utt.edu.vn</span>
            </div>
          </div>
        </div>

        <div className='headerName'>
          <div className='NameSystem'>
            <span className='Name--System'>Hệ thống quản lý đồ án tốt nghiệp</span>
          </div>
          <div className='NameSubmit'>
            <CButton color='primary'>Sinh viên</CButton>
          </div>
        </div>
        {/* <div className="header">
          <div className="header1">
            <span className="icon">&#x260E;</span> 
            (043) 854-4264
            <span className="icon">&#x2709;</span>
            infohn@utt.edu.vn
          </div>
          <div className="header2">
            Đăng kí đồ án
          </div>
        </div> */}
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md={8}>
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm>
                        <div>
                          <h1 className="LoginTitle">Đăng nhập Hello</h1>
                        </div>
                        <div>
                          Tài khoản:
                        </div>
                        <CInputGroup className="mb-3">
                          <CFormInput
                            form={form}
                            placeholder="Nhập tên tài khoản"
                            autoComplete="username"
                            value={UserName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                          />
                        </CInputGroup>
                        <div>
                          Mật khẩu:
                        </div>
                        <CInputGroup className="mb-4">
                        
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
                            <CButton color="primary" className="px-4" onClick={onSubmit}>
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

export default LoginForm;
