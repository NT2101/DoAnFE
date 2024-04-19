import React, { useState, useEffect } from 'react';
import {
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import { cilLockLocked } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const AppHeaderDropdown = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (userData) {
      try {
        const user = JSON.parse(userData);

        let displayName = '';
        if (user.studentInfo && user.studentInfo.name) {
          displayName = user.studentInfo.name; // Nếu là sinh viên
        } else if (user.teacherInfo && user.teacherInfo.name) {
          displayName = user.teacherInfo.name; // Nếu là giáo viên
        } else {
          console.error('Missing name property in user data:', user);
        }

        setUserName(displayName); // Set tên người dùng cho hiển thị
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    } else {
      console.error('No user data found in localStorage.');
    }
  }, []);

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        {/* Hiển thị tên người dùng trong label */}
        <label style={{ margin: '6px' }}>{userName}</label>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
