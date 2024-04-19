import classNames from 'classnames'
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';
const Dashboard = () => {
  

return(
  <div className='news'>
      {/* ToastContainer for displaying toast notifications */}
      <ToastContainer />


      <div className='header'>
        <div>
        <h1 id='post-title'>Giới thiệu chung</h1>

        </div>
        <div >
          <div className='title-one'>
            Chương trình học
          </div>
          <div className='title-two'>
            Chương trình học
          </div>
          <div className='title-three'>
            Chương trình học
          </div>
          <div className='title-four'>
            Chương trình học
          </div>
        </div>
      </div>
    </div>
)
}

export default Dashboard
