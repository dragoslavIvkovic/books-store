/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { getBookById } from '../components/utils/api';

function SelectedBookPage() {
  const bookId = useSelector((state) => state?.books?.bookId);
  console.log('⬇️ bookId ⬇️', bookId);
  const [bookById, setBookById] = useState(null);
  const [loading, setLoading] = useState(false);

  const getBookByIdData = async () => {
    setLoading(true);
    const bookData = await getBookById(bookId);
    setBookById(bookData);
    console.log('⬇️ bookData ⬇️', bookData);
    setLoading(false);
  };

  useEffect(() => {
    getBookByIdData();
  }, [bookId]);

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}
    >
      <Box
        component="img"
        src={bookById?.coverPhoto}
        alt={bookById?.title}
        sx={{
          height: 100,
          width: 70,
        }}
      />
      <p>info</p>
      <h1>
        Title:
        {bookById?.title}
      </h1>
      <h1>
        Author:
        {bookById?.nameOfAuthor}
      </h1>
      <h1>
        Year:
        {bookById?.yearOfPublishing}
      </h1>
      <h1>
        Pages:
        {bookById?.numberOfPages}
      </h1>
      <h1>
        Quantity:
        {bookById?.quantity}
      </h1>
    </Box>
  );
}

export default SelectedBookPage;
