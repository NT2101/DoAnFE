import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        
        <span className="ms-1">&copy; 2024 .</span>
      </div>
      <div className="ms-auto">
        
        <a target="_blank" rel="noopener noreferrer">
        Đại học Công Nghệ GTVT
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
