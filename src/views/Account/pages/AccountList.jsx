import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus , faEye} from '@fortawesome/free-solid-svg-icons';
import setting from '../../../setting.js';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Dialog components
import './style.scss';

const ListAccount = () => {
  const [ListAccount, setListAccount] = useState([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    password: '',
    roleID: '',
    status: '',
    
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7109/api/accounts1/All');
      setListAccount(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  
  const deleteAccount = async (id) => {
    try {
      await axios.delete(`https://localhost:7109/api/accounts1/delete?id=${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const columns = [{
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
        <button className="btnDelete" onClick={() => deleteAccount(params.row.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className="btnSearch">
          <FontAwesomeIcon icon={faEye} />
        </button>
      </div>
    ),
  },
    { field: 'id', headerName: 'Mã tài khoản', width: 130 },
    { field: 'name', headerName: 'Tài khoản', width: 420 },
    { field: 'password', headerName: 'Mật khẩu', width: 300 },
    { field: 'roleID', headerName: 'Quyền', width: 150 },
    { field: 'status', headerName: 'Tình trạng', width: 100 },

    
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
            getRowId={(row) => row.id}
            rows={ListAccount}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[7]}
            checkboxSelection
            disableSelectionOnClick
            className="custom-datagrid"
          />
        </div>
      </div>
     
    </div>
  );
};

export default ListAccount;
