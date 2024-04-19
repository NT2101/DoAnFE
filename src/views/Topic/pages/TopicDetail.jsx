import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss';

const AddTopic = () => {
  const [listTeacher, setListTeacher] = useState([]);
  const [listTopicType, setListTopicType] = useState([]);
  const [formData, setFormData] = useState({
    studentID: '',
    name: '',
    teacherID: '',
    topicTypeID: '',
    description: '',
    topicYear: new Date().getFullYear(),
  });

  useEffect(() => {
    fetchData1();
    fetchData2();
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      // Lấy tên sinh viên từ userData và cập nhật vào state
      setFormData((prevFormData) => ({
        ...prevFormData,
        studentID: userData.studentInfo.name, // hoặc userData.studentInfo.name tùy vào cấu trúc dữ liệu
      }));
    }
  }, []);

  const fetchData1 = async () => {
    try {
      const response = await axios.get('https://localhost:7109/api/topicTypes/all');
      setListTopicType(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching topic data:', error);
    }
  };

  const fetchData2 = async () => {
    try {
      const response = await axios.get('https://localhost:7109/api/teachers/all');
      setListTeacher(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching topic data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('https://localhost:7109/api/Topics/Create', formData)
      .then((response) => {
        console.log('Topic created:', response.data);
        // Reset form after successful submission
        setFormData({
          ...formData,
          name: '',
          teacherID: '',
          topicTypeID: '',
          description: '',
          topicYear: new Date().getFullYear(),
        });
      })
      .catch((error) => {
        console.error('Error creating topic:', error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Thêm đề tài</h2>
        <div className="form-group mt-10 col-md-6">
          <label htmlFor="name">Tên đề tài</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            placeholder="Nhập tên đề tài"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-10 col-md-6">
          <label htmlFor="studentID">Tên sinh viên</label>
          <input
            type="text"
            className="form-control"
            name="studentID"
            value={formData.studentID} // Giá trị của StudentID lấy từ userData
            placeholder="Tên sinh viên"
            onChange={handleChange}
            required
            disabled // Không cho phép chỉnh sửa trường này
          />
        </div>
        <div className="form-group mt-10 col-md-6">
          <label htmlFor="teacherName">Tên giáo viên</label>
          <select
            className="form-select"
            name="teacherID"
            value={formData.teacherID}
            onChange={handleChange}
            required
          >
            <option value="">Chọn giáo viên</option>
            {listTeacher.map((teacher) => (
              <option key={teacher.teacherID} value={teacher.teacherID}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mt-10 col-md-6">
          <label htmlFor="topicTypeID">Lĩnh vực</label>
          <select
            className="form-select"
            name="topicTypeID"
            value={formData.topicTypeID}
            onChange={handleChange}
            required
          >
            <option value="">Chọn lĩnh vực</option>
            {listTopicType.map((topicType) => (
              <option key={topicType.id} value={topicType.id}>
                {topicType.name}
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
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-10 col-md-6">
          <label htmlFor="topicYear">Năm đề tài</label>
          <input
            type="text"
            className="form-control"
            name="topicYear"
            value={formData.topicYear}
            placeholder="Nhập năm đề tài"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Thêm đề tài</button>
      </form>
    </div>
  );
};

export default AddTopic
