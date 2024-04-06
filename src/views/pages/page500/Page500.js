import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'

const Page500 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7102/api/taikhoan/Login');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    // <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    //   <CContainer>
    //     <CRow className="justify-content-center">
    //       <CCol md={6}>
    //         <span className="clearfix">
    //           <h1 className="float-start display-3 me-4">500</h1>
    //           <h4 className="pt-3">Houston, we have a problem!</h4>
    //           <p className="text-body-secondary float-start">
    //             The page you are looking for is temporarily unavailable.
    //           </p>
    //         </span>
    //         <CInputGroup className="input-prepend">
    //           <CInputGroupText>
    //             <CIcon icon={cilMagnifyingGlass} />
    //           </CInputGroupText>
    //           <CFormInput type="text" placeholder="What are you looking for?" />
    //           <CButton color="info">Search</CButton>
    //         </CInputGroup>
    //       </CCol>
    //     </CRow>
    //   </CContainer>
    // </div>
    <div>
      <h1>Data from API:</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Page500
