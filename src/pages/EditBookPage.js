import React from 'react'
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function EditBookPage() {
const navigate = useNavigate();

  return (
    <div>
      {' '}
      <button onClick={() => navigate(-1)}><ArrowBackIcon/></button>
    </div>
  );
}

export default EditBookPage