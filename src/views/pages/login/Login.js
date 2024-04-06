import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.scss';
import Images from '../../../assets/images/avatars/1.jpg';
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
  const [ErrorString, setErrorString] = useState('asfdf');
 

  const handleLogin = async () => {
    try {
      const response= await axios({
        method: 'post',
        url: 'https://localhost:7109/api/accounts/Login',
        headers: {}, 
        data: {
          name: UserName, // This is the body part
          password: Password
        }
      });
      setErrorString("XXX");

      if(response.status == 200){
        // Redirect Home
        
      }
      else{
        
        console.log(response.data);
      }
    } catch (error) {
      console.error("X: " . error); // Handle error here
    }
  };

  return (
    <div>
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <div>
                      <img src={Images}></img>
                      <h1 className='LoginTitle'>Đăng Nhập</h1>
                    </div>
                   
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" value={UserName} onChange={(e) => setUserName(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={Password} onChange={(e) => setPassword(e.target.value)}
                      />
                      
                    </CInputGroup>
                    
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleLogin}>
                          Đăng Nhập
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Quên mật khẩu ?
                        </CButton>
                      </CCol>
                    </CRow>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" value={ErrorString} />
                    </CInputGroup>

                    <label>abc {ErrorString}</label>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center" font-size ="12px" >
                  <div>
                    <h2>Trường đại học Công Nghệ Giao Thông Vận Tải</h2>
                    
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Đăng ký ngay!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
    </div>
  );
};

export default Login;
