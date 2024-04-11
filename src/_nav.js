import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Trang chủ',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },  

  //account
  {
    component: CNavTitle,
    name: 'Quản lý tài khoản',
  },
  {
    component: CNavItem,
    name: 'Danh sách tài khoản',
    to: '/Account/pages/AccountList.jsx',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Chi tiết tài khoản',
    to: '/Account/pages/AccountDetail.jsx',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  //Student
  {
    component: CNavTitle,
    name: 'Quản lý sinh viên',
  },
  {
    component: CNavItem,
    name: 'Danh sách sinh viên',
    to: '/Student/pages/StudentList.jsx',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Chi tiết sinh viên',
    to: '/Student/pages/StudentDetail.jsx',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  //Teacher
  {
    component: CNavTitle,
    name: 'Quản lý giảng viên',
  },
  {
    component: CNavItem,
    name: 'Danh sách giảng viên',
    to: '/Teacher/pages/TeacherList.jsx',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Chi tiết giảng viên',
    to: '/Teacher/pages/TeacherDetail.jsx',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  //Topic
  {
    component: CNavTitle,
    name: 'Quản lý đồ án',
  },
  {
    component: CNavItem,
    name: 'Danh sách đồ án',
    to: '/Topic/pages/TopicList.jsx',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Chi tiết đồ án',
    to: '/Topic/pages/TopicDetail.jsx',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  //TopicType
  {
    component: CNavTitle,
    name: 'Quản lý lĩnh vực',
  },
  {
    component: CNavItem,
    name: 'Danh sách lĩnh vực',
    to: '/TopicType/pages/TopicTypeList.jsx',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Chi tiết lĩnh vực',
    to: '/TopicType/pages/TopicTypeDetail.jsx',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  

 
 
]

export default _nav
