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
  const [listStudent, setListStudent] = useState([]);
  const [listTeacher, setListTeacher] = useState([]);
  const [listTopicType, setListTopicType] = useState([]);
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
    fetchData1();
    fetchData2();
    fetchData3();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7109/api/topics/all');
      setListTopic(response.data);
    } catch (error) {
      console.error('Error fetching topic data:', error);
      console.log(response.data)
    }
  };

  const fetchData1 = async () => {
    try {
      const response = await axios.get('https://localhost:7109/api/topicTypes/all');
      setListTopicType(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching topic data:', error);
    }
  };  const fetchData2 = async () => {
    try {
      const response = await axios.get('https://localhost:7109/api/teachers/all');
      setListTeacher(response.data);
      console.log(response.data);

    } catch (error) {
      console.error('Error fetching topic data:', error);
    }
  };  const fetchData3 = async () => {
    try {
      const response = await axios.get('https://localhost:7109/api/students/all');
      setListStudent(response.data);
      console.log(response.data);

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


  const handleDialog = async (status, action, data) => {
    switch (action) {
      case setting.ACTION.ADD:
        if (status === setting.ACTION.OPEN) {
          setFormData({
            name: '',
            studentName: '',
            teacherName: '',
            topicTypeName: '',
            description: '',
          });
        }
        break;
      case setting.ACTION.UPDATE:
        if (status === setting.ACTION.OPEN) {
          setFormData(data.row);
        } else {
          setFormData({
            name: '',
            studentName: '',
            teacherName: '',
            topicTypeName: '',
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
                } lĩnh vực`}
              </DialogTitle>
             <DialogContent>
                    <div className="row">
                      <div className="form-group mt-10 col-md-6">
                        <label htmlFor="name">Tên đề tài</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          placeholder="Nhập tên đề tài"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group mt-10 col-md-6">
                        <label htmlFor="studentName">Tên sinh viên</label>
                        <select
                          className="form-select"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Chọn sinh viên</option>
                          {listStudent.map(e => (
                            <option key={e.studentID} name = {e.studentID} value={e.studentID} >
                                {e.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group mt-10 col-md-6">
                        <label htmlFor="teacherName">Tên giáo viên</label>
                        <select
                          className="form-select"
                          name="teacherName"
                          value={formData.teacherName}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Chọn giáo viên</option>
                          {listTeacher.map(e => (
                            <option key={e.teacherID} name = {e.teacherID} value={e.teacherID} >
                                {e.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group mt-10 col-md-6">
                        <label htmlFor="topicTypeName">Lĩnh vực</label>
                        <select
                          className="form-select"
                          name="topicTypeName"
                          value={formData.topicTypeName}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Chọn lĩnh vực</option>
                          {listTopicType.map(e => (
                            <option key={e.id} name = {e.id} value={e.id} >
                                {e.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group mt-10 col-md-12">
                        <label htmlFor="description">Mô tả</label>
                        <textarea
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

export default ListTopic;
