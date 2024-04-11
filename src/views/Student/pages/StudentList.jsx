import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus,faEye } from '@fortawesome/free-solid-svg-icons';
import setting from '../../../setting.js';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Dialog components
import './style.scss';
import { useNavigate } from 'react-router-dom';
import ListStudentDetalt from './StudentDetail.jsx';

const ListStudent = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the field is 'dob' to format it as a date
    if (name === 'dob') {
      // Parse the datetime string into a Date object
      const parsedDate = new Date(value);
      
      // Format the Date object as a string in 'YYYY-MM-DD' format
      const formattedDate = parsedDate.toISOString().split('T')[0];
  
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedDate, // Update 'dob' field with the formatted date
      }));
    } else {
      // For other fields, update the form data normally
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDialog = (actionType, action, params) => {
    setAction(actionType);
    setOpen(actionType === setting.ACTION.OPEN);
    if (action === setting.ACTION.ADD) {
      setFormData({
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
    } else if (action === setting.ACTION.UPDATE) {
      // setFormData({
      //   StudentID: params.row.StudentID,
      //   Name: params.row.Name,
      //   Dob: params.row.Dob,
      //   Sex: params.row.Sex,
      //   Address: params.row.Address,
      //   PhoneNumber: params.row.PhoneNumber,
      //   EmailAddress: params.row.EmailAd.jsdress,
      //   Country: params.row.Country,
      //   ImageUrl: params.row.ImageUrl,
      // });
      console.log(params.row);
      <ListStudentDetalt data={params.row}></ListStudentDetalt>
      navigate('/Student/pages/StudentDetail.jsx');
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

  const deleteStudent = async (studentID) => {
    try {
      await axios.delete(`https://localhost:7109/api/students/delete?id=${studentID}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const columns = [
    {
      field: '',
      headerName: 'Thao tác',
      sortable: false,
      filterable: false,
      resizable: false,
      width: 120,
      renderCell: (params) => (
        <div className="d-flex justify-content-center w-100">
          <button className="btnUpdate" onClick={() => handleDialog(setting.ACTION.OPEN, setting.ACTION.UPDATE, params)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btnDelete" onClick={() => deleteStudent(params.row.studentID)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button className="btnSearch">
            <FontAwesomeIcon icon={faEye} />
          </button>
        </div>
      ),
    },
    { field: 'studentID', headerName: 'Mã Sinh Viên', width: 130 },
    { field: 'name', headerName: 'Họ Tên', width: 200 },
    {
      field: 'dob',
      headerName: 'Ngày sinh',
      width: 110,
      renderCell: (params) => {
        // Assuming params.row.dob is a valid date string or Date object
        const dob = params.row.dob;
  
        // Check if dob is a valid date string or convert to Date object
        const dateObj = typeof dob === 'string' ? new Date(dob) : dob;
  
        // Extract day, month, and year components from the date
        const day = dateObj.getDate().toString().padStart(2, '0'); // Get day with leading zero
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Get month with leading zero
        const year = dateObj.getFullYear().toString(); // Get full year
  
        // Format date as DDMMYYYY
        const formattedDate = `${day}-${month}-${year}`;
  
        return <div>{formattedDate}</div>;
      },
    },
    {
      field: 'sex',
      headerName: 'Giới tính',
      width: 90,
      renderCell: (params) => (
        <div>{params.row.sex === 1 ? 'Nữ' : 'Nam'}</div>
      ),
    },
    { field: 'address', headerName: 'Địa Chỉ', width: 170 },
    { field: 'phoneNumber', headerName: 'Số Điện Thoại', width: 150 },
    { field: 'emailAddress', headerName: 'Email', width: 190 },
    { field: 'country', headerName: 'Quê Quán', width: 180 },
   
  ];

  return (
    <div className="container-fluid m-0 p-0 wrap-home bg-lazy">
      <div className="container-sm" style={{ maxWidth: '100%' }}>
        <div className="d-flex justify-content-between mt-20" style={{ maxWidth: '100%' }}>
          <span className="fw-700 pl-10 title-page font-60" style={{ color: 'blue', fontSize: '40px' }}>
            Danh sách sinh viên
          </span>
          <button
            style={{
              marginLeft: '10px',
              backgroundColor: 'green',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              width: '90px',
              height: '40px',
            }}
            type="button"
            className="btn-Create"
            onClick={() => handleDialog(setting.ACTION.OPEN, setting.ACTION.ADD, {})}>
            <FontAwesomeIcon className="icon-add mr-5" icon={faPlus} />
            Thêm
          </button>
        </div>
        <div className="mt-20" style={{ height: '490px', width: '100%' }}>
        <DataGrid
        getRowId={(row) => row.studentID}
        rows={listStudent}
        columns={columns}
        pageSize={5}
            rowsPerPageOptions={[7]}
            checkboxSelection
            disableSelectionOnClick
        className="custom-datagrid"
/>
        </div>
      </div>
      <Dialog open={open} keepMounted onClose={() => setOpen(false)}>
        <DialogTitle>{`${action === setting.ACTION.ADD ? 'Thêm' : 'Sửa'} sinh viên`}</DialogTitle>
        <DialogContent>
          {/* Form inputs */}
          {/* Example: */}
          <input type="text" name="StudentID" value={formData.StudentID} onChange={handleInputChange} />
          {/* Add more inputs for other fields */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          {action === setting.ACTION.ADD ? (
            <Button onClick={create}>Thêm mới</Button>
          ) : (
            <Button onClick={update}>Lưu</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListStudent;
