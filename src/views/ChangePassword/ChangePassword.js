import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardGroup, CCol, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react';
import { useSnackbar } from 'notistack';
import './style.scss';

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Use enqueueSnackbar directly from useSnackbar

  const showNotification = (message, type) => {
    enqueueSnackbar(message, { variant: type });
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      setError('No user data found');
    }
  }, []);
  
  useEffect(() => {
    const loginSuccess = localStorage.getItem('loginSuccess');
    if (!loginSuccess || loginSuccess !== 'true') {
      setError('Unauthorized. Please login again.');
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        setError('No user data found');
        return;
      }
  
      const user = JSON.parse(userData);
      const userId = user.account.id;
  
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Unauthorized. Please login again.');
        navigate('/login');
        return;
      }
  
      const response = await axios.post(
        'https://localhost:7109/api/accounts/ChangePassword',
        {
          UserId: userId,
          CurrentPassword: currentPassword,
          NewPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      localStorage.removeItem('loginSuccess');
      console.log(response.data);
      console.log('Password changed successfully');
  
      setCurrentPassword('');
      setNewPassword('');
      setError('');
  
      // Hiển thị snackbar thành công
      showNotification('Đổi mật khẩu thành công!', 'success');
  
      // Chuyển hướng đến trang TopicDetail sau khi đổi mật khẩu thành công
      navigate('/');
    } catch (error) {
      console.error('Change password error:', error);
  
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        const errorMessage = errorData.title || 'An error occurred';
        setError(errorMessage);
      } else {
        setError('Internal server error occurred');
      }
  
      // Hiển thị snackbar lỗi
      showNotification('Đã xảy ra lỗi khi đổi mật khẩu!', 'error');
    }
  };
  
  return (
    <CRow className="justify-content-center">
      <CCol md={6}>
        <CCard>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Đổi mật khẩu</h1>
              <div style={{ marginBottom: '10px' }}>Mật khẩu cũ</div>
              <CInputGroup className="mb-3">
                <CFormInput
                  type="password"
                  placeholder="Nhập mật khẩu cũ"
                  autoComplete="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </CInputGroup>
              <div style={{ marginBottom: '10px' }}>Mật khẩu mới</div>
              <CInputGroup className="mb-4">
                <CFormInput
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </CInputGroup>
              <CButton color="primary" className="w-100" type="submit">
                Xác nhận
              </CButton>
              {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ChangePasswordForm;
