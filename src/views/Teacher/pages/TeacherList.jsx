import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus ,faEye} from '@fortawesome/free-solid-svg-icons';
import setting from '../../../setting.js';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Dialog components
import './style.scss';

const ListTeacher = () => {
  const [listTeacher, setListTeacher] = useState([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('');
  const [formData, setFormData] = useState({
    teacherID: '',
    name: '',
    dob: '',
    sex: '',
    phoneNumber: '',
    emailAddress: '',
    description: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7109/api/teachers/All');
      setListTeacher(response.data);
    } catch (error) {
      console.error('Error fetching teacher data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDialog = async (status, action, data) => {
    switch (action) {
      case setting.ACTION.ADD:
        if (status === setting.ACTION.OPEN) {
          setFormData({
            teacherID: '',
            name: '',
            dob: '',
            sex: '',
            phoneNumber: '',
            emailAddress: '',
            description: '',
          });
        }
        break;
      case setting.ACTION.UPDATE:
        if (status === setting.ACTION.OPEN) {
          setFormData(data.row);
        } else {
          setFormData({
            teacherID: '',
            name: '',
            dob: '',
            sex: '',
            phoneNumber: '',
            emailAddress: '',
            description: '',
          });
        }
        break;
      
    }
    setAction(action);
    setOpen(status);
  };

 
  const create = async () => {
    try {
      await axios.post('https://localhost:7109/api/teachers/Create', formData);
      fetchData();
      setOpen(false);
    } catch (error) {
      console.error('Error creating teacher:', error);
    }
  };
 

  const update = async () => {
    try {
      await axios.put(`https://localhost:7109/api/teachers/Update?id=${formData.teacherID}`, formData);
      fetchData();
      setOpen(false);
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  const deleteStudent = async (teacherID) => {
    try {
      await axios.delete(`https://localhost:7109/api/teachers/delete?id=${teacherID}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting teacher:', error);
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
          <button className="btnDelete" onClick={() => deleteStudent(params.row.teacherID)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button className="btnSearch">
            <FontAwesomeIcon icon={faEye} />
          </button>
        </div>
      ),
    },
    { field: 'teacherID', headerName: 'Mã giảng Viên', width: 130 },
    { field: 'name', headerName: 'Họ Tên', width: 250 },
    {
      field: 'dob',
      headerName: 'Ngày sinh',
      width: 130,
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
      width: 100,
      renderCell: (params) => (
        <div>{params.row.sex === 1 ? 'Nữ' : 'Nam'}</div>
      ),
    },
    { field: 'phoneNumber', headerName: 'Số điện thoại', width: 150 },
    { field: 'emailAddress', headerName: 'Địa chỉ email', width: 250 },
    { field: 'decription', headerName: 'Mô tả', width: 250 },
    
  ];

  return (
    <div className="container-fluid m-0 p-0 wrap-home bg-lazy">
      <div className="container-sm" style={{ maxWidth: '100%' }}>
        <div className="d-flex justify-content-between mt-20" style={{ maxWidth: '100%' }}>
          <span className="fw-700 pl-10 title-page font-60" style={{ color: 'blue', fontSize: '40px' }}>
            Danh sách giảng viên
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
            getRowId={(row) => row.teacherID}
            rows={listTeacher}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[7]}
            checkboxSelection
            disableSelectionOnClick
            className="custom-datagrid"
          />
        </div>
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
              } giảng viên`}
            </DialogTitle>
            <DialogContent>
              <div className="row">
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="name">Tên sinh viên</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    placeholder="Nhập tên giảng viên"
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
                  <label htmlFor="description">Mô tả</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={formData.description}
                    placeholder="Nhập mô tả"
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
  );
};

export default ListTeacher;
