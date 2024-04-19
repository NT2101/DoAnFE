import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
//Student
const ListStudent = React.lazy(() => import('./views/Student/pages/StudentList.jsx'))
const DetailStudent = React.lazy(() => import('./views/Student/pages/StudentDetail.jsx'))
// //Account
const ListAccount = React.lazy(() => import('./views/Account/pages/AccountList.jsx'))
const DetailAccount = React.lazy(() => import('./views/Account/pages/AccountDetail.jsx'))
// //Teacher
const ListTeacher = React.lazy(() => import('./views/Teacher/pages/TeacherList.jsx'))
const DetailTeacher = React.lazy(() => import('./views/Teacher/pages/TeacherDetail.jsx'))
//Topic
const ListTopic = React.lazy(() => import('./views/Topic/pages/TopicList.jsx'))
const DetailTopic = React.lazy(() => import('./views/Topic/pages/TopicDetail.jsx'))
//TopicType
const ListTopicType = React.lazy(() => import('./views/TopicType/pages/TopicTypeList.jsx'))
const DetailTopicType = React.lazy(() => import('./views/TopicType/pages/TopicTypeDetail.jsx'))




const routes = [
  { path: '/', exact: true, name: 'Trang chủ' },
  { path: '/dashboard', name: 'Tin tức', element: Dashboard },
  { path: '/Student', name: 'Quản lý sinh viên', element: ListStudent, exact: true },
  { path: '/Student/pages/StudentList.jsx', name: 'Danh sách sinh viên', element: ListStudent },
  { path: '/Student/pages/StudentDetail.jsx', name: 'Chi tiết sinh viên', element: DetailStudent },
  { path: '/Teacher', name: 'Quản lý giảng viên', element: ListTeacher, exact: true },
  { path: '/Teacher/pages/TeacherList.jsx', name: 'Danh sách giảng viên', element: ListTeacher },
  { path: '/Teacher/pages/TeacherDetail.jsx', name: 'Chi tiết giảng viên', element: DetailTeacher },
  { path: '/Account', name: 'Quản lý tài khoản', element: ListAccount, exact: true },
  { path: '/Account/pages/AccountList.jsx', name: 'Danh sách tài khoản', element: ListAccount },
  { path: '/Account/pages/AccountDetail.jsx', name: 'Chi tiết tài khoản', element: DetailAccount },
  { path: '/Topic', name: 'Quản lý đề tài', element: ListTopic, exact: true },
  { path: '/Topic/pages/TopicList.jsx', name: 'Danh sách đề tài', element: ListTopic },
  { path: '/Topic/pages/TopicDetail.jsx', name: 'Chi tiết đề tài', element: DetailTopic },
  { path: '/TopicType', name: 'Quản lý lĩnh vực', element: ListTopicType, exact: true },
  { path: '/TopicType/pages/TopicTypeList.jsx', name: 'Danh sách lĩnh vực', element: ListTopicType },
  { path: '/TopicType/pages/TopicTypeDetail.jsx', name: 'Chi tiết lĩnh vực', element: DetailTopicType },

  

]

export default routes
