import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus ,faEye} from '@fortawesome/free-solid-svg-icons';
import setting from '../../../setting.js';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Dialog components
import './style.scss';

const ListTopic = () => {
  const [listTopic, setListTopic] = useState([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('');
  const [formData, setFormData] = useState({
    topicID: '',
    name: '',
    studentName: '',
    teacherName: '',
    topicTypeName: '',
    description: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7109/api/Topics/all');
      setListTopic(response.data);
    } catch (error) {
      console.error('Error fetching topic data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDialog = (actionType, action, params) => {
    setAction(actionType);
    setOpen(actionType === setting.ACTION.OPEN);
    if (actionType === setting.ACTION.ADD) {
      setFormData({
        topicID: '',
        name: '',
        studentName: '',
        teacherName: '',
        topicTypeName: '',
        description: '',

      });
    } else if (actionType === setting.ACTION.UPDATE) {
      setFormData({
        topicID: params.row.topicID,
        name: params.row.name,
        studentName: params.row.studentName,
        teacherName: params.row.teacherName,
        topicTypeName: params.row.topicTypeName,
        description: params.row.description,

      });
    }
  };

  const create = async () => {
    try {
      await axios.post('https://localhost:7109/api/Topics/Create', formData);
      fetchData();
      setOpen(false);
    } catch (error) {
      console.error('Error creating Topic:', error);
    }
  };

  const update = async () => {
    try {
      await axios.put(`https://localhost:7109/api/Topics/Update/${formData.topicID}`, formData);
      fetchData();
      setOpen(false);
    } catch (error) {
      console.error('Error updating Topic:', error);
    }
  };

  const deleteStudent = async (topicID) => {
    try {
      await axios.delete(`https://localhost:7109/api/Topics/Delete?id=${topicID}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting Topic:', error);
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
    { field: 'topicID', headerName: 'Mã đề tài', width: 80 },
    { field: 'name', headerName: 'Tên đề tài' , width: 454 },
    { field: 'studentName', headerName: 'Tên sinh viên', width: 200 },
    { field: 'teacherName', headerName: 'Tên giáo viên', width: 200 },
    { field: 'topicTypeName', headerName: 'Lĩnh vực', width: 150 },
    { field: 'description', headerName: 'Mô tả', width: 200 },

    
  ];

  return (
    <div className="container-fluid m-0 p-0 wrap-home bg-lazy">
      <div className="container-sm" style={{ maxWidth: '100%' }}>
        <div className="d-flex justify-content-between mt-20" style={{ maxWidth: '100%' }}>
          <span className="fw-700 pl-10 title-page font-60" style={{ color: 'blue', fontSize: '40px' }}>
            Danh sách đề tài
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
        <div className="mt-20" style={{ height: '100%', width: '100%' }}>
          <DataGrid
            getRowId={(row) => row.topicID}
            rows={listTopic}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            className="custom-datagrid"
          />
        </div>
      </div>
      <Dialog open={open} keepMounted onClose={() => setOpen(false)}>
        <DialogTitle>{`${action === setting.ACTION.ADD ? 'Thêm' : 'Sửa'} đề tài`}</DialogTitle>
        <DialogContent>
          {/* Form inputs */}
          {/* Example: */}
          <input type="text" name="topicID" value={formData.topicID} onChange={handleInputChange} />
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

export default ListTopic;
