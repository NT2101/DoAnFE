  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { DataGrid } from '@mui/x-data-grid';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faTrash, faEdit, faPlus ,faEye } from '@fortawesome/free-solid-svg-icons';
  import setting from '../../../setting.js';
  import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Dialog components
  import './style.scss';

  const ListTopicType = () => {
    const [ListTopicType, setListTopicType] = useState([]);
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState('');
    const [formData, setFormData] = useState({
      id: '',
      name: '',
      description: '',

    });

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7109/api/topicTypes/All');
        console.log(response.data)
        setListTopicType(response.data);
        
      } catch (error) {
        console.error('Error fetching TopicType data:', error);
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
        await axios.post('https://localhost:7109/api/topicTypes/Create', formData);
        fetchData();
        setOpen(false);
      } catch (error) {
        console.error('Error creating TopicType:', error);
      }
    };

    const update = async () => {
      try {
        await axios.put(`https://localhost:7109/api/topicTypes/Update?id=${formData.id}`, formData);
        fetchData();
        setOpen(false);
      } catch (error) {
        console.error('Error updating topictype:', error);
      }
    };

    const deleteTopicType = async (id) => {
      try {
        await axios.delete(`https://localhost:7109/api/topicTypes/Delete?id=${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting TopicType:', error);
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
            <button className="btnDelete" onClick={() => deleteTopicType(params.row.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button className="btnSearch">
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        ),
      },
      { field: 'id', headerName: 'Mã lĩnh vực', width: 100 },
      { field: 'name', headerName: ' Tên lĩnh vực', width: 300 },
      { field: 'description', headerName: 'Mô tả', width: 830 },
    ];

    return (
      <div className="container-fluid m-0 p-0 wrap-home bg-lazy">
        <div className="container-sm" style={{ maxWidth: '100%' }}>
          <div className="d-flex justify-content-between mt-20" style={{ maxWidth: '100%' }}>
            <span className="fw-700 pl-10 title-page font-60" style={{ color: 'blue', fontSize: '40px' }}>
              Danh sách lĩnh vực
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
            
              rows={ListTopicType}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[7]}
              
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
                    <label htmlFor="name">Tên lĩnh vực</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      placeholder="Nhập tên lĩnh vực"
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

  export default ListTopicType;
