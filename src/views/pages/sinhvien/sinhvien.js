import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    msv: "",
    hoTen: "",
    ngaySinh: "",
    queQuan: "",
    cccd: "",
    sdt: "",
    email: "",
    tenLop: "",
  });

  useEffect(() => {
    axios.get('https://localhost:7102/api/sinhViens')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleEdit = (student) => {
    setFormData(student); // Set form data to the selected student
    // Open the dialog or modal for editing
    // You can use any state management technique or component library for this purpose
  };

  const handleDelete = (msv) => {
    setLoading(true);
    axios.delete(`https://localhost:7102/api/sinhvien/${msv}`)
      .then(response => {
        setLoading(false);
        if (response.status === 200) {
          // Reload students data after successful deletion
          axios.get('https://localhost:7102/api/sinhvien')
            .then(response => {
              setStudents(response.data);
            })
            .catch(error => {
              console.error('Error fetching data: ', error);
            });
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('Error deleting student: ', error);
      });
  };

  const columns = [
    { field: "msv", headerName: "Mã Sinh Viên", width: 150 },
    { field: "hoTen", headerName: "Họ Tên", width: 150 },
    { field: "queQuan", headerName: "Quê Quán", width: 150 },
    { field: "cccd", headerName: "Số CCCD", width: 150 },
    { field: "sdt", headerName: "Số Điện Thoại", width: 200 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "urlAnh", headerName: "Ảnh", width: 150 },
    { field: "tenLop", headerName: "Tên Lớp", width: 150 },
    {
      field: "",
      headerName: "Thao tác",
      sortable: false,
      filterable: false,
      resizable: false,
      width: 200,
      renderCell: params => (
        <div className="d-flex justify-content-center w-100">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleEdit(params.row)}
          >
            <FontAwesomeIcon className="icon-add mr-5" icon="fas fa-pencil" />
            Sửa
          </button>
          <button
              type="button"
              className="ml-10 btn btn-danger"
              onClick={() => handleDelete(params.row && params.row.msv)} // Kiểm tra và truy cập msv
            >
              <FontAwesomeIcon className="icon-add mr-5" icon="fas fa-trash" />
              Xóa
</button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-20" style={{ height: 400, width: "100%" }}>
      <DataGrid
        getRowId={(row) => row.msv} 
        rows={students}
        columns={columns}
        pageSizeOptions={[5, 10]}
        disableColumnSelector
      />
    </div>
  );
};

export default StudentList;
