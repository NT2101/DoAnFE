import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import setting from '../../../setting.js';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import './style.scss';
import { useNavigate } from 'react-router-dom';

const ListStudent = () => {
  const [listStudent, setListStudent] = useState([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentID: '',
    name: '',
    dob: '',
    sex: '',
    address: '',
    phoneNumber: '',
    emailAddress: '',
    country: '',
    imageUrl:'',
  });

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

  const update = async () => {
    setOpen(false);
    try {
       await axios.put(`https://localhost:7109/api/students/Update?studentID=${formData.studentID}`, formData);
      // Sau khi cập nhật thành công, gọi fetchData() để cập nhật lại danh sách sinh viên
      fetchData();
    } catch (error) {
      console.error('Error updating student data:', error);
      // Xử lý lỗi cập nhật sinh viên ở đây (có thể hiển thị thông báo lỗi cho người dùng)
    }
  };

  const create = async () => {
    setOpen(false);
    try {
      const response = await axios.post('https://localhost:7109/api/students/Create', formData);
      console.log('Response from server:', response.data);
      fetchData();
    } catch (error) {
      if (error.response) {
     
        console.error('Error creating student:', error.response.data);
      } else if (error.request) {
        
        console.error('Request error:', error.request);
      } else {
      
        console.error('Error:', error.message);
      }

    }
  };
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDialog = async (status, action, data) => {
    switch (action) {
      case setting.ACTION.ADD:
        if (status === setting.ACTION.OPEN) {
          setFormData({
            studentID: '',
            name: '',
            dob: '',
            sex: '',
            address: '',
            phoneNumber: '',
            emailAddress: '',
            country: '',
            imageUrl:'',
          });
        }
        break;
      case setting.ACTION.UPDATE:
        if (status === setting.ACTION.OPEN) {
          setFormData(data.row);
        } else {
          setFormData({
            studentID: '',
            name: '',
            dob: '',
            sex: '',
            address: '',
            phoneNumber: '',
            emailAddress: '',
            country: '',
            imageUrl:'',
          });
        }
        break;
      
    }
    setAction(action);
    setOpen(status);
  };

  
 

  const deleteStudent = async (studentID) => {
    try {
      await axios.delete(`https://localhost:7109/api/students/delete?studentID=${studentID}`);
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
    { field: 'name', headerName: 'Họ Tên', width: 180 },
    {
      field: 'dob',
      headerName: 'Ngày sinh',
      width: 100,
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
    { field: 'address', headerName: 'Địa Chỉ', width: 200 },
    { field: 'phoneNumber', headerName: 'Số Điện Thoại', width: 120 },
    { field: 'emailAddress', headerName: 'Email', width: 210 },
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
            
          </button>
        </div>
        <div className="mt-20" style={{ height: '490px', width: '100%' }}>
          <DataGrid
            getRowId={(row) => row.studentID}
            rows={listStudent}
            columns={columns}
            pageSize={5}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableSelectionOnClick
            className="custom-datagrid"
          />
        </div>
        <Dialog
            open={open}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              {`${
                action === setting.ACTION.ADD
                  ? "Thêm"
                  : action === setting.ACTION.UPDATE
                  ? "Sửa"
                  : "Thêm"
              } sinh viên`}
            </DialogTitle>
            <DialogContent>
            <div className="form-group mt-10 col-md-6">
                  <label htmlFor="studentID">Mã sinh viên</label>
                  <input
                    type="text"
                    className="form-control"
                    name="studentID"
                    value={formData.studentID}
                    placeholder="Nhập mã sinh viên"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              <div className="row">
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="name">Tên sinh viên</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    placeholder="Nhập tên sinh viên"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="dob">Ngày sinh</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập ngày sinh"
                    required
                  />
                </div>
                <div className="col-md-6 mt-10">
                  <label htmlFor="sex">Giới tính</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={formData.sex}
                    onChange={handleInputChange}
                    name="sex"
                  >
                    <option value="">Chọn giới tính</option>
                    {Object.values(setting.GENDER_STATUS).map(e => (
                      <option key={e.code} value={e.code}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="address">Địa chỉ</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập địa chỉ"
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="phoneNumber">Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    placeholder="Nhập số điện thoại"
                    onChange={handleInputChange}
                    required
                  />
                </div>            
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="emailAddress">Địa chỉ email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="emailAddress"
                    value={formData.emailAddress}
                    placeholder="Nhập địa chỉ email"
                    onChange={handleInputChange}
                    required
                  />
                </div> 
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="country">Quê quán</label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    value={formData.country}
                    placeholder="Nhập quê quán"
                    onChange={handleInputChange}
                    required
                  />
                </div>    
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="imageUrl">Link hình ảnh</label>
                  <input
                    type="text"
                    className="form-control"
                    name="imageUrl"
                    value={formData.imageUrl}
                    placeholder="Nhập quê quán"
                    onChange={handleInputChange}
                    required
                  />
                </div>                      
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleDialog(setting.ACTION.CLOSE, "", {})}
              >
                Hủy
              </Button>
              {action === setting.ACTION.ADD ? (
                <Button onClick={() => create()}>Thêm mới</Button>
              ) : (
                <Button onClick={() => update()}>Lưu</Button>
              )}
            </DialogActions>
          </Dialog>

      </div>
      
    </div>
  );
};

export default ListStudent;
