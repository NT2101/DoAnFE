/* eslint-disable prettier/prettier */
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CAlert,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import { useSnackbar } from 'notistack';
const LoginForm = () => {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  const handleLogin = async () => {
    if (!UserName.trim() || !Password.trim()) {
      enqueueSnackbar('Vui lòng nhập tên đăng nhập và mật khẩu.',{variant:'error'});
      return; // Prevent further execution
    }
  
    try {
      const response = await axios.post('https://localhost:7109/api/accounts/login', {
        Name: UserName,
        Password: Password,
      });
  
      if (response.status === 200) {
        // Đăng nhập thành công
        localStorage.setItem('user', JSON.stringify(response.data));
        enqueueSnackbar('Đăng nhập thành công!', { variant: 'success' });
        const userData = response.data;
        console.log('User Data:', userData)
        if (userData.account.roleID == 1) {
          if (userData.account.status == 1) {
            console.log('Navigating to ChangePassword...');
            navigate('/ChangePassword', { state: { userData } });
          } else if (userData.account.status == 2) {
            console.log('Navigating to CreateTopic...');
            navigate('/CreateTopic');
          } else {
            enqueueSnackbar('Tài khoản đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên.',{variant:'error'});
          }
        } else if (userData.account.roleID === 0) {
          console.log('Navigating to Dashboard...');
          navigate('/Dashboard');
        }
      } else {
        enqueueSnackbar('Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.',{variant:'error'});
      }
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Đã xảy ra lỗi khi đăng nhập.',{variant:'error'});
    }
  };
  
 
  useEffect(() => {
    // Lấy thông tin tài khoản từ localStorage khi component được render
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
  
      if (user.roleID === 1) {
        // Nếu RoleID là 1 (ví dụ: học sinh), chuyển hướng đến trang đổi mật khẩu
        navigate('/ChangePassword');
      } else {
        // Nếu không có quyền truy cập (RoleID không hợp lệ), hiển thị thông báo lỗi
        enqueueSnackbar({variant:'error'});

      }
    }
  }, []);
  
  return (
      <div className="loginContainer" > 
        <div className='headerLogin'>
          <div className='headerInfo'>
            <div className='InfoIcon'>
              <div className='headerInfo--Icon'> 
                <svg  xmlns="http://www.w3.org/2000/svg"  
            fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" 
            className="mr-2 inline-block w-6 h-6 "
            >
            <path strokeLinecap="round" 
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            </div>                   
            </div>
            <div className='InfoTitle'>
              <span className='headerInfo--Title'>(034) 854-4264</span>
            </div>
          </div>
          <div className='headerInfo'>
            <div className='InfoIcon'>          
              <div className='headerInfo--Icon'>
              <svg xmlns="http://www.w3.org/2000/svg"   
              fill="none" viewBox="0 0 24 24" 
              strokeWidth={1.5} stroke="currentColor" 
              className="w-6 h-6"
              >
              <path strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>

              </div>
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
              <CCol md={12}>
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm>
                        <div>
                          <h1 className="LoginTitle">Đăng nhập</h1>
                        </div>
                        <div>
                          Tài khoản:
                        </div>
                        <CInputGroup className="mb-3">
                          <CFormInput
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
                            placeholder="Nhập mật khẩu"
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

export default LoginForm;
